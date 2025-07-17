// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

 // Animate elements when they come into view
 /*
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-content, .prop-card, .testimonial-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };*/

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Simple client logo slider animation
    const logoSlider = document.querySelector('.logos-slider');
    let scrollAmount = 0;
    const scrollSpeed = 1;

    function scrollLogos() {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= logoSlider.scrollWidth / 2) {
            scrollAmount = 0;
        }
        logoSlider.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(scrollLogos);
    }

    // Only run on larger screens
    if (window.innerWidth > 768) {
        requestAnimationFrame(scrollLogos);
    }

    // Video fallback for mobile
    const heroVideo = document.querySelector('.hero-video video');
    if (window.innerWidth < 768) {
        heroVideo.poster = 'media/hero-fallback.jpg';
    }
    
    // Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Create success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-message success';
                successMsg.textContent = 'Thank you! Your message has been sent. We will contact you soon.';
                contactForm.appendChild(successMsg);
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            // Create error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-message error';
            errorMsg.textContent = 'There was a problem sending your message. Please try again later.';
            contactForm.appendChild(errorMsg);
        })
        .finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Remove messages after 5 seconds
            setTimeout(() => {
                const messages = document.querySelectorAll('.form-message');
                messages.forEach(msg => msg.remove());
            }, 5000);
        });
    });
}
});

// Advanced Chatbot for Lipe Portugal - Textile Agency
// Modern, intelligent chatbot without external APIs

// Advanced Chatbot for Lipe Portugal - Textile Agency
// Modern, intelligent chatbot without external APIs

class LipePortugalChatbot {
    constructor() {
        this.conversationHistory = [];
        this.userContext = {
            name: null,
            industry: null,
            previousTopics: [],
            sessionStart: new Date(),
            interests: []
        };
        this.isTyping = false;
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.nlpProcessor = new NLPProcessor();
        this.init();
    }

    initializeKnowledgeBase() {
        return {
            company: {
                name: "Lipe Portugal",
                founded: 1997,
                experience: "Over 25 years",
                location: "Portugal's textile heartland",
                specialization: "Textile sourcing and manufacturing partnerships",
                mission: "Connecting top manufacturing partners with clients seeking high-quality textile products",
                values: ["Quality craftsmanship", "Long-term collaborations", "Reliability", "Excellence"],
                services: [
                    "Textile sourcing",
                    "Manufacturing partnerships",
                    "Quality control",
                    "Supply chain management",
                    "Product development consultation",
                    "Direct manufacturer access"
                ]
            },
            products: {
                categories: ["Apparel textiles", "Home textiles", "Technical textiles", "Fashion fabrics"],
                materials: ["Cotton", "Linen", "Wool", "Silk", "Synthetic blends", "Organic materials"],
                processes: ["Weaving", "Knitting", "Dyeing", "Printing", "Finishing"]
            },
            advantages: [
                "Direct access to premium Portuguese manufacturers",
                "25+ years of industry experience",
                "Quality assurance through long-term partnerships",
                "Competitive pricing through established relationships",
                "Reliable delivery schedules",
                "Personalized service and consultation"
            ],
            faqs: {
                "minimum orders": "Minimum order quantities vary by product and manufacturer. We work with you to find solutions that fit your needs.",
                "delivery time": "Typical delivery times range from 2-8 weeks depending on product complexity and quantity.",
                "quality control": "We maintain strict quality standards through our vetted network of manufacturers and regular inspections.",
                "pricing": "Pricing depends on materials, quantities, and specifications. Contact us for detailed quotes.",
                "customization": "Yes, we offer extensive customization options including custom colors, patterns, and specifications."
            }
        };
    }

    init() {
        console.log('Lipe Portugal Chatbot initializing...');
        this.createChatbotElements();
        this.setupEventListeners();
        this.addWelcomeMessage();
        console.log('Lipe Portugal Chatbot initialized successfully');
    }

