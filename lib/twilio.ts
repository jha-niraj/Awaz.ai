import twilio from 'twilio';

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export interface CallOptions {
  to: string;
  audioUrl?: string;
  audioBase64?: string;
  message?: string;
  name?: string;
}

export interface CallResponse {
  success: boolean;
  callSid?: string;
  error?: string;
  status?: string;
}

/**
 * Make an outbound voice call using Twilio
 */
export async function makeVoiceCall({
  to,
  audioUrl,
  audioBase64,
  message,
  name = "Friend"
}: CallOptions): Promise<CallResponse> {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return {
        success: false,
        error: "Twilio credentials not configured",
      };
    }

    // Clean phone number (remove any formatting)
    const cleanPhoneNumber = to.replace(/[^\+\d]/g, '');
    
    // Add country code if not present (assuming India +91 for now)
    const phoneNumber = cleanPhoneNumber.startsWith('+') 
      ? cleanPhoneNumber 
      : `+91${cleanPhoneNumber}`;

    console.log(`Making call to: ${phoneNumber}`);

    let twimlUrl = '';

    // If we have audio (base64 or URL), create a TwiML response
    if (audioBase64 || audioUrl) {
      // For now, we'll use a simple TwiML webhook URL
      // In production, you'd want to store the audio and serve it via a webhook
      twimlUrl = `${process.env.NEXTAUTH_URL}/api/twilio/voice-response`;
    } else if (message) {
      // Use Twilio's built-in TTS with the message
      twimlUrl = `${process.env.NEXTAUTH_URL}/api/twilio/voice-response?message=${encodeURIComponent(message)}&name=${encodeURIComponent(name)}`;
    } else {
      return {
        success: false,
        error: "No audio or message provided for the call",
      };
    }

    const call = await client.calls.create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER!,
      url: twimlUrl,
      method: 'POST',
      statusCallback: `${process.env.NEXTAUTH_URL}/api/twilio/call-status`,
      statusCallbackMethod: 'POST',
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    });

    console.log(`Call initiated successfully: ${call.sid}`);

    return {
      success: true,
      callSid: call.sid,
      status: call.status,
    };

  } catch (error) {
    console.error("Twilio call error:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to make call",
    };
  }
}

/**
 * Get call status from Twilio
 */
export async function getCallStatus(callSid: string) {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new Error("Twilio credentials not configured");
    }

    const call = await client.calls(callSid).fetch();
    
    return {
      success: true,
      status: call.status,
      duration: call.duration,
      price: call.price,
      direction: call.direction,
      startTime: call.startTime,
      endTime: call.endTime,
    };

  } catch (error) {
    console.error("Error fetching call status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch call status",
    };
  }
}

/**
 * Generate TwiML for voice response
 */
export function generateTwiML(options: {
  message?: string;
  audioUrl?: string;
  name?: string;
}): string {
  const { message, audioUrl, name = "Friend" } = options;

  let twiml = '<?xml version="1.0" encoding="UTF-8"?><Response>';

  if (audioUrl) {
    // Play pre-generated audio
    twiml += `<Play>${audioUrl}</Play>`;
  } else if (message) {
    // Use Twilio's built-in TTS
    const personalizedMessage = message.replace(/\{\{name\}\}/g, name);
    twiml += `<Say voice="alice">${personalizedMessage}</Say>`;
  } else {
    // Default message
    twiml += `<Say voice="alice">Hello ${name}! This is a test call from Awaz.ai. Thank you for testing our voice platform.</Say>`;
  }

  // Add a pause and goodbye
  twiml += '<Pause length="1"/>';
  twiml += '<Say voice="alice">Goodbye!</Say>';
  twiml += '</Response>';

  return twiml;
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phoneNumber: string): { valid: boolean; formatted?: string; error?: string } {
  // Remove all non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\+\d]/g, '');
  
  // Check if it's empty
  if (!cleaned) {
    return { valid: false, error: "Phone number is required" };
  }

  // Check various formats
  if (cleaned.match(/^\+91\d{10}$/)) {
    // Indian format with +91
    return { valid: true, formatted: cleaned };
  } else if (cleaned.match(/^\d{10}$/)) {
    // 10-digit Indian number without country code
    return { valid: true, formatted: `+91${cleaned}` };
  } else if (cleaned.match(/^\+\d{10,15}$/)) {
    // International format
    return { valid: true, formatted: cleaned };
  } else {
    return { 
      valid: false, 
      error: "Please enter a valid phone number (e.g., +911234567890 or 1234567890)" 
    };
  }
}

/**
 * Test Twilio connection
 */
export async function testTwilioConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      return {
        success: false,
        error: "Twilio credentials not configured",
      };
    }

    // Test by fetching account info
    const account = await client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
    
    return { 
      success: true,
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Twilio connection test failed",
    };
  }
}