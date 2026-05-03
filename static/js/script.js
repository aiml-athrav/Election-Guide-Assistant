document.addEventListener('DOMContentLoaded', () => {
    // Nav view switching logic
    const navItems = document.querySelectorAll('.nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from navs and views
            navItems.forEach(nav => nav.classList.remove('active'));
            viewSections.forEach(view => view.classList.remove('active'));

            // Set active class
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Eligibility Checker Logic
    const eligibilityForm = document.getElementById('eligibility-form');
    const resultBox = document.getElementById('eligibility-result');

    eligibilityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const age = parseInt(document.getElementById('age').value);
        const isCitizen = document.querySelector('input[name="citizen"]:checked').value;

        resultBox.classList.remove('hidden', 'status-success', 'status-error');

        if (age >= 18 && isCitizen === 'yes') {
            resultBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Great! You meet the standard criteria to vote. Don\'t forget to register!';
            resultBox.classList.add('status-success');
        } else if (isCitizen === 'no') {
            resultBox.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Citizenship is required to vote in national elections.';
            resultBox.classList.add('status-error');
        } else {
            resultBox.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> You must be at least 18 years old to vote.';
            resultBox.classList.add('status-error');
        }
    });

    // Chat Logic
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    function appendMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'msg-avatar';
        avatarDiv.innerHTML = isUser ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-bubble';
        
        let formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        contentDiv.innerHTML = formattedContent;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ai-message typing-indicator`;
        messageDiv.id = 'typing-indicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'msg-avatar';
        avatarDiv.innerHTML = '<i class="fa-solid fa-robot"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-bubble';
        contentDiv.innerHTML = `
            <div class="typing-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) {
            typing.remove();
        }
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage(message, true);
        userInput.value = '';
        
        addTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            removeTypingIndicator();
            
            if (response.ok) {
                appendMessage(data.response);
            } else {
                appendMessage("Sorry, I encountered an error. Please try again.");
            }
        } catch (error) {
            removeTypingIndicator();
            appendMessage("Network error. Please check your connection to the server.");
            console.error('Error:', error);
        }
    });
});
