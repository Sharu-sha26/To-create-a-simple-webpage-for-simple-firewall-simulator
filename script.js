let rules = [];

document.getElementById('addRuleBtn').addEventListener('click', function() {
    const ruleInput = document.getElementById('ruleInput').value.trim();
    if (ruleInput) {
        rules.push(ruleInput);
        document.getElementById('ruleInput').value = ''; // Clear input
        updateRulesList();
    }
});

document.getElementById('checkPacketBtn').addEventListener('click', function() {
    const packetInput = document.getElementById('packetInput').value.trim();
    const resultMessage = document.getElementById('resultMessage');
    
    if (packetInput) {
        const isAllowed = rules.some(rule => {
            const [action, ip] = rule.split(' ');
            return action === 'allow' && ip === packetInput;
        });
        const isBlocked = rules.some(rule => {
            const [action, ip] = rule.split(' ');
            return action === 'deny' && ip === packetInput;
        });
        
        if (isAllowed) {
            resultMessage.textContent = `Allowed: ${packetInput}`;
            resultMessage.style.color = 'green';
        } else if (isBlocked) {
            resultMessage.textContent = `Blocked: ${packetInput}`;
            resultMessage.style.color = 'red';
        } else {
            resultMessage.textContent = `No specific rule for: ${packetInput}`;
            resultMessage.style.color = 'orange';
        }
    }
});

function updateRulesList() {
    const rulesList = document.getElementById('rulesList');
    rulesList.innerHTML = ''; // Clear current list
    rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });
}
