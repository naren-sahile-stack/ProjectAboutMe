// ===== بيانات البيوت مع 12 بيت =====
const houses = [
    {
        id: 1,
        name:'The Black Diamond',
        location: 'Beverly Hills neighborhood, Los Angeles, California',
        price: '3.5M',
        img: '1.jpeg',
        alt: 'The Black Diamond',
        bedrooms: 5,
        bathrooms: 6,
        area: '6,450 sq. ft.',
        description: 'Experience modern luxury in every detail within this captivating architectural masterpiece of black and glass, where futuristic design meets ultimate comfort!'
    },
    {
        id: 2,
        name: 'The Timber-Concrete House',
        location: 'Beverly Hills neighborhood, Los Angeles, California',
        price: '4.0M',
        img: '2.jpeg',
        alt: 'The Timber-Concrete House',
        bedrooms: 7,
        bathrooms: 5,
        area: '8,450 sq. ft.',
        description: 'A modern architectural masterpiece in California, blending the warmth of wood, the strength of concrete, and luxurious lighting for an exceptional living experience.'
    },
    {
        id: 3,
        name: 'Black Aura Manor',
        location: 'Beverly Hills neighborhood, Los Angeles, California',
        price: '5.0M',
        img: '3.jpeg',
        alt: 'Black Aura Manor',
        bedrooms: 9,
        bathrooms: 7,
        area: '8,500 sq. ft.',
        description: 'A modern black villa featuring an exceptional design and enchanting lighting in the heart of Beverly Hills, blending absolute luxury with architectural boldness.'
    },
    {
        id: 4,
        name: 'Velvet Grey Residence',
        location: 'Beverly Hills neighborhood, Los Angeles, California',
        price: '6.2M',
        img: '4.jpeg',
        alt: 'Velvet Grey Residence',
        bedrooms: 6,
        bathrooms: 7,
        area: '9,200 sq. ft.',
        description: 'A stunning modern architectural marvel featuring graceful curved lines, expansive glass walls, and a sophisticated grey palette, located in the prestigious Beverly Hills.'
    },
    {
        id: 5,
        name: 'The Countryside Haven',
        location: 'Ojai Valley, California',
        price: '2.45M',
        img: '5.jpeg',
        alt: 'The Countryside Haven',
        bedrooms: 6,
        bathrooms: 5,
        area: '5,600 sq. ft.',
        description: 'A cozy, classic country house surrounded by greenery and trees, offering a sense of peace and comfort in the heart of nature.'
    },
    {
        id: 6,
        name: 'The Oasis Luxury Villa',
        location: 'Beverly Hills neighborhood, Los Angeles, California',
        price: '5.85M',
        img: '6.jpeg',
        alt: 'The Oasis Luxury Villa',
        bedrooms: 6,
        bathrooms: 7,
        area: '8,500 sq. ft.',
        description: 'A luxurious modern villa featuring a transparent pool and a sunken outdoor seating area, offering a sophisticated relaxation experience in the heart of California.'
    },

    {
        id: 7,
        name: 'The Obsidian Luxury Villa',
        location: 'Beverly Hills, Los Angeles, California',
        price: '5.9M',
        img: '7.jpeg',
        alt: 'The Obsidian Luxury Villa',
        bedrooms: 6,
        bathrooms: 7,
        area: '8,800 sq. ft.',
        description: 'A luxurious modern black villa featuring a transparent pool and a sunken outdoor lounge, blending ultimate luxury with privacy.'
    },
    {
        id: 8,
        name: 'The Curved Horizon Villa',
        location: 'Bel-Air, Los Angeles, California',
        price: '4.5M',
        img: '8.jpeg',
        alt: 'The Curved Horizon Villa',
        bedrooms: 5,
        bathrooms: 6,
        area: '7,200 sq. ft.',
        description: 'An architectural masterpiece with graceful curved lines and smooth contours, offering an upscale living experience with unique modern touches.'
    },
    {
        id: 9,
        name: 'Monolith Noir Residence',
        location: 'Malibu, California',
        price: '4.8M',
        img: '9.jpeg',
        alt: 'Monolith Noir Residence',
        bedrooms: 5,
        bathrooms: 6,
        area: '7,500 sq. ft.',
        description: 'An upscale villa in a contemporary style combining enchanting lighting and open facades to suit a sophisticated lifestyle.'
    },
    {
        id: 10,
        name: 'The Grand Zenith Manor',
        location: 'Newport Beach, Orange County, California',
        price: '6.2M',
        img: '10.jpeg',
        alt: 'The Grand Zenith Manor',
        bedrooms: 7,
        bathrooms: 8,
        area: '9,500 sq. ft.',
        description: 'A high-end royal mansion featuring a spacious garage, an elegant external staircase, and advanced lighting giving it prestige and exclusivity.'
    },
    {
        id: 11,
        name: 'The Minimalist Edge Villa',
        location: 'Hollywood Hills, Los Angeles, California',
        price: '4.2M',
        img: '11.jpeg',
        alt: 'The Minimalist Edge Villa',
        bedrooms: 4,
        bathrooms: 5,
        area: '6,800 sq. ft.',
        description: 'A balanced black-and-white architectural design featuring tiered gardens and illuminated entryways reflecting simplicity and luxury.'
    },
    {
        id: 12,
        name: 'The Marble Crown Estate',
        location: 'Pacific Palisades, Los Angeles, California',
        price: '7.5M',
        img: '12.jpeg',
        alt: 'The Marble Crown Estate',
        bedrooms: 6,
        bathrooms: 7,
        area: '9,000 sq. ft.',
        description: 'A fully marbled upscale mansion with ambient LED lighting and a garage for luxury cars, embodying the peak of sophistication and modernity.'
    
}
];

