import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech, generateTestMessage } from '@/lib/elevenlabs';
import { makeVoiceCall, validatePhoneNumber } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, name, language = 'en', useElevenLabs = true } = body;

    // Validate required fields
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.valid) {
      return NextResponse.json(
        { success: false, error: phoneValidation.error },
        { status: 400 }
      );
    }

    const customerName = name || 'Friend';
    const testMessage = generateTestMessage(customerName);

    console.log(`Initiating test call to ${phoneValidation.formatted} for ${customerName}`);

    let callResult;

    if (useElevenLabs) {
      // Use ElevenLabs for high-quality TTS
      console.log('Generating speech with ElevenLabs...');
      
      const voiceResult = await generateSpeech({
        text: testMessage,
        language: language,
      });

      if (!voiceResult.success) {
        return NextResponse.json(
          { success: false, error: `Voice generation failed: ${voiceResult.error}` },
          { status: 500 }
        );
      }

      // For now, we'll use Twilio's TTS as a fallback
      // In production, you'd want to upload the audio to a CDN and use the URL
      callResult = await makeVoiceCall({
        to: phoneValidation.formatted!,
        message: testMessage,
        name: customerName,
      });
    } else {
      // Use Twilio's built-in TTS directly
      callResult = await makeVoiceCall({
        to: phoneValidation.formatted!,
        message: testMessage,
        name: customerName,
      });
    }

    if (!callResult.success) {
      return NextResponse.json(
        { success: false, error: callResult.error },
        { status: 500 }
      );
    }

    console.log(`Call initiated successfully: ${callResult.callSid}`);

    return NextResponse.json({
      success: true,
      message: 'Call initiated successfully',
      data: {
        callSid: callResult.callSid,
        phoneNumber: phoneValidation.formatted,
        name: customerName,
        language: language,
        message: testMessage,
        status: callResult.status,
      },
    });

  } catch (error) {
    console.error('Test call API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error occurred while initiating call',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check if voice services are configured
export async function GET() {
  try {
    const isElevenLabsConfigured = !!process.env.ELEVENLABS_API_KEY;
    const isTwilioConfigured = !!(
      process.env.TWILIO_ACCOUNT_SID && 
      process.env.TWILIO_AUTH_TOKEN && 
      process.env.TWILIO_PHONE_NUMBER
    );

    return NextResponse.json({
      success: true,
      services: {
        elevenlabs: {
          configured: isElevenLabsConfigured,
          status: isElevenLabsConfigured ? 'ready' : 'missing_api_key',
        },
        twilio: {
          configured: isTwilioConfigured,
          status: isTwilioConfigured ? 'ready' : 'missing_credentials',
        },
      },
      ready: isElevenLabsConfigured && isTwilioConfigured,
    });

  } catch (error) {
    console.error('Voice services check error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check voice services configuration' 
      },
      { status: 500 }
    );
  }
}