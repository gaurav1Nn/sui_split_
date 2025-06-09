# SuiSplit 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Sui Network](https://img.shields.io/badge/Blockchain-Sui-blue.svg)](https://sui.io/)
[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen.svg)](https://sui-split.vercel.app/)

> *Revolutionizing bill-splitting through blockchain technology*

**[🌐 Live Demo](https://sui-split.vercel.app/)**

SuiSplit is a decentralized bill-splitting application built on the Sui blockchain that eliminates the hassle of tracking IOUs and settling debts. Experience transparent, secure, and instant settlements using cryptocurrency.

## ✨ Features

- 🔐 **Seamless Wallet Integration** - Connect with Sui wallets effortlessly
- 💰 **Real-time Balance Tracking** - Always know who owes what
- ⚡ **Smart Settlement System** - One-click expense settlement via blockchain
- 📊 **Interactive Dashboard** - Visual representation of all balances
- 🎨 **Modern UI/UX** - Beautiful, responsive interface

## 🏗 Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, TypeScript
- **Blockchain**: Sui Network, Move smart contracts
- **Integration**: @mysten/wallet-kit, Sui TypeScript SDK

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Sui CLI
- Sui Wallet Extension

### Setup
```bash
# Clone repository
git clone https://github.com/yourusername/suisplit.git
cd suisplit

# Backend setup
cd sui_back/backend && npm install

# Frontend setup  
cd ../frontend && npm install

# Smart contracts
cd ../../move && sui move build
```

### Run Application
**Terminal 1 - Backend:**
```bash
cd sui_back/backend && npm run dev  # Port 5000
```

**Terminal 2 - Frontend:**
```bash
cd sui_back/frontend && npm run dev  # Port 3000
```

Visit http://localhost:3000 and connect your Sui wallet!

## 📁 Project Structure

```
suisplit/
├── sui_back/                    # Main project directory
│   ├── backend/                 # Backend API server
│   │   ├── src/                 # Backend source code
│   │   ├── package.json         # Backend dependencies & scripts
│   │   └── .env                 # Backend environment variables
│   └── frontend/                # Frontend React application
│       ├── src/                 # Frontend source code
│       │   ├── components/      # React components
│       │   │   ├── Dashboard/   # Dashboard components
│       │   │   ├── Expenses/    # Expense management
│       │   │   ├── Layout/      # Layout components (NavBar, etc.)
│       │   │   ├── LandingPage/ # Landing page components
│       │   │   ├── ParticipantBalances/  # Balance display
│       │   │   └── Wallet/      # Wallet integration
│       │   ├── context/         # React contexts
│       │   ├── pages/           # Page components
│       │   │   ├── HomePage.tsx # Landing page
│       │   │   └── Dashboard.tsx # Main app dashboard
│       │   ├── sui/             # Sui blockchain integration
│       │   ├── types/           # TypeScript definitions
│       │   └── App.tsx          # Main app component
│       ├── package.json         # Frontend dependencies
│       └── tailwind.config.js   # Tailwind configuration
├── move/                        # Sui Move smart contracts
└── README.md                    # This file
```

## 🧪 Development

### Available Scripts
```bash
# Frontend (from sui_back/frontend/)
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Code linting

# Backend (from sui_back/backend/)
npm run dev          # Development server
npm run build        # Production build

# Smart Contracts (from move/)
sui move build       # Build contracts
sui move test        # Run tests
sui move publish     # Deploy contracts
```

## 🎯 Use Cases

Perfect for:
- 👥 **Friend Groups** - Restaurant bills, entertainment
- 🏠 **Roommates** - Rent, utilities, groceries
- ✈️ **Travel Companions** - Trip expenses
- 🎉 **Event Organizers** - Group purchases



---

<div align="center">
  <p><strong>Made with ❤️ by TechAlpha</strong></p>
  <p><strong><a href="https://sui-split.vercel.app/">🚀 Try SuiSplit Now</a></strong></p>
  
  ⭐ *Star this repository if you find it helpful!* ⭐
</div>
