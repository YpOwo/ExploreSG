// DOM Elements
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const destinationsGrid = document.querySelector('.destinations-grid');
const eventsGrid = document.querySelector('.events-grid');
const ctaButton = document.querySelector('.cta-button');

// Intersection Observer for smooth animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Chat functionality
function addMessage(message, isBot = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isBot ? 'bot' : 'user');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Debounce function for performance
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

// Handle chat input
chatButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, false);
        chatInput.value = '';
        // Simulate bot response (replace with actual API call)
        setTimeout(() => {
            addMessage('Thanks for your message! I\'m here to help you explore Singapore.', true);
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatButton.click();
    }
});

// Sample data (replace with actual API calls)
const sampleDestinations = [
    { name: 'Haji Lane', description: 'Vibrant street art and boutique shops' },
    { name: 'Gardens by the Bay', description: 'Futuristic nature park' },
    { name: 'Pulau Ubin', description: 'Last kampong of Singapore' }
];

const sampleEvents = [
    { name: 'Singapore Food Festival', date: 'July 15-30, 2025' },
    { name: 'Night Festival', date: 'August 20-28, 2025' },
    { name: 'Mid-Autumn Festival', date: 'September 15, 2025' }
];

// Render destinations and events
function renderDestinations() {
    destinationsGrid.innerHTML = sampleDestinations.map(dest => `
        <div class="destination-card">
            <h3>${dest.name}</h3>
            <p>${dest.description}</p>
        </div>
    `).join('');
}

function renderEvents() {
    eventsGrid.innerHTML = sampleEvents.map(event => `
        <div class="event-card">
            <h3>${event.name}</h3>
            <p>${event.date}</p>
        </div>
    `).join('');
}

// Initialize
renderDestinations();
renderEvents();

// Store user preferences
const userPreferences = {
    save: (prefs) => {
        localStorage.setItem('exploresg_preferences', JSON.stringify(prefs));
    },
    load: () => {
        return JSON.parse(localStorage.getItem('exploresg_preferences')) || {};
    }
};

// Add initial animation classes
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
