const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS for your frontend
app.use(cors({
    origin: '*', // In production, replace with your actual GitHub Pages URL
    credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'AgriSmart Backend Server Running',
        timestamp: new Date().toISOString(),
        endpoints: {
            chat: '/api/chat',
            cropSuggestions: '/api/crop-suggestions'
        }
    });
});

// Ollama chat endpoint
app.post('/api/chat', async (req, res) => {
    const { prompt, model = 'llama2' } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Try to connect to Ollama
        const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
            model: model,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.7,
                top_p: 0.9
            }
        }, {
            timeout: 30000 // 30 second timeout
        });

        res.json({
            success: true,
            response: ollamaResponse.data.response,
            model: model,
            source: 'ollama'
        });

    } catch (error) {
        console.error('Ollama Error:', error.message);
        
        // Fallback to rule-based response
        const fallbackResponse = generateFallbackResponse(prompt);
        
        res.json({
            success: true,
            response: fallbackResponse,
            model: 'fallback',
            source: 'knowledge-base',
            note: 'Ollama unavailable, using built-in agricultural knowledge'
        });
    }
});

// Crop suggestions endpoint
app.post('/api/crop-suggestions', async (req, res) => {
    const { location, soilType, season, weather, temperature } = req.body;

    const agriculturalPrompt = `You are an expert agricultural advisor for Indian farmers. Based on the following information, suggest 3-5 suitable crops with detailed reasoning:

Location: ${location}
Soil Type: ${soilType}
Current Season: ${season}
Weather Conditions: ${weather}
Temperature: ${temperature}°C

For each crop, provide:
1. Crop name
2. Why it's suitable for these conditions
3. Expected yield (tonnes/hectare)
4. Approximate market price (₹/kg)
5. Risk level (Low/Medium/High)
6. Growing duration (days)
7. Key farming tips

Format your response clearly with proper sections for each crop.`;

    try {
        const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama2',
            prompt: agriculturalPrompt,
            stream: false
        }, {
            timeout: 45000
        });

        res.json({
            success: true,
            suggestions: ollamaResponse.data.response,
            source: 'ollama',
            requestData: { location, soilType, season, weather, temperature }
        });

    } catch (error) {
        console.error('Crop Suggestion Error:', error.message);
        
        // Fallback crop suggestions
        const fallbackSuggestions = generateFallbackCropSuggestions(season, soilType, location);
        
        res.json({
            success: true,
            suggestions: fallbackSuggestions,
            source: 'fallback',
            requestData: { location, soilType, season, weather, temperature }
        });
    }
});

// Fallback response generator
function generateFallbackResponse(prompt) {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('rice') || promptLower.includes('धान')) {
        return `🌾 Rice Cultivation Information:

Rice is one of India's most important crops. Here's what you need to know:

**Best Season**: Kharif (June-October) and Rabi (depending on irrigation)
**Soil Requirements**: Clay or clay-loam soil with good water retention
**Water Needs**: High - requires 1200-1800mm rainfall or irrigation
**Temperature**: 20-35°C is optimal

**Recommended Varieties for India**:
- IR-36 (high yield, 120-130 days)
- Swarna (popular in South India, 135-140 days)
- Pusa Basmati (aromatic, premium price)

**Expected Yield**: 4-6 tonnes per hectare with good management
**Market Price**: ₹20-25 per kg (varies by quality)

**Key Tips**:
- Ensure proper water management
- Apply fertilizers in split doses
- Watch for blast disease and stem borers
- Harvest when 80% grains turn golden`;
    }
    
    if (promptLower.includes('wheat') || promptLower.includes('गेहूं')) {
        return `🌾 Wheat Cultivation Guide:

Wheat is the second most important cereal crop in India.

**Best Season**: Rabi (November-March)
**Soil Requirements**: Well-drained loamy soil
**Water Needs**: Moderate - 300-500mm
**Temperature**: 15-25°C optimal

**Recommended Varieties**:
- HD-2967 (high yielding)
- PBW-343 (Punjab region)
- Lok-1 (drought resistant)

**Expected Yield**: 3-5 tonnes per hectare
**Market Price**: ₹22-28 per kg (MSP: ₹2,125/quintal)

**Farming Tips**:
- Sow in November for best results
- Use seed treatment before sowing
- Apply balanced NPK fertilizers
- Watch for rust disease`;
    }
    
    if (promptLower.includes('fertilizer') || promptLower.includes('खाद')) {
        return `🧪 Fertilizer Recommendations:

Proper fertilization is crucial for good yields. Here's a comprehensive guide:

**Primary Nutrients**:
1. **Nitrogen (N)** - Leaf growth
   - Sources: Urea (46% N), Ammonium Sulphate
   - Apply in split doses

2. **Phosphorus (P)** - Root development
   - Sources: DAP (18-46-0), SSP
   - Apply at sowing time

3. **Potassium (K)** - Disease resistance
   - Sources: MOP, SOP
   - Apply before flowering

**Application Guidelines**:
- Get soil tested every 2-3 years
- Apply organic manure (5-10 tonnes/ha)
- Use balanced NPK based on crop needs
- Apply at the right growth stages

**Government Subsidies Available**:
- 50% subsidy on DAP
- Neem-coated urea promotion
- Soil Health Card scheme

For personalized recommendations, get your soil tested at the nearest agricultural laboratory.`;
    }
    
    // Generic agricultural advice
    return `Thank you for your query about "${prompt}".

As an agricultural advisor, I recommend:

1. **Consult Local Experts**: Visit your nearest Krishi Vigyan Kendra (KVK) for location-specific advice
2. **Soil Testing**: Get your soil tested to understand nutrient levels
3. **Weather Monitoring**: Check weather forecasts regularly for farming decisions
4. **Government Schemes**: Explore PM-KISAN, Soil Health Card, and crop insurance schemes

**Agricultural Helplines**:
- Kisan Call Centre: 1800-180-1551
- Local KVK for training and demonstrations

For specific crop guidance, pest management, or market information, please ask detailed questions and I'll provide comprehensive answers.

What specific aspect of farming would you like to know more about?`;
}

