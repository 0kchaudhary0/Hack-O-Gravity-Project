// Ollama Configuration
const ollamaConfig = {
    endpoint: 'http://localhost:11434/api/generate',
    defaultModel: 'llama2',
    availableModels: ['llama2', 'mistral', 'codellama', 'neural-chat'],
    temperature: 0.7,
    maxTokens: 2000,
    stream: true
};

// Application state
const state = {
    currentSection: 'home',
    theme: 'light',
    language: 'en',
    location: null,
    isVoiceEnabled: false,
    isAccessibilityActive: false,
    chatHistory: [],
    weatherData: null,
    soilData: null,
    settings: {
        readWebpage: false,
        voiceControls: false,
        autoLocation: true,
        weatherNotifications: true
    },
    map: null,
    currentSpeech: null,
    isRecording: false,
    ollamaConnected: false,
    currentWeatherData: null,
    userLocation: null,
    cropSuggestions: [],
    isLoadingCropSuggestions: false
};

// Sample data
const cropData = {
    rice: { yield: 4.0, seasons: ['Kharif', 'Rabi'], states: ['West Bengal', 'Punjab', 'Uttar Pradesh'] },
    wheat: { yield: 3.5, seasons: ['Rabi'], states: ['Uttar Pradesh', 'Punjab', 'Haryana'] },
    cotton: { yield: 0.5, seasons: ['Kharif'], states: ['Gujarat', 'Maharashtra', 'Telangana'] },
    sugarcane: { yield: 80, seasons: ['Annual'], states: ['Uttar Pradesh', 'Maharashtra', 'Karnataka'] },
    maize: { yield: 2.8, seasons: ['Kharif', 'Rabi'], states: ['Karnataka', 'Madhya Pradesh', 'Bihar'] }
};

const soilTypes = {
    alluvial: { ph: '6.0-7.5', fertility: 'High', crops: ['Rice', 'Wheat', 'Sugarcane'] },
    black: { ph: '7.0-8.5', fertility: 'High', crops: ['Cotton', 'Sugarcane', 'Wheat'] },
    red: { ph: '5.5-7.0', fertility: 'Medium', crops: ['Rice', 'Groundnut', 'Cotton'] },
    laterite: { ph: '5.0-6.5', fertility: 'Low', crops: ['Cashew', 'Coconut', 'Tea'] }
};

const weatherData = {
    delhi: { temp: 28, humidity: 65, rainfall: 2, wind: 12, condition: 'Partly Cloudy' },
    mumbai: { temp: 32, humidity: 78, rainfall: 0, wind: 15, condition: 'Sunny' },
    bangalore: { temp: 26, humidity: 58, rainfall: 0, wind: 8, condition: 'Clear' },
    kolkata: { temp: 30, humidity: 72, rainfall: 5, wind: 10, condition: 'Cloudy' }
};

const enhancedFacilities = [
    
    {
        name: 'IARI Soil Testing Laboratory',
        type: 'soil-testing',
        address: 'Indian Agricultural Research Institute, New Delhi - 110012',
        phone: '+91-11-25841516',
        email: 'soiltest.iari@gmail.com',
        services: ['Soil Analysis', 'Water Testing', 'Fertilizer Recommendation', 'Plant Tissue Analysis'],
        coordinates: [28.6139, 77.2090],
        rating: 4.5,
        timings: '9:00 AM - 5:00 PM',
        cost: '₹200-500 per sample',
        city: 'Delhi'
    },
    {
        name: 'Delhi Agricultural Marketing Board',
        type: 'markets',
        address: 'Azadpur Mandi, Delhi - 110033',
        phone: '+91-11-27676767',
        services: ['Wholesale Trading', 'Price Information', 'Storage Facilities'],
        coordinates: [28.7041, 77.1025],
        rating: 4.0,
        timings: '4:00 AM - 12:00 PM',
        city: 'Delhi'
    },
    {
        name: 'Krishi Vigyan Kendra - Delhi',
        type: 'extension',
        address: 'Division of Agricultural Extension, IARI, New Delhi',
        phone: '+91-11-25843548',
        services: ['Farmer Training', 'Technology Demonstration', 'Input Supply'],
        coordinates: [28.6129, 77.2085],
        rating: 4.3,
        timings: '9:30 AM - 5:30 PM',
        city: 'Delhi'
    },
    
    {
        name: 'Maharashtra State Soil Testing Laboratory',
        type: 'soil-testing',
        address: 'Dr. Panjabrao Deshmukh Krishi Vidyapeeth, Akola Road, Amravati',
        phone: '+91-721-2661129',
        services: ['Comprehensive Soil Analysis', 'Micronutrient Testing', 'Soil Health Card'],
        coordinates: [20.9374, 77.7796],
        rating: 4.4,
        timings: '10:00 AM - 5:00 PM',
        cost: '₹150-400 per sample',
        city: 'Mumbai'
    },
    {
        name: 'Vashi APMC Market',
        type: 'markets',
        address: 'APMC Market, Sector 19, Vashi, Navi Mumbai',
        phone: '+91-22-27781234',
        services: ['Agricultural Trading', 'Price Discovery', 'Warehousing'],
        coordinates: [19.0728, 72.9991],
        rating: 4.1,
        timings: '6:00 AM - 2:00 PM',
        city: 'Mumbai'
    },
    {
        name: 'Central Institute for Cotton Research',
        type: 'extension',
        address: 'Post Bag No. 2, Shankar Nagar P.O., Nagpur - 440010',
        phone: '+91-712-2275854',
        services: ['Cotton Research', 'Seed Production', 'Technology Transfer'],
        coordinates: [21.1458, 79.0882],
        rating: 4.6,
        timings: '9:00 AM - 5:30 PM',
        city: 'Mumbai'
    },
    
    {
        name: 'University of Agricultural Sciences Soil Lab',
        type: 'soil-testing',
        address: 'Gandhi Krishi Vignana Kendra, Bangalore - 560065',
        phone: '+91-80-23330123',
        services: ['Advanced Soil Testing', 'Research Support', 'Consultation'],
        coordinates: [13.0827, 77.5718],
        rating: 4.7,
        timings: '9:00 AM - 5:00 PM',
        cost: '₹300-600 per sample',
        city: 'Bangalore'
    },
    {
        name: 'KR Market (City Market)',
        type: 'markets',
        address: 'Krishnarajendra Market, Bangalore - 560002',
        phone: '+91-80-22224455',
        services: ['Wholesale Vegetables', 'Flower Trading', 'Spice Trading'],
        coordinates: [12.9716, 77.5946],
        rating: 3.8,
        timings: '4:00 AM - 10:00 AM',
        city: 'Bangalore'
    },
    
    {
        name: 'Tamil Nadu Agricultural University Soil Lab',
        type: 'soil-testing',
        address: 'Lawley Road, Coimbatore - 641003',
        phone: '+91-422-6611200',
        services: ['Soil Testing', 'Water Analysis', 'Leaf Analysis'],
        coordinates: [11.0168, 76.9558],
        rating: 4.5,
        timings: '9:30 AM - 5:00 PM',
        cost: '₹180-450 per sample',
        city: 'Chennai'
    },
    {
        name: 'Koyambedu Wholesale Market',
        type: 'markets',
        address: 'Koyambedu, Chennai - 600107',
        phone: '+91-44-26490000',
        services: ['Fruit & Vegetable Trading', 'Cold Storage', 'Processing'],
        coordinates: [13.0732, 80.1947],
        rating: 4.2,
        timings: '2:00 AM - 10:00 AM',
        city: 'Chennai'
    },
    
    {
        name: 'ICRISAT Soil Laboratory',
        type: 'soil-testing',
        address: 'Patancheru, Hyderabad - 502324',
        phone: '+91-40-30713071',
        services: ['Soil Analysis', 'Research Services', 'Training'],
        coordinates: [17.5081, 78.2740],
        rating: 4.8,
        timings: '9:00 AM - 5:30 PM',
        cost: '₹250-550 per sample',
        city: 'Hyderabad'
    },
    
    {
        name: 'West Bengal Soil Testing Laboratory',
        type: 'soil-testing',
        address: 'Salt Lake, Kolkata - 700091',
        phone: '+91-33-23344567',
        services: ['Soil Health Assessment', 'Fertility Evaluation'],
        coordinates: [22.5726, 88.3639],
        rating: 4.2,
        timings: '10:00 AM - 4:30 PM',
        cost: '₹120-350 per sample',
        city: 'Kolkata'
    }
];

// Comprehensive language translations
const translations = {
    en: {
        welcome: 'Welcome to KrishiMitra',
        subtitle: 'Your AI-Powered Agricultural Companion',
        description: 'Get crop predictions, weather updates, soil analysis, and expert farming advice all in one place.',
        startPrediction: 'Start Prediction',
        askAI: 'Ask AI Assistant',
        home: 'Home',
        cropPrediction: 'Crop Prediction',
        aiAssistant: 'AI Assistant',
        weather: 'Weather',
        soilHealth: 'Soil Health',
        facilities: 'Facilities',
        settings: 'Settings'
    },
    hi: {
        welcome: 'कृषि मित्र में आपका स्वागत है',
        subtitle: 'आपका AI संचालित कृषि साथी',
        description: 'फसल की भविष्यवाणी, मौसम अपडेट, मिट्टी विश्लेषण और विशेषज्ञ कृषि सलाह एक ही स्थान पर प्राप्त करें।',
        startPrediction: 'भविष्यवाणी शुरू करें',
        askAI: 'AI सहायक से पूछें',
        home: 'मुख्य पृष्ठ',
        cropPrediction: 'फसल पूर्वानुमान',
        aiAssistant: 'एआई सहायक',
        weather: 'मौसम',
        soilHealth: 'मिट्टी का स्वास्थ्य',
        facilities: 'सुविधाएं',
        settings: 'सेटिंग्स'
    },
    bn: {
        welcome: 'কৃষি মিত্রায় স্বাগতম',
        subtitle: 'আপনার AI চালিত কৃষি সঙ্গী',
        description: 'ফসলের পূর্বাভাস, আবহাওয়ার আপডেট, মাটি বিশ্লেষণ এবং বিশেষজ্ঞ কৃষি পরামর্শ এক জায়গায় পান।',
        startPrediction: 'পূর্বাভাস শুরু করুন',
        askAI: 'AI সহায়ক জিজ্ঞাসা করুন',
        home: 'হোম',
        cropPrediction: 'ফসল পূর্বাভাস',
        aiAssistant: 'এআই সহায়ক',
        weather: 'আবহাওয়া',
        soilHealth: 'মাটির স্বাস্থ্য',
        facilities: 'সুবিধা',
        settings: 'সেটিংস'
    },
    ta: {
        welcome: 'கிருஷி மித்ராவில் வரவேற்கிறோம்',
        subtitle: 'உங்கள் AI இயங்கும் விவசாய துணைவர்',
        description: 'பயிர் கணிப்புகள், வானிலை புதுப்பிப்புகள், மண் பகுப்பாய்வு மற்றும் நிபுணர் விவசாய ஆலோசனைகளை ஒரே இடத்தில் பெறுங்கள்।',
        startPrediction: 'கணிப்பு தொடங்கு',
        askAI: 'AI உதவியாளரிடம் கேள்',
        home: 'முகப்பு',
        cropPrediction: 'பயிர் கணிப்பு',
        aiAssistant: 'AI உதவியாளர்',
        weather: 'வானிலை',
        soilHealth: 'மண் ஆரோக்கியம்',
        facilities: 'வசதிகள்',
        settings: 'அமைப்புகள்'
    }
};

