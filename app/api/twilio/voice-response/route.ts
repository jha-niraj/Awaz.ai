import { NextRequest, NextResponse } from 'next/server';
import { generateTwiML } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const message = searchParams.get('message');
    const name = searchParams.get('name') || 'Friend';
    const audioUrl = searchParams.get('audioUrl');

    console.log('Twilio voice response webhook called:', { message, name, audioUrl });

    // Generate TwiML response
    const twiml = generateTwiML({
      message: message || undefined,
      audioUrl: audioUrl || undefined,
      name,
    });

    console.log('Generated TwiML:', twiml);

    // Return TwiML response with proper content type
    return new NextResponse(twiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });

  } catch (error) {
    console.error('Twilio voice response error:', error);
    
    // Return a basic TwiML error response
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say voice="alice">Sorry, there was an error processing your call.</Say>
      </Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}

// Handle GET requests (some webhook configurations may use GET)
export async function GET(request: NextRequest) {
  return POST(request);
}