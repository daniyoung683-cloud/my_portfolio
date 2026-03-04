document.addEventListener('DOMContentLoaded', () => {

    // SCROLL PROGRESS BAR LOGIC
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });
    
    // TERMINAL BOOT SEQUENCE
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    
    if (bootScreen) {
        document.body.style.overflow = 'hidden'; 
        
        const lines = [
            "<span class='term-success'>[+]</span> Establishing connection to root@dnweke...",
            "<span class='term-success'>[+]</span> Connection established.",
            "<span class='term-warning'>[*]</span> Bypassing WAF constraints...",
            "<span class='term-success'>[+]</span> WAF bypassed successfully.",
            "<span class='term-warning'>[*]</span> Injecting payload...",
            "<span class='term-success'>[+]</span> Payload executed. Root access granted.",
            "Initializing portfolio UI..."
        ];

        let lineIndex = 0;
        
        function showNextLine() {
            if (lineIndex < lines.length) {
                const p = document.createElement('div');
                p.className = 'term-line';
                p.innerHTML = lines[lineIndex];
                bootText.appendChild(p);
                lineIndex++;
                setTimeout(showNextLine, Math.random() * 400 + 200); 
            } else {
                setTimeout(() => {
                    bootScreen.style.opacity = '0';
                    setTimeout(() => {
                        bootScreen.remove();
                        document.body.style.overflow = ''; 
                    }, 500);
                }, 800);
            }
        }
        setTimeout(showNextLine, 500); 
    }

    // CUSTOM CURSOR LOGIC
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        const hoverElements = document.querySelectorAll('a, button, .menu-toggle, [data-tilt]');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // MOBILE MENU
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    // TYPEWRITER EFFECT
    const TypeWriter = function(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = JSON.parse(words);
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    TypeWriter.prototype.type = function() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;
        if(this.isDeleting) typeSpeed /= 2;

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = txtElement.getAttribute('data-words');
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }

    // 3D TILT EFFECT
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});