// Enhanced AI Knowledge Base
const aiKnowledgeBase = {
    crops: {
        rice: {
            seasons: ['Kharif', 'Rabi', 'Summer'],
            states: ['West Bengal', 'Punjab', 'Uttar Pradesh', 'Andhra Pradesh', 'Tamil Nadu'],
            soilTypes: ['Alluvial', 'Clay', 'Loamy'],
            waterRequirement: '1200-1800 mm',
            fertilizers: ['Urea (120 kg/ha)', 'DAP (60 kg/ha)', 'MOP (40 kg/ha)'],
            diseases: ['Blast', 'Brown Spot', 'Stem Borer', 'Leaf Folder'],
            varieties: ['IR-36', 'Pusa Basmati', 'Swarna', 'MTU-1010'],
            yieldPotential: '4-6 tonnes/hectare',
            tips: ['Maintain 2-5 cm water level', 'Apply neem cake for pest control', 'Harvest at 14% moisture']
        },
        wheat: {
            seasons: ['Rabi'],
            states: ['Uttar Pradesh', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Rajasthan'],
            soilTypes: ['Alluvial', 'Black', 'Sandy Loam'],
            waterRequirement: '300-500 mm',
            fertilizers: ['Urea (130 kg/ha)', 'DAP (100 kg/ha)', 'MOP (50 kg/ha)'],
            diseases: ['Rust', 'Smut', 'Aphids', 'Termites'],
            varieties: ['HD-2967', 'PBW-343', 'WH-147', 'Raj-4037'],
            yieldPotential: '3-5 tonnes/hectare',
            tips: ['Sow by November end', 'Apply irrigation at crown root stage', 'Use disease-resistant varieties']
        },
        cotton: {
            seasons: ['Kharif'],
            states: ['Gujarat', 'Maharashtra', 'Telangana', 'Karnataka'],
            soilTypes: ['Black', 'Alluvial'],
            waterRequirement: '700-1200 mm',
            fertilizers: ['Urea (150 kg/ha)', 'DAP (125 kg/ha)', 'MOP (62.5 kg/ha)'],
            diseases: ['Bollworm', 'Whitefly', 'Aphids', 'Fusarium Wilt'],
            varieties: ['Bt Cotton', 'Suraj', 'Bunny', 'RCH-2'],
            yieldPotential: '0.5-1.5 tonnes/hectare',
            tips: ['Deep ploughing before sowing', 'Install pheromone traps', 'Maintain plant spacing']
        }
    },
    diseases: {
        blast: {
            crops: ['Rice'],
            symptoms: 'Diamond-shaped lesions with gray centers and brown margins',
            causes: 'Magnaporthe oryzae fungus, high humidity, nitrogen excess',
            treatment: ['Tricyclazole 75% WP @ 0.6g/L', 'Carbendazim 50% WP @ 1g/L'],
            prevention: 'Resistant varieties, balanced fertilization, proper drainage'
        },
        rust: {
            crops: ['Wheat', 'Barley'],
            symptoms: 'Orange-red pustules on leaves and stems',
            causes: 'Puccinia species fungi, cool humid weather',
            treatment: ['Propiconazole 25% EC @ 1ml/L', 'Tebuconazole 50% + Trifloxystrobin 25% WG'],
            prevention: 'Early sowing, resistant varieties, fungicide sprays'
        }
    },
    fertilizers: {
        nitrogen: {
            sources: ['Urea', 'Ammonium Sulfate', 'CAN'],
            application: 'Split application - 1/3 at sowing, 1/3 at tillering, 1/3 at panicle initiation',
            deficiency: 'Yellowing of older leaves, stunted growth'
        },
        phosphorus: {
            sources: ['DAP', 'SSP', 'NPK'],
            application: 'Full dose at sowing or transplanting',
            deficiency: 'Purple discoloration, delayed maturity'
        }
    },
    organicFarming: {
        practices: ['Crop rotation', 'Cover cropping', 'Composting', 'Integrated pest management'],
        benefits: ['Soil health improvement', 'Reduced chemical dependency', 'Higher profitability', 'Environmental safety'],
        inputs: ['Vermicompost', 'Neem cake', 'Bone meal', 'Green manure']
    }
};

// DOM elements
const elements = {
    sections: document.querySelectorAll('.section'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('themeToggle'),
    languageSelect: document.getElementById('languageSelect'),
    voiceToggle: document.getElementById('voiceToggle'),
    accessibilityToggle: document.getElementById('accessibilityToggle'),
    accessibilityPanel: document.getElementById('accessibilityPanel')
};

// Initialize application
function init() {
    setupEventListeners();
    detectLocation();
    updateWeatherDisplay();
    initializeAccessibility();
    checkOllamaConnection();
    showSection('home');
}

// Event listeners
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            showSection(section);
        });
    });

    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);

    // Language selector
    elements.languageSelect.addEventListener('change', changeLanguage);

    // Voice toggle
    elements.voiceToggle.addEventListener('click', toggleVoice);

    // Accessibility panel
    elements.accessibilityToggle.addEventListener('click', toggleAccessibilityPanel);

    // Settings modal
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    
    if (settingsToggle) {
        settingsToggle.addEventListener('click', openSettingsModal);
    }
    
    if (closeSettings) {
        closeSettings.addEventListener('click', closeSettingsModal);
    }
    
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) closeSettingsModal();
        });
    }

    // Settings controls
    setupSettingsControls();

    // Prediction form
    const predictionForm = document.getElementById('predictionForm');
    if (predictionForm) {
        predictionForm.addEventListener('submit', handlePredictionSubmit);
    }

    // Chat functionality
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatInput = document.getElementById('chatInput');
    const voiceInputBtn = document.getElementById('voiceInputBtn');
    const getCropSuggestionsBtn = document.getElementById('getCropSuggestionsBtn');
    const ollamaModelSelect = document.getElementById('ollamaModelSelect');

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', startVoiceInput);
    }

    if (getCropSuggestionsBtn) {
        getCropSuggestionsBtn.addEventListener('click', startCropSuggestionAnalysis);
    }

    if (ollamaModelSelect) {
        ollamaModelSelect.addEventListener('change', (e) => {
            ollamaConfig.defaultModel = e.target.value;
            announceToScreenReader(`Ollama model changed to ${e.target.value}`);
        });
    }

    // Location detection
    const detectLocationBtn = document.getElementById('detectLocationBtn');
    if (detectLocationBtn) {
        detectLocationBtn.addEventListener('click', detectLocation);
    }

    // Soil analysis
    const analyzeSoilBtn = document.getElementById('analyzeSoilBtn');
    if (analyzeSoilBtn) {
        analyzeSoilBtn.addEventListener('click', analyzeSoil);
    }

    // Facilities search
    const searchFacilitiesBtn = document.getElementById('searchFacilitiesBtn');
    if (searchFacilitiesBtn) {
        searchFacilitiesBtn.addEventListener('click', searchFacilities);
    }

    // Enhanced facility controls
    const getCurrentLocationBtn = document.getElementById('getCurrentLocationBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    if (getCurrentLocationBtn) {
        getCurrentLocationBtn.addEventListener('click', () => {
            detectLocation();
            centerMapOnLocation();
        });
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFacilityFilters);
    }

    // Accessibility controls
    setupAccessibilityControls();
    
    // Load saved settings
    loadSettings();
    
    // Initialize voice synthesis
    initializeVoiceSynthesis();
}

// Section management
function showSection(sectionName) {
    // Hide all sections
    elements.sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('animate-fade-in');
    }

    // Update navigation
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionName) {
            link.classList.add('active');
        }
    });

    state.currentSection = sectionName;

    // Initialize section-specific features
    switch (sectionName) {
        case 'weather':
            updateWeatherDisplay();
            generateWeatherForecast();
            break;
        case 'facilities':
            setTimeout(() => initializeInteractiveFacilitiesMap(), 100);
            break;
        case 'prediction':
            // Initialize prediction charts if needed
            break;
    }
}

// Theme management
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    
    const icon = elements.themeToggle.querySelector('i');
    icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    // Announce theme change for accessibility
    announceToScreenReader(`Switched to ${state.theme} theme`);
}

// Language management
function changeLanguage() {
    state.language = elements.languageSelect.value;
    updateLanguageDisplay();
    announceToScreenReader(`Language changed to ${elements.languageSelect.selectedOptions[0].text}`);
}

function updateLanguageDisplay() {
    const texts = translations[state.language] || translations.en;
    
    // Update text content for translated elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });
    
    // Update page direction for RTL languages
    const rtlLanguages = ['ar', 'he', 'ur'];
    if (rtlLanguages.includes(state.language)) {
        document.body.classList.add('rtl');
        document.dir = 'rtl';
    } else {
        document.body.classList.remove('rtl');
        document.dir = 'ltr';
    }
    
    // Update language indicator
    updateLanguageIndicator();
}

function updateLanguageIndicator() {
    let indicator = document.querySelector('.language-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'language-indicator';
        document.body.appendChild(indicator);
    }
    
    const languageNames = {
        'en': 'English',
        'hi': 'हिंदी',
        'bn': 'বাংলা',
        'ta': 'தமிழ்',
        'te': 'తెలుగు',
        'mr': 'मराठी',
        'gu': 'ગુજરાતી',
        'kn': 'ಕನ್ನಡ'
    };
    
    indicator.textContent = languageNames[state.language] || 'English';
    
    // Auto-hide after 3 seconds
    indicator.style.opacity = '1';
    setTimeout(() => {
        indicator.style.opacity = '0.3';
    }, 3000);
}

// Voice functionality
function toggleVoice() {
    state.isVoiceEnabled = !state.isVoiceEnabled;
    elements.voiceToggle.classList.toggle('active', state.isVoiceEnabled);
    
    if (state.isVoiceEnabled) {
        announceToScreenReader('Voice assistance enabled');
    } else {
        announceToScreenReader('Voice assistance disabled');
    }
}

function startVoiceInput() {
    if (!state.isVoiceEnabled) {
        toggleVoice();
    }
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        // Configure recognition
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = getRecognitionLanguage();
        
        const voiceBtn = document.getElementById('voiceInputBtn') || document.getElementById('voiceInputBtn2');
        
        if (voiceBtn) {
            voiceBtn.classList.add('voice-recording');
            voiceBtn.innerHTML = '<i class="fas fa-circle" style="color: red;"></i>';
        }
        
        state.isRecording = true;
        announceToScreenReader('Voice recording started. Speak now.');
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = transcript;
                announceToScreenReader(`Voice input received: ${transcript}`);
            }
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            announceToScreenReader('Voice recognition error. Please try again.');
        };
        
        recognition.onend = () => {
            state.isRecording = false;
            if (voiceBtn) {
                voiceBtn.classList.remove('voice-recording');
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            }
            announceToScreenReader('Voice recording stopped');
        };
        
        recognition.start();
        
        // Auto-stop after 10 seconds
        setTimeout(() => {
            if (state.isRecording) {
                recognition.stop();
            }
        }, 10000);
        
    } else {
        // Fallback for browsers without speech recognition
        simulateVoiceInput();
    }
}

function simulateVoiceInput() {
    const voiceBtn = document.getElementById('voiceInputBtn') || document.getElementById('voiceInputBtn2');
    if (voiceBtn) {
        voiceBtn.innerHTML = '<i class="fas fa-circle" style="color: red;"></i>';
    }
    
    const sampleQueries = [
        'What is the best fertilizer for rice cultivation?',
        'How to control pests in wheat crop?',
        'When should I harvest my cotton crop?',
        'What are the symptoms of blast disease in rice?',
        'How to improve soil health organically?'
    ];
    
    setTimeout(() => {
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        }
        const chatInput = document.getElementById('chatInput');
        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
        if (chatInput) {
            chatInput.value = randomQuery;
        }
        announceToScreenReader(`Voice input simulated: ${randomQuery}`);
    }, 2000);
}

function getRecognitionLanguage() {
    const langMap = {
        'hi': 'hi-IN',
        'bn': 'bn-IN', 
        'ta': 'ta-IN',
        'te': 'te-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN',
        'kn': 'kn-IN',
        'en': 'en-IN'
    };
    return langMap[state.language] || 'en-IN';
}

// Location services
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                state.location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                updateLocationDisplay();
                fetchLocationWeather();
            },
            (error) => {
                console.warn('Location detection failed:', error);
                // Use default location (Delhi)
                state.location = { lat: 28.6139, lng: 77.2090 };
                updateLocationDisplay('Delhi, India');
                fetchLocationWeather();
            }
        );
    } else {
        // Fallback to default location
        state.location = { lat: 28.6139, lng: 77.2090 };
        updateLocationDisplay('Delhi, India');
        fetchLocationWeather();
    }
}

function updateLocationDisplay(locationName = 'Current Location') {
    const locationElements = document.querySelectorAll('#currentLocation, #weatherLocation');
    locationElements.forEach(element => {
        if (element) element.textContent = locationName;
    });
}

