import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech, generateTestMessage } from '@/lib/elevenlabs';
import { makeVoiceCall, validatePhoneNumber } from '@/lib/twilio';
import { makeConversationalCall, generateTestVariables } from '@/lib/elevenlabs-conversation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      phoneNumber, 
      name, 
      language = 'en', 
      useElevenLabs = true, 
      useConversationalAI = false,
      businessName = 'Awaz.ai',
      callPurpose = 'Testing voice platform',
      customVariables = {}
    } = body;

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

    console.log(`Initiating test call to ${phoneValidation.formatted} for ${customerName}`);
    console.log(`Mode: ${useConversationalAI ? 'Conversational AI' : 'Simple TTS'}`);

    let callResult;

    if (useConversationalAI) {
      // Use ElevenLabs Conversational AI Agent
      console.log('Using conversational AI mode...');
      
      const variables = {
        business_name: businessName,
        customer_name: customerName,
        call_purpose: callPurpose,
        topic: 'voice platform testing',
        ...customVariables,
        ...generateTestVariables(customerName, businessName),
      };

      callResult = await makeConversationalCall({
        to: phoneValidation.formatted!,
        customVariables: variables,
      });

      if (!callResult.success) {
        return NextResponse.json(
          { success: false, error: callResult.error },
          { status: 500 }
        );
      }

      console.log(`Conversational call initiated: ${callResult.conversationId}`);

      return NextResponse.json({
        success: true,
        message: 'Conversational AI call initiated successfully',
        data: {
          conversationId: callResult.conversationId,
          phoneNumber: phoneValidation.formatted,
          name: customerName,
          language: language,
          businessName: businessName,
          callPurpose: callPurpose,
          variables: variables,
          status: callResult.status,
          mode: 'conversational-ai',
        },
      });

    } else if (useElevenLabs) {
      // Use ElevenLabs for high-quality TTS (Legacy mode)
      console.log('Using ElevenLabs TTS mode...');
      
      const testMessage = generateTestMessage(customerName);
      
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
      console.log('Using Twilio TTS mode...');
      
      const testMessage = generateTestMessage(customerName);
      
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
        message: generateTestMessage(customerName),
        status: callResult.status,
        mode: useElevenLabs ? 'elevenlabs-tts' : 'twilio-tts',
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
    const isAgentConfigured = !!process.env.ELEVENLABS_AGENT_ID;
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
        conversationalAI: {
          configured: isElevenLabsConfigured && isAgentConfigured,
          status: isElevenLabsConfigured && isAgentConfigured ? 'ready' : 'missing_agent_id',
        },
        twilio: {
          configured: isTwilioConfigured,
          status: isTwilioConfigured ? 'ready' : 'missing_credentials',
        },
      },
      ready: isElevenLabsConfigured && isTwilioConfigured,
      conversationalAI: isElevenLabsConfigured && isAgentConfigured,
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