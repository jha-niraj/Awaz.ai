# Awaz.ai - Multilingual Voice Outreach Platform

🎯 **The easiest way for small businesses in India to talk to all their customers at once — in their own language.**

Awaz.ai is a revolutionary multilingual voice outreach platform that enables small and medium businesses to reach hundreds of customers instantly with personalized voice calls in local languages. No more manual calling, no language barriers, just results.

## ✨ Key Features

- 🗣️ **10+ Indian Languages** - Hindi, Bengali, Marathi, Tamil, Telugu, and more
- 📞 **Automated Voice Calls** - Reach 1000+ customers in minutes
- 🎯 **Smart Personalization** - Insert names, amounts, dates automatically
- 📊 **Real-time Analytics** - Track delivery rates and campaign performance
- 🔒 **Compliance Ready** - DLT integration and consent management
- 🔗 **Easy Integration** - Google Sheets, CSV uploads, API access

## 🎯 Perfect For

- **Kirana Shops** → Payment reminders, promotions
- **Clinics** → Appointment confirmations, prescription alerts  
- **Schools** → Fee reminders, exam notifications
- **Salons** → Booking confirmations, follow-ups
- **NBFCs** → EMI reminders, collection calls

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- ElevenLabs API key
- Twilio account

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/shunyatech/awaz.ai.git
   cd awaz.ai
   npm install --legacy-peer-deps
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/awaz_db"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_SECRET_ID="your-google-client-secret"
   
   # Voice & Calling
   ELEVENLABS_API_KEY="your-elevenlabs-key"
   TWILIO_ACCOUNT_SID="your-twilio-sid"
   TWILIO_AUTH_TOKEN="your-twilio-token"
   
   # Email
   RESEND_API_KEY="your-resend-key"
   ```

3. **Database setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

5. **Access the app**
   
   Open [http://localhost:3000](http://localhost:3000) to start building voice campaigns.

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5
- **Voice Engine**: ElevenLabs TTS
- **Calling**: Twilio Voice API
- **Deployment**: Vercel

## 📱 Core Workflow

1. **Upload Contacts** → CSV, Excel, or Google Sheets
2. **Write Script** → "Hello {{name}}, your payment of ₹{{amount}} is due"
3. **Choose Voice** → Select language and voice type
4. **Preview & Test** → Hear how it sounds
5. **Launch Campaign** → Reach all customers instantly
6. **Track Results** → Monitor delivery and engagement

## 🌍 Supported Languages

| Language | Code | Voice Quality |
|----------|------|---------------|
| English  | en   | ⭐⭐⭐⭐⭐ |
| Hindi    | hi   | ⭐⭐⭐⭐⭐ |
| Bengali  | bn   | ⭐⭐⭐⭐ |
| Marathi  | mr   | ⭐⭐⭐⭐ |
| Tamil    | ta   | ⭐⭐⭐⭐ |
| Telugu   | te   | ⭐⭐⭐⭐ |
| Kannada  | kn   | ⭐⭐⭐⭐ |
| Nepali   | ne   | ⭐⭐⭐⭐ |

## 📊 Pricing (India)

```
🆓 Free Trial: 100 calls free
💼 Starter: ₹999/month (1,000 calls)
🚀 Growth: ₹2,999/month (5,000 calls)
🏢 Business: ₹9,999/month (25,000 calls)
```

## 🔗 Integrations

- **Google Sheets** - Import contacts directly
- **Zapier/Make** - Automate workflows
- **CRM Systems** - HubSpot, Zoho integration
- **Payment Gateways** - Razorpay, Stripe
- **E-commerce** - Shopify, WooCommerce

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for Indian SMBs | [Awaz.ai](https://awaz.ai) | [Support](mailto:support@awaz.ai)**
