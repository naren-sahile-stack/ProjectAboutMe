// ============================================================
// تطبيق الطقس - Weather App
// جميع التعليقات بالعربي للفهم
// ============================================================

console.log('🌤️ بدء تشغيل تطبيق الطقس...');

// ===== عناصر الصفحة =====
// جلب العناصر من HTML للتعامل معها
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const errorMessage = document.getElementById('errorMessage');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

console.log('✅ تم العثور على جميع العناصر');

// ===== مصفوفة سجل البحث =====
// تخزين المدن التي تم البحث عنها
let searchHistory = [];

// ===== تحميل السجل من localStorage =====
// دالة لاسترجاع سجل البحث المحفوظ
function loadHistory() {
    const stored = localStorage.getItem('weatherHistory');
    if (stored) {
        try {
            searchHistory = JSON.parse(stored);
            console.log('📥 تم تحميل سجل البحث:', searchHistory.length, 'مدينة');
        } catch (e) {
            searchHistory = [];
        }
    } else {
        searchHistory = [];
        console.log('📭 لا يوجد سجل بحث');
    }
    renderHistory(); // عرض السجل
}

// ===== حفظ السجل في localStorage =====
// دالة لحفظ سجل البحث في المتصفح
function saveHistory() {
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    console.log('💾 تم حفظ السجل:', searchHistory.length, 'مدينة');
}

// ===== عرض سجل البحث =====
// دالة لعرض سجل البحث في الواجهة
function renderHistory() {
    historyList.innerHTML = '';

    if (searchHistory.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-history';
        emptyLi.textContent = 'No searches yet';
        historyList.appendChild(emptyLi);
    } else {
        // عرض المدن بشكل عكسي (الأحدث أولاً)
        const reversed = [...searchHistory].reverse();
        reversed.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            // عند الضغط على مدينة من السجل: البحث عنها مرة أخرى
            li.addEventListener('click', function() {
                cityInput.value = city;
                getWeather(city);
            });
            historyList.appendChild(li);
        });
    }
}

// ===== إضافة مدينة إلى السجل =====
// دالة لإضافة مدينة جديدة إلى سجل البحث مع منع التكرار
function addToHistory(city) {
    // إزالة المدينة إذا كانت موجودة بالفعل
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== city.toLowerCase());
    // إضافة المدينة إلى البداية
    searchHistory.unshift(city);
    // الاحتفاظ بآخر 10 مدن فقط
    if (searchHistory.length > 10) {
        searchHistory = searchHistory.slice(0, 10);
    }
    saveHistory();
    renderHistory();
}

// ===== مسح سجل البحث =====
// دالة لحذف جميع المدن من السجل
function clearHistory() {
    if (searchHistory.length === 0) {
        alert('No history to clear!');
        return;
    }
    if (confirm('⚠️ Are you sure you want to clear all history?')) {
        searchHistory = [];
        saveHistory();
        renderHistory();
        console.log('🗑️ تم مسح سجل البحث');
    }
}

// ===== عرض رسالة خطأ =====
// دالة لإظهار رسائل الخطأ للمستخدم
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    // إخفاء رسالة الخطأ بعد 4 ثواني
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 4000);
}

// ===== إخفاء رسالة الخطأ =====
function hideError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

