const descendText = document.getElementById('descend-text');
const descendImg = document.getElementById('descend-img');

descendImg.style.filter = 'saturate(0.3)';
descendImg.style.transition = 'filter 0.3s ease';
descendImg.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

descendText.addEventListener('mouseenter', () => descendImg.style.filter = 'saturate(1)');
descendText.addEventListener('mouseleave', () => descendImg.style.filter = 'saturate(0.3)');
descendImg.addEventListener('mouseenter', () => descendImg.style.filter = 'saturate(1)');
descendImg.addEventListener('mouseleave', () => descendImg.style.filter = 'saturate(0.3)');

// Character select
const slides = document.querySelectorAll('.character-slide');
const carousel = document.querySelector('.character-carousel');
let current = 0;

const bgBottom = document.getElementById('bg-bottom');
const bgTop = document.getElementById('bg-top');
let topIsActive = false;

const initialBg = slides[0].getAttribute('data-bg');
if (initialBg) bgBottom.style.backgroundImage = `url('${initialBg}')`;

function showSlide(index) {
    const prev = slides[current];
    current = (index + slides.length) % slides.length;
    const next = slides[current];

    prev.classList.remove('active');
    setTimeout(() => prev.classList.remove('fading-out'), 700);
    next.classList.add('active');

    const bg = next.getAttribute('data-bg');
    if (bg) {
        if (!topIsActive) {
            bgTop.style.backgroundImage = `url('${bg}')`;
            bgTop.style.opacity = '1';
            bgBottom.style.opacity = '0';
            topIsActive = true;
        } else {
            bgBottom.style.backgroundImage = `url('${bg}')`;
            bgBottom.style.opacity = '1';
            bgTop.style.opacity = '0';
            topIsActive = false;
        }
    }
}
document.getElementById('arrow-left').addEventListener('click', () => showSlide(current - 1));
document.getElementById('arrow-right').addEventListener('click', () => showSlide(current + 1));

// Scroll fade
const observerOptions = {
    threshold: 0.6,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            if (entry.boundingClientRect.top > 0) {
                entry.target.classList.remove('visible');
            }
        }
    });
}, observerOptions);

const sections = document.querySelectorAll('.about, .story, .characters, .gameplay, .creator');

sections.forEach(section => {
    const children = section.querySelectorAll(
        '.about-title, .about-gif, .about-text, ' +
        '.story-title, .story-item, ' +
        '.characters-title, .characters-intro, .character-carousel, ' +
        '.gameplay .story-title, .gameplay .story-item' +
        '.creator-title-row, .creator-img, .about-text, .creator-contacts'
    );
    children.forEach((el, i) => {
        el.classList.add('float-hidden');
        el.style.transitionDelay = `${i * 0.15}s`;
        observer.observe(el);
    });
});