// Fallback crop suggestions
function generateFallbackCropSuggestions(season, soilType, location) {
    const seasonLower = season.toLowerCase();
    
    if (seasonLower.includes('rabi') || seasonLower.includes('winter')) {
        return `🌾 RECOMMENDED CROPS FOR RABI SEASON

Based on your location and soil type, here are the best crops:

**1. WHEAT** ⭐⭐⭐⭐⭐
- **Suitability**: Excellent for ${soilType} soil
- **Expected Yield**: 4-5 tonnes/hectare
- **Market Price**: ₹25-28/kg
- **Risk Level**: LOW
- **Duration**: 110-130 days
- **Tips**: Sow in November, requires 4-5 irrigations

**2. MUSTARD** ⭐⭐⭐⭐
- **Suitability**: Very good for winter
- **Expected Yield**: 1.5-2 tonnes/hectare
- **Market Price**: ₹50-55/kg
- **Risk Level**: LOW
- **Duration**: 90-120 days
- **Tips**: Drought resistant, low water requirement

**3. CHICKPEA (GRAM)** ⭐⭐⭐⭐
- **Suitability**: Good for ${soilType} soil
- **Expected Yield**: 2-2.5 tonnes/hectare
- **Market Price**: ₹45-50/kg
- **Risk Level**: MEDIUM
- **Duration**: 100-120 days
- **Tips**: Nitrogen-fixing legume, improves soil health

**4. POTATO** ⭐⭐⭐
- **Suitability**: Requires good drainage
- **Expected Yield**: 20-25 tonnes/hectare
- **Market Price**: ₹15-20/kg
- **Risk Level**: MEDIUM
- **Duration**: 90-110 days
- **Tips**: High input cost, good market demand

**Government Support**:
- MSP for wheat: ₹2,125/quintal
- Crop insurance available
- Subsidized fertilizers

**Next Steps**:
1. Get soil tested for precise fertilizer recommendations
2. Check local market prices before deciding
3. Consider crop rotation for soil health
4. Ensure water availability for chosen crop`;
    }
    
    // Default kharif suggestions
    return `🌾 RECOMMENDED CROPS FOR KHARIF SEASON

Based on monsoon season and ${soilType} soil:

**1. RICE** ⭐⭐⭐⭐⭐
- **Expected Yield**: 4-6 tonnes/hectare
- **Market Price**: ₹22-25/kg
- **Risk Level**: LOW
- **Duration**: 120-150 days

**2. COTTON** ⭐⭐⭐⭐
- **Expected Yield**: 15-20 quintals/hectare
- **Market Price**: ₹60-65/kg
- **Risk Level**: MEDIUM
- **Duration**: 160-200 days

**3. MAIZE** ⭐⭐⭐⭐
- **Expected Yield**: 3-4 tonnes/hectare
- **Market Price**: ₹18-22/kg
- **Risk Level**: LOW
- **Duration**: 90-110 days

Consult local agricultural officers for location-specific advice.`;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ AgriSmart Backend Server running on port ${PORT}`);
    console.log(`📡 Endpoints available:`);
    console.log(`   - GET  /`);
    console.log(`   - POST /api/chat`);
    console.log(`   - POST /api/crop-suggestions`);
});
