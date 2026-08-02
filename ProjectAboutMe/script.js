// ==============================
// 1. قائمة التنقل للجوال
// ==============================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// عند الضغط على أي رابط في القائمة، تغلق القائمة
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ==============================
// 2. تمييز الرابط النشط أثناء التمرير
// ==============================
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==============================
// 3. زر العودة للأعلى
// ==============================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==============================
// 4. التحقق من صحة نموذج الاتصال
// ==============================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // التحقق من الاسم
    if (name.value.trim() === '') {
        name.classList.add('error');
        isValid = false;
    } else {
        name.classList.remove('error');
    }
    
    // التحقق من البريد الإلكتروني
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        email.classList.add('error');
        isValid = false;
    } else {
        email.classList.remove('error');
    }
    
    // التحقق من الرسالة
    if (message.value.trim() === '') {
        message.classList.add('error');
        isValid = false;
    } else {
        message.classList.remove('error');
    }
    
    if (isValid) {
        alert('✅ تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.');
        contactForm.reset();
    } else {
        alert('⚠️ يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.');
    }
});

// ==============================
// 5. (BONUS) حركات عند ظهور الأقسام
// ==============================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-item, .detail-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (elementPosition < screenHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// إضافة الخصائص الابتدائية للعناصر
document.querySelectorAll('.project-card, .skill-item, .detail-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);