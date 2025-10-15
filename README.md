# 🌾 AgriSmart Advisor - AI-Powered Agricultural Community Platform

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Web-orange)
![AI](https://img.shields.io/badge/AI-Ollama-purple)

An intelligent, community-based agricultural advisory system designed for Indian farmers. Combines AI-powered crop prediction, weather forecasting, soil health analysis, and personalized farming recommendations in a single, user-friendly platform.

---

## 🚀 Features

### 🤖 AI-Powered Intelligence
- **Ollama Integration**: Local AI chatbot for intelligent farming advice
- **Smart Crop Suggestions**: Location and season-based crop recommendations
- **Dynamic Responses**: Context-aware agricultural guidance
- **Multi-Model Support**: llama2, mistral, codellama, neural-chat

### 🌾 Agricultural Tools
- **Crop Yield Prediction**: ML-based predictions using LightGBM/Random Forest
- **Weather Dashboard**: Real-time weather updates and 7-day forecasts
- **Soil Health Analysis**: Government Soil Health Card integration
- **Facilities Finder**: Interactive map of soil testing labs and agricultural centers

### 🗺️ Location-Based Services
- **GPS Integration**: Automatic location detection
- **Interactive Maps**: OpenStreetMap with 20+ real agricultural facilities
- **Nearest Facility Finder**: Contact info, ratings, and navigation
- **Regional Customization**: State and district-specific recommendations

### ♿ Accessibility Features
- **Multi-Language Support**: Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada
- **Voice Navigation**: Text-to-speech and voice commands
- **Audio Search**: Hands-free operation for low-literacy users
- **Screen Reader Compatible**: WCAG accessibility compliance

### 🎨 User Experience
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Dark/Light Themes**: Customizable interface
- **Progressive Web App**: Offline functionality
- **Smooth Animations**: Modern, interactive UI

---

## 📋 Table of Contents

- [Demo](#-demo)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Locally](#-running-locally)
- [GitHub Deployment](#-github-deployment)
- [Ollama Setup](#-ollama-setup)
- [API Configuration](#-api-configuration)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎬 Demo

**Live Demo**: [Coming Soon]

**Screenshots**:
- Homepage with agricultural dashboard
- AI chatbot with crop suggestions
- Interactive facilities map
- Multi-language interface

---

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript ES6+**: Interactive functionality and API integrations
- **Leaflet.js**: Interactive mapping solution

### AI & Machine Learning
- **Ollama**: Local AI inference for intelligent responses
- **LightGBM**: Crop yield prediction models
- **Random Forest**: Alternative crop recommendations
- **Natural Language Processing**: Multi-language query understanding

### APIs & Integration
- **OpenWeather API**: Weather data and forecasts
- **India Meteorological Department (IMD)**: Government weather data
- **Soil Health Card Database**: Government soil profile data
- **OpenStreetMap**: Mapping and geocoding services
- **Web Speech API**: Voice recognition and synthesis

### Data Storage
- **LocalStorage**: User preferences and settings
- **IndexedDB**: Offline data caching (future enhancement)

---

## ✅ Prerequisites

Before running this project, ensure you have:

- **Web Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Ollama**: AI inference engine installed locally
- **Git**: Version control system
- **Python 3.x** (optional): For local development server
- **Node.js** (optional): Alternative local server option

---

## 📦 Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/agrismart-advisor.git

# Navigate to project directory
cd agrismart-advisor
```

### 2. Install Ollama

#### On Linux/Mac:
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

#### On Windows:
Download installer from [https://ollama.ai/download](https://ollama.ai/download)

### 3. Pull AI Models

```bash
# Pull recommended model for agricultural queries
ollama pull llama2

# Optional: Pull additional models
ollama pull mistral
ollama pull codellama
```

### 4. Configure API Keys

Create a `config.js` file in the root directory:

```javascript
// config.js
const CONFIG = {
    OPENWEATHER_API_KEY: 'your_openweather_api_key_here',
    OLLAMA_ENDPOINT: 'http://localhost:11434/api/generate',
    DEFAULT_MODEL: 'llama2'
};
```

**Get API Keys**:
- OpenWeather API: [https://openweathermap.org/api](https://openweathermap.org/api) (Free tier available)

---

## 🏃 Running Locally

### Method 1: Direct Browser (Simple)

```bash
# Simply open index.html in your browser
# Works for basic testing but may have CORS issues with some APIs
```

### Method 2: Python HTTP Server (Recommended)

```bash
# Start Python server
python -m http.server 8000

# Or with Python 3
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### Method 3: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8000

# Open browser to http://localhost:8000
```

### Method 4: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Start Ollama Server

```bash
# In a separate terminal, start Ollama
ollama serve

# Ollama will run on http://localhost:11434
```

---

## 🌐 GitHub Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `agrismart-advisor`
3. Don't initialize with README (we already have one)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: AgriSmart Advisor v2.0"

# Add remote repository
git remote add origin https://github.com/yourusername/agrismart-advisor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Under "Source", select **main** branch
4. Select **/ (root)** folder
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/agrismart-advisor/`

---

## 🤖 Ollama Setup for Online Deployment

**Important**: Ollama runs locally and cannot be directly deployed to GitHub Pages. For online deployment with Ollama, you need a backend server.

### Option 1: Heroku Deployment (with Ollama Backend)

#### A. Create Backend Server

Create `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint for Ollama
app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: req.body.model || 'llama2',
            prompt: req.body.prompt,
            stream: false
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Ollama service unavailable' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Create `package.json`:

```json
{
  "name": "agrismart-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "axios": "^1.6.0"
  }
}
```

#### B. Deploy to Heroku

```bash
# Install Heroku CLI
# Create Heroku app
heroku create agrismart-backend

# Deploy
git push heroku main

# Update frontend config.js with Heroku URL
# OLLAMA_ENDPOINT: 'https://agrismart-backend.herokuapp.com/api/chat'
```

### Option 2: Railway.app Deployment

1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add Ollama as a service
4. Deploy backend server
5. Update frontend with Railway URL

### Option 3: Replit Deployment

1. Fork project to [Replit](https://replit.com)
2. Install Ollama in Replit environment
3. Run backend server
4. Use Replit URL for API calls

### Option 4: Self-Hosted Solution

**Use Ngrok for Local Ollama Access**:

```bash
# Install ngrok
# Start Ollama
ollama serve

# In another terminal, expose Ollama
ngrok http 11434

# Use ngrok URL in your config.js
# Example: https://abc123.ngrok.io/api/generate
```

---

## 🔧 API Configuration

### OpenWeather API Setup

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get free API key (1000 calls/day)
3. Add to `config.js`:

```javascript
const CONFIG = {
    OPENWEATHER_API_KEY: 'your_api_key_here'
};
```

### Ollama Configuration

Update `chat.html` or create `ollama-config.js`:

```javascript
const OLLAMA_CONFIG = {
    endpoint: 'http://localhost:11434/api/generate',
    models: ['llama2', 'mistral', 'codellama'],
    default_model: 'llama2',
    temperature: 0.7,
    max_tokens: 2000
};
```

---

## 📁 Project Structure

```
agrismart-advisor/
├── index.html              # Homepage
├── prediction.html         # Crop prediction page
├── chat.html              # AI chatbot interface
├── weather.html           # Weather dashboard
├── soil.html              # Soil health analysis
├── facilities.html        # Facilities finder with map
├── styles.css             # Main stylesheet
├── config.js              # API configuration
├── README.md              # This file
├── LICENSE                # MIT License
├── assets/
│   ├── images/           # Images and icons
│   ├── animations/       # Animation files
│   └── data/             # Static data files
├── js/
│   ├── ollama-integration.js   # Ollama API handler
│   ├── crop-suggestions.js     # Crop recommendation logic
│   ├── weather-api.js          # Weather API integration
│   ├── map-handler.js          # Leaflet map functionality
│   └── voice-controls.js       # Speech API integration
└── server/
    ├── server.js          # Backend server (optional)
    └── package.json       # Node.js dependencies
```

---

## 📖 Usage Guide

### Getting Crop Suggestions

1. **Open AI Assistant Page**
2. **Click "Get Crop Suggestions"** button
3. **Allow Location Access** when prompted
4. **Wait for Analysis**: System gathers location, weather, and soil data
5. **Review Recommendations**: AI-powered crop suggestions with reasoning

### Using Voice Features

1. **Enable Voice Controls** in Settings
2. **Click Microphone Icon** or say "Hey AgriSmart"
3. **Speak Your Query**: "What crop should I plant in December?"
4. **Get Voice Response**: AI answers with audio output

### Finding Agricultural Facilities

1. **Navigate to Facilities Page**
2. **Use "My Location"** or search by city
3. **Filter by Type**: Soil testing, markets, extension centers
4. **View Details**: Contact info, services, ratings
5. **Get Directions**: Navigate using Google Maps

### Checking Weather

1. **Open Weather Dashboard**
2. **Auto-detects Location** or enter manually
3. **View 7-Day Forecast**
4. **Set Weather Alerts** for farming activities

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs

- Use GitHub Issues
- Provide detailed description
- Include screenshots if applicable
- Mention browser and OS version

### Feature Requests

- Open GitHub Issue with "Feature Request" label
- Describe the feature and use case
- Explain how it benefits farmers

### Pull Requests

```bash
# Fork the repository
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push to branch
git push origin feature/amazing-feature

# Open Pull Request on GitHub
```

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure mobile responsiveness
- Update documentation

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 AgriSmart Advisor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

### Data Sources
- **Ministry of Agriculture & Farmers Welfare**: Soil Health Card data
- **India Meteorological Department**: Weather forecasts
- **ICAR Institutions**: Agricultural research and crop data
- **OpenWeatherMap**: Weather API services

### Technologies
- **Ollama**: AI inference engine
- **Leaflet.js**: Interactive mapping
- **OpenStreetMap**: Map data and geocoding
- **Web Speech API**: Voice features

### Inspiration
Built for Indian farmers to democratize access to AI-powered agricultural insights and promote sustainable farming practices.

---

### Farmer Helpline

For agricultural emergencies:
- **Kisan Call Centre**: 1800-180-1551
- **Government Helpline**: 1800-115-526

---

## 📊 Statistics

- **Languages Supported**: 8 Indian languages
- **Facilities Database**: 20+ verified agricultural centers
- **Crops Covered**: 50+ major Indian crops
- **API Integrations**: 5+ government and weather APIs
- **Accessibility**: WCAG 2.1 AA compliant

---

## 💡 Tips for Best Experience

1. **Use Chrome/Firefox** for best compatibility
2. **Enable Location Services** for accurate recommendations
3. **Install Ollama** for full AI features
4. **Use on WiFi** for faster weather data loading
5. **Allow Microphone Access** for voice features

---

**Made with ❤️ for Indian Farmers | Empowering Agriculture through AI**

---

*Last Updated: October 15, 2025*