// ===== حالة الإعجابات =====
const likesMap = new Map();
houses.forEach(house => likesMap.set(house.id, 0));

// ===== عنصر الشبكة =====
const grid = document.getElementById('houseGrid');

// ===== دالة عرض التفاصيل =====
function showDetails(house) {
    // إنشاء خلفية شفافة
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;

    // إنشاء صندوق التفاصيل
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: #fffaf5;
        max-width: 700px;
        width: 100%;
        max-height: 90vh;
        border-radius: 40px;
        padding: 30px;
        overflow-y: auto;
        box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s ease;
        position: relative;
    `;

    // زر الإغلاق
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
        position: sticky;
        float: left;
        top: 0;
        background: #f0e4d8;
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        font-size: 1.8rem;
        cursor: pointer;
        color: #5e4b3c;
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        z-index: 10;
    `;
    closeBtn.textContent = '✕';
    closeBtn.onmouseover = () => closeBtn.style.background = '#dccfc2';
    closeBtn.onmouseout = () => closeBtn.style.background = '#f0e4d8';

    // الصورة الكبيرة
    const bigImg = document.createElement('img');
    bigImg.src = house.img;
    bigImg.alt = house.alt || house.name;
    bigImg.style.cssText = `
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 24px;
        margin: 10px 0 20px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    `;
    
    // إذا لم تظهر الصورة
    bigImg.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.style.cssText = `
            width: 100%;
            height: 300px;
            background: #e6dbcf;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: #7d6b5b;
            margin: 10px 0 20px;
        `;
        fallback.textContent = '🏠';
        popup.insertBefore(fallback, popup.children[1]);
    };

    // التفاصيل
    const detailsHtml = `
        <h2 style="font-size: 2rem; color: #4d3e31; margin: 5px 0 8px;">${house.name}</h2>
        <p style="color: #7d6b5b; font-size: 1.1rem; margin-bottom: 12px;">📍 ${house.location}</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 18px 0;">
            <div style="background: #f1e9e0; padding: 12px; border-radius: 16px; text-align: center;">
                <div style="font-size: 1.8rem;">🛏️</div>
                <div style="font-weight: 500; color: #4d3e31;">${house.bedrooms} Bedrooms </div>
            </div>
            <div style="background: #f1e9e0; padding: 12px; border-radius: 16px; text-align: center;">
                <div style="font-size: 1.8rem;">🛁</div>
                <div style="font-weight: 500; color: #4d3e31;">${house.bathrooms} Bathrooms </div>
            </div>
            <div style="background: #f1e9e0; padding: 12px; border-radius: 16px; text-align: center;">
                <div style="font-size: 1.8rem;">📐</div>
                <div style="font-weight: 500; color: #4d3e31;">${house.area}</div>
            </div>
            <div style="background: #f1e9e0; padding: 12px; border-radius: 16px; text-align: center;">
                <div style="font-size: 1.8rem;">💰</div>
                <div style="font-weight: 700; color: #7f6248;">${house.price} $ </div>
            </div>
        </div>
        
        <div style="background: #f8f2eb; padding: 18px; border-radius: 20px; margin: 15px 0;">
            <p style="color: #4d3e31; font-size: 1.05rem; line-height: 1.7; margin: 0;">
                📝 ${house.description}
            </p>
        </div>
        
        <div style="display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap;">
            <button onclick="window.location.href='tel:+966500000000'" style="
                flex: 1;
                background: #7f6248;
                color: white;
                border: none;
                padding: 14px 25px;
                border-radius: 60px;
                font-size: 1.1rem;
                font-weight: 500;
                cursor: pointer;
                transition: 0.3s;
                font-family: 'Tajawal', sans-serif;
            " onmouseover="this.style.background='#6b4f38'" onmouseout="this.style.background='#7f6248'">
            Contact us 📞 
            </button>
                <button onclick="alert('${house.name} has been added to favorites ❤️')" style="    
                flex: 1;
                background: #f0e4d8;
                color: #4d3e31;
                border: none;
                padding: 14px 25px;
                border-radius: 60px;
                font-size: 1.1rem;
                font-weight: 500;
                cursor: pointer;
                transition: 0.3s;
                font-family: 'Tajawal', sans-serif;
            " onmouseover="this.style.background='#e4d5c8'" onmouseout="this.style.background='#f0e4d8'">
            Add to favorites ❤️
            </button>
        </div>
    `;

    popup.appendChild(closeBtn);
    popup.appendChild(bigImg);
    
    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML = detailsHtml;
    popup.appendChild(detailsDiv);

    overlay.appendChild(popup);

    // إضافة أنماط الحركة
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { 
                transform: translateY(50px);
                opacity: 0;
            }
            to { 
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    overlay.appendChild(style);

    // إغلاق عند الضغط على الخلفية
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });

    // إغلاق عند الضغط على زر الإغلاق
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    // إغلاق عند الضغط على ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                document.removeEventListener('keydown', escHandler);
            }
        }
    });

    document.body.appendChild(overlay);
}