function fetchLocationWeather() {
    // Simulate weather API call
    const cities = ['delhi', 'mumbai', 'bangalore', 'kolkata'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    state.weatherData = weatherData[randomCity];
    updateWeatherDisplay();
}

// Weather functionality
function updateWeatherDisplay() {
    if (!state.weatherData) {
        state.weatherData = weatherData.delhi; // Default
    }

    const weather = state.weatherData;
    
    // Update current weather elements
    const tempElements = document.querySelectorAll('#currentTemp, #weatherTemp');
    tempElements.forEach(el => el.textContent = `${weather.temp}°C`);
    
    const conditionElements = document.querySelectorAll('#currentCondition, #weatherCondition');
    conditionElements.forEach(el => el.textContent = weather.condition);
    
    const humidityEl = document.getElementById('weatherHumidity');
    if (humidityEl) humidityEl.textContent = `${weather.humidity}%`;
    
    const windEl = document.getElementById('weatherWind');
    if (windEl) windEl.textContent = `${weather.wind} km/h`;
    
    const rainfallEl = document.getElementById('weatherRainfall');
    if (rainfallEl) rainfallEl.textContent = `${weather.rainfall}mm`;
    
    const visibilityEl = document.getElementById('weatherVisibility');
    if (visibilityEl) visibilityEl.textContent = '10km';

    // Update weather icon
    const iconEl = document.getElementById('weatherIcon');
    if (iconEl) {
        iconEl.className = getWeatherIcon(weather.condition);
    }
}

function getWeatherIcon(condition) {
    const icons = {
        'Sunny': 'fas fa-sun',
        'Partly Cloudy': 'fas fa-cloud-sun',
        'Cloudy': 'fas fa-cloud',
        'Rainy': 'fas fa-cloud-rain',
        'Clear': 'fas fa-sun'
    };
    return icons[condition] || 'fas fa-cloud-sun';
}

function generateWeatherForecast() {
    const forecastContainer = document.getElementById('weatherForecast');
    if (!forecastContainer) return;

    const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'];
    
    forecastContainer.innerHTML = '';
    
    days.forEach((day, index) => {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const temp = 25 + Math.floor(Math.random() * 10);
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${day}</div>
            <i class="${getWeatherIcon(condition)}"></i>
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-condition">${condition}</div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });

    // Generate weather alerts
    generateWeatherAlerts();
}

function generateWeatherAlerts() {
    const alertsContainer = document.getElementById('weatherAlerts');
    if (!alertsContainer) return;

    const alerts = [
        {
            type: 'warning',
            message: 'Heavy rainfall expected in the next 48 hours. Plan indoor farming activities.'
        },
        {
            type: 'info',
            message: 'Optimal weather conditions for sowing wheat crops this week.'
        }
    ];

    alertsContainer.innerHTML = '';
    
    alerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item alert-${alert.type === 'warning' ? 'warning' : 'info'}`;
        alertElement.innerHTML = `
            <i class="fas fa-${alert.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${alert.message}</span>
        `;
        alertsContainer.appendChild(alertElement);
    });
}

// Crop prediction functionality
function handlePredictionSubmit(e) {
    e.preventDefault();
    
    const formData = {
        crop: document.getElementById('cropSelect').value,
        season: document.getElementById('seasonSelect').value,
        soil: document.getElementById('soilSelect').value,
        area: parseFloat(document.getElementById('areaInput').value),
        rainfall: parseFloat(document.getElementById('rainfallInput').value),
        temperature: parseFloat(document.getElementById('temperatureInput').value)
    };

    if (!formData.crop || !formData.season || !formData.soil || !formData.area) {
        alert('Please fill in all required fields');
        return;
    }

    generatePrediction(formData);
}

function generatePrediction(data) {
    const resultsContainer = document.getElementById('predictionResults');
    if (!resultsContainer) return;

    // Simulate AI prediction
    const baseCrop = cropData[data.crop];
    if (!baseCrop) return;

    // Calculate yield with various factors
    let predictedYield = baseCrop.yield;
    
    // Adjust for soil type
    const soilFactor = getSoilFactor(data.soil, data.crop);
    predictedYield *= soilFactor;
    
    // Adjust for weather conditions
    const weatherFactor = getWeatherFactor(data.rainfall, data.temperature, data.crop);
    predictedYield *= weatherFactor;
    
    // Calculate total production
    const totalProduction = predictedYield * data.area;
    
    // Generate recommendations
    const recommendations = generateRecommendations(data);
    const alternatives = getAlternativeCrops(data.soil, data.season);

    // Display results
    displayPredictionResults({
        crop: data.crop,
        yieldPerHectare: predictedYield.toFixed(2),
        totalProduction: totalProduction.toFixed(2),
        recommendations,
        alternatives
    });

    resultsContainer.style.display = 'block';
    resultsContainer.classList.add('animate-slide-up');
}

function getSoilFactor(soilType, crop) {
    const soilData = soilTypes[soilType];
    if (!soilData) return 1.0;
    
    // Check if crop is suitable for soil
    const isSuitable = soilData.crops.some(c => c.toLowerCase() === crop.toLowerCase());
    return isSuitable ? 1.1 : 0.9;
}

function getWeatherFactor(rainfall, temperature, crop) {
    let factor = 1.0;
    
    // Temperature factor
    if (crop === 'rice' && temperature >= 20 && temperature <= 35) {
        factor *= 1.1;
    } else if (crop === 'wheat' && temperature >= 15 && temperature <= 25) {
        factor *= 1.1;
    }
    
    // Rainfall factor
    if (crop === 'rice' && rainfall >= 100) {
        factor *= 1.1;
    } else if (crop === 'wheat' && rainfall >= 50 && rainfall <= 100) {
        factor *= 1.1;
    }
    
    return factor;
}

function generateRecommendations(data) {
    const recommendations = [];
    
    if (data.soil === 'red' && data.crop === 'rice') {
        recommendations.push('Consider using organic fertilizers to improve soil fertility');
        recommendations.push('Implement drip irrigation for water conservation');
    }
    
    if (data.temperature > 35) {
        recommendations.push('Use shade nets during extreme heat periods');
    }
    
    if (data.rainfall < 50) {
        recommendations.push('Plan for supplementary irrigation');
    }
    
    recommendations.push('Regular soil testing recommended for optimal nutrient management');
    
    return recommendations;
}

function getAlternativeCrops(soilType, season) {
    const alternatives = [];
    
    if (soilType === 'alluvial' && season === 'kharif') {
        alternatives.push({ name: 'Sugarcane', yield: '80 tonnes/ha', reason: 'High water availability suits sugarcane cultivation' });
        alternatives.push({ name: 'Maize', yield: '2.8 tonnes/ha', reason: 'Good adaptability to alluvial soil' });
    }
    
    if (soilType === 'black' && season === 'kharif') {
        alternatives.push({ name: 'Cotton', yield: '0.5 tonnes/ha', reason: 'Black soil ideal for cotton cultivation' });
        alternatives.push({ name: 'Soybean', yield: '1.2 tonnes/ha', reason: 'Suitable for monsoon cultivation' });
    }
    
    return alternatives;
}

function displayPredictionResults(results) {
    const yieldEl = document.getElementById('yieldPrediction');
    const alternativesEl = document.getElementById('alternativeCrops');
    const recommendationsEl = document.getElementById('recommendations');
    
    if (yieldEl) {
        yieldEl.innerHTML = `
            <h4>Predicted Yield</h4>
            <div class="yield-number">${results.yieldPerHectare} tonnes/hectare</div>
            <div class="total-production">Total Production: ${results.totalProduction} tonnes</div>
        `;
    }
    
    if (alternativesEl) {
        alternativesEl.innerHTML = `
            <h4>Alternative Crops</h4>
            <div class="alternatives-list">
                ${results.alternatives.map(alt => `
                    <div class="alternative-item">
                        <strong>${alt.name}</strong> (${alt.yield})<br>
                        <small>${alt.reason}</small>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    if (recommendationsEl) {
        recommendationsEl.innerHTML = `
            <h4>Recommendations</h4>
            <ul class="recommendations-list">
                ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
    }

    // Generate yield chart
    generateYieldChart(results);
}

function generateYieldChart(results) {
    const canvas = document.getElementById('yieldChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Predicted Yield', 'Average Yield', 'Optimal Yield'],
            datasets: [{
                label: 'Yield (tonnes/hectare)',
                data: [results.yieldPerHectare, results.yieldPerHectare * 0.8, results.yieldPerHectare * 1.2],
                backgroundColor: ['#2E8B57', '#FF6B35', '#3498DB'],
                borderColor: ['#25724A', '#E55B2B', '#2980B9'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Yield Comparison'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tonnes per Hectare'
                    }
                }
            }
        }
    });
}

// Chat functionality with Ollama integration
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addMessageToChat(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Try Ollama first, fallback to local AI
    if (state.ollamaConnected) {
        sendToOllama(message);
    } else {
        // Fallback to existing knowledge base
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateAIResponse(message);
            addMessageToChat(response + ' (Using local knowledge base)', 'bot');
        }, 1000);
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '<i class="fas fa-seedling"></i>' : '<i class="fas fa-user"></i>';
    
    messageElement.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to chat history
    state.chatHistory.push({ message, sender, timestamp: new Date() });
    
    // Read message aloud if voice is enabled
    if (state.isVoiceEnabled && sender === 'bot') {
        speakText(message);
    }
}

function generateAIResponse(userMessage) {
    // Use enhanced AI response system
    return generateEnhancedAIResponse(userMessage);
}

// Legacy function maintained for compatibility
function generateAIResponseLegacy(userMessage) {
    const message = userMessage.toLowerCase();
    const currentMonth = new Date().getMonth() + 1;
    const currentSeason = getCurrentSeason();
    
    // Enhanced AI responses with contextual information
    if (message.includes('fertilizer') || message.includes('nutrient')) {
        const crop = detectCropInMessage(message);
        if (crop && aiKnowledgeBase.crops[crop]) {
            const cropData = aiKnowledgeBase.crops[crop];
            return `For ${crop} cultivation, I recommend: ${cropData.fertilizers.join(', ')}. ${cropData.tips[0]} Current season (${currentSeason}) is ${cropData.seasons.includes(currentSeason) ? 'suitable' : 'not optimal'} for ${crop}. Always conduct soil testing for precise nutrient management.`;
        }
        return 'For optimal crop growth, use balanced NPK fertilizers. Soil testing will provide specific nutrient requirements. Consider organic options like vermicompost and neem cake for sustainable farming.';
    }
    
    if (message.includes('pest') || message.includes('insect') || message.includes('disease')) {
        const crop = detectCropInMessage(message);
        if (crop && aiKnowledgeBase.crops[crop]) {
            const cropData = aiKnowledgeBase.crops[crop];
            return `Common ${crop} diseases include: ${cropData.diseases.join(', ')}. Use Integrated Pest Management (IPM): install pheromone traps, apply neem-based pesticides, maintain field hygiene. Monitor regularly and treat only when necessary. ${cropData.tips[1] || 'Use resistant varieties when available.'}`;
        }
        return 'Practice IPM: combine biological, cultural, and chemical methods. Use beneficial insects, neem oil, crop rotation. Monitor pest levels and apply targeted treatments only when economic threshold is reached.';
    }
    
    if (message.includes('harvest') || message.includes('maturity')) {
        const crop = detectCropInMessage(message);
        if (crop === 'wheat') {
            return 'Harvest wheat at 14-16% moisture content. Look for golden color and listen for dry sound when shaken. Typical harvest: 110-130 days after sowing. Best time: early morning to reduce shattering.';
        } else if (crop === 'rice') {
            return 'Harvest rice when 80% of grains turn golden yellow. Panicles should bend down. Harvest at 20-25% moisture for better milling quality. Takes 110-140 days depending on variety.';
        }
        return 'Harvest timing varies by crop. Look for visual indicators: color change, moisture content, days to maturity. Harvest during optimal weather conditions to maintain quality.';
    }
    
    if (message.includes('organic') || message.includes('natural')) {
        return `Organic farming practices: ${aiKnowledgeBase.organicFarming.practices.join(', ')}. Use inputs like ${aiKnowledgeBase.organicFarming.inputs.join(', ')}. Benefits include ${aiKnowledgeBase.organicFarming.benefits.slice(0,2).join(' and ')}. Start with soil health improvement through composting.`;
    }
    
    if (message.includes('weather') || message.includes('rain') || message.includes('monsoon')) {
        return `Weather monitoring is crucial for farming. Current season (${currentSeason}) requires specific attention. Check daily forecasts for rainfall, temperature, humidity. Plan irrigation, sowing, and harvesting accordingly. Use weather-based advisories for timely operations.`;
    }
    
    if (message.includes('soil') || message.includes('testing')) {
        return 'Soil testing every 2-3 years is essential. Test pH, organic carbon, NPK, and micronutrients. Collect samples from multiple field points. Based on results, apply lime for pH correction, organic matter for fertility, and balanced fertilizers.';
    }
    
    if (message.includes('season') || message.includes('sowing') || message.includes('planting')) {
        return `Current season is ${currentSeason}. Suitable crops for this season: ${getSeasonalCrops(currentSeason).join(', ')}. Plan sowing based on monsoon arrival, soil preparation, and seed availability. Consider climate-resilient varieties.`;
    }
    
    if (message.includes('price') || message.includes('market') || message.includes('sell')) {
        return 'Check daily market prices through mandi rates, government apps, or local agricultural offices. Consider storage options if prices are low. Direct marketing, farmer producer organizations (FPOs) can help get better prices.';
    }
    
    if (message.includes('water') || message.includes('irrigation')) {
        return 'Efficient water management: use drip irrigation, mulching, and water-saving techniques. Monitor soil moisture, apply irrigation at critical growth stages. Rainwater harvesting and crop diversification help manage water stress.';
    }
    
    if (message.includes('government') || message.includes('scheme') || message.includes('subsidy')) {
        return 'Government schemes available: PM-KISAN income support, Soil Health Card, Pradhan Mantri Fasal Bima Yojana (crop insurance), KCC (credit), organic farming promotion. Visit nearest Krishi Vigyan Kendra for details.';
    }
    
    // Hindi language support
    if (message.includes('खाद') || message.includes('उर्वरक')) {
        return 'फसल के लिए संतुलित NPK उर्वरक का उपयोग करें। मिट्टी की जांच कराकर सही मात्रा का निर्धारण करें। जैविक खाद जैसे वर्मी कंपोस्ट, नीम की खली का भी प्रयोग करें।';
    }
    
    // This legacy function is now replaced by generateEnhancedAIResponse
    return generateEnhancedAIResponse(userMessage);
}

function askQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        sendChatMessage();
    }
}

// Soil analysis functionality
function analyzeSoil() {
    const state = document.getElementById('stateSelect').value;
    const district = document.getElementById('districtInput').value;
    
    if (!state || !district) {
        alert('Please select state and enter district name');
        return;
    }
    
    // Simulate soil analysis
    const soilData = generateSoilData(state, district);
    displaySoilResults(soilData);
    
    const resultsContainer = document.getElementById('soilResults');
    resultsContainer.style.display = 'block';
    resultsContainer.classList.add('animate-slide-up');
}

function generateSoilData(state, district) {
    // Simulate soil data based on region
    const soilProfiles = {
        'punjab': { type: 'Alluvial', ph: 7.2, organic: 0.6, nitrogen: 'Medium', phosphorus: 'High', potassium: 'Medium' },
        'maharashtra': { type: 'Black', ph: 8.1, organic: 0.4, nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
        'karnataka': { type: 'Red', ph: 6.5, organic: 0.5, nitrogen: 'Medium', phosphorus: 'Low', potassium: 'Medium' },
        'delhi': { type: 'Alluvial', ph: 7.8, organic: 0.3, nitrogen: 'Low', phosphorus: 'Medium', potassium: 'Medium' }
    };
    
    return soilProfiles[state] || soilProfiles['delhi'];
}

function displaySoilResults(soilData) {
    const profileEl = document.getElementById('soilProfileData');
    const nitrogenEl = document.getElementById('nitrogenLevel');
    const phosphorusEl = document.getElementById('phosphorusLevel');
    const potassiumEl = document.getElementById('potassiumLevel');
    const fertilizerEl = document.getElementById('fertilizerRecs');
    
    if (profileEl) {
        profileEl.innerHTML = `
            <div class="soil-property">
                <strong>Soil Type:</strong> ${soilData.type} Soil
            </div>
            <div class="soil-property">
                <strong>pH Level:</strong> ${soilData.ph} (${getPHCategory(soilData.ph)})
            </div>
            <div class="soil-property">
                <strong>Organic Carbon:</strong> ${soilData.organic}% (${getOrganicCategory(soilData.organic)})
            </div>
        `;
    }
    
    if (nitrogenEl) nitrogenEl.textContent = soilData.nitrogen;
    if (phosphorusEl) phosphorusEl.textContent = soilData.phosphorus;
    if (potassiumEl) potassiumEl.textContent = soilData.potassium;
    
    // Generate fertilizer recommendations
    const recommendations = generateFertilizerRecommendations(soilData);
    if (fertilizerEl) {
        fertilizerEl.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <h5>${rec.nutrient}</h5>
                <p><strong>Recommendation:</strong> ${rec.amount}</p>
                <p><strong>Source:</strong> ${rec.source}</p>
            </div>
        `).join('');
    }
}

function getPHCategory(ph) {
    if (ph < 6.5) return 'Acidic';
    if (ph > 7.5) return 'Alkaline';
    return 'Neutral';
}

function getOrganicCategory(organic) {
    if (organic < 0.5) return 'Low';
    if (organic > 0.75) return 'High';
    return 'Medium';
}

function generateFertilizerRecommendations(soilData) {
    const recommendations = [];
    
    if (soilData.nitrogen === 'Low') {
        recommendations.push({
            nutrient: 'Nitrogen',
            amount: '120-150 kg/ha',
            source: 'Urea or Ammonium Sulfate'
        });
    }
    
    if (soilData.phosphorus === 'Low') {
        recommendations.push({
            nutrient: 'Phosphorus',
            amount: '80-100 kg/ha',
            source: 'Single Super Phosphate or DAP'
        });
    }
    
    if (soilData.potassium === 'Low') {
        recommendations.push({
            nutrient: 'Potassium',
            amount: '60-80 kg/ha',
            source: 'Muriate of Potash'
        });
    }
    
    if (soilData.organic < 0.5) {
        recommendations.push({
            nutrient: 'Organic Matter',
            amount: '5-8 tonnes/ha',
            source: 'Farmyard Manure or Compost'
        });
    }
    
    return recommendations;
}

// Facilities functionality
function searchFacilities() {
    const location = document.getElementById('facilitySearch').value.toLowerCase();
    const type = document.getElementById('facilityType').value;
    
    let filteredFacilities = enhancedFacilities;
    
    // Filter by location if provided
    if (location) {
        filteredFacilities = filteredFacilities.filter(facility => 
            facility.city.toLowerCase().includes(location) ||
            facility.address.toLowerCase().includes(location) ||
            facility.name.toLowerCase().includes(location)
        );
    }
    
    // Filter by type
    if (type && type !== 'all') {
        filteredFacilities = filteredFacilities.filter(facility => facility.type === type);
    }
    
    if (filteredFacilities.length === 0) {
        alert('No facilities found matching your criteria. Showing all facilities.');
        filteredFacilities = enhancedFacilities;
    }
    
    displayEnhancedFacilities(filteredFacilities);
    
    // Update map if active
    if (state.map) {
        filterFacilities(type || 'all');
    }
    
    announceToScreenReader(`Found ${filteredFacilities.length} facilities`);
}

function displayFacilities(facilitiesList) {
    // Use enhanced facilities display
    displayEnhancedFacilities(facilitiesList.length ? facilitiesList : enhancedFacilities);
}

function initializeFacilitiesMap() {
    // Legacy function - now uses enhanced version
    initializeInteractiveFacilitiesMap();
}

// Accessibility functionality
function initializeAccessibility() {
    // Initialize accessibility features
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices(); // Load voices
    }
}

function setupAccessibilityControls() {
    const textSizeBtn = document.getElementById('textSizeIncrease');
    const contrastBtn = document.getElementById('highContrastToggle');
    const readAloudBtn = document.getElementById('readAloudToggle');
    
    if (textSizeBtn) {
        textSizeBtn.addEventListener('click', () => {
            document.body.classList.toggle('large-text');
            announceToScreenReader('Text size toggled');
        });
    }
    
    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            const currentContrast = document.documentElement.getAttribute('data-contrast');
            const newContrast = currentContrast === 'high' ? 'normal' : 'high';
            document.documentElement.setAttribute('data-contrast', newContrast);
            announceToScreenReader(`High contrast ${newContrast === 'high' ? 'enabled' : 'disabled'}`);
        });
    }
    
    if (readAloudBtn) {
        readAloudBtn.addEventListener('click', () => {
            const isActive = readAloudBtn.classList.contains('active');
            readAloudBtn.classList.toggle('active');
            
            if (!isActive) {
                // Start reading the current section
                const currentSection = document.querySelector('.section.active');
                if (currentSection) {
                    const text = currentSection.textContent;
                    speakText(text.substring(0, 500) + '...'); // Read first 500 chars
                }
            } else {
                // Stop reading
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }
            }
        });
    }
}

function toggleAccessibilityPanel() {
    elements.accessibilityPanel.classList.toggle('active');
    state.isAccessibilityActive = !state.isAccessibilityActive;
}

function announceToScreenReader(message) {
    // Create temporary element for screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        // Select appropriate voice based on language
        const voices = speechSynthesis.getVoices();
        const languageVoiceMap = {
            'hi': ['hi-IN', 'hi'],
            'bn': ['bn-IN', 'bn-BD', 'bn'],
            'ta': ['ta-IN', 'ta'],
            'te': ['te-IN', 'te'],
            'mr': ['mr-IN', 'mr'],
            'gu': ['gu-IN', 'gu'],
            'kn': ['kn-IN', 'kn'],
            'en': ['en-IN', 'en-US', 'en-GB', 'en']
        };
        
        const preferredLangs = languageVoiceMap[state.language] || ['en-US', 'en'];
        
        for (const lang of preferredLangs) {
            const voice = voices.find(v => v.lang.includes(lang));
            if (voice) {
                utterance.voice = voice;
                break;
            }
        }
        
        // Event handlers
        utterance.onstart = () => {
            state.currentSpeech = utterance;
            console.log('Speech started');
        };
        
        utterance.onend = () => {
            state.currentSpeech = null;
            console.log('Speech ended');
        };
        
        utterance.onerror = (event) => {
            console.error('Speech error:', event.error);
            state.currentSpeech = null;
        };
        
        speechSynthesis.speak(utterance);
        
        // Announce to screen reader
        announceToScreenReader('Reading text aloud');
    } else {
        console.warn('Speech synthesis not supported');
        announceToScreenReader('Speech synthesis not available');
    }
}

// Utility functions
function formatNumber(number) {
    return new Intl.NumberFormat('en-IN').format(number);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced AI Response System with Contextual Crop Advice
function generateEnhancedAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    const currentMonth = new Date().getMonth() + 1;
    const currentSeason = getCurrentSeason();
    
    // Crop-specific responses with regional context
    if (message.includes('crop') && (message.includes('suggest') || message.includes('recommend'))) {
        return `I'd be happy to suggest crops! For personalized recommendations based on your exact location, weather, and soil conditions, please click the "Get Crop Suggestions" button above. This will analyze your specific farming conditions and provide detailed AI-powered recommendations.\n\nFor general guidance: Currently it's ${currentSeason} season. Popular ${currentSeason.toLowerCase()} crops include ${getSeasonalCrops(currentSeason).slice(0, 3).join(', ')}. Would you like specific information about any of these crops?`;
    }
    
    // Enhanced fertilizer advice with seasonal context
    if (message.includes('fertilizer') || message.includes('nutrient')) {
        const crop = detectCropInMessage(message);
        if (crop && aiKnowledgeBase.crops[crop]) {
            const cropData = aiKnowledgeBase.crops[crop];
            return `🌾 **${crop.toUpperCase()} FERTILIZER GUIDE**\n\n**Recommended Application:**\n${cropData.fertilizers.join('\n')}\n\n**Timing:** ${cropData.tips[0]}\n\n**Current Season Tip:** ${currentSeason} season requires ${currentSeason === 'Kharif' ? 'increased nitrogen for vegetative growth' : currentSeason === 'Rabi' ? 'phosphorus-rich fertilizers for root development' : 'balanced nutrition'}.\n\n**Soil Testing:** Always conduct soil testing before fertilizer application. Contact your local Krishi Vigyan Kendra for soil health cards.`;
        }
        return `🌱 **GENERAL FERTILIZER GUIDANCE**\n\n**NPK Ratio:** Use balanced 10:26:26 or 12:32:16 based on soil test\n**Application Method:** Split doses - 50% at sowing, 25% at tillering, 25% at flowering\n**Organic Options:** Vermicompost (5 tons/ha), Neem cake (200 kg/ha)\n**Micronutrients:** Zinc sulphate, Boron as per soil test\n\n**Season-Specific:** ${currentSeason} crops need ${currentSeason === 'Kharif' ? 'higher nitrogen due to monsoon leaching' : 'phosphorus for winter root development'}.`;
    }
    
    // Enhanced disease management with AI-powered suggestions
    if (message.includes('disease') || message.includes('pest') || message.includes('attack')) {
        const crop = detectCropInMessage(message);
        if (crop && aiKnowledgeBase.crops[crop]) {
            const cropData = aiKnowledgeBase.crops[crop];
            return `🛡️ **${crop.toUpperCase()} PEST & DISEASE MANAGEMENT**\n\n**Common Issues:** ${cropData.diseases.join(', ')}\n\n**Integrated Management:**\n• **Prevention:** Use resistant varieties like ${cropData.varieties[0]}\n• **Cultural Control:** Proper spacing, field sanitation\n• **Biological Control:** Trichoderma, Pseudomonas\n• **Chemical Control:** Apply only when economic threshold reached\n\n**Weather Alert:** ${currentSeason} season increases risk of ${currentSeason === 'Kharif' ? 'fungal diseases due to humidity' : 'viral diseases due to insect vectors'}. Monitor closely!\n\n**Emergency Contact:** Reach out to nearest Plant Protection Officer for severe outbreaks.`;
        }
        return `🔬 **GENERAL PEST MANAGEMENT STRATEGY**\n\n**IPM Approach:**\n1. **Monitor:** Weekly field scouting\n2. **Prevent:** Healthy soil, proper nutrition\n3. **Control:** Beneficial insects, bio-pesticides\n4. **Treat:** Selective chemical control when needed\n\n**Season-Specific Risks:**\n${currentSeason === 'Kharif' ? '• High humidity diseases\n• Leaf folder, stem borer' : '• Aphid, thrips attacks\n• Rust, smut diseases'}\n\nFor accurate disease diagnosis, contact your local agricultural extension officer.`;
    }
    
    // Market price and profitability analysis
    if (message.includes('price') || message.includes('market') || message.includes('profit')) {
        return `💰 **CURRENT MARKET ANALYSIS**\n\n**High Demand Crops:** ${cropDatabase.marketTrends?.currentDemand?.highDemand?.join(', ') || 'Organic vegetables, Pulses, Oilseeds'}\n\n**Price Trends:**\n📈 **Increasing:** Pulses (₹60-80/kg), Organic produce (Premium 30-50%)\n📊 **Stable:** Wheat (₹22-25/kg), Rice (₹20-23/kg)\n📉 **Seasonal:** Vegetables (varies by season)\n\n**Profit Tips:**\n• Consider value addition (processing, organic certification)\n• Join FPOs for better price realization\n• Use e-NAM platform for transparent pricing\n• Store produce during peak harvest for better rates\n\n**Government Support:** MSP available for ${currentSeason === 'Kharif' ? 'Rice, Cotton, Sugarcane' : 'Wheat, Barley, Mustard'}.`;
    }
    
    // Government schemes and subsidies
    if (message.includes('government') || message.includes('scheme') || message.includes('subsidy')) {
        return `🏛️ **GOVERNMENT SCHEMES FOR FARMERS**\n\n**Direct Benefits:**\n• **PM-KISAN:** ₹6,000/year direct transfer\n• **Fasal Bima:** Crop insurance up to ₹2 lakh\n• **KCC:** Credit up to ₹3 lakh at 4% interest\n\n**Input Subsidies:**\n• **Fertilizer:** 50% subsidy on DAP, Urea\n• **Seeds:** 50% on certified seeds\n• **Equipment:** 50-80% on farm machinery\n• **Irrigation:** 55% on drip/sprinkler systems\n\n**New Initiatives:**\n• **Digital Agriculture:** Drone subsidies\n• **Organic Farming:** ₹50,000/ha support\n• **FPO Formation:** ₹15 lakh grant per FPO\n\n**How to Apply:** Visit nearest Common Service Center or use PM-KISAN mobile app.`;
    }
    
    // Water management and irrigation
    if (message.includes('water') || message.includes('irrigation') || message.includes('drought')) {
        return `💧 **SMART WATER MANAGEMENT**\n\n**Efficient Techniques:**\n• **Drip Irrigation:** 30-50% water saving\n• **Sprinkler Systems:** Uniform distribution\n• **Mulching:** Reduces evaporation by 40%\n• **Rainwater Harvesting:** Build farm ponds\n\n**Crop Water Requirements:**\n🌾 Rice: 1200-1800mm (High)\n🌾 Wheat: 300-500mm (Medium)\n🌾 Cotton: 700-1200mm (Medium-High)\n\n**Schedule Optimization:**\n• Use soil moisture meters\n• Irrigate during early morning/evening\n• Apply water at critical growth stages\n\n**Government Support:** 55% subsidy available under PMKSY for micro-irrigation systems.`;
    }
    
    // Organic farming guidance
    if (message.includes('organic') || message.includes('natural') || message.includes('chemical-free')) {
        return `🌿 **ORGANIC FARMING ROADMAP**\n\n**Transition Period:** 3 years for certification\n\n**Key Practices:**\n• **Soil Health:** Vermicompost, green manuring\n• **Nutrition:** Bio-fertilizers, organic inputs\n• **Pest Control:** Neem, pheromone traps, beneficial insects\n• **Certification:** NPOP standards compliance\n\n**Economic Benefits:**\n• Premium price: 20-50% above conventional\n• Lower input costs after establishment\n• Better soil health and sustainability\n\n**Government Support:**\n• **PKVY:** ₹50,000/ha over 3 years\n• **Organic certification:** Financial assistance\n• **Market linkages:** Through FPOs\n\n**Start Small:** Begin with 1-2 acres, gradually expand based on experience.`;
    }
    
    // Climate change and adaptation
    if (message.includes('climate') || message.includes('weather') || message.includes('adaptation')) {
        return `🌍 **CLIMATE-SMART AGRICULTURE**\n\n**Adaptation Strategies:**\n• **Heat Stress:** Use shade nets, mulching\n• **Water Stress:** Drought-tolerant varieties\n• **Irregular Rainfall:** Rainwater harvesting\n• **Extreme Weather:** Crop insurance coverage\n\n**Resilient Varieties:**\n🌾 **Heat Tolerant:** HD-3086 (wheat), Sahbhagi Dhan (rice)\n🌾 **Drought Resistant:** ICRISAT varieties\n🌾 **Flood Tolerant:** Swarna-Sub1, IR64-Sub1\n\n**Technology Integration:**\n• Weather-based agro-advisories\n• Satellite-based crop monitoring\n• IoT sensors for precision farming\n\n**Current Weather Impact:** This ${currentSeason} season shows ${currentSeason === 'Kharif' ? 'variable monsoon patterns' : 'changing winter temperatures'} - adapt planting dates accordingly.`;
    }
    
    // Default enhanced response with personalization
    return `🤖 **KrishiBot at Your Service!**\n\nI'm powered by advanced AI and can help with comprehensive farming solutions:\n\n🎯 **Featured Services:**\n• **Smart Crop Suggestions** - Click the button above for AI analysis\n• **Season-Specific Advice** - Currently ${currentSeason} season guidance\n• **Market Intelligence** - Real-time price trends\n• **Government Schemes** - Latest subsidies and support\n• **Precision Farming** - Technology-driven solutions\n\n**Quick Actions:**\n📊 Ask about market prices\n🌱 Get fertilizer recommendations\n🛡️ Learn pest management\n💧 Optimize irrigation\n🏛️ Explore government schemes\n\n**Location Advantage:** Based on your location data, I can provide region-specific advice. What specific farming challenge can I help you with today?`;
}

// Seasonal farming calendar
function getSeasonalFarmingCalendar() {
    const month = new Date().getMonth() + 1;
    const calendar = {
        1: { season: 'Rabi', activities: ['Wheat sowing completion', 'Mustard flowering', 'Potato earthing up'] },
        2: { season: 'Rabi', activities: ['Wheat irrigation', 'Gram pod filling', 'Harvest mustard'] },
        3: { season: 'Rabi', activities: ['Wheat harvest preparation', 'Barley maturity', 'Summer crop planning'] },
        4: { season: 'Summer', activities: ['Rabi harvest', 'Land preparation for Kharif', 'Irrigation system check'] },
        5: { season: 'Summer', activities: ['Summer crop sowing', 'Orchard management', 'Water conservation'] },
        6: { season: 'Kharif', activities: ['Monsoon crop sowing', 'Rice transplanting', 'Cotton planting'] },
        7: { season: 'Kharif', activities: ['Weed control', 'First top dressing', 'Pest monitoring'] },
        8: { season: 'Kharif', activities: ['Disease management', 'Second fertilizer dose', 'Water management'] },
        9: { season: 'Kharif', activities: ['Flowering stage care', 'Pest control', 'Weather monitoring'] },
        10: { season: 'Kharif', activities: ['Maturity assessment', 'Harvest preparation', 'Storage arrangement'] },
        11: { season: 'Rabi', activities: ['Kharif harvest', 'Rabi sowing', 'Soil preparation'] },
        12: { season: 'Rabi', activities: ['Winter crop establishment', 'Irrigation scheduling', 'Fertilizer application'] }
    };
    
    return calendar[month] || calendar[1];
}

// Regional crop suitability matrix
function getRegionalCropSuitability(region, season) {
    const suitability = {
        'North India': {
            'Kharif': [
                { crop: 'Rice', suitability: 'Excellent', reason: 'High water availability, suitable climate' },
                { crop: 'Maize', suitability: 'Good', reason: 'Versatile crop, good market demand' },
                { crop: 'Sugarcane', suitability: 'Excellent', reason: 'High profitability, government support' }
            ],
            'Rabi': [
                { crop: 'Wheat', suitability: 'Excellent', reason: 'Perfect climate, established markets' },
                { crop: 'Mustard', suitability: 'Good', reason: 'Oil demand, lower water requirement' },
                { crop: 'Gram', suitability: 'Good', reason: 'Nitrogen fixation, good prices' }
            ]
        },
        'South India': {
            'Kharif': [
                { crop: 'Rice', suitability: 'Excellent', reason: 'Traditional crop, good yield' },
                { crop: 'Cotton', suitability: 'Good', reason: 'Suitable for black soil regions' },
                { crop: 'Groundnut', suitability: 'Excellent', reason: 'High oil content, export potential' }
            ],
            'Rabi': [
                { crop: 'Jowar', suitability: 'Good', reason: 'Drought tolerant, nutritious' },
                { crop: 'Sunflower', suitability: 'Excellent', reason: 'High oil content, good market' },
                { crop: 'Bengal Gram', suitability: 'Good', reason: 'Pulse demand, soil improvement' }
            ]
        }
    };
    
    return suitability[region]?.[season] || [];
}

// Farm economics calculator
function calculateFarmEconomics(crop, area, expectedYield) {
    const economics = {
        'Rice': { inputCost: 30000, labourCost: 15000, price: 22 },
        'Wheat': { inputCost: 25000, labourCost: 12000, price: 25 },
        'Cotton': { inputCost: 40000, labourCost: 20000, price: 60 },
        'Sugarcane': { inputCost: 60000, labourCost: 25000, price: 300 }
    };
    
    const cropData = economics[crop];
    if (!cropData) return null;
    
    const totalCost = (cropData.inputCost + cropData.labourCost) * area;
    const totalRevenue = expectedYield * area * cropData.price * (crop === 'Sugarcane' ? 10 : 1000); // Convert to appropriate units
    const profit = totalRevenue - totalCost;
    const profitMargin = (profit / totalRevenue) * 100;
    
    return {
        totalCost,
        totalRevenue,
        profit,
        profitMargin: Math.round(profitMargin),
        breakEvenYield: totalCost / (cropData.price * (crop === 'Sugarcane' ? 10 : 1000))
    };
}

// Enhanced crop database with more detailed information
function getDetailedCropInfo(cropName, region = 'North India') {
    const detailedCrops = {
        'Rice': {
            varieties: {
                'North India': ['Pusa Basmati 1121', 'Pusa 44', 'Haryana Basmati'],
                'South India': ['ADT 45', 'CO 51', 'TN 1'],
                'East India': ['Swarna', 'Lalat', 'Pooja']
            },
            inputCosts: '₹25,000-30,000 per hectare',
            labourRequirement: '60-80 person-days/hectare',
            marketChannels: ['Mandis', 'Rice mills', 'Direct to retailers'],
            storageLife: '12-18 months in proper conditions',
            processingOptions: ['Milling', 'Parboiling', 'Organic certification']
        },
        'Wheat': {
            varieties: {
                'North India': ['HD 3086', 'PBW 725', 'DBW 187'],
                'Central India': ['Lok 1', 'Sharbati Sonora', 'HI 1563']
            },
            inputCosts: '₹20,000-25,000 per hectare',
            labourRequirement: '40-50 person-days/hectare',
            marketChannels: ['Government procurement', 'Flour mills', 'Mandis'],
            storageLife: '8-12 months',
            processingOptions: ['Flour milling', 'Semolina', 'Biscuit industry']
        },
        'Cotton': {
            varieties: {
                'West India': ['Bt Cotton hybrids', 'BGII varieties'],
                'Central India': ['Vikram', 'Ajeet 155']
            },
            inputCosts: '₹35,000-45,000 per hectare',
            labourRequirement: '80-100 person-days/hectare',
            marketChannels: ['Cotton Corporation of India', 'Private mills', 'Spot markets'],
            storageLife: '6-8 months',
            processingOptions: ['Ginning', 'Textile mills', 'Export']
        }
    };
    
    return detailedCrops[cropName] || null;
}

// Enhanced weather-based farming advice
function getWeatherBasedAdvice(weatherData, season) {
    let advice = [];
    
    if (weatherData.temperature > 35) {
        advice.push('🌡️ **Heat Wave Alert:** Use shade nets, increase irrigation frequency, apply mulch to conserve soil moisture.');
    }
    
    if (weatherData.humidity > 80) {
        advice.push('💨 **High Humidity:** Ensure proper field ventilation, apply preventive fungicides, avoid overhead irrigation.');
    }
    
    if (weatherData.rainfall > 100) {
        advice.push('🌧️ **Heavy Rainfall:** Ensure proper drainage, postpone fertilizer application, monitor for waterlogging.');
    }
    
    if (weatherData.windSpeed > 20) {
        advice.push('💨 **Strong Winds:** Install windbreaks, secure crop supports, delay spraying operations.');
    }
    
    return advice.join('\n\n');
}

// Market trend analysis with price predictions
function analyzeMarketTrends(cropName) {
    const marketData = {
        'Rice': {
            currentPrice: '₹20-25 per kg',
            trend: 'Stable',
            factors: ['Government MSP support', 'Consistent demand', 'Export opportunities'],
            prediction: 'Prices likely to remain stable with slight increase during festival season'
        },
        'Wheat': {
            currentPrice: '₹22-28 per kg',
            trend: 'Increasing',
            factors: ['Lower production estimates', 'International demand', 'Climate impact'],
            prediction: 'Expected 5-8% price increase in next quarter'
        },
        'Cotton': {
            currentPrice: '₹55-65 per kg',
            trend: 'Volatile',
            factors: ['International cotton prices', 'Textile industry demand', 'Quality parameters'],
            prediction: 'Price volatility expected due to global supply chain issues'
        }
    };
    
    return marketData[cropName] || null;
}

// Government scheme eligibility checker
function checkSchemeEligibility(farmerProfile) {
    const eligibleSchemes = [];
    
    // Basic eligibility for all farmers
    eligibleSchemes.push({
        scheme: 'PM-KISAN',
        benefit: '₹6,000 per year',
        eligibility: 'All landholding farmers',
        application: 'pmkisan.gov.in'
    });
    
    eligibleSchemes.push({
        scheme: 'Pradhan Mantri Fasal Bima Yojana',
        benefit: 'Crop insurance coverage',
        eligibility: 'All farmers with Aadhaar',
        application: 'Banks, CSCs, Insurance companies'
    });
    
    if (farmerProfile?.landSize < 2) {
        eligibleSchemes.push({
            scheme: 'Small Farmer Agri-Business Consortium',
            benefit: 'Credit linkage, technology support',
            eligibility: 'Small and marginal farmers',
            application: 'NABARD offices'
        });
    }
    
    return eligibleSchemes;
}

// Global functions for HTML onclick handlers
window.showSection = showSection;
window.askQuestion = askQuestion;
window.getDirections = getDirections;
window.callFacility = callFacility;
window.showFacilityDetails = showFacilityDetails;
window.speakText = speakText;
window.translateMessage = translateMessage;
window.startCropSuggestionAnalysis = startCropSuggestionAnalysis;

// Enhanced error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    // Don't show errors to users in production
});

