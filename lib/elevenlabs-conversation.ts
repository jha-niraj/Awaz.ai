import { ElevenLabsApi } from "@elevenlabs/elevenlabs-js";

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsApi({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

export interface ConversationalCallOptions {
  to: string;
  agentId?: string;
  customVariables?: {
    business_name?: string;
    customer_name?: string;
    call_purpose?: string;
    amount?: string;
    due_date?: string;
    topic?: string;
    [key: string]: string | undefined;
  };
}

export interface ConversationalCallResponse {
  success: boolean;
  conversationId?: string;
  error?: string;
  status?: string;
}

/**
 * Make a conversational AI call using ElevenLabs agent
 */
export async function makeConversationalCall({
  to,
  agentId,
  customVariables = {},
}: ConversationalCallOptions): Promise<ConversationalCallResponse> {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      return {
        success: false,
        error: "ElevenLabs API key not configured",
      };
    }

    if (!agentId) {
      agentId = process.env.ELEVENLABS_AGENT_ID;
    }

    if (!agentId) {
      return {
        success: false,
        error: "Agent ID not provided. Please configure ELEVENLABS_AGENT_ID in environment variables.",
      };
    }

    // Clean phone number (remove any formatting)
    const cleanPhoneNumber = to.replace(/[^\+\d]/g, '');
    
    // Add country code if not present (assuming India +91 for now)
    const phoneNumber = cleanPhoneNumber.startsWith('+') 
      ? cleanPhoneNumber 
      : `+91${cleanPhoneNumber}`;

    console.log(`Making conversational call to: ${phoneNumber} with agent: ${agentId}`);
    console.log('Custom variables:', customVariables);

    // Create conversational AI call
    const conversation = await elevenlabs.conversationalAI.createCall({
      agent_id: agentId,
      customer_phone_number: phoneNumber,
      // Pass dynamic variables to the agent
      ...(Object.keys(customVariables).length > 0 && {
        custom_llm_extra_body: {
          variables: customVariables
        }
      })
    });

    console.log(`Conversational call initiated: ${conversation.conversation_id}`);

    return {
      success: true,
      conversationId: conversation.conversation_id,
      status: 'initiated',
    };

  } catch (error) {
    console.error("ElevenLabs conversational call error:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to initiate conversational call",
    };
  }
}

/**
 * Get conversation status and details
 */
export async function getConversationStatus(conversationId: string) {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      throw new Error("ElevenLabs API key not configured");
    }

    const conversation = await elevenlabs.conversationalAI.getConversation(conversationId);
    
    return {
      success: true,
      conversation: {
        id: conversation.conversation_id,
        status: conversation.status,
        agent_id: conversation.agent_id,
        customer_phone_number: conversation.customer_phone_number,
        start_time: conversation.start_time,
        end_time: conversation.end_time,
        transcript: conversation.transcript,
      },
    };

  } catch (error) {
    console.error("Error fetching conversation status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch conversation status",
    };
  }
}

/**
 * Test conversational AI connection and agent
 */
export async function testConversationalAI(agentId?: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      return {
        success: false,
        error: "ElevenLabs API key not configured",
      };
    }

    const testAgentId = agentId || process.env.ELEVENLABS_AGENT_ID;
    
    if (!testAgentId) {
      return {
        success: false,
        error: "Agent ID not configured. Please set ELEVENLABS_AGENT_ID in environment variables.",
      };
    }

    // Test by trying to get agent details (if API supports it)
    // For now, just validate the API key works
    const voices = await elevenlabs.voices.getAll();
    
    return { 
      success: true,
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Conversational AI connection test failed",
    };
  }
}

/**
 * Generate test variables for demonstration
 */
export function generateTestVariables(customerName: string = "Friend", businessName: string = "Awaz.ai"): Record<string, string> {
  return {
    business_name: businessName,
    customer_name: customerName,
    call_purpose: "Testing our new AI voice platform",
    topic: "voice outreach services",
    amount: "₹999",
    due_date: "tomorrow",
  };
}