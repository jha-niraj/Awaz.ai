import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract call status information from Twilio webhook
    const callSid = formData.get('CallSid') as string;
    const callStatus = formData.get('CallStatus') as string;
    const duration = formData.get('CallDuration') as string;
    const to = formData.get('To') as string;
    const from = formData.get('From') as string;
    const timestamp = formData.get('Timestamp') as string;

    console.log('Twilio call status webhook:', {
      callSid,
      callStatus,
      duration,
      to,
      from,
      timestamp,
    });

    // Here you would typically:
    // 1. Update your database with the call status
    // 2. Send notifications to users
    // 3. Update analytics/metrics
    // 4. Handle billing/usage tracking

    // For now, we'll just log the status
    switch (callStatus) {
      case 'initiated':
        console.log(`Call ${callSid} has been initiated`);
        break;
      case 'ringing':
        console.log(`Call ${callSid} is ringing`);
        break;
      case 'answered':
        console.log(`Call ${callSid} was answered`);
        break;
      case 'completed':
        console.log(`Call ${callSid} completed after ${duration} seconds`);
        break;
      case 'failed':
        console.log(`Call ${callSid} failed`);
        break;
      case 'busy':
        console.log(`Call ${callSid} encountered busy signal`);
        break;
      case 'no-answer':
        console.log(`Call ${callSid} was not answered`);
        break;
      default:
        console.log(`Call ${callSid} status: ${callStatus}`);
    }

    // Twilio expects a 200 response to acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Twilio call status webhook error:', error);
    
    // Still return 200 to avoid Twilio retries
    return NextResponse.json({ error: 'Processing failed' }, { status: 200 });
  }
}

// Handle GET requests (for webhook URL validation)
export async function GET() {
  return NextResponse.json({ message: 'Twilio call status webhook endpoint' });
}