    createChatbotElements() {
        // Create chatbot button
        const chatbotButton = document.createElement('div');
        chatbotButton.id = 'lipe-chatbot-button';
        chatbotButton.innerHTML = '💬';
        document.body.appendChild(chatbotButton);

        // Create chatbot window
        const chatbotWindow = document.createElement('div');
        chatbotWindow.id = 'lipe-chatbot-window';
        chatbotWindow.innerHTML = `
            <div id="lipe-chatbot-header">
                <div class="header-content">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E" alt="Chat" class="header-icon"/>
                    <div class="header-text">
                        <div class="header-title">Lipe Portugal</div>
                        <div class="header-subtitle">Textile Excellence Since 1997</div>
                    </div>
                </div>
                <span id="lipe-chatbot-close">✖</span>
            </div>
            <div id="lipe-chatbot-messages"></div>
            <div id="lipe-chatbot-typing" class="typing-indicator" style="display: none;">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
                <span class="typing-text">Lipe is typing...</span>
            </div>
            <div id="lipe-chatbot-input-container">
                <input type="text" id="lipe-chatbot-input" placeholder="Ask about our textile services..." autocomplete="off"/>
                <button id="lipe-chatbot-send">Send</button>
            </div>
        `;
        document.body.appendChild(chatbotWindow);

        this.injectStyles();
    }