// Enhanced page visibility handling
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.currentSpeech) {
        // Pause speech when tab becomes inactive
        if ('speechSynthesis' in window) {
            speechSynthesis.pause();
        }
    } else if (!document.hidden && state.currentSpeech) {
        // Resume speech when tab becomes active
        if ('speechSynthesis' in window) {
            speechSynthesis.resume();
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (event) => {
    // ESC key closes modals
    if (event.key === 'Escape') {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal && settingsModal.classList.contains('active')) {
            closeSettingsModal();
        }
    }
    
    // Ctrl+/ opens settings
    if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        openSettingsModal();
    }
    
    // Ctrl+Shift+R starts/stops reading
    if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        if (state.currentSpeech) {
            stopReading();
        } else {
            readCurrentPage();
        }
    }
    
    // Ctrl+Shift+V for voice input
    if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault();
        startVoiceInput();
    }
    
    // Ctrl+Shift+C for crop suggestions
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        if (state.currentSection === 'chat') {
            startCropSuggestionAnalysis();
        } else {
            showSection('chat');
            setTimeout(() => startCropSuggestionAnalysis(), 500);
        }
    }
});

// Progressive Web App support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        console.log('PWA features available');
    });
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 1000);
    });
}

// Accessibility announcements for dynamic content
function announceLoadingState(isLoading, message = '') {
    const announcement = isLoading ? 
        `Loading ${message}. Please wait.` : 
        `${message} loaded successfully.`;
    announceToScreenReader(announcement);
}

