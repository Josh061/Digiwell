# Trading Petroleum Payments - Cross-Platform App

A cross-platform application for trading petroleum products with real-time pricing, digital payments, escrow services, and more. Built with React, TypeScript, and Capacitor for **Web**, **Android**, and **iOS**.

## 🚀 Features

- **Cross-Platform**: Runs on Web, Android, and iOS
- **Escrow Services**: Secure payment escrow for petroleum transactions
- **KYC Verification**: Know Your Customer verification system
- **Digital Wallets**: Wallet functionality for users
- **Tokenization**: Token-based trading features
- **GPS Tracking**: Real-time shipment tracking
- **Market Intelligence**: Market data and analytics
- **Admin Dashboard**: Administrative controls
- **Role Management**: Role-based access (admin, trader, viewer)

## 📱 Platform Support

- ✅ **Web** - Progressive Web App (PWA)
- ✅ **Android** - Native Android app
- ✅ **iOS** - Native iOS app

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Cross-Platform**: Capacitor
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod

## 📦 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
# Web development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile Development

See [MOBILE_SETUP.md](./MOBILE_SETUP.md) for detailed mobile setup instructions.

```bash
# Build and sync to mobile platforms
npm run build
npm run cap:sync

# Open Android project
npm run cap:open:android

# Open iOS project (macOS only)
npm run cap:open:ios
```

## 📚 Documentation

- [Mobile Setup Guide](./MOBILE_SETUP.md) - Complete guide for Android and iOS development

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run cap:sync` - Sync web assets to native platforms
- `npm run cap:open:android` - Open Android project
- `npm run cap:open:ios` - Open iOS project

## 📝 Project Structure

```
src/
├── components/     # React components
├── contexts/       # React Context providers
├── pages/          # Page components
├── lib/            # Utilities (including Capacitor)
├── hooks/          # Custom React hooks
└── data/           # Static data

android/            # Android native project
ios/                # iOS native project
dist/               # Built web assets
```

## 🔧 Configuration

- **Capacitor Config**: `capacitor.config.ts`
- **Vite Config**: `vite.config.ts`
- **TypeScript Config**: `tsconfig.json`
- **Tailwind Config**: `tailwind.config.ts`

## 📖 Learn More

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
