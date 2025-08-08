// chatbot.js
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

    const botResponses = {
        brain: "The brain is the center of the nervous system and controls most bodily functions.",
        heart: "The heart is a muscular organ that pumps blood throughout the body.",
        lungs: "The lungs are responsible for breathing and gas exchange in the body.",
        default: "I'm sorry, I don't have information about that. Please ask about the brain, heart, or lungs."
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim().toLowerCase();
        
        // Display user message
        chatMessages.innerHTML += `<p><strong>You:</strong> ${userInput.value}</p>`;
        
        // Generate and display bot response
        let botMessage = botResponses.default;
        for (const [keyword, response] of Object.entries(botResponses)) {
            if (userMessage.includes(keyword)) {
                botMessage = response;
                break;
            }
        }
        chatMessages.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
        
        // Clear input and scroll to bottom
        userInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
});
