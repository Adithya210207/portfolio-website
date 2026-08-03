/* ==========================================
   Portfolio Application Logic & Interactivity
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initThemeToggle();
  initTypingEffect();
  initNavigation();
  initSearchAndFilter();
  initContactForm();
  initModals();
});

/* ------------------------------------------
   1. Interactive Particle Canvas Background
   ------------------------------------------ */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = Math.min(window.innerWidth < 768 ? 35 : 70, 80);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? `rgba(139, 92, 246, ${this.alpha})` : `rgba(6, 182, 212, ${this.alpha * 0.8})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = isDark ? `rgba(6, 182, 212, ${opacity})` : `rgba(139, 92, 246, ${opacity * 0.7})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ------------------------------------------
   2. Theme Toggle Handler
   ------------------------------------------ */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

/* ------------------------------------------
   3. Dynamic Typing Effect
   ------------------------------------------ */
function initTypingEffect() {
  const element = document.getElementById('typing-text');
  if (!element) return;

  const roles = [
    'Axiswin Tech Firmware Intern (Reg: 25BCS016)',
    'ARM Cortex-M4 Battery Monitoring Firmware',
    'Maiyam Data Analytics Traineeship',
    'Maiyam Digital Marketing Traineeship',
    'Maiyam UI/UX Design Traineeship',
    'YUGAM 2026: The Agentic Future Workshop',
    'YUGAM 2026: Building LLMs from Scratch',
    'Emerging Domains in Computing (KCT Coursera)',
    'iamneo C Programming at KCT',
    'Cambridge Advanced English (B2 - Score 167)',
    'Google AI Essentials Certified',
    'Intel AI for Youth Program'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ------------------------------------------
   4. Navigation Menu
   ------------------------------------------ */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer) navLinksContainer.classList.remove('active');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* ------------------------------------------
   5. Interactive Real-Time Search & Category Filter
   ------------------------------------------ */
function initSearchAndFilter() {
  const searchInput = document.getElementById('cert-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certItems = document.querySelectorAll('.cert-item');

  let activeCategory = 'all';

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    certItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const text = item.textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = (!query || text.includes(query));

      if (matchesCategory && matchesSearch) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });
}

/* ------------------------------------------
   6. Native Mobile & Desktop Mailto Builder
   ------------------------------------------ */
function formatMailtoUrl(subject, body) {
  const to = 'adithya210207.v@gmail.com';
  // Use %0D%0A (CRLF) for guaranteed newline parsing in Gmail App on Android/iOS
  const cleanSub = encodeURIComponent(subject || 'Portfolio Inquiry for Adithya V').replace(/%0A/g, '%0D%0A');
  const cleanBody = encodeURIComponent(body || '').replace(/%0A/g, '%0D%0A');

  return `mailto:${to}?subject=${cleanSub}&body=${cleanBody}`;
}

/* ------------------------------------------
   7. Strict Form Validation & Gmail App Launcher
   ------------------------------------------ */
