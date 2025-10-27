// ===== MAIN JAVASCRIPT FILE FOR SANTEC WEBSITE =====

// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 9;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms
    initializeForms();
    
    // Initialize modals
    initializeModals();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize page-specific features
    initializePageFeatures();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize phone mask
    initializePhoneMask();
    
    console.log('SANTEC Website initialized successfully');
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            isMenuOpen = true;
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                navMenu.classList.remove('active');
                isMenuOpen = false;
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = 'auto';
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });
}

// ===== FORMS =====
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Initialize form inputs with floating labels
    const formInputs = document.querySelectorAll('.form__input');
    formInputs.forEach(input => {
        // Check if input has value on load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
}

// ===== CONTACT FORM HANDLER =====
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form inputs
        const formInputs = e.target.querySelectorAll('.form__input');
        formInputs.forEach(input => {
            input.classList.remove('has-value');
        });
        
    }, 2000);
}

// ===== FORM VALIDATION =====
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('E-mail inválido');
    }
    
    const cleanPhone = data.telefone ? data.telefone.replace(/\D/g, "") : "";
    if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 11) {
        errors.push("Telefone inválido (mínimo 10, máximo 11 dígitos)");
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== PHONE MASK =====
function initializePhoneMask() {
    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            let formattedValue = "";

            if (value.length > 0) {
                formattedValue = "(" + value.substring(0, 2);
            }
            if (value.length >= 3) {
                formattedValue += ") " + value.substring(2, 7);
            }
            if (value.length >= 8) {
                formattedValue += "-" + value.substring(7, 11);
            }
            e.target.value = formattedValue;
        });
    }
}