// ===== دالة لعرض البطاقات =====
function renderCards() {
    grid.innerHTML = '';

    houses.forEach(house => {
        const card = document.createElement('div');
        card.className = 'house-card';
        card.dataset.id = house.id;

        const imgDiv = document.createElement('div');
        imgDiv.className = 'house-img';
        imgDiv.style.cursor = 'pointer';
        
        const img = document.createElement('img');
        img.src = house.img;
        img.alt = house.alt || house.name;
        img.loading = 'lazy';
        
        // عند الضغط على الصورة تظهر التفاصيل
        imgDiv.addEventListener('click', function(e) {
            e.stopPropagation();
            showDetails(house);
        });
        
        // إذا لم تظهر الصورة
        img.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = 'padding: 60px 20px; color: #7d6b5b; font-size: 1.2rem; text-align: center;';
            fallback.textContent = '🏠 ' + house.name;
            imgDiv.appendChild(fallback);
        };
        
        imgDiv.appendChild(img);

        const nameEl = document.createElement('h2');
        nameEl.className = 'house-name';
        nameEl.textContent = house.name;
        nameEl.style.cursor = 'pointer';
        nameEl.addEventListener('click', function() {
            showDetails(house);
        });

        const locationEl = document.createElement('div');
        locationEl.className = 'house-location';
        locationEl.textContent = house.location;

        const priceEl = document.createElement('div');
        priceEl.className = 'house-price';
        priceEl.innerHTML = `${house.price} <small> $ </small>`;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'card-actions';

        const detailBtn = document.createElement('button');
        detailBtn.className = 'btn-detail';
        detailBtn.textContent = 'Full details 📋';
        detailBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showDetails(house);
        });

        const likeBtn = document.createElement('button');
        likeBtn.className = 'btn-like';
        const currentLikes = likesMap.get(house.id) || 0;
        likeBtn.innerHTML = `♥ <span class="like-count">${currentLikes}</span>`;

        likeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const newCount = (likesMap.get(house.id) || 0) + 1;
            likesMap.set(house.id, newCount);
            const countSpan = this.querySelector('.like-count');
            if (countSpan) {
                countSpan.textContent = newCount;
            }
            this.classList.add('liked');
            setTimeout(() => {
                this.classList.remove('liked');
            }, 300);
        });

        actionsDiv.appendChild(detailBtn);
        actionsDiv.appendChild(likeBtn);

        card.appendChild(imgDiv);
        card.appendChild(nameEl);
        card.appendChild(locationEl);
        card.appendChild(priceEl);
        card.appendChild(actionsDiv);

        grid.appendChild(card);
    });
}

// ===== تشغيل التطبيق =====
renderCards();
console.log('🏡 Dream Homes Store is ready!');
console.log(`📊 Number of houses: ${houses.length} houses`);
console.log('💡 Click on the image or the house name to view full details');