window.addEventListener('load', startConversation);

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

let stage = 0; // To keep track of conversation stage
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
    if (userInput === "" && stage !== 3) return; // Prevent empty messages, except when using dropdown

    // Display user message (except for stage 3 where dropdown is used)
    if (stage !== 3) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = userInput;
        document.getElementById('output').appendChild(userMessage);

        // Clear input field
        document.getElementById('user-input').value = '';
    }

    // Handle conversation stages
    handleConversation(userInput);

    // Scroll to the bottom of the chat window
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
            botMessage.textContent = `Great! So you're ${userName} from ${userCity}. Please select the type of waste you have (paper, plastic, or metal).`;
            document.getElementById('output').appendChild(botMessage); // Append the message first
            createWasteDropdown(); // Then append the dropdown after the message
            stage++;
        } else if (stage === 2) {
            // User selected waste type from dropdown
            const wasteDropdown = document.getElementById('waste-select');
            userWaste = wasteDropdown.value;

            // Display user's selected waste type
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = userWaste;
            document.getElementById('output').appendChild(userMessage);

            // Remove the dropdown after selection
            wasteDropdown.remove();

            botMessage.textContent = `You selected ${userWaste}. Please enter the weight of your waste (between 5kg and 100kg).`;
            stage++;
        } else if (stage === 3) {
            const weight = parseFloat(userInput);
            // Ensure weight is between 5 and 100 kg
            if (weight >= 5 && weight <= 100) {
                userWeight = weight;

                // Calculate price based on waste type
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
            stage++; // Final stage
        } else {
            botMessage.textContent = "I didn't understand that. Can you ask something else?";
        }

        document.getElementById('output').appendChild(botMessage);
        scrollToBottom(); // Ensure the chat window scrolls to the bottom after every bot message
    }, 500);
}

function createWasteDropdown() {
    // Create a dropdown for waste selection
    const wasteSelect = document.createElement('select');
    wasteSelect.id = 'waste-select';
    wasteSelect.className = 'message';

    const optionPaper = document.createElement('option');
    optionPaper.value = 'paper';
    optionPaper.textContent = 'Paper';

    const optionPlastic = document.createElement('option');
    optionPlastic.value = 'plastic';
    optionPlastic.textContent = 'Plastic';

    const optionMetal = document.createElement('option');
    optionMetal.value = 'metal';
    optionMetal.textContent = 'Metal';

    wasteSelect.appendChild(optionPaper);
    wasteSelect.appendChild(optionPlastic);
    wasteSelect.appendChild(optionMetal);

    // Append the dropdown to the output after the bot message
    document.getElementById('output').appendChild(wasteSelect);
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