function initContactForm() {
  const nameEl = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const msgEl = document.getElementById('contact-message');
  const sendLink = document.getElementById('send-msg-link');

  if (!sendLink) return;

  function validateInputs() {
    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const message = msgEl ? msgEl.value.trim() : '';

    const isNameValid = name.length > 0;
    const isEmailValid = email.length > 0 && email.includes('@') && email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1;
    const isMsgValid = message.length > 0;

    return {
      isValid: isNameValid && isEmailValid && isMsgValid,
      isNameValid,
      isEmailValid,
      isMsgValid,
      name,
      email,
      message
    };
  }

  sendLink.addEventListener('click', (e) => {
    const validation = validateInputs();

    if (!validation.isValid) {
      e.preventDefault(); // Stop navigation if validation fails
      
      if (!validation.isNameValid) {
        showToast('Please enter your name.');
      } else if (!validation.isEmailValid) {
        showToast('Please enter a valid email address containing @');
      } else if (!validation.isMsgValid) {
        showToast('Please enter a message.');
      }
      return false;
    }

    // When valid: format mailto URL with pre-filled fields & CRLF newlines
    const subject = `Portfolio Inquiry from ${validation.name}`;
    const body = `Name: ${validation.name}\nSender Email: ${validation.email}\n\nMessage:\n${validation.message}`;
    
    sendLink.href = formatMailtoUrl(subject, body);
    showToast(`Opening Gmail App for ${validation.name}...`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ------------------------------------------
   8. Interactive Credential Detail Modal Map
   ------------------------------------------ */
const certModalDetails = {
  axiswin: {
    title: 'Axiswin Technologies Internship Certificate',
    category: 'Internship Program',
    date: 'Issued: 04th JULY 2026 (22.06.2026 - 04.07.2026)',
    desc: 'Completed Internship Program at Axiswin Technologies, Coimbatore for Mr. V. Adithya (Reg. No: 25BCS016) from Kumaraguru College of Technology.',
    details: `
      <div><strong>Project Title:</strong> "Firmware Development for an ARM Cortex-M4 Based Intelligent Battery Monitoring Application"</div>
      <div style="margin-top:0.5rem;"><strong>Technical Experience:</strong> Bare-Metal Programming, 8-bit/32-bit Microcontroller Programming, ARM Cortex Architecture, Device Drivers (GPIO, ADC, DAC, Timers, USART), PWM for EV, RTOS (Task Creation, Scheduling, Multitasking).</div>
      <div style="margin-top:0.5rem;"><strong>Signatory:</strong> Authorized Signatory, Axiswin Technologies (Ref: CBE-10)</div>
    `
  },
  maiyam_data: {
    title: 'Data Analytics Traineeship',
    category: 'Maiyam Traineeship',
    date: '04 Jun 2026',
    desc: 'Certificate of Traineeship awarded to Adithya V for completing Data Analytics Traineeship under Maiyam (மயம்).',
    details: `
      <div><strong>Credential ID:</strong> MYMDATA3646</div>
      <div><strong>Mentors:</strong> Loganathan V (Data Analytics Mentor) & Varun Sivachandran (Chief Product Officer)</div>
      <div><strong>Accreditation:</strong> DPIIT #startupindia / MSME / ISO 9001:2015</div>
    `
  },
  maiyam_dm: {
    title: 'Digital Marketing Traineeship',
    category: 'Maiyam Traineeship',
    date: '06 May 2026',
    desc: 'Certificate of Traineeship awarded to Adithya V for completing Digital Marketing Traineeship under Maiyam (மயம்).',
    details: `
      <div><strong>Credential ID:</strong> MYMDM2700</div>
      <div><strong>Mentors:</strong> Rajesh R (Digital Marketing Mentor) & Varun Sivachandran (Chief Product Officer)</div>
      <div><strong>Accreditation:</strong> DPIIT #startupindia / MSME / ISO 9001:2015</div>
    `
  },
  maiyam_uiux: {
    title: 'UI/UX Design Traineeship',
    category: 'Maiyam Traineeship',
    date: '08 Apr 2026',
    desc: 'Certificate of Traineeship presented to Adithya V for completing UI/UX Design Traineeship.',
    details: `
      <div><strong>Credential ID:</strong> MYMUIUXD2145</div>
      <div><strong>Mentors:</strong> Brandit Designs (Maiyyam Design Partner) & Varun Sivachandran (CPO)</div>
      <div><strong>Accreditation:</strong> DPIIT #startupindia / MSME / ISO 9001:2015</div>
    `
  },
  be10x: {
    title: 'AI Tools and ChatGPT Workshop',
    category: 'Workshop Certificate',
    date: 'April 5th, 2026',
    desc: 'Awarded to ADITHYA V for successful completion of AI tools and ChatGPT workshop by be10x.',
    details: `
      <div><strong>Skills Validated:</strong> Create presentations using AI under 5 min, Analyse data using AI under 30 min, Code and Debug using AI under 10 min.</div>
      <div><strong>Signatories:</strong> Aditya Goenka (Co-founder) & Aditya Kachave (Co-founder)</div>
    `
  },
  yugam_agentic: {
    title: 'The Agentic Future: Reinventing Software Beyond SaaS',
    category: 'YUGAM 2026 Workshop',
    date: '04 March 2026',
    desc: 'Certificate of Participation awarded to Adithya for participating in workshop during YUGAM 2026 Techno Cultural Fest.',
    details: `
      <div><strong>Institution:</strong> Kumaraguru Institutions, Coimbatore</div>
      <div><strong>Signatory:</strong> Dr. Vijilesh V (Associate Dean - Office of Students Affairs & HOD MCA)</div>
    `
  },
  yugam_llm: {
    title: 'Building LLMs from Scratch – GenAI & Prompt Engineering',
    category: 'YUGAM 2026 Workshop',
    date: '03 March 2026',
    desc: 'Certificate of Participation awarded to Adithya for hands-on workshop during YUGAM 2026.',
    details: `
      <div><strong>Institution:</strong> Kumaraguru Institutions, Coimbatore</div>
      <div><strong>Signatory:</strong> Dr. Vijilesh V (Associate Dean - Office of Students Affairs)</div>
    `
  },
  iamneo_c: {
    title: 'C Programming Course (iamneo)',
    category: 'KCT Course Certificate',
    date: '05/02/2026',
    desc: 'Awarded to Adithya V from Kumaraguru College of Technology for completing C Programming Course requirements in First Semester.',
    details: `
      <div><strong>Platform:</strong> neo colab META / iamneo (An NIIT Venture)</div>
      <div><strong>Signatory:</strong> Senthikumar TP</div>
    `
  },
  kct_computing: {
    title: 'Emerging Domains in Computing',
    category: 'KCT Coursera Course',
    date: 'Nov 4, 2025',
    desc: 'Authorized by Kumaraguru College of Technology, Coimbatore and offered through Coursera.',
    details: `
      <div><strong>Verification Link:</strong> https://coursera.org/verify/W1EDP9VJY8DJ</div>
      <div><strong>Signatory:</strong> Dr. Senthil J (Director, Kumaraguru School of Innovation)</div>
    `,
    link: 'https://coursera.org/verify/W1EDP9VJY8DJ'
  },
  kct_domains: {
    title: 'Emerging Domains',
    category: 'KCT Coursera Course',
    date: 'Nov 4, 2025',
    desc: 'Authorized by Kumaraguru College of Technology, Coimbatore and offered through Coursera.',
    details: `
      <div><strong>Verification Link:</strong> https://coursera.org/verify/DFQBQ8SNFCMP</div>
      <div><strong>Signatory:</strong> Dr. Senthil J (Director, Kumaraguru School of Innovation)</div>
    `,
    link: 'https://coursera.org/verify/DFQBQ8SNFCMP'
  },
  peer_alert: {
    title: 'PEER Basic Life Support and First Aid Course',
    category: 'Emergency Response Certification',
    date: 'Issue: Oct 29, 2025 | Expiry: Oct 29, 2026',
    desc: 'Conducted by ALERT NGO for Emergency Response Management to Adithya V.',
    details: `
      <div><strong>Signatories:</strong> Dr. J.S. Rajkumar & Mr. Rajesh R Trivedi</div>
      <div><strong>Endorsed By:</strong> Dept of Health Govt of Tamilnadu & Karnataka and Apollo Hospitals</div>
    `,
    link: 'https://www.alert.ngo'
  },
  cbse12_doc: {
    title: 'CBSE Class XII Senior School Certificate (2025)',
    category: 'Board Examination Record',
    date: 'Declared: 13/05/2025',
    desc: 'Official Marks Statement Cum Certificate for ADITHYA V (Roll No. 20670959) from SSVM School of Excellence Coimbatore TN.',
    details: `
      <div><strong>Computer Science (083):</strong> 99 / 100 (A1)</div>
      <div><strong>Mathematics (041):</strong> 093 / 100 (A1)</div>
      <div><strong>English Core (301):</strong> 091 / 100 (A2)</div>
      <div><strong>Physics (042):</strong> 086 / 100 (A1) | <strong>Chemistry (043):</strong> 081 / 100 (A2)</div>
      <div><strong>Result:</strong> PASS</div>
    `
  },
  google_ai: {
    title: 'Google AI Essentials',
    category: 'Google Coursera Certificate',
    date: 'Apr 19, 2025',
    desc: 'Authorized by Google and offered through Coursera for Adithya v.',
    details: `
      <div><strong>Verification Link:</strong> https://coursera.org/verify/PZKJWB56XLKV</div>
      <div><strong>Signatory:</strong> Amanda Brophy (Global Director of Google Career Certificates)</div>
    `,
    link: 'https://coursera.org/verify/PZKJWB56XLKV'
  },
  intel_ai: {
    title: 'AI for Youth Program in India',
    category: 'Intel Digital Readiness',
    date: 'Nov 4 - Nov 19, 2024',
    desc: 'Participated by Adithya.V in AI for Youth Program in India.',
    details: `
      <div><strong>Ref Code:</strong> AIFYPC20241119330</div>
      <div><strong>Signatories:</strong> Shweta Khurana (Intel) & Dr. Biswajit Saha (Director Skill Education CBSE)</div>
    `
  },
  cambridge_b2: {
    title: 'Cambridge Certificate in Advanced English',
    category: 'Language Certification',
    date: '19 JULY 2024',
    desc: 'Statement of Results for ADITHYA V (Place of entry: Coimbatore). Overall Score: 167 (CEFR Level B2).',
    details: `
      <div><strong>Component Breakdown:</strong> Speaking: 182 | Writing: 171 | Use of English: 169 | Listening: 163 | Reading: 150</div>
      <div><strong>Centre Ref:</strong> IA102 2478 | <strong>Verification Number:</strong> C8142391</div>
    `,
    link: 'https://cambridgeenglish.org/verifiers'
  },
  cbse10_doc: {
    title: 'CBSE Class X Secondary School Certificate (2023)',
    category: 'Board Examination Record',
    date: 'Dated: 12-05-2023',
    desc: 'Official Marks Statement Cum Certificate for V ADITHYA (Roll No. 20196258, DOB: 21-02-2007) from Air Force School AFAC Redfields Coimbatore.',
    details: `
      <div><strong>Mathematics Standard (041):</strong> 085 / 100 (A2)</div>
      <div><strong>Information Technology (402):</strong> 085 / 100 (B1)</div>
      <div><strong>English Lng & Lit (184):</strong> 081 / 100 (B1)</div>
      <div><strong>Result:</strong> PASS</div>
    `
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');

  if (!modalBackdrop || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.openCertModal = function(key) {
    const data = certModalDetails[key];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-date').textContent = data.date;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-details').innerHTML = data.details;

    const linkContainer = document.getElementById('modal-link-container');
    if (data.link) {
      linkContainer.innerHTML = `
        <a href="${data.link}" target="_blank" rel="noopener" class="btn btn-primary" style="padding:0.6rem 1.4rem; font-size:0.875rem;">
          <i class="fas fa-external-link-alt"></i> Open Official Verification
        </a>
      `;
    } else {
      linkContainer.innerHTML = '';
    }

    modalBackdrop.classList.add('active');
  };

  function closeModal() {
    modalBackdrop.classList.remove('active');
  }
}