// ===== MODALS =====
function initializeModals() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// ===== SERVICE MODAL =====
function openServiceModal(serviceId) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const serviceData = getServiceData(serviceId);
    
    if (serviceData) {
        modalTitle.textContent = serviceData.title;
        modalContent.innerHTML = serviceData.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== PROJECT MODAL =====
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalContent = document.getElementById('projectModalContent');
    
    const projectData = getProjectData(projectId);
    
    if (projectData) {
        modalTitle.textContent = projectData.title;
        modalContent.innerHTML = projectData.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== CLOSE ALL MODALS =====
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// ===== SERVICE DATA =====
function getServiceData(serviceId) {
    const services = {
        construcao: {
            title: 'Construção Civil',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Construção Civil" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Oferecemos serviços completos de construção civil para edificações residenciais, comerciais e industriais, utilizando as melhores práticas do mercado e materiais de alta qualidade.</p>
                    
                    <h4>Nossos Serviços Incluem:</h4>
                    <ul>
                        <li>Construções residenciais de alto padrão</li>
                        <li>Edifícios comerciais e corporativos</li>
                        <li>Instalações industriais e galpões</li>
                        <li>Projetos arquitetônicos e estruturais</li>
                        <li>Gerenciamento completo da obra</li>
                        <li>Controle de qualidade rigoroso</li>
                    </ul>
                    
                    <h4>Diferenciais:</h4>
                    <ul>
                        <li>Equipe técnica especializada</li>
                        <li>Tecnologia de ponta</li>
                        <li>Cumprimento de prazos</li>
                        <li>Sustentabilidade ambiental</li>
                        <li>Garantia de qualidade</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        drenagens: {
            title: 'Drenagens',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Drenagens" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Especialistas em sistemas de drenagem urbana e rural, oferecemos soluções eficientes para controle de águas pluviais e prevenção de enchentes.</p>
                    
                    <h4>Serviços de Drenagem:</h4>
                    <ul>
                        <li>Drenagem urbana e pluvial</li>
                        <li>Sistemas de drenagem rural</li>
                        <li>Controle de erosão</li>
                        <li>Galerias e bueiros</li>
                        <li>Bacias de contenção</li>
                        <li>Manutenção preventiva</li>
                    </ul>
                    
                    <h4>Tecnologias Utilizadas:</h4>
                    <ul>
                        <li>Modelagem hidráulica avançada</li>
                        <li>Materiais sustentáveis</li>
                        <li>Sistemas de monitoramento</li>
                        <li>Soluções inteligentes</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        geotecnicas: {
            title: 'Obras Geotécnicas',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Obras Geotécnicas" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Soluções especializadas em geotecnia, estabilização de terrenos e contenção de encostas com tecnologia avançada e segurança garantida.</p>
                    
                    <h4>Serviços Geotécnicos:</h4>
                    <ul>
                        <li>Estabilização de taludes</li>
                        <li>Contenção de encostas</li>
                        <li>Muros de arrimo</li>
                        <li>Análise geotécnica detalhada</li>
                        <li>Monitoramento de estabilidade</li>
                        <li>Soluções de reforço</li>
                    </ul>
                    
                    <h4>Metodologias:</h4>
                    <ul>
                        <li>Análise de estabilidade</li>
                        <li>Instrumentação geotécnica</li>
                        <li>Modelagem computacional</li>
                        <li>Ensaios de campo e laboratório</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        reformas: {
            title: 'Reformas de Edificações',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Reformas" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Modernização e revitalização de espaços com criatividade, funcionalidade e respeito ao patrimônio existente.</p>
                    
                    <h4>Tipos de Reforma:</h4>
                    <ul>
                        <li>Reformas residenciais completas</li>
                        <li>Modernização de espaços comerciais</li>
                        <li>Revitalização de fachadas</li>
                        <li>Adequações estruturais</li>
                        <li>Reformas de interiores</li>
                        <li>Acessibilidade e sustentabilidade</li>
                    </ul>
                    
                    <h4>Processo de Reforma:</h4>
                    <ul>
                        <li>Diagnóstico detalhado</li>
                        <li>Projeto personalizado</li>
                        <li>Execução planejada</li>
                        <li>Mínimo impacto no dia a dia</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        demolicao: {
            title: 'Demolição',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Demolição" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Serviços de demolição segura e controlada para diversos tipos de estruturas, com foco na segurança e sustentabilidade.</p>
                    
                    <h4>Tipos de Demolição:</h4>
                    <ul>
                        <li>Demolição controlada</li>
                        <li>Remoção seletiva</li>
                        <li>Desmontagem estrutural</li>
                        <li>Limpeza de terrenos</li>
                        <li>Descarte responsável</li>
                        <li>Reciclagem de materiais</li>
                    </ul>
                    
                    <h4>Segurança e Sustentabilidade:</h4>
                    <ul>
                        <li>Protocolos rigorosos de segurança</li>
                        <li>Equipamentos especializados</li>
                        <li>Gestão ambiental</li>
                        <li>Reciclagem de entulho</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        pavimentacao: {
            title: 'Reparos de Pavimentação',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pavimentação" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Manutenção e reparos em pavimentação asfáltica e de concreto para vias urbanas, estacionamentos e áreas industriais.</p>
                    
                    <h4>Serviços de Pavimentação:</h4>
                    <ul>
                        <li>Reparos asfálticos</li>
                        <li>Recapeamento de vias</li>
                        <li>Pavimentação de concreto</li>
                        <li>Sinalização viária</li>
                        <li>Manutenção preventiva</li>
                        <li>Drenagem de pavimentos</li>
                    </ul>
                    
                    <h4>Qualidade e Durabilidade:</h4>
                    <ul>
                        <li>Materiais de alta qualidade</li>
                        <li>Técnicas modernas</li>
                        <li>Controle tecnológico</li>
                        <li>Garantia estendida</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        fundacao: {
            title: 'Fundação',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fundação" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Execução de fundações sólidas e seguras para todos os tipos de construção, garantindo estabilidade e durabilidade.</p>
                    
                    <h4>Tipos de Fundação:</h4>
                    <ul>
                        <li>Fundações rasas (sapatas, blocos)</li>
                        <li>Fundações profundas (estacas)</li>
                        <li>Radier e lajes de fundação</li>
                        <li>Fundações especiais</li>
                        <li>Reforço de fundações</li>
                        <li>Análise de solo detalhada</li>
                    </ul>
                    
                    <h4>Tecnologia e Precisão:</h4>
                    <ul>
                        <li>Sondagem geotécnica</li>
                        <li>Cálculo estrutural preciso</li>
                        <li>Controle de qualidade</li>
                        <li>Monitoramento contínuo</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        impermeabilizacao: {
            title: 'Impermeabilização',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Impermeabilização" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Proteção contra umidade e infiltrações com materiais de alta qualidade e técnicas avançadas de impermeabilização.</p>
                    
                    <h4>Serviços de Impermeabilização:</h4>
                    <ul>
                        <li>Impermeabilização de lajes</li>
                        <li>Tratamento de infiltrações</li>
                        <li>Proteção de estruturas</li>
                        <li>Sistemas de vedação</li>
                        <li>Impermeabilização de piscinas</li>
                        <li>Manutenção preventiva</li>
                    </ul>
                    
                    <h4>Materiais e Técnicas:</h4>
                    <ul>
                        <li>Mantas asfálticas</li>
                        <li>Membranas líquidas</li>
                        <li>Sistemas cristalizantes</li>
                        <li>Garantia de 10 anos</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        recuperacao: {
            title: 'Recuperação de Estruturas',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Recuperação Estrutural" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Reforço e recuperação de estruturas danificadas ou deterioradas, devolvendo segurança e durabilidade às edificações.</p>
                    
                    <h4>Serviços de Recuperação:</h4>
                    <ul>
                        <li>Reforço estrutural</li>
                        <li>Recuperação de concreto</li>
                        <li>Tratamento de patologias</li>
                        <li>Análise estrutural detalhada</li>
                        <li>Proteção anticorrosiva</li>
                        <li>Monitoramento estrutural</li>
                    </ul>
                    
                    <h4>Metodologias Avançadas:</h4>
                    <ul>
                        <li>Diagnóstico por ensaios</li>
                        <li>Materiais de alta performance</li>
                        <li>Técnicas não destrutivas</li>
                        <li>Garantia de durabilidade</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        },
        escavacao: {
            title: 'Escavação e Terraplenagem',
            content: `
                <div class="modal-service">
                    <img src="https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Escavação" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>Movimentação de terra e preparação de terrenos para construção com equipamentos modernos e técnicas eficientes.</p>
                    
                    <h4>Serviços de Terraplenagem:</h4>
                    <ul>
                        <li>Escavação de terrenos</li>
                        <li>Terraplenagem e nivelamento</li>
                        <li>Drenagem de águas</li>
                        <li>Compactação de solo</li>
                        <li>Movimentação de terra</li>
                        <li>Preparação de fundações</li>
                    </ul>
                    
                    <h4>Equipamentos e Tecnologia:</h4>
                    <ul>
                        <li>Maquinário moderno</li>
                        <li>Controle topográfico</li>
                        <li>Gestão ambiental</li>
                        <li>Segurança operacional</li>
                    </ul>
                    
                    <div style="margin-top: 1.5rem;">
                        <a href="contato.html" class="btn btn--primary">Solicitar Orçamento</a>
                    </div>
                </div>
            `
        }
    };
    
    return services[serviceId] || null;
}

// ===== PROJECT DATA =====
function getProjectData(projectId) {
    const projects = {
        projeto1: {
            title: 'Edifício Comercial Centro',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Edifício Comercial" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Centro de Palmas-TO</li>
                            <li><strong>Área:</strong> 3.500 m²</li>
                            <li><strong>Andares:</strong> 8 pavimentos</li>
                            <li><strong>Prazo:</strong> 18 meses</li>
                            <li><strong>Ano:</strong> 2023-2024</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Edifício comercial moderno com estrutura em concreto armado, fachada em vidro e alumínio, sistema de ar condicionado central, elevadores de alta velocidade e estacionamento subterrâneo.</p>
                        
                        <h4>Desafios Superados</h4>
                        <ul>
                            <li>Construção em área urbana densa</li>
                            <li>Logística de materiais otimizada</li>
                            <li>Sustentabilidade ambiental</li>
                            <li>Tecnologia de ponta aplicada</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto2: {
            title: 'Sistema de Drenagem Urbana',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sistema de Drenagem" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Setor Sul - Palmas-TO</li>
                            <li><strong>Extensão:</strong> 5 km de rede</li>
                            <li><strong>Capacidade:</strong> 2.000 L/s</li>
                            <li><strong>Prazo:</strong> 12 meses</li>
                            <li><strong>Ano:</strong> 2023</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Sistema completo de drenagem urbana incluindo galerias, bueiros, bocas de lobo e bacias de contenção para controle de águas pluviais em área residencial.</p>
                        
                        <h4>Benefícios</h4>
                        <ul>
                            <li>Eliminação de alagamentos</li>
                            <li>Proteção ambiental</li>
                            <li>Melhoria da qualidade de vida</li>
                            <li>Sustentabilidade hídrica</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto3: {
            title: 'Reforma Residencial Completa',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Reforma Residencial" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Quadra 104 Sul</li>
                            <li><strong>Área:</strong> 300 m²</li>
                            <li><strong>Cômodos:</strong> 4 quartos, 3 banheiros</li>
                            <li><strong>Prazo:</strong> 6 meses</li>
                            <li><strong>Ano:</strong> 2024</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Reforma completa incluindo modernização de instalações elétricas e hidráulicas, novos acabamentos, ampliação da área social e criação de espaço gourmet.</p>
                        
                        <h4>Melhorias Realizadas</h4>
                        <ul>
                            <li>Conceito aberto na área social</li>
                            <li>Automação residencial</li>
                            <li>Eficiência energética</li>
                            <li>Design contemporâneo</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto4: {
            title: 'Pavimentação Avenida Principal',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pavimentação" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Avenida Teotônio Segurado</li>
                            <li><strong>Extensão:</strong> 5 km</li>
                            <li><strong>Largura:</strong> 4 faixas</li>
                            <li><strong>Prazo:</strong> 8 meses</li>
                            <li><strong>Ano:</strong> 2023</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Recapeamento asfáltico completo com nova sinalização horizontal e vertical, melhorias na drenagem e instalação de ciclovias.</p>
                        
                        <h4>Melhorias Implementadas</h4>
                        <ul>
                            <li>Asfalto de alta durabilidade</li>
                            <li>Sinalização LED</li>
                            <li>Acessibilidade universal</li>
                            <li>Sustentabilidade ambiental</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto5: {
            title: 'Fundação Galpão Industrial',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fundação Industrial" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Distrito Industrial</li>
                            <li><strong>Área:</strong> 2.000 m²</li>
                            <li><strong>Tipo:</strong> Fundação profunda</li>
                            <li><strong>Prazo:</strong> 4 meses</li>
                            <li><strong>Ano:</strong> 2024</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Execução de fundação profunda com estacas pré-moldadas para suporte de galpão industrial de grande porte com equipamentos pesados.</p>
                        
                        <h4>Especificações Técnicas</h4>
                        <ul>
                            <li>120 estacas de 12m</li>
                            <li>Capacidade: 50 ton/estaca</li>
                            <li>Controle tecnológico rigoroso</li>
                            <li>Garantia estrutural</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto6: {
            title: 'Demolição Controlada',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Demolição" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Setor Industrial</li>
                            <li><strong>Estrutura:</strong> Galpão de 1.500 m²</li>
                            <li><strong>Altura:</strong> 15 metros</li>
                            <li><strong>Prazo:</strong> 2 meses</li>
                            <li><strong>Ano:</strong> 2023</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Demolição controlada de estrutura industrial obsoleta com remoção segura de materiais e preparação do terreno para nova construção.</p>
                        
                        <h4>Procedimentos de Segurança</h4>
                        <ul>
                            <li>Isolamento da área</li>
                            <li>Remoção de materiais perigosos</li>
                            <li>Reciclagem de entulho</li>
                            <li>Limpeza completa do terreno</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto7: {
            title: 'Conjunto Residencial',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Conjunto Residencial" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Taquaralto</li>
                            <li><strong>Unidades:</strong> 50 casas</li>
                            <li><strong>Área por casa:</strong> 70 m²</li>
                            <li><strong>Prazo:</strong> 24 meses</li>
                            <li><strong>Ano:</strong> 2022-2024</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Conjunto habitacional popular com casas de 2 quartos, infraestrutura completa, área de lazer e sustentabilidade ambiental.</p>
                        
                        <h4>Infraestrutura</h4>
                        <ul>
                            <li>Rede elétrica e hidráulica</li>
                            <li>Pavimentação interna</li>
                            <li>Área de lazer comunitária</li>
                            <li>Paisagismo sustentável</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto8: {
            title: 'Reforma Shopping Center',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Shopping Center" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Palmas Shopping</li>
                            <li><strong>Área:</strong> 5.000 m²</li>
                            <li><strong>Lojas:</strong> 80 unidades</li>
                            <li><strong>Prazo:</strong> 10 meses</li>
                            <li><strong>Ano:</strong> 2023</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Modernização completa de fachada, áreas comuns, sistema de climatização e adequação às normas de acessibilidade e segurança.</p>
                        
                        <h4>Melhorias Realizadas</h4>
                        <ul>
                            <li>Nova fachada moderna</li>
                            <li>LED em toda iluminação</li>
                            <li>Acessibilidade universal</li>
                            <li>Sustentabilidade energética</li>
                        </ul>
                    </div>
                </div>
            `
        },
        projeto9: {
            title: 'Drenagem Rural',
            content: `
                <div class="modal-project">
                    <div class="project-gallery" style="margin-bottom: 1.5rem;">
                        <img src="https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Drenagem Rural" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    
                    <div class="project-details">
                        <h4>Detalhes do Projeto</h4>
                        <ul>
                            <li><strong>Localização:</strong> Zona Rural de Palmas</li>
                            <li><strong>Área:</strong> 500 hectares</li>
                            <li><strong>Extensão:</strong> 15 km de canais</li>
                            <li><strong>Prazo:</strong> 14 meses</li>
                            <li><strong>Ano:</strong> 2023-2024</li>
                        </ul>
                        
                        <h4>Características</h4>
                        <p>Sistema de drenagem para área agrícola incluindo canais de drenagem, comportas e sistema de bombeamento para controle do nível d'água.</p>
                        
                        <h4>Benefícios Ambientais</h4>
                        <ul>
                            <li>Preservação do solo</li>
                            <li>Controle de erosão</li>
                            <li>Melhoria da produtividade</li>
                            <li>Sustentabilidade hídrica</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };
    
    return projects[projectId] || null;
}


// ===== PROJECT FILTERS =====
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter__btn");
    const projectCards = document.querySelectorAll(".project__card");

    // guarda display original
    projectCards.forEach((card) => {
        const style = window.getComputedStyle(card);
        card.dataset.origDisplay = style.display === "none" ? "block" : style.display;
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter || "all";

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            filterProjects(filter, projectCards);
            currentFilter = filter;
        });
    });

    filterProjects(currentFilter, projectCards);
}

function filterProjects(filter, projectCards) {
    projectCards.forEach((card) => {
        const category = card.dataset.category || "";

        if (filter === "all" || category === filter) {
            card.style.display = card.dataset.origDisplay || "block";
            card.style.animation = "fadeInUp 0.5s ease-out";
        } else {
            card.style.display = "none";
        }
    });
}



function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq__answer');
    const isActive = element.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq__question').forEach(q => {
        q.classList.remove('active');
        q.parentElement.querySelector('.faq__answer').classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// ===== LOAD MORE PROJECTS =====
function loadMoreProjects() {
    const hiddenProjects = document.querySelectorAll('.project__card[style*="display: none"]');
    const projectsToShow = Array.from(hiddenProjects).slice(0, 6);
    
    projectsToShow.forEach(project => {
        project.style.display = 'block';
        project.style.animation = 'fadeInUp 0.5s ease-out';
    });
    
    if (hiddenProjects.length <= 6) {
        document.getElementById('loadMoreBtn').style.display = 'none';
    }
}

// ===== COUNTERS ANIMATION =====
function initializeCounters() {
    const counters = document.querySelectorAll('.statistic__number, .stat h3');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.service-preview__card, .project-preview__card, .mvv__card, .differential, .statistic, .testimonial');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.home__image, .about-preview__image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <div class="notification__icon">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification__message">${message}</div>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initializeBackToTop);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

console.log('SANTEC Website JavaScript loaded successfully!');



// ===== SERVICE CARD IMAGE CAROUSEL =====
function initializeServiceCarousels() {
    document.querySelectorAll(".services-preview__container .service-preview__card").forEach(card => {
        const images = card.querySelectorAll(".service-preview__image");
        const dots = card.querySelectorAll(".dot");
        let currentImageIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove("active");
                if (i === index) {
                    img.classList.add("active");
                }
            });
            dots.forEach((dot, i) => {
                dot.classList.remove("active");
                if (i === index) {
                    dot.classList.add("active");
                }
            });
        }

        dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                currentImageIndex = slideIndex;
                showImage(currentImageIndex);
            });
        });

        // Auto-advance carousel
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }, 5000); // Change image every 5 seconds
    });
}

// Add this to initializeWebsite or DOMContentLoaded
// Make sure to call initializeServiceCarousels() after the DOM is loaded
// For now, I'll add it to initializePageFeatures() as it's page-specific

function initializePageFeatures() {
    // === Serviços ===
    if (document.querySelector(".services-preview__container") || document.querySelector(".services__container")) {
        initializeServiceCarousels();
    }

    // === Projetos ===
    if (document.querySelectorAll(".filter__btn").length > 0) {
        initializeProjectFilters();
    }

    // === Botão "Carregar Mais" ===
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", loadMoreProjects);
    }

    // === Contadores ===
    initializeCounters();
}


 document.addEventListener("DOMContentLoaded", function() {
     if (!document.querySelector("#contact-form")){
        return
     }

    const form = document.getElementById("contact-form");
      const messageBox = document.getElementById("form-message");

      form.addEventListener("submit", async function(e) {
        e.preventDefault(); // Impede o redirecionamento padrão

        const formData = new FormData(form);
        messageBox.style.display = "none";

        try {
          const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
           showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
          } else {
            messageBox.textContent = "Erro ao enviar. Tente novamente mais tarde ❌";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
          }
        } catch (error) {
          messageBox.textContent = "Ocorreu um erro de conexão ❌";
          messageBox.style.color = "red";
          messageBox.style.display = "block";
        }
      });
    });