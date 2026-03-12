// Navegação Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animação do hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Scroll suave para seções
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header ao fazer scroll
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 25, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 25, 0.9)';
    }

    lastScroll = currentScroll;
});

// Ativar link da seção atual
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Adicionar animação aos cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .differential-card, .infra-card, .benefit-item');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.45s ease ${index * 0.08}s`;
        observer.observe(el);
    });
});

// Formulário de Contato — Formspree (envia para comercial@mhjti.com.br)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';

    const formData = {
        nome:      document.getElementById('nome').value.trim(),
        email:     document.getElementById('email').value.trim(),
        telefone:  document.getElementById('telefone').value.trim(),
        cidade:    document.getElementById('cidade').value.trim(),
        assunto:   document.getElementById('assunto').value.trim(),
        mensagem:  document.getElementById('mensagem').value.trim()
    };

    try {
        // Substitua SEU_ID_FORMSPREE pelo ID gerado em https://formspree.io
        const response = await fetch('https://formspree.io/f/xqeyqwga', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            formMessage.className = 'form-message success';
            formMessage.textContent = '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.';
            contactForm.reset();
            setTimeout(() => { formMessage.style.display = 'none'; }, 6000);
        } else {
            formMessage.className = 'form-message error';
            formMessage.textContent = '❌ Erro ao enviar. Tente novamente ou ligue para nós.';
        }

    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Erro de conexão. Verifique sua internet e tente novamente.';
        console.error('Erro:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

// Validação em tempo real dos campos
const inputs = contactForm.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'rgba(220, 53, 69, 0.5)';
        } else {
            input.style.borderColor = 'rgba(40, 167, 69, 0.5)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});

// Validação de email
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = 'rgba(220, 53, 69, 0.5)';
    }
});

// Máscara de telefone (formato brasileiro)
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    e.target.value = value;
});

// Contador de caracteres para textarea (opcional)
const mensagemTextarea = document.getElementById('mensagem');
const maxLength = 500;

mensagemTextarea.addEventListener('input', (e) => {
    const length = e.target.value.length;

    if (length > maxLength) {
        e.target.value = e.target.value.substring(0, maxLength);
    }
});

// Efeito parallax removido — causava sobreposição da seção seguinte

// Prevenção de scroll durante carregamento
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});