// Network status monitoring
if ('navigator' in window && 'onLine' in navigator) {
    window.addEventListener('online', () => {
        announceToScreenReader('Internet connection restored');
        console.log('App is online');
    });
    
    window.addEventListener('offline', () => {
        announceToScreenReader('Internet connection lost. Some features may not work.');
        console.log('App is offline');
    });
}

// Console welcome message
console.log(`
%c🌾 KrishiMitra - Enhanced AI Agriculture Platform %c

Welcome to KrishiMitra with Ollama AI Integration! 🚜🤖

NEW FEATURES:
🚀 Ollama AI Integration - Advanced language model support
🌾 Smart Crop Suggestions - Location-based AI recommendations
🎯 Seasonal Analysis - Weather & soil integrated suggestions
📊 Market Intelligence - Real-time price trends
🛡️ Risk Assessment - Comprehensive farming risk analysis
🏛️ Government Schemes - Personalized subsidy recommendations

EXISTING FEATURES:
✅ Interactive Facilities Map with ${enhancedFacilities.length}+ locations
✅ Multi-language Support (8 Indian languages)
✅ Voice Controls & Text-to-Speech
✅ Enhanced AI Assistant with Agricultural Knowledge
✅ Real-time Weather Integration
✅ Comprehensive Soil Health Analysis
✅ Full Accessibility Support

AI MODELS SUPPORTED:
• Llama 2 (Default)
• Mistral
• CodeLlama
• Neural Chat

Keyboard Shortcuts:
• Ctrl + / : Open Settings
• Ctrl + Shift + R : Read Page / Stop Reading
• Ctrl + Shift + V : Voice Input
• Ctrl + Shift + C : Get Crop Suggestions
• ESC : Close Modals

Built with ❤️ for Indian farmers - Now with AI superpowers!
`, 
'color: #2E8B57; font-size: 16px; font-weight: bold;',
'color: #666; font-size: 12px;'
);

// New helper functions for enhanced AI
function detectCropInMessage(message) {
    const crops = Object.keys(aiKnowledgeBase.crops);
    return crops.find(crop => message.includes(crop));
}

function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 6 && month <= 10) return 'Kharif';
    if (month >= 11 || month <= 4) return 'Rabi';
    return 'Summer';
}

function getSeasonalCrops(season) {
    const crops = [];
    Object.entries(aiKnowledgeBase.crops).forEach(([crop, data]) => {
        if (data.seasons.includes(season)) crops.push(crop);
    });
    return crops;
}

// Settings Modal Functions
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        loadCurrentSettings();
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        saveSettings();
    }
}

function setupSettingsControls() {
    const controls = {
        readWebpageToggle: 'readWebpage',
        voiceControlsToggle: 'voiceControls',
        autoLocationToggle: 'autoLocation',
        weatherNotificationsToggle: 'weatherNotifications',
        settingsLanguageSelect: 'language'
    };
    
    Object.entries(controls).forEach(([elementId, setting]) => {
        const element = document.getElementById(elementId);
        if (element) {
            if (element.type === 'checkbox') {
                element.addEventListener('change', (e) => {
                    state.settings[setting] = e.target.checked;
                    if (setting === 'readWebpage' && e.target.checked) {
                        enablePageReading();
                    }
                });
            } else if (element.type === 'select-one') {
                element.addEventListener('change', (e) => {
                    if (setting === 'language') {
                        changeLanguageFromSettings(e.target.value);
                    }
                });
            }
        }
    });
    
    // Voice control buttons
    const readPageBtn = document.getElementById('readPageBtn');
    const stopReadingBtn = document.getElementById('stopReadingBtn');
    const voiceInputBtn2 = document.getElementById('voiceInputBtn2');
    
    if (readPageBtn) readPageBtn.addEventListener('click', readCurrentPage);
    if (stopReadingBtn) stopReadingBtn.addEventListener('click', stopReading);
    if (voiceInputBtn2) voiceInputBtn2.addEventListener('click', startVoiceInput);
}

function loadCurrentSettings() {
    const readWebpageToggle = document.getElementById('readWebpageToggle');
    const voiceControlsToggle = document.getElementById('voiceControlsToggle');
    const autoLocationToggle = document.getElementById('autoLocationToggle');
    const weatherNotificationsToggle = document.getElementById('weatherNotificationsToggle');
    const settingsLanguageSelect = document.getElementById('settingsLanguageSelect');
    
    if (readWebpageToggle) readWebpageToggle.checked = state.settings.readWebpage;
    if (voiceControlsToggle) voiceControlsToggle.checked = state.settings.voiceControls;
    if (autoLocationToggle) autoLocationToggle.checked = state.settings.autoLocation;
    if (weatherNotificationsToggle) weatherNotificationsToggle.checked = state.settings.weatherNotifications;
    if (settingsLanguageSelect) settingsLanguageSelect.value = state.language;
}

function loadSettings() {
    // In a real app, this would load from localStorage
    // For this demo, we use default settings
    const savedSettings = {
        readWebpage: false,
        voiceControls: false,
        autoLocation: true,
        weatherNotifications: true,
        language: 'en',
        theme: 'light'
    };
    
    Object.assign(state.settings, savedSettings);
    state.language = savedSettings.language;
    state.theme = savedSettings.theme;
}

function saveSettings() {
    // In a real app, this would save to localStorage
    console.log('Settings saved:', state.settings);
    announceToScreenReader('Settings saved successfully');
}

function changeLanguageFromSettings(language) {
    state.language = language;
    elements.languageSelect.value = language;
    updateLanguageDisplay();
    updateNavigationLanguage();
    announceToScreenReader(`Language changed to ${language}`);
}

function updateNavigationLanguage() {
    const texts = translations[state.language] || translations.en;
    
    // Update navigation links
    const navUpdates = {
        'home': texts.home,
        'prediction': texts.cropPrediction,
        'chat': texts.aiAssistant,
        'weather': texts.weather,
        'soil': texts.soilHealth,
        'facilities': texts.facilities
    };
    
    Object.entries(navUpdates).forEach(([section, text]) => {
        const link = document.querySelector(`[data-section="${section}"]`);
        if (link && text) link.textContent = text;
    });
    
    // Update hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle && texts.welcome) heroTitle.textContent = texts.welcome;
    if (heroSubtitle && texts.subtitle) heroSubtitle.textContent = texts.subtitle;
    if (heroDescription && texts.description) heroDescription.textContent = texts.description;
}

// Enhanced Voice Functions
function initializeVoiceSynthesis() {
    if ('speechSynthesis' in window) {
        // Load voices
        speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            speechSynthesis.getVoices();
        };
    }
}

function enablePageReading() {
    if (state.settings.readWebpage) {
        readCurrentPage();
    }
}

function readCurrentPage() {
    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
        const textContent = currentSection.textContent.replace(/\s+/g, ' ').trim();
        const summary = textContent.substring(0, 800) + (textContent.length > 800 ? '...' : '');
        speakText(summary);
    }
}

function stopReading() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        if (state.currentSpeech) {
            state.currentSpeech = null;
        }
    }
    announceToScreenReader('Reading stopped');
}