// ===== جلب بيانات الطقس من API =====
// دالة رئيسية للاتصال بـ API وجلب بيانات الطقس
async function getWeather(city) {
    // التحقق من أن المدينة غير فارغة
    if (!city || city.trim() === '') {
        showError('⚠️ Please enter a city name!');
        cityInput.focus();
        return;
    }

    // تنظيف النص وحذف المسافات الزائدة
    const cityNameTrimmed = city.trim();
    
    // إظهار حالة التحميل
    weatherDisplay.innerHTML = `
        <div class="loading">⏳ Loading weather data...</div>
    `;
    hideError();

    console.log('🔍 جاري البحث عن الطقس في:', cityNameTrimmed);

    try {
        // ===== الاتصال بواجهة برمجة التطبيقات (API) =====
        // استخدام واجهة برمجة تطبيقات مفتوحة (OpenWeatherMap)
        // ملاحظة: هذا هو رابط تجريبي باستخدام خدمة مجانية
        const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // مفتاح تجريبي عام
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityNameTrimmed)}&appid=${apiKey}&units=metric&lang=en`;

        console.log('📡 جاري إرسال الطلب إلى:', url);
        
        // إرسال الطلب
        const response = await fetch(url);
        const data = await response.json();

        console.log('📦 البيانات المستلمة:', data);

        // التحقق من نجاح الطلب
        if (data.cod === 200) {
            // ===== استخراج البيانات =====
            const city = data.name;
            const country = data.sys.country;
            const temp = Math.round(data.main.temp);
            const weatherDesc = data.weather[0].description;
            const icon = data.weather[0].icon;
            const humidityValue = data.main.humidity;
            const windSpeedValue = Math.round(data.wind.speed * 3.6); // تحويل إلى كم/ساعة

            console.log('✅ تم جلب البيانات بنجاح:', city);

            // ===== عرض البيانات في الواجهة =====
            // تحويل رمز الأيقونة إلى إموجي أو رمز
            const iconMap = {
                '01d': '☀️', '01n': '🌙',
                '02d': '⛅', '02n': '☁️',
                '03d': '☁️', '03n': '☁️',
                '04d': '☁️', '04n': '☁️',
                '09d': '🌧️', '09n': '🌧️',
                '10d': '🌦️', '10n': '🌧️',
                '11d': '⛈️', '11n': '⛈️',
                '13d': '❄️', '13n': '❄️',
                '50d': '🌫️', '50n': '🌫️'
            };
            const emojiIcon = iconMap[icon] || '🌤️';

            // تحديث عناصر العرض
            weatherDisplay.innerHTML = `
                <div class="weather-icon" id="weatherIcon">${emojiIcon}</div>
                <div class="city-name" id="cityName">${city}, ${country}</div>
                <div class="temperature" id="temperature">${temp}°C</div>
                <div class="description" id="description">${weatherDesc}</div>
                <div class="details">
                    <div class="detail-item">
                        <span>💧 Humidity</span>
                        <span id="humidity">${humidityValue}%</span>
                    </div>
                    <div class="detail-item">
                        <span>💨 Wind</span>
                        <span id="windSpeed">${windSpeedValue} km/h</span>
                    </div>
                </div>
            `;

            // إعادة تعيين المراجع للعناصر الجديدة (لتجنب مشاكل التحديث)
            // لكننا سنستخدم الطريقة الأسهل: تحديث المتغيرات مباشرة
            // أو سنقوم بتحديث العناصر الموجودة
            
            // طريقة أفضل: تحديث العناصر الموجودة بدلاً من إعادة إنشاء HTML
            // سنستخدم هذه الطريقة لتجنب فقدان المراجع
            updateWeatherDisplay(emojiIcon, city, country, temp, weatherDesc, humidityValue, windSpeedValue);

            // إضافة المدينة إلى سجل البحث
            addToHistory(city);

        } else {
            // ===== المدينة غير موجودة =====
            console.log('❌ المدينة غير موجودة:', data.message);
            showError(`❌ City "${cityNameTrimmed}" not found!`);
            // إعادة عرض الرسالة الافتراضية
            resetWeatherDisplay();
        }

    } catch (error) {
        // ===== خطأ في الاتصال =====
        console.error('❌ خطأ في الاتصال:', error);
        showError('❌ Network error! Please check your connection.');
        resetWeatherDisplay();
    }
}

// ===== تحديث عرض الطقس =====
// دالة لتحديث عناصر العرض بشكل مباشر
function updateWeatherDisplay(icon, city, country, temp, desc, humidityVal, windVal) {
    // تحديث العناصر مباشرة
    document.getElementById('weatherIcon').textContent = icon;
    document.getElementById('cityName').textContent = `${city}, ${country}`;
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('description').textContent = desc;
    document.getElementById('humidity').textContent = `${humidityVal}%`;
    document.getElementById('windSpeed').textContent = `${windVal} km/h`;
}

// ===== إعادة تعيين عرض الطقس =====
// دالة لعرض الحالة الافتراضية
function resetWeatherDisplay() {
    weatherDisplay.innerHTML = `
        <div class="weather-icon" id="weatherIcon">☁️</div>
        <div class="city-name" id="cityName">--</div>
        <div class="temperature" id="temperature">--°C</div>
        <div class="description" id="description">--</div>
        <div class="details">
            <div class="detail-item">
                <span>💧 Humidity</span>
                <span id="humidity">--%</span>
            </div>
            <div class="detail-item">
                <span>💨 Wind</span>
                <span id="windSpeed">-- km/h</span>
            </div>
        </div>
    `;
}

// ===== البحث عن مدينة =====
// دالة يتم استدعاؤها عند الضغط على زر البحث
function searchCity() {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError('⚠️ Please enter a city name!');
        cityInput.focus();
    }
}

// ============================================================
// ربط الأحداث (Event Listeners)
// ============================================================

// عند الضغط على زر البحث
searchBtn.addEventListener('click', function() {
    console.log('🖱️ تم الضغط على زر Search');
    searchCity();
});

// عند الضغط على مفتاح Enter في حقل الإدخال
cityInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        console.log('⌨️ تم الضغط على Enter');
        searchCity();
    }
});

// عند الضغط على زر مسح السجل
clearHistoryBtn.addEventListener('click', function() {
    console.log('🖱️ تم الضغط على زر Clear History');
    clearHistory();
});

// ============================================================
// بدء التطبيق
// ============================================================

loadHistory(); // تحميل سجل البحث
console.log('✅ تطبيق الطقس جاهز للاستخدام!');

// ===== عرض طقس مدينة افتراضية عند بدء التشغيل =====
// عرض طقس مدينة عمان كترحيب
setTimeout(() => {
    getWeather('Amman');
}, 500);

// حفظ السجل عند إغلاق الصفحة
window.addEventListener('beforeunload', function() {
    saveHistory();
});