window.addEventListener('load', startConversation);

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

let stage = 0;
let userName = '';
let userCity = '';
let userWaste = '';
let userWeight = 0;

function startConversation() {
    setTimeout(() => {
        const instructionMessage = document.createElement('div');
        instructionMessage.className = 'message bot-message';
        instructionMessage.textContent = "Please give your details below.";
        document.getElementById('output').appendChild(instructionMessage);

        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = "Hello! What's your name?";
        document.getElementById('output').appendChild(botMessage);
        scrollToBottom();
    }, 500);
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === "") return;

    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userInput;
    document.getElementById('output').appendChild(userMessage);

    document.getElementById('user-input').value = '';

    handleConversation(userInput);
    scrollToBottom();
}

function handleConversation(userInput) {
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';

        if (stage === 0) {
            userName = userInput;
            botMessage.textContent = `Nice to meet you, ${userName}! Which city are you from?`;
            stage++;
        } else if (stage === 1) {
            userCity = userInput;
            botMessage.textContent = `Great! So you're ${userName} from ${userCity}. What type of waste do you have? (paper, plastic, or metal)`;
            stage++;
        } else if (stage === 2) {
            const validWasteTypes = ['paper', 'plastic', 'metal'];
            if (validWasteTypes.includes(userInput.toLowerCase())) {
                userWaste = userInput.toLowerCase();
                botMessage.textContent = `You selected ${userWaste}. Please enter the weight of your waste (between 5kg and 100kg).`;
                stage++;
            } else {
                botMessage.textContent = "Please enter a valid waste type: paper, plastic, or metal.";
            }
        } else if (stage === 3) {
            const weight = parseFloat(userInput);
            if (weight >= 5 && weight <= 100) {
                userWeight = weight;
                let pricePerKg = 0;
                if (userWaste === 'paper') pricePerKg = 10;
                else if (userWaste === 'plastic') pricePerKg = 25;
                else if (userWaste === 'metal') pricePerKg = 50;

                const totalPrice = pricePerKg * userWeight;
                botMessage.textContent = `The total price for ${userWeight}kg of ${userWaste} is Rs ${totalPrice}. Please enter your UPI ID for payment.`;
                stage++;
            } else {
                botMessage.textContent = "Please enter a valid weight between 5kg and 100kg.";
            }
        } else if (stage === 4) {
            const userUPI = userInput;
            botMessage.textContent = `Thank you! Your payment will be processed soon using UPI ID: ${userUPI}.`;
            stage++;
        } else {
            botMessage.textContent = "I didn't understand that. Can you ask something else?";
        }

        document.getElementById('output').appendChild(botMessage);
        scrollToBottom();
    }, 500);
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
