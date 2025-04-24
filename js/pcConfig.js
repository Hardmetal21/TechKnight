let selectedComponents = {
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null
};

let totalPrice = 0;

// Перевірка сумісності
function checkCompatibility() {
    const warning = document.getElementById('compatibilityWarning');
    warning.style.display = 'none';
    warning.textContent = 'Попередження про несумісність компонентів:';
    
    let hasWarnings = false;
    
    // Перевірка сумісності процесора та материнської плати
    if (selectedComponents.cpu && selectedComponents.motherboard) {
        const cpuInfo = selectedComponents.cpu.split('|')[0];
        const motherboardInfo = selectedComponents.motherboard.split('|')[0];
        const motherboardPlatform = selectedComponents.motherboard.split('|')[2];
        
        const isIntelCpu = cpuInfo.includes('Intel');
        const isAmdCpu = cpuInfo.includes('AMD');
        
        if ((isIntelCpu && motherboardPlatform !== 'Intel') || 
            (isAmdCpu && motherboardPlatform !== 'AMD')) {
            warning.textContent += '\n• Процесор та материнська плата несумісні!';
            warning.style.display = 'block';
            hasWarnings = true;
        }
    }
    
    // Перевірка потужності блоку живлення
    if (selectedComponents.gpu && selectedComponents.psu) {
        const gpuInfo = selectedComponents.gpu.split('|')[0];
        const psuInfo = selectedComponents.psu.split('|')[0];
        
        // Витягуємо потужність БЖ
        const psuWattage = parseInt(psuInfo.match(/\d+W/)[0]);
        
        // Оцінка необхідної потужності для відеокарт високого класу
        if ((gpuInfo.includes('RTX 3070') || gpuInfo.includes('RX 6800')) && psuWattage < 750) {
            warning.textContent += '\n• Блок живлення недостатньої потужності для вашої відеокарти!';
            warning.style.display = 'block';
            hasWarnings = true;
        } else if ((gpuInfo.includes('RTX 3060') || gpuInfo.includes('RX 6700')) && psuWattage < 650) {
            warning.textContent += '\n• Рекомендується потужніший блок живлення для вашої відеокарти.';
            warning.style.display = 'block';
            hasWarnings = true;
        }
    }
    
    return !hasWarnings;
}

// Оновлення конфігурації
function updateConfiguration() {
    // Оновлення вибраних компонентів
    const cpu = document.getElementById('cpu').value;
    const motherboard = document.getElementById('motherboard').value;
    const ram = document.getElementById('ram').value;
    const gpu = document.getElementById('gpu').value;
    const storage = document.getElementById('storage').value;
    const psu = document.getElementById('psu').value;
    const caseValue = document.getElementById('case').value;
    
    // Збереження значень
    selectedComponents.cpu = cpu ? cpu : null;
    selectedComponents.motherboard = motherboard ? motherboard : null;
    selectedComponents.ram = ram ? ram : null;
    selectedComponents.gpu = gpu ? gpu : null;
    selectedComponents.storage = storage ? storage : null;
    selectedComponents.psu = psu ? psu : null;
    selectedComponents.case = caseValue ? caseValue : null;
    
    // Перевірка сумісності
    const isCompatible = checkCompatibility();
    
    // Розрахунок загальної ціни
    totalPrice = 0;
    for (const key in selectedComponents) {
        if (selectedComponents[key]) {
            const price = parseInt(selectedComponents[key].split('|')[1]);
            totalPrice += price;
        }
    }
    
    // Оновлення загальної ціни
    document.getElementById('totalPrice').textContent = `Загальна ціна: ${totalPrice} грн`;
    
    // Генерація підсумку конфігурації
    const configSummary = document.getElementById('configSummary');
    
    if (Object.values(selectedComponents).every(comp => comp === null)) {
        configSummary.innerHTML = '<p>Тут будуть відображені обрані компоненти.</p>';
        return;
    }
    
    let summaryHTML = '';
    for (const key in selectedComponents) {
        if (selectedComponents[key]) {
            const [name, price] = selectedComponents[key].split('|');
            summaryHTML += `
            <div class="component-choice">
                <span class="component-name">${getComponentLabel(key)}:</span>
                <span class="component-info">${name}</span>
                <span class="component-price">${price} грн</span>
            </div>`;
        }
    }
    
    configSummary.innerHTML = summaryHTML;
    
    // Увімкнення/вимкнення кнопки в залежності від сумісності
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !isCompatible || !isConfigurationComplete();
    submitButton.style.opacity = submitButton.disabled ? '0.5' : '1';
}

// Перевірка чи вибрані всі компоненти
function isConfigurationComplete() {
    return Object.values(selectedComponents).every(comp => comp !== null);
}

// Отримання назви компонента для відображення
function getComponentLabel(componentKey) {
    const labels = {
        cpu: 'Процесор',
        motherboard: 'Материнська плата',
        ram: 'Оперативна пам\'ять',
        gpu: 'Відеокарта',
        storage: 'Накопичувач',
        psu: 'Блок живлення',
        case: 'Корпус'
    };
    
    return labels[componentKey] || componentKey;
}

// Обробка відправки форми
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!isConfigurationComplete()) {
        alert('Будь ласка, виберіть всі компоненти перед оформленням замовлення.');
        return;
    }
    
    if (!checkCompatibility()) {
        alert('Будь ласка, виправте проблеми сумісності перед оформленням замовлення.');
        return;
    }
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    
    // В реальному проекті тут був би код для відправки даних на сервер
    alert(`Дякуємо за ваше замовлення, ${name}!\nЗагальна ціна: ${totalPrice} грн\nМи зв'яжемося з вами найближчим часом.`);
    
    // Очищення форми
    document.getElementById('orderForm').reset();
    
    // Очищення вибраних компонентів
    for (const key in selectedComponents) {
        selectedComponents[key] = null;
        document.getElementById(key).value = '';
    }
    
    // Оновлення підсумку
    updateConfiguration();
});