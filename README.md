# Cross-Platform Subscription App

A monorepo-based subscription application with web (Next.js) and mobile (React Native/Expo) clients.

## 🏗 Architecture

### Project Structure
```
project/
├── apps/
│   ├── next/                 # Next.js web application
│   │   ├── app/             # App router pages
│   │   ├── api/             # API routes
│   │   ├── lib/            # Utilities
│   │   └── models/         # MongoDB models
│   └── mobile/             # React Native mobile app
│       ├── src/
│       │   ├── navigation/ # Navigation setup
│       │   └── screens/    # App screens
│       └── app.config.js   # Expo configuration
└── shared/                 # Shared packages
    ├── utils/             # Common utilities
    ├── schemas/          # Data validation
    └── logic/           # Business logic
```

### Technology Stack

#### Backend & Web (apps/next)
- Next.js 14 with App Router
- MongoDB/Mongoose
- NextAuth.js for authentication
- Stripe for web payments

#### Mobile (apps/mobile)
- React Native with Expo
- React Navigation
- RevenueCat for mobile payments

#### Shared
- Yarn Workspaces for monorepo management
- Turbo for build system
- Zod for validation

## 🚀 Installation

### Prerequisites
- Node.js 18+
- Yarn
- MongoDB instance
- Expo Go app (for mobile development)

### Environment Setup

1. Create `apps/next/.env.local`:
```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret

# MongoDB
MONGODB_URI=your-mongodb-uri

# Stripe
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

2. Create `apps/mobile/.env`:
```env
EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:3000/api
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### Installation Steps

```bash
# 1. Clone the repository
git clone [repository-url]
cd [repository-name]

# 2. Install dependencies
yarn install

# 3. Build shared packages
yarn build
```

## 🖥 Running the Project

### Web Application
```bash
# Terminal 1
yarn dev:web
# Access at http://localhost:3000
```

### Mobile Application
```bash
# Terminal 2
yarn dev:mobile
# Scan QR code with Expo Go app
```

### Development Notes
- Web changes reflect immediately
- Mobile changes trigger automatic reload
- Shared code changes require restart of both servers

## 📱 Mobile-Specific Setup

### Current Implementation
- Basic navigation setup
- Home screen with "Hello World"
- Safe area handling
- Navigation configuration

### Dependencies
```json
{
  "@react-navigation/native": "6.0.8",
  "@react-navigation/native-stack": "6.5.0",
  "expo": "^52.0.18",
  "react-native": "0.76.3"
}
```

## 🔧 Troubleshooting

### Common Issues

1. Mobile app not connecting:
```bash
# Check your IP address
ipconfig getifaddr en0  # On Mac
ip addr show           # On Linux
```

2. Dependencies issues:
```bash
# Clean install
rm -rf node_modules
rm -rf **/node_modules
yarn cache clean
yarn install
```

3. Build issues:
```bash
# Clean builds
rm -rf .turbo
rm -rf apps/next/.next
rm -rf apps/mobile/.expo
```

## 📝 Development Status

### ✅ Implemented
- Project structure and configuration
- Basic navigation setup
- Environment configuration
- Development workflow

### 🚧 Todo
- Authentication implementation
- Payment integration
- Subscription management
- User profile
- Settings screens

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.