    setupEventListeners() {
        // Toggle chatbot
        const chatbotButton = document.getElementById('lipe-chatbot-button');
        if (chatbotButton) {
            chatbotButton.addEventListener('click', () => {
                console.log('Chatbot button clicked');
                this.toggleChatbot();
            });
        }

        // Close chatbot
        const closeButton = document.getElementById('lipe-chatbot-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.closeChatbot();
            });
        }

        // Handle input
        const input = document.getElementById('lipe-chatbot-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.handleUserInput();
                }
            });

            // Auto-resize input
            input.addEventListener('input', () => {
                this.adjustInputHeight();
            });
        }

        // Send button
        const sendButton = document.getElementById('lipe-chatbot-send');
        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.handleUserInput();
            });
        }
    }

    toggleChatbot() {
        const window = document.getElementById('lipe-chatbot-window');
        const button = document.getElementById('lipe-chatbot-button');
        
        if (window.style.display === 'none' || !window.style.display) {
            window.style.display = 'flex';
            button.classList.add('active');
            document.getElementById('lipe-chatbot-input').focus();
        } else {
            window.style.display = 'none';
            button.classList.remove('active');
        }
    }

    closeChatbot() {
        document.getElementById('lipe-chatbot-window').style.display = 'none';
        document.getElementById('lipe-chatbot-button').classList.remove('active');
    }

    handleUserInput() {
        const input = document.getElementById('lipe-chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage('user', message);
        input.value = '';
        this.adjustInputHeight();

        // Process the message
        this.processUserMessage(message);
    }

    processUserMessage(message) {
        this.showTypingIndicator();
        
        // Simulate processing time
        setTimeout(() => {
            const response = this.generateIntelligentResponse(message);
            this.hideTypingIndicator();
            this.addMessage('bot', response);
            
            // Update conversation history
            this.conversationHistory.push({
                user: message,
                bot: response,
                timestamp: new Date()
            });
        }, 800 + Math.random() * 1200);
    }

    generateIntelligentResponse(message) {
        const analysis = this.nlpProcessor.analyze(message);
        
        // Update user context
        this.updateUserContext(analysis);
        
        // Generate contextual response
        return this.generateContextualResponse(analysis, message);
    }

    generateContextualResponse(analysis, originalMessage) {
        const { intent, entities, sentiment, keywords } = analysis;
        
        // Greeting responses
        if (intent === 'greeting') {
            const greetings = [
                "Hello! Welcome to Lipe Portugal. I'm here to help you with our textile services.",
                "Hi there! Thanks for visiting Lipe Portugal. How can I assist you with your textile needs today?",
                "Welcome! I'm the Lipe Portugal assistant. We've been connecting clients with premium textile manufacturers since 1997."
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // Company information
        if (intent === 'company_info' || keywords.some(k => ['company', 'about', 'lipe', 'history'].includes(k))) {
            return `Lipe Portugal is a specialized textile agency founded in 1997, with over 25 years of experience. We're based in Portugal's textile heartland and specialize in connecting brands with premium manufacturers. Our mission is to facilitate seamless collaboration between manufacturers and clients, ensuring exceptional craftsmanship and reliable delivery through long-term partnerships.`;
        }

        // Services
        if (intent === 'services' || keywords.some(k => ['services', 'what', 'do', 'offer'].includes(k))) {
            return `We offer comprehensive textile services including:
• Textile sourcing and procurement
• Manufacturing partnerships
• Quality control and assurance
• Supply chain management
• Product development consultation
• Direct access to premium Portuguese manufacturers

Our strength lies in our established relationships with top manufacturers, ensuring quality, reliability, and competitive pricing.`;
        }

        // Products and materials
        if (keywords.some(k => ['materials', 'fabric', 'textile', 'cotton', 'wool', 'silk'].includes(k))) {
            return `We work with a wide range of materials including cotton, linen, wool, silk, and synthetic blends. Our network covers apparel textiles, home textiles, technical textiles, and fashion fabrics. We can source both conventional and organic materials, with various processes like weaving, knitting, dyeing, and printing available.`;
        }

        // Pricing and quotes
        if (keywords.some(k => ['price', 'cost', 'quote', 'pricing'].includes(k))) {
            return `Pricing depends on several factors including materials, quantities, specifications, and delivery requirements. Our established relationships with manufacturers allow us to offer competitive pricing. For detailed quotes tailored to your specific needs, I'd recommend scheduling a consultation with our team. Would you like me to help you get in touch?`;
        }

        // Quality and manufacturing
        if (keywords.some(k => ['quality', 'manufacturing', 'process'].includes(k))) {
            return `Quality is at the heart of everything we do. We maintain strict quality standards through our carefully vetted network of manufacturers and regular inspections. Our 25+ years of experience have taught us that quality comes from long-term partnerships and consistent processes. We work only with manufacturers who share our commitment to excellence.`;
        }

        // Minimum orders
        if (keywords.some(k => ['minimum', 'order', 'quantity', 'moq'].includes(k))) {
            return `Minimum order quantities vary depending on the product type and manufacturer. We understand that different clients have different needs, so we work flexibly to find solutions that fit your requirements. Some manufacturers offer lower MOQs for certain products, while others may require larger quantities for specialized items.`;
        }

        // Delivery and timing
        if (keywords.some(k => ['delivery', 'time', 'shipping', 'lead'].includes(k))) {
            return `Typical delivery times range from 2-8 weeks depending on product complexity, quantity, and current production schedules. Our established relationships with manufacturers help us provide reliable delivery schedules. We keep you informed throughout the process and work to meet your timeline requirements.`;
        }

        // Contact and consultation
        if (keywords.some(k => ['contact', 'consultation', 'meeting', 'discuss'].includes(k))) {
            return `I'd be happy to help you schedule a consultation with our team! Our experts can discuss your specific needs, provide detailed information about our services, and offer personalized solutions. You can reach us through our website or I can provide you with our contact information. What would work best for you?`;
        }

        // Customization
        if (keywords.some(k => ['custom', 'personalized', 'specific', 'tailor'].includes(k))) {
            return `Yes, we offer extensive customization options! Our network includes manufacturers who can work with custom colors, patterns, specifications, and even develop entirely new products. Customization is one of our strengths - we excel at translating your vision into reality through our manufacturing partners.`;
        }

        // Experience and expertise
        if (keywords.some(k => ['experience', 'expertise', 'why', 'choose'].includes(k))) {
            return `With over 25 years in the textile industry, we've built deep expertise and strong relationships. What sets us apart is our commitment to long-term partnerships - both with our clients and manufacturers. We're not just sourcing agents; we're your partners in textile excellence, providing personalized service, quality assurance, and reliable delivery.`;
        }

        // Sustainability
        if (keywords.some(k => ['sustainable', 'eco', 'organic', 'environment'].includes(k))) {
            return `Sustainability is increasingly important in textiles. We work with manufacturers who offer organic materials, eco-friendly processes, and sustainable practices. Portugal has a strong tradition of responsible manufacturing, and many of our partners are committed to reducing environmental impact while maintaining high quality standards.`;
        }

        // Gratitude
        if (intent === 'gratitude') {
            return "You're very welcome! I'm here to help with any questions about Lipe Portugal's textile services. Feel free to ask anything else!";
        }

        // Farewell
        if (intent === 'farewell') {
            return "Thank you for your interest in Lipe Portugal! We look forward to potentially working with you. Have a great day!";
        }

        // Default intelligent response based on context
        return this.generateContextualDefault(analysis, originalMessage);
    }

    generateContextualDefault(analysis, message) {
        const responses = [
            "That's an interesting question about textiles. Could you tell me more about your specific needs? Are you looking for particular materials, quantities, or manufacturing processes?",
            "I'd be happy to help you with that. To provide the most relevant information, could you share more details about your textile requirements?",
            "Great question! Lipe Portugal has extensive experience in textile sourcing and manufacturing. What specific aspect would you like to know more about?",
            "I want to make sure I give you the most helpful information. Are you interested in learning about our services, materials, or perhaps scheduling a consultation?",
            "Thanks for asking! With our 25+ years of experience, we can likely help with your textile needs. What would be most useful for you to know?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    updateUserContext(analysis) {
        if (analysis.entities.name) {
            this.userContext.name = analysis.entities.name;
        }
        
        // Add keywords to interests
        analysis.keywords.forEach(keyword => {
            if (!this.userContext.interests.includes(keyword)) {
                this.userContext.interests.push(keyword);
            }
        });
        
        // Track topics
        if (analysis.intent && !this.userContext.previousTopics.includes(analysis.intent)) {
            this.userContext.previousTopics.push(analysis.intent);
        }
    }

    addMessage(type, text) {
        const messagesContainer = document.getElementById('lipe-chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `lipe-message ${type}`;
        
        if (type === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">LP</div>
                <div class="message-content">${this.formatMessage(text)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${this.formatMessage(text)}</div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Format bullet points
        text = text.replace(/^• /gm, '<div class="bullet-point">• ');
        text = text.replace(/\n• /g, '</div><div class="bullet-point">• ');
        if (text.includes('<div class="bullet-point">')) {
            text += '</div>';
        }
        
        // Format line breaks
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }

    showTypingIndicator() {
        this.isTyping = true;
        document.getElementById('lipe-chatbot-typing').style.display = 'flex';
        document.getElementById('lipe-chatbot-messages').scrollTop = document.getElementById('lipe-chatbot-messages').scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        document.getElementById('lipe-chatbot-typing').style.display = 'none';
    }

    adjustInputHeight() {
        const input = document.getElementById('lipe-chatbot-input');
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', "Hello! Welcome to Lipe Portugal. I'm here to help you learn about our textile services and how we can support your business with premium Portuguese manufacturing partnerships.");
        }, 1000);
    }

    injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #lipe-chatbot-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #560808, #8B0000);
                color: white;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(86, 8, 8, 0.3);
                z-index: 10000;
                transition: all 0.3s ease;
                border: none;
                outline: none;
            }
            
            #lipe-chatbot-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(86, 8, 8, 0.4);
            }
            
            #lipe-chatbot-button.active {
                background: linear-gradient(135deg, #8B0000, #560808);
            }
            
            #lipe-chatbot-window {
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 380px;
                height: 500px;
                background: white;
                border-radius: 16px;
                display: none;
                flex-direction: column;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                overflow: hidden;
                border: 1px solid #e1e5e9;
            }
            
            #lipe-chatbot-header {
                background: linear-gradient(135deg, #560808, #8B0000);
                color: white;
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 16px 16px 0 0;
            }
            
            .header-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .header-icon {
                width: 24px;
                height: 24px;
            }
            
            .header-text {
                display: flex;
                flex-direction: column;
            }
            
            .header-title {
                font-weight: 600;
                font-size: 16px;
                line-height: 1.2;
            }
            
            .header-subtitle {
                font-size: 12px;
                opacity: 0.9;
                line-height: 1.2;
            }
            
            #lipe-chatbot-close {
                cursor: pointer;
                font-size: 18px;
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            #lipe-chatbot-close:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            #lipe-chatbot-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                background: #f8f9fa;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .lipe-message {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                max-width: 85%;
                animation: fadeIn 0.3s ease;
            }
            
            .lipe-message.user {
                align-self: flex-end;
                flex-direction: row-reverse;
            }
            
            .lipe-message.bot {
                align-self: flex-start;
            }
            
            .message-avatar {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #560808, #8B0000);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
                flex-shrink: 0;
            }
            
            .message-content {
                background: white;
                padding: 12px 16px;
                border-radius: 18px;
                word-wrap: break-word;
                line-height: 1.4;
                font-size: 14px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .lipe-message.user .message-content {
                background: #560808;
                color: white;
            }
            
            .bullet-point {
                margin: 4px 0;
                padding-left: 8px;
            }
            
            .typing-indicator {
                display: none;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                background: #f8f9fa;
            }
            
            .typing-dots {
                display: flex;
                gap: 4px;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                background: #560808;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }
            
            .typing-dots span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-dots span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            .typing-text {
                font-size: 12px;
                color: #666;
                font-style: italic;
            }
            
            #lipe-chatbot-input-container {
                display: flex;
                padding: 16px;
                background: white;
                border-top: 1px solid #e1e5e9;
                gap: 8px;
            }
            
            #lipe-chatbot-input {
                flex: 1;
                border: 1px solid #e1e5e9;
                border-radius: 20px;
                padding: 12px 16px;
                font-size: 14px;
                outline: none;
                resize: none;
                min-height: 20px;
                max-height: 80px;
                font-family: inherit;
                transition: border-color 0.2s;
            }
            
            #lipe-chatbot-input:focus {
                border-color: #560808;
                box-shadow: 0 0 0 2px rgba(86, 8, 8, 0.1);
            }
            
            #lipe-chatbot-send {
                background: #560808;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 12px 20px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.2s;
                font-weight: 500;
            }
            
            #lipe-chatbot-send:hover {
                background: #8B0000;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-10px);
                }
            }
            
            @media (max-width: 768px) {
                #lipe-chatbot-window {
                    width: calc(100vw - 20px);
                    height: 70vh;
                    bottom: 80px;
                    right: 10px;
                    left: 10px;
                }
                
                #lipe-chatbot-button {
                    bottom: 10px;
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Natural Language Processing class
class NLPProcessor {
    constructor() {
        this.stopWords = ['the', 'is', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'i', 'you', 'we', 'they', 'it', 'this', 'that', 'are', 'was', 'were', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might'];
        
        this.intentPatterns = {
            greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
            farewell: ['goodbye', 'bye', 'see you', 'farewell', 'take care', 'until next time'],
            gratitude: ['thank you', 'thanks', 'appreciate', 'grateful'],
            company_info: ['about', 'company', 'lipe', 'portugal', 'history', 'founded', 'experience'],
            services: ['services', 'what do you do', 'what do you offer', 'help with', 'provide'],
            products: ['products', 'materials', 'fabrics', 'textiles', 'cotton', 'wool', 'silk'],
            pricing: ['price', 'cost', 'pricing', 'quote', 'estimate', 'budget'],
            contact: ['contact', 'reach', 'call', 'email', 'meeting', 'consultation']
        };
    }

    analyze(text) {
        const lowercased = text.toLowerCase();
        const words = this.tokenize(lowercased);
        const keywords = this.extractKeywords(words);
        const intent = this.detectIntent(lowercased);
        const entities = this.extractEntities(text);
        const sentiment = this.analyzeSentiment(lowercased);

        return {
            intent,
            entities,
            keywords,
            sentiment,
            originalText: text
        };
    }

    tokenize(text) {
        return text.match(/\b\w+\b/g) || [];
    }

    extractKeywords(words) {
        return words.filter(word => 
            word.length > 2 && 
            !this.stopWords.includes(word)
        );
    }

    detectIntent(text) {
        for (const [intent, patterns] of Object.entries(this.intentPatterns)) {
            for (const pattern of patterns) {
                if (text.includes(pattern)) {
                    return intent;
                }
            }
        }
        return 'general';
    }

    extractEntities(text) {
        const entities = {};
        
        // Extract potential names (capitalized words)
        const namePattern = /\b[A-Z][a-z]+\b/g;
        const names = text.match(namePattern);
        if (names && names.length > 0) {
            entities.name = names[0];
        }
        
        // Extract email addresses
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const emails = text.match(emailPattern);
        if (emails && emails.length > 0) {
            entities.email = emails[0];
        }
        
        // Extract phone numbers
        const phonePattern = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
        const phones = text.match(phonePattern);
        if (phones && phones.length > 0) {
            entities.phone = phones[0];
        }
        
        return entities;
    }

    analyzeSentiment(text) {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'enjoy', 'happy', 'satisfied', 'pleased'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'angry', 'frustrated', 'disappointed', 'unsatisfied'];
        
        const words = this.tokenize(text);
        let score = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) score += 1;
            if (negativeWords.includes(word)) score -= 1;
        });
        
        if (score > 0) return 'positive';
        if (score < 0) return 'negative';
        return 'neutral';
    }
}

// Initialize the chatbot immediately
function initializeLipeChatbot() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new LipePortugalChatbot();
        });
    } else {
        new LipePortugalChatbot();
    }
}

// Call initialization
initializeLipeChatbot();