// Enhanced Facilities Map
function initializeInteractiveFacilitiesMap() {
    const mapContainer = document.getElementById('facilitiesMap');
    if (!mapContainer) return;
    
    // Initialize Leaflet map
    if (typeof L !== 'undefined') {
        // Clear existing map
        if (state.map) {
            state.map.remove();
        }
        
        // Create new map centered on India
        state.map = L.map('facilitiesMap').setView([20.5937, 78.9629], 5);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(state.map);
        
        // Add facility markers
        addFacilityMarkers();
        
        // Add filter controls
        addFacilityFilters();
        
    } else {
        // Fallback if Leaflet is not loaded
        mapContainer.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #666;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 20px;"></i><br>
                Interactive Map Loading...<br>
                <small>Showing ${enhancedFacilities.length} agricultural facilities across India</small>
            </div>
        `;
    }
    
    // Display all facilities
    displayEnhancedFacilities(enhancedFacilities);
}

function addFacilityMarkers() {
    if (!state.map) return;
    
    enhancedFacilities.forEach(facility => {
        const icon = getFacilityIcon(facility.type);
        const marker = L.marker(facility.coordinates, { icon }).addTo(state.map);
        
        const popupContent = createFacilityPopup(facility);
        marker.bindPopup(popupContent);
        
        // Store facility data with marker
        marker.facilityData = facility;
    });
}

function getFacilityIcon(type) {
    const icons = {
        'soil-testing': '🧪',
        'markets': '🏪',
        'extension': '🏛️',
        'research-center': '🔬',
        'veterinary': '🏥',
        'seed-bank': '🌱'
    };
    
    return L.divIcon({
        html: icons[type] || '📍',
        className: 'facility-marker',
        iconSize: [30, 30]
    });
}

function createFacilityPopup(facility) {
    const rating = '⭐'.repeat(Math.floor(facility.rating || 4));
    
    return `
        <div class="facility-popup">
            <div class="facility-name">${facility.name}</div>
            <div class="facility-rating">${rating} (${facility.rating || 4.0})</div>
            <div class="facility-address">📍 ${facility.address}</div>
            <div class="facility-phone">📞 ${facility.phone}</div>
            <div class="facility-timings">🕒 ${facility.timings || 'Contact for timings'}</div>
            ${facility.cost ? `<div class="facility-cost">💰 ${facility.cost}</div>` : ''}
            <div class="facility-services">
                <strong>Services:</strong> ${facility.services.join(', ')}
            </div>
            <div class="facility-actions">
                <button onclick="getDirections(${facility.coordinates[0]}, ${facility.coordinates[1]})" class="btn btn--primary btn--sm">
                    📍 Directions
                </button>
                <button onclick="callFacility('${facility.phone}')" class="btn btn--outline btn--sm">
                    📞 Call
                </button>
            </div>
        </div>
    `;
}

function addFacilityFilters() {
    const searchContainer = document.querySelector('.facilities-search');
    if (!searchContainer) return;
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'facility-filters';
    filterContainer.innerHTML = `
        <div class="filter-badge active" data-type="all">All Facilities</div>
        <div class="filter-badge" data-type="soil-testing">🧪 Soil Testing</div>
        <div class="filter-badge" data-type="markets">🏪 Markets</div>
        <div class="filter-badge" data-type="extension">🏛️ Extension Centers</div>
    `;
    
    searchContainer.appendChild(filterContainer);
    
    // Add filter event listeners
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-badge')) {
            document.querySelectorAll('.filter-badge').forEach(badge => {
                badge.classList.remove('active');
            });
            e.target.classList.add('active');
            
            const filterType = e.target.dataset.type;
            filterFacilities(filterType);
        }
    });
}

function filterFacilities(type) {
    const filtered = type === 'all' ? enhancedFacilities : 
                    enhancedFacilities.filter(facility => facility.type === type);
    
    displayEnhancedFacilities(filtered);
    
    // Update map markers
    if (state.map) {
        state.map.eachLayer((layer) => {
            if (layer.facilityData) {
                if (type === 'all' || layer.facilityData.type === type) {
                    layer.addTo(state.map);
                } else {
                    state.map.removeLayer(layer);
                }
            }
        });
    }
}

function clearFacilityFilters() {
    document.querySelectorAll('.filter-badge').forEach(badge => {
        badge.classList.remove('active');
    });
    document.querySelector('.filter-badge[data-type="all"]')?.classList.add('active');
    filterFacilities('all');
}

function centerMapOnLocation() {
    if (state.location && state.map) {
        state.map.setView([state.location.lat, state.location.lng], 10);
        
        // Add user location marker
        L.marker([state.location.lat, state.location.lng], {
            icon: L.divIcon({
                html: '📍',
                className: 'user-location-marker',
                iconSize: [30, 30]
            })
        }).addTo(state.map).bindPopup('Your Location');
    }
}

function displayEnhancedFacilities(facilitiesList) {
    const facilitiesContainer = document.getElementById('facilitiesList');
    if (!facilitiesContainer) return;
    
    facilitiesContainer.innerHTML = facilitiesList.map(facility => `
        <div class="facility-card">
            <div class="facility-distance">${calculateDistance(facility)} km</div>
            <div class="facility-name">${facility.name}</div>
            <div class="facility-rating">
                ${'⭐'.repeat(Math.floor(facility.rating || 4))} ${facility.rating || 4.0}
            </div>
            <div class="facility-address">📍 ${facility.address}</div>
            <div class="facility-contact">📞 ${facility.phone}</div>
            <div class="facility-timings">🕒 ${facility.timings || 'Contact for timings'}</div>
            ${facility.cost ? `<div class="facility-cost">💰 ${facility.cost}</div>` : ''}
            <div class="facility-services">
                ${facility.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
            </div>
            <div class="facility-actions">
                <button onclick="getDirections(${facility.coordinates[0]}, ${facility.coordinates[1]})" class="facility-action-btn">
                    📍 Directions
                </button>
                <button onclick="callFacility('${facility.phone}')" class="facility-action-btn">
                    📞 Call
                </button>
                <button onclick="showFacilityDetails('${facility.name}')" class="facility-action-btn">
                    ℹ️ Details
                </button>
            </div>
        </div>
    `).join('');
}

function calculateDistance(facility) {
    // Simple distance calculation (in real app, use proper geolocation)
    return Math.floor(Math.random() * 50) + 5;
}

// Facility interaction functions
function getDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
    announceToScreenReader('Opening directions in new tab');
}

function callFacility(phone) {
    if (navigator.userAgent.includes('Mobile')) {
        window.location.href = `tel:${phone}`;
    } else {
        alert(`Call ${phone} for more information`);
    }
}

function showFacilityDetails(name) {
    const facility = enhancedFacilities.find(f => f.name === name);
    if (facility) {
        alert(`Facility Details:\n\nName: ${facility.name}\nType: ${facility.type}\nServices: ${facility.services.join(', ')}\nRating: ${facility.rating}/5\n\nContact ${facility.phone} for more information.`);
    }
}

// Format message content for better display
function formatChatMessage(message) {
    // Convert newlines to HTML breaks
    message = message.replace(/\n/g, '<br>');
    
    // Format bold text
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format bullet points
    message = message.replace(/• (.*?)(<br>|$)/g, '<li>$1</li>');
    
    // Wrap consecutive list items in ul tags
    message = message.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    
    // Format headings
    message = message.replace(/^(#{1,3})\s+(.*?)(<br>|$)/gm, function(match, hashes, text) {
        const level = hashes.length;
        return `<h${level + 2}>${text}</h${level + 2}><br>`;
    });
    
    return message;
}

// Enhanced chat with timestamps and actions
function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '<i class="fas fa-seedling"></i>' : '<i class="fas fa-user"></i>';
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    
    const formattedMessage = formatChatMessage(message);
    
    messageElement.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-text">${formattedMessage}</div>
            <div class="message-timestamp">${timestamp}</div>
            <div class="message-actions">
                ${sender === 'bot' ? `
                    <button class="message-action-btn" onclick="speakText('${message.replace(/[<>"']/g, '').substring(0, 200)}')">🔊 Read</button>
                    <button class="message-action-btn" onclick="translateMessage('${message.replace(/[<>"']/g, '').substring(0, 100)}')">🌍 Translate</button>
                    ${formattedMessage.includes('CROP') ? '<button class="message-action-btn" onclick="askQuestion(\'Tell me more about crop cultivation techniques\')">📚 Learn More</button>' : ''}
                ` : ''}
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to chat history
    state.chatHistory.push({ message, sender, timestamp: new Date() });
    
    // Read message aloud if voice is enabled
    if (state.isVoiceEnabled && sender === 'bot') {
        setTimeout(() => speakText(message), 500);
    }
}

function translateMessage(message) {
    // Simple translation simulation
    if (state.language === 'hi') {
        alert('Translation feature would convert this message to Hindi');
    } else {
        alert('Translation feature would convert this message to selected language');
    }
}

// Ollama Integration Functions
async function checkOllamaConnection() {
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (response.ok) {
            state.ollamaConnected = true;
            console.log('Ollama connected successfully');
            updateOllamaStatus(true);
        } else {
            state.ollamaConnected = false;
            updateOllamaStatus(false);
        }
    } catch (error) {
        state.ollamaConnected = false;
        updateOllamaStatus(false);
        console.log('Ollama not available, using local knowledge base');
    }
}

function updateOllamaStatus(connected) {
    const statusIndicator = document.getElementById('ollamaStatus');
    if (statusIndicator) {
        statusIndicator.innerHTML = connected ? 
            '<span class="status-indicator status-online"></span>Ollama Connected' :
            '<span class="status-indicator status-offline"></span>Ollama Offline (Using Local AI)';
    }
}

async function sendToOllama(message) {
    try {
        const response = await fetch(ollamaConfig.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: ollamaConfig.defaultModel,
                prompt: `You are KrishiBot, an expert agricultural AI assistant for Indian farmers. Please provide helpful, accurate farming advice in a friendly tone. Question: ${message}`,
                stream: false,
                options: {
                    temperature: ollamaConfig.temperature,
                    num_predict: ollamaConfig.maxTokens
                }
            })
        });

        if (response.ok) {
            const data = await response.json();
            hideTypingIndicator();
            addMessageToChat(data.response, 'bot');
        } else {
            throw new Error('Ollama request failed');
        }
    } catch (error) {
        console.error('Ollama error:', error);
        hideTypingIndicator();
        // Fallback to local knowledge base
        const fallbackResponse = generateAIResponse(message);
        addMessageToChat(fallbackResponse + ' (Ollama unavailable, using local knowledge)', 'bot');
    }
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'chat-typing';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-seedling"></i></div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <small>KrishiBot is thinking...</small>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Crop Suggestion Functions
async function startCropSuggestionAnalysis() {
    if (state.isLoadingCropSuggestions) return;
    
    state.isLoadingCropSuggestions = true;
    const btn = document.getElementById('getCropSuggestionsBtn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    btn.disabled = true;
    
    announceToScreenReader('Starting crop suggestion analysis');
    
    try {
        // Step 1: Get location data
        addMessageToChat('🔍 Starting comprehensive crop analysis...', 'bot');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const locationData = await getCurrentLocationData();
        addMessageToChat(`📍 Location detected: ${locationData.city}, ${locationData.state}`, 'bot');
        
        // Step 2: Get weather data
        const weatherData = await getCurrentWeatherData(locationData);
        addMessageToChat(`🌤️ Current weather: ${weatherData.temperature}°C, ${weatherData.condition}, Humidity: ${weatherData.humidity}%`, 'bot');
        
        // Step 3: Determine soil type
        const soilData = await getSoilDataForLocation(locationData);
        addMessageToChat(`🌱 Soil type: ${soilData.type} (pH: ${soilData.ph}, Fertility: ${soilData.fertility})`, 'bot');
        
        // Step 4: Determine current season
        const seasonData = getCurrentAgriculturalSeason(locationData);
        addMessageToChat(`📅 Current season: ${seasonData.season} (${seasonData.description})`, 'bot');
        
        // Step 5: Generate crop suggestions using Ollama or local AI
        const cropAnalysis = await generateCropSuggestions({
            location: locationData,
            weather: weatherData,
            soil: soilData,
            season: seasonData
        });
        
        displayCropSuggestions(cropAnalysis);
        
    } catch (error) {
        console.error('Crop suggestion analysis failed:', error);
        addMessageToChat('❌ Analysis failed. Please try again or check your location settings.', 'bot');
    } finally {
        state.isLoadingCropSuggestions = false;
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function getCurrentLocationData() {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const mockLocationData = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        city: 'Delhi',
                        state: 'Delhi',
                        district: 'New Delhi',
                        region: 'North India'
                    };
                    state.userLocation = mockLocationData;
                    resolve(mockLocationData);
                },
                () => {
                    // Fallback to default location
                    const defaultLocation = {
                        lat: 28.6139,
                        lng: 77.2090,
                        city: 'Delhi',
                        state: 'Delhi',
                        district: 'New Delhi',
                        region: 'North India'
                    };
                    state.userLocation = defaultLocation;
                    resolve(defaultLocation);
                }
            );
        } else {
            const defaultLocation = {
                lat: 28.6139,
                lng: 77.2090,
                city: 'Delhi',
                state: 'Delhi', 
                district: 'New Delhi',
                region: 'North India'
            };
            resolve(defaultLocation);
        }
    });
}

async function getCurrentWeatherData(location) {
    // Simulate weather API call
    const weatherConditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
    const mockWeather = {
        temperature: 25 + Math.floor(Math.random() * 15),
        humidity: 50 + Math.floor(Math.random() * 30),
        condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
        rainfall: Math.floor(Math.random() * 10),
        windSpeed: 5 + Math.floor(Math.random() * 15),
        forecast7Day: Array.from({length: 7}, (_, i) => ({
            day: i,
            temp: 20 + Math.floor(Math.random() * 20),
            condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
        }))
    };
    
    state.currentWeatherData = mockWeather;
    return mockWeather;
}

async function getSoilDataForLocation(location) {
    // Simulate soil data based on region
    const soilTypes = {
        'North India': { type: 'Alluvial', ph: 7.2, fertility: 'High', characteristics: 'Good water retention, rich in nutrients' },
        'South India': { type: 'Red Soil', ph: 6.5, fertility: 'Medium', characteristics: 'Good drainage, iron-rich' },
        'Central India': { type: 'Black Soil', ph: 7.8, fertility: 'High', characteristics: 'Excellent for cotton, high clay content' },
        'West India': { type: 'Alluvial', ph: 7.5, fertility: 'High', characteristics: 'Fertile, suitable for diverse crops' }
    };
    
    return soilTypes[location.region] || soilTypes['North India'];
}

function getCurrentAgriculturalSeason(location) {
    const month = new Date().getMonth() + 1; // 1-12
    
    if (month >= 6 && month <= 10) {
        return {
            season: 'Kharif',
            description: 'Monsoon season (June-October)',
            suitableCrops: ['Rice', 'Cotton', 'Sugarcane', 'Maize', 'Bajra']
        };
    } else if (month >= 11 || month <= 4) {
        return {
            season: 'Rabi', 
            description: 'Winter season (November-April)',
            suitableCrops: ['Wheat', 'Barley', 'Mustard', 'Gram', 'Peas']
        };
    } else {
        return {
            season: 'Summer',
            description: 'Summer season (April-June)', 
            suitableCrops: ['Fodder crops', 'Green gram', 'Watermelon']
        };
    }
}

async function generateCropSuggestions(analysisData) {
    const prompt = `
As an expert agricultural consultant for India, analyze the following comprehensive farming data and provide detailed crop recommendations:

LOCATION: ${analysisData.location.city}, ${analysisData.location.state} (${analysisData.location.region})
WEATHER: ${analysisData.weather.temperature}°C, ${analysisData.weather.condition}, ${analysisData.weather.humidity}% humidity
SOIL: ${analysisData.soil.type} soil (pH ${analysisData.soil.ph}, ${analysisData.soil.fertility} fertility)
SEASON: ${analysisData.season.season} season - ${analysisData.season.description}

Based on this data, provide:
1. TOP 3 RECOMMENDED CROPS with specific reasons
2. EXPECTED YIELD estimates per hectare
3. MARKET PRICE trends and profitability
4. SPECIFIC FARMING TIPS for each crop
5. RISK ASSESSMENT (weather/market risks)
6. GOVERNMENT SCHEMES that apply

Format as clear, actionable advice for farmers.`;

    if (state.ollamaConnected) {
        try {
            const response = await fetch(ollamaConfig.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: ollamaConfig.defaultModel,
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        num_predict: 1500
                    }
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                return {
                    source: 'Ollama AI',
                    recommendations: data.response,
                    analysisData: analysisData
                };
            }
        } catch (error) {
            console.error('Ollama crop analysis failed:', error);
        }
    }
    
    // Fallback to local analysis
    return generateLocalCropSuggestions(analysisData);
}

function generateLocalCropSuggestions(analysisData) {
    const { location, weather, soil, season } = analysisData;
    
    let recommendations = `🌾 **CROP RECOMMENDATIONS FOR ${location.city.toUpperCase()}, ${location.state}**\n\n`;
    
    // Get suitable crops for current season
    const suitableCrops = season.suitableCrops;
    const topCrops = suitableCrops.slice(0, 3);
    
    recommendations += `📋 **TOP 3 RECOMMENDED CROPS:**\n\n`;
    
    topCrops.forEach((crop, index) => {
        const cropInfo = getCropDetails(crop, soil.type);
        recommendations += `**${index + 1}. ${crop.toUpperCase()}**\n`;
        recommendations += `• Expected Yield: ${cropInfo.yield}\n`;
        recommendations += `• Market Price: ${cropInfo.price}\n`;
        recommendations += `• Growing Period: ${cropInfo.duration}\n`;
        recommendations += `• Water Need: ${cropInfo.waterNeed}\n`;
        recommendations += `• Why Suitable: ${cropInfo.reason}\n\n`;
    });
    
    recommendations += `🌡️ **WEATHER CONSIDERATIONS:**\n`;
    recommendations += `Current temperature (${weather.temperature}°C) is ${
        weather.temperature >= 20 && weather.temperature <= 35 ? 'optimal' : 'manageable'
    } for ${season.season} crops.\n`;
    recommendations += `Humidity (${weather.humidity}%) requires ${weather.humidity > 70 ? 'good ventilation and fungicide protection' : 'adequate irrigation planning'}.\n\n`;
    
    recommendations += `🌱 **SOIL & FERTILITY:**\n`;
    recommendations += `${soil.type} soil with pH ${soil.ph} is excellent for the recommended crops.\n`;
    recommendations += `${soil.characteristics}\n\n`;
    
    recommendations += `💰 **PROFITABILITY & MARKET:**\n`;
    recommendations += `Based on current market trends, ${topCrops[0]} shows highest profit potential.\n`;
    recommendations += `Consider organic certification for premium pricing.\n\n`;
    
    recommendations += `⚠️ **RISK MANAGEMENT:**\n`;
    recommendations += `• Weather Risk: Medium (monitor ${season.season} weather patterns)\n`;
    recommendations += `• Market Risk: Low to Medium\n`;
    recommendations += `• Recommended: Crop insurance under PM Fasal Bima Yojana\n\n`;
    
    recommendations += `🎯 **GOVERNMENT SCHEMES:**\n`;
    recommendations += `• PM-KISAN: ₹6000/year income support\n`;
    recommendations += `• Soil Health Card: Free soil testing\n`;
    recommendations += `• KCC: Credit facility for farming inputs\n`;
    
    return {
        source: 'Local Knowledge Base',
        recommendations: recommendations,
        analysisData: analysisData
    };
}

function getCropDetails(crop, soilType) {
    const cropDetails = {
        'Rice': {
            yield: '4-6 tonnes/hectare',
            price: '₹20-25 per kg',
            duration: '110-140 days',
            waterNeed: 'High (1200-1800mm)',
            reason: 'Suitable for alluvial soil and monsoon season'
        },
        'Wheat': {
            yield: '3-5 tonnes/hectare', 
            price: '₹22-28 per kg',
            duration: '110-130 days',
            waterNeed: 'Medium (300-500mm)',
            reason: 'Perfect for rabi season with current soil conditions'
        },
        'Cotton': {
            yield: '15-20 quintals/hectare',
            price: '₹55-65 per kg', 
            duration: '160-200 days',
            waterNeed: 'Medium (700-1200mm)',
            reason: 'High market value and suitable for current weather'
        },
        'Sugarcane': {
            yield: '70-90 tonnes/hectare',
            price: '₹280-320 per quintal',
            duration: '12-18 months',
            waterNeed: 'High (1500-2500mm)',
            reason: 'High profitability and government support'
        },
        'Maize': {
            yield: '2.5-4 tonnes/hectare',
            price: '₹18-22 per kg',
            duration: '90-120 days',
            waterNeed: 'Medium (500-800mm)',
            reason: 'Versatile crop with multiple uses'
        }
    };
    
    return cropDetails[crop] || {
        yield: 'Variable',
        price: 'Check local rates',
        duration: '90-150 days',
        waterNeed: 'Medium',
        reason: 'Suitable for local conditions'
    };
}

function displayCropSuggestions(analysis) {
    // Add the comprehensive analysis to chat
    addMessageToChat('🎯 **COMPREHENSIVE CROP ANALYSIS COMPLETE**', 'bot');
    
    // Display the main recommendations
    const formattedMessage = analysis.recommendations.replace(/\n/g, '<br>');
    addMessageToChat(formattedMessage, 'bot');
    
    // Add follow-up suggestions
    const followUp = `✨ **NEXT STEPS:**\n\n` +
                    `1. Visit your local Krishi Vigyan Kendra for detailed consultation\n` +
                    `2. Get soil testing done for precise nutrient management\n` +
                    `3. Check with local agricultural officer for region-specific varieties\n` +
                    `4. Consider crop insurance and government schemes\n\n` +
                    `💬 Feel free to ask specific questions about any of these crops!`;
    
    setTimeout(() => {
        addMessageToChat(followUp.replace(/\n/g, '<br>'), 'bot');
    }, 2000);
    
    // Store suggestions for future reference
    state.cropSuggestions = analysis;
    
    announceToScreenReader('Crop analysis complete. Detailed recommendations provided.');
}

// Enhanced message handling for better user experience
function handleCropSpecificQuery(query) {
    const cropMentioned = detectCropInMessage(query.toLowerCase());
    const season = getCurrentSeason();
    
    if (cropMentioned) {
        const detailedInfo = getDetailedCropInfo(cropMentioned);
        const marketTrend = analyzeMarketTrends(cropMentioned);
        const seasonalCalendar = getSeasonalFarmingCalendar();
        
        let response = `🌾 **COMPREHENSIVE ${cropMentioned.toUpperCase()} GUIDE**\n\n`;
        
        if (detailedInfo) {
            response += `**Recommended Varieties:**\n${detailedInfo.varieties['North India']?.join(', ')}\n\n`;
            response += `**Investment Required:**\n${detailedInfo.inputCosts}\n\n`;
        }
        
        if (marketTrend) {
            response += `**Market Analysis:**\n`;
            response += `Current Price: ${marketTrend.currentPrice}\n`;
            response += `Trend: ${marketTrend.trend}\n`;
            response += `Prediction: ${marketTrend.prediction}\n\n`;
        }
        
        response += `**Current Season Activities:**\n${seasonalCalendar.activities.join(', ')}\n\n`;
        response += `For location-specific recommendations, use the "Get Crop Suggestions" feature above!`;
        
        return response;
    }
    
    return null;
}

// Smart query routing system
function routeSmartQuery(userQuery) {
    const query = userQuery.toLowerCase();
    
    // Check for crop-specific queries
    const cropResponse = handleCropSpecificQuery(query);
    if (cropResponse) return cropResponse;
    
    // Check for urgent queries
    if (query.includes('urgent') || query.includes('emergency') || query.includes('help')) {
        return `🚨 **EMERGENCY FARMING SUPPORT**\n\n**Immediate Actions:**\n• Contact local agricultural extension officer\n• Krishi Vigyan Kendra: Find nearest center\n• Farmer Helpline: 1800-180-1551\n• Plant Protection: State department contact\n\n**Common Emergencies:**\n• Pest attack: Apply neem oil immediately\n• Disease outbreak: Isolate affected plants\n• Weather damage: Document for insurance claims\n• Water logging: Create drainage channels\n\nWhat specific emergency are you facing? I can provide targeted immediate guidance.`;
    }
    
    // Check for beginner farmer queries
    if (query.includes('beginner') || query.includes('new farmer') || query.includes('start farming')) {
        return `🌱 **BEGINNER FARMER'S ROADMAP**\n\n**Step 1: Land & Soil**\n• Get soil testing done (₹200-500)\n• Understand your land type and topography\n• Check water availability and quality\n\n**Step 2: Choose Right Crops**\n• Start with traditional local crops\n• Consider market demand in your area\n• Begin with 1-2 crops, expand gradually\n\n**Step 3: Essential Knowledge**\n• Join local farmer groups\n• Connect with Krishi Vigyan Kendra\n• Use government apps (KisanSuvidha, mKisan)\n\n**Step 4: Financial Planning**\n• Apply for Kisan Credit Card\n• Get crop insurance\n• Plan budget for inputs and labor\n\n**Support Systems:**\n• Extension services: Free advice\n• Input dealers: Guidance on fertilizers/seeds\n• Experienced farmers: Local mentorship\n\nReady to start? Use our "Get Crop Suggestions" feature for personalized recommendations!`;
    }
    
    return null;
}

// Update the main generateAIResponse function to use smart routing
function generateAIResponse(userMessage) {
    // First try smart query routing
    const smartResponse = routeSmartQuery(userMessage);
    if (smartResponse) return smartResponse;
    
    // Fall back to enhanced AI response system
    return generateEnhancedAIResponse(userMessage);
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
