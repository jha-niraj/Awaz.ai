import { ElevenLabsApi } from "@elevenlabs/elevenlabs-js";

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsApi({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

// Default voice settings for better quality
const DEFAULT_VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.0,
  use_speaker_boost: true,
};

// Supported languages for Awaz.ai
export const SUPPORTED_LANGUAGES = {
  en: { name: "English", code: "en" },
  hi: { name: "Hindi", code: "hi" },
  bn: { name: "Bengali", code: "bn" },
  mr: { name: "Marathi", code: "mr" },
  ta: { name: "Tamil", code: "ta" },
  te: { name: "Telugu", code: "te" },
  kn: { name: "Kannada", code: "kn" },
  ne: { name: "Nepali", code: "ne" },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Default voice IDs for different languages (you'll need to configure these)
const LANGUAGE_VOICE_MAP: Record<SupportedLanguage, string> = {
  en: process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB", // Adam (default)
  hi: "pNInz6obpgDQGcFmaJgB", // You'll need Hindi voice ID
  bn: "pNInz6obpgDQGcFmaJgB", // You'll need Bengali voice ID
  mr: "pNInz6obpgDQGcFmaJgB", // You'll need Marathi voice ID
  ta: "pNInz6obpgDQGcFmaJgB", // You'll need Tamil voice ID
  te: "pNInz6obpgDQGcFmaJgB", // You'll need Telugu voice ID
  kn: "pNInz6obpgDQGcFmaJgB", // You'll need Kannada voice ID
  ne: "pNInz6obpgDQGcFmaJgB", // You'll need Nepali voice ID
};

export interface VoiceGenerationOptions {
  text: string;
  language?: SupportedLanguage;
  voiceId?: string;
  voiceSettings?: typeof DEFAULT_VOICE_SETTINGS;
}

export interface VoiceResponse {
  success: boolean;
  audioBuffer?: Buffer;
  audioBase64?: string;
  error?: string;
  duration?: number;
}

/**
 * Generate speech from text using ElevenLabs
 */
export async function generateSpeech({
  text,
  language = "en",
  voiceId,
  voiceSettings = DEFAULT_VOICE_SETTINGS,
}: VoiceGenerationOptions): Promise<VoiceResponse> {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      return {
        success: false,
        error: "ElevenLabs API key not configured",
      };
    }

    const selectedVoiceId = voiceId || LANGUAGE_VOICE_MAP[language];
    
    console.log(`Generating speech: "${text.substring(0, 50)}..." in ${language}`);

    const audioStream = await elevenlabs.generate({
      voice: selectedVoiceId,
      text: text,
      model_id: "eleven_multilingual_v2", // Best model for multilingual support
      voice_settings: voiceSettings,
    });

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }
    
    const audioBuffer = Buffer.concat(chunks);
    const audioBase64 = audioBuffer.toString('base64');

    console.log(`Speech generated successfully: ${audioBuffer.length} bytes`);

    return {
      success: true,
      audioBuffer,
      audioBase64,
      duration: Math.ceil(audioBuffer.length / 16000), // Rough estimate
    };

  } catch (error) {
    console.error("ElevenLabs generation error:", error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get available voices from ElevenLabs
 */
export async function getAvailableVoices() {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      throw new Error("ElevenLabs API key not configured");
    }

    const voices = await elevenlabs.voices.getAll();
    
    return {
      success: true,
      voices: voices.voices?.map(voice => ({
        voice_id: voice.voice_id,
        name: voice.name,
        category: voice.category,
        labels: voice.labels,
        preview_url: voice.preview_url,
      })) || [],
    };

  } catch (error) {
    console.error("Error fetching voices:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch voices",
      voices: [],
    };
  }
}

/**
 * Test ElevenLabs connection
 */
export async function testElevenLabsConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    await getAvailableVoices();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Connection test failed",
    };
  }
}

/**
 * Generate a test message for phone calls
 */
export function generateTestMessage(name: string = "Friend"): string {
  return `Hello ${name}! This is a test call from Awaz.ai, your multilingual voice outreach platform. We're testing our voice quality and call delivery system. Thank you for helping us make communication better for small businesses across India and Nepal. Have a great day!`;
}