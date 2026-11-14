/* All content for the site lives here. Edit this file to update the page. */
window.DATA = {
  email: 'adithya210207.v@gmail.com',

  work: [
    {
      slug: "tqq-chatbox", page: {
        title: "TQQ Chatbox — offline AI chat with the five Nakano sisters | Adithya V",
        desc: "TQQ Chatbox by Adithya V: a JavaFX desktop app where Ichika, Nino, Miku, Yotsuba and Itsuki from The Quintessential Quintuplets are each their own fine-tuned Llama-3 8B model, running fully offline with Ollama.",
        about: [
          "Character chatbots usually run one model in five costumes: they break character, invent memories and need the cloud. In TQQ Chatbox each of the Nakano sisters, Ichika, Nino, Miku, Yotsuba and Itsuki, is her own fine-tuned language model, faithful to The Quintessential Quintuplets and running entirely on a laptop.",
          "The data: every episode's subtitles became one master transcript, cut into each character's real scenes, plus 80 to 212 hand-written chats per character covering facts, traps and \"I'm not sure\".",
          "The training: QLoRA on Llama-3 8B with Unsloth on a free Colab T4, in 4-bit at rank 16 for two epochs. Each model is merged and exported as an 8.5 GB GGUF file for Ollama.",
          "The safety checks: before you see a reply, word rules and a phi4-mini judge check it for wrong facts and invented memories, and quietly ask the model again when it slips. In testing the judge refused 69 of 70 invented memories with 0 false alarms out of 70."
        ],
        related: ["ryuu-v1","personality-ai-chatbox"]
      },
      art: 'five', featured: true, title: 'TQQ Chatbox', preview: 'img/preview/tqq.jpg', kind: 'Five fine-tuned models, one app',
      desc: 'A desktop chat app where each of the five Nakano sisters from The Quintessential Quintuplets is her own fine-tuned language model, not one model wearing five costumes. It runs fully offline, and two hidden safety checks re-ask her whenever a reply gets a fact wrong or invents a memory.',
      facts: ['Five Llama-3 8B models, fine-tuned with QLoRA on 700 to 890 chats each', 'A phi4-mini judge caught 69 of 70 invented memories in testing', 'Beat the untuned model in blind tests for every sister, for example 83 to 11 for Ichika'],
      shots: [['img/work/tqq-home.jpg', 'TQQ Chatbox home screen: five portrait panels, one for each Nakano sister'], ['img/work/tqq-chat.jpg', 'A chat with Miku in TQQ Chatbox, each reply led by an italic scene line']],
      stack: 'Java · JavaFX · Ollama · Llama-3 8B · QLoRA · Unsloth',
      links: [['View the code', 'https://github.com/Adithya210207/tqq-chatbox'], ['See the models', 'https://huggingface.co/Adithya210207-Ryuu']]
    },
    {
      slug: "ryuu-explainer-ai", page: {
        title: "Ryuu Explainer AI — private offline AI coding assistant | Adithya V",
        desc: "Ryuu Explainer AI by Adithya V: a private desktop AI that explains concepts, debugs code and writes it in any language, running on local models with Ollama, even on Intel Arc integrated graphics.",
        about: [
          "Ryuu is an AI explainer and coding assistant that lives on your own computer. Ask it to explain a concept, debug some code or write code in any language, and pick a level from beginner upwards so the answer fits you.",
          "You can attach screenshots, PDFs and code files, or paste an image straight in. When an image needs reading, Ryuu swaps to a vision model for that reply, keeping only one model loaded on the GPU at a time.",
          "Conversations are saved locally, searchable and exportable as JSON or text. Everything runs through Ollama with no accounts and no API keys, including on Intel Arc integrated graphics through Vulkan."
        ],
        related: ["tqq-chatbox","cs-gpt"]
      },
      art: 'chat', title: 'Ryuu Explainer AI', preview: 'img/preview/ryuu.jpg', kind: 'Offline AI assistant',
      desc: 'A private desktop assistant that explains concepts, debugs code and writes it in any language. It runs entirely on local models, including on Intel Arc integrated graphics.',
      facts: ['Five switchable local models, with only one loaded on the GPU at a time', 'Reads screenshots and attached files', 'No accounts, no API keys, nothing leaves the machine'],
      shots: [['img/work/ryuu-chat.jpg', 'Ryuu explaining recursion in Python with a worked factorial example, running on qwen2.5-coder 14B'], ['img/work/ryuu-home.jpg', 'Ryuu greeting a new chat, with model switching and saved conversations']],
      stack: 'Python · Tkinter · Ollama · Vulkan',
      links: [['View the code', 'https://github.com/Adithya210207/ryuu-explainer-ai']]
    },
    {
      art: 'window', title: 'KCT IDEA Lab website', preview: 'img/preview/idealab.jpg', kind: 'College website, built solo',
      desc: 'The official website of my college\'s AICTE IDEA Lab. I designed it, built it and keep it running on my own, including the hackathon portal behind the Industry Connect Hackathon 2026 and the Smart City Hackathon 2026, which I helped conduct as their software builder.',
      facts: ['Designed, built and maintained alone in semester three', 'A hackathon portal for problem statements, guidelines, team registration and submissions', 'Industry Connect Hackathon 2026 at KCT on 10 and 11 April', 'Smart City Hackathon 2026, run with IEEE Smart Cities from 8 August to 13 October'],
      shots: [['img/work/idealab-home.jpg', 'The KCT AICTE IDEA Lab home page'], ['img/work/idealab-hackathon.jpg', 'The Industry Connect Hackathon 2026 page I built on the IDEA Lab site']],
      stack: 'Web design · Front end · Deployment · Support',
      links: [['Visit the site', 'https://idealab.kct.ac.in/']]
    },
    {
      slug: "personality-ai-chatbox", page: {
        title: "Personality AI Chatbox — anime character AI chatbot | Adithya V",
        desc: "Personality AI Chatbox by Adithya V: an offline anime character chatbot with five personas, each with its own voice, theme and avatar, a two-character Trio Chat and live streaming replies from a local model.",
        about: [
          "Anime Personality AI Chatbox is a desktop chatbot in which every character has a distinct voice, interface theme and avatar, from Rem and Lelouch to Miku, Kirito and Yuhee.",
          "Replies stream live from a local model through Ollama, with live controls for temperature, top-p and token limits. Each persona adds its own touches, such as Rem's bond status and Lelouch's strategic alignment panel.",
          "Trio Chat puts two characters in one conversation with you, each answering in their own voice, and chat history keeps every conversation."
        ],
        related: ["tqq-chatbox","ryuu-explainer-ai"]
      },
      art: 'duo', title: 'Personality AI', preview: 'img/preview/persona.jpg', kind: 'Character chatbot',
      desc: 'A desktop chatbot in which every character has a distinct voice, theme and avatar, with replies streaming live from a local model.',
      facts: ['Five personas, each with its own interface theme', 'Trio Chat, where two characters answer together', 'Live controls for temperature, top-p and token limits'],
      crop: true, shots: [['img/work/persona-rem.jpg', 'Chatting with Rem in Personality AI, with her portrait and bond status beside the conversation'], ['img/work/persona-lelouch.jpg', 'Chatting with Lelouch in Personality AI, with his strategic alignment panel']],
      stack: 'Python · Tkinter · Ollama',
      links: [['View the code', 'https://github.com/Adithya210207/personality-ai-chatbot']]
    },
    {
      slug: "pawfinder", page: {
        title: "PawFinder — dog adoption and rescue platform for India | Adithya V",
        desc: "PawFinder by Adithya V: a live dog adoption and rescue platform for India, with dog profiles, verified Coimbatore shelters, adoption applications, fostering, emergency helplines and care articles.",
        about: [
          "PawFinder connects people in India with stray and shelter dogs. You can browse dogs with health and personality records, filter by age, size and vaccination, and see which dogs urgently need a home.",
          "The platform covers the whole journey: a shelter directory, guided adoption applications with live status, short-term fostering, volunteering, chat with shelters, rescue reports, emergency helplines and a library of care articles.",
          "It is built with Node.js and Express on SQLite, with live chat over Socket.IO, and also ships as a Windows desktop app built with Electron."
        ],
        related: ["automobile-lab"]
      },
      art: 'paw', title: 'PawFinder', preview: 'img/preview/pawfinder.jpg', kind: 'Web platform, live',
      desc: 'An adoption and rescue platform for India that connects people with stray dogs, shelters, emergency helplines and foster programmes.',
      facts: ['52 dog profiles with health and personality records', '18 partner shelters and 26 care articles', 'Emergency helpline, rescue reports and foster sign-up'],
      shots: [['img/work/pawfinder-discover.jpg', 'PawFinder discover page with urgent dogs, filters and the featured dog'], ['img/work/pawfinder-shelters.jpg', 'PawFinder shelter directory with verified Coimbatore shelters']],
      stack: 'JavaScript · HTML · CSS · Render',
      links: [['Open the live site', 'https://pawfinder-xvjk.onrender.com/'], ['View the code', 'https://github.com/Adithya210207/pawfinder']]
    },
    {
      slug: "automobile-lab", page: {
        title: "Automobile Lab — Arduino speedometer to adaptive cruise control | Adithya V",
        desc: "Automobile Lab by Adithya V: an Arduino and STM32 speedometer grown version by version into adaptive cruise control, with gear modes, a laser time-of-flight sensor and a live Web Serial dashboard.",
        about: [
          "Automobile Lab started as a throttle reading and grew, version by version, into adaptive cruise control. A live dashboard in the browser reads the board over Web Serial and shows speed on an animated gauge.",
          "It has Eco, Normal and Sport gear modes, forward and reverse with reverse capped at 5 km/h, brake input, and cruise control.",
          "Adaptive cruise keeps a two-second gap to the vehicle ahead using a laser time-of-flight sensor, or follows a target speed set on a second potentiometer, with rate limiting so the speed changes smoothly."
        ],
        related: ["pawfinder","cs-gpt"]
      },
      art: 'gauge', title: 'Automobile Lab', preview: 'img/preview/automobile.jpg', kind: 'Hardware and web interface',
      desc: 'An Arduino speedometer that grew, version by version, into adaptive cruise control with a live web dashboard over serial.',
      facts: ['Six versions, from a throttle reading to cruise control', 'Three gear modes with brake and cruise inputs', 'Laser time-of-flight sensor for distance keeping'],
      shots: [['img/work/automobile-dashboard.jpg', 'The live speedometer dashboard in Sport mode at 56 km/h']],
      stack: 'Arduino C++ · Web Serial · JavaScript',
      links: [['View the code', 'https://github.com/Adithya210207/automobile-lab-projects']]
    },
    {
      slug: "cs-gpt", page: {
        title: "CS GPT for CBSE Class 11 & 12 — Computer Science programs in Python | Adithya V",
        desc: "CS GPT by Adithya V: the CBSE Class 11 and 12 Computer Science syllabus as runnable Python programs in a VS Code-styled window, each with its source code one key away.",
        about: [
          "CS GPT turns the CBSE Computer Science syllabus into programs you can run. It opens in a VS Code-styled terminal window and lets you pick a topic from a menu.",
          "The Class 11 app has seventeen programs, from a calculator, palindromes and prime, Armstrong, neon and perfect numbers to patterns, tables, a dice game, data types, modules and sorting.",
          "The Class 12 app covers functions and their arguments, scope, recursion such as the Tower of Hanoi, exception handling, text, binary and CSV file handling, stacks, SQL and Python-SQL connectivity. Every program can show its own source code before it runs."
        ],
        related: ["ryuu-explainer-ai","automobile-lab"]
      },
      art: 'code', title: 'CS GPT for CBSE 11 & 12', preview: 'img/preview/csgpt.jpg', kind: 'Learning tool',
      desc: 'The CBSE Computer Science syllabus as runnable programs inside a VS Code-styled window. The study tool I wished I had at school.',
      facts: ['Pattern generators, sorting algorithms and data-type drills', 'Calculators, games and data-structure demonstrations', 'One application each for Class 11 and Class 12'],
      shots: [['img/work/csgpt-11-menu.jpg', 'The Class 11 CS GPT menu of seventeen runnable programs in a VS Code-styled terminal'], ['img/work/csgpt-12-hanoi.jpg', 'Class 12 CS GPT showing the source code of its recursive Tower of Hanoi program']],
      stack: 'Python · GUI',
      links: [['View the code', 'https://github.com/Adithya210207/cs-gpt-cbse-11-12']]
    },
    {
      slug: "ryuu-v1", page: {
        title: "ryuu_v1 — five fine-tuned Llama-3 8B GGUF models on Hugging Face | Adithya V",
        desc: "The ryuu_v1 models by Adithya V: Ichika_ryuu_v1, Nino_ryuu_v1, Miku_ryuu_v1, Yotsuba_ryuu_v1 and Itsuki_ryuu_v1, fine-tuned Llama-3 8B character models published as GGUF files for Ollama.",
        about: [
          "ryuu_v1 is the set of five character models behind TQQ Chatbox: Ichika_ryuu_v1, Nino_ryuu_v1, Miku_ryuu_v1, Yotsuba_ryuu_v1 and Itsuki_ryuu_v1, one for each of the Nakano sisters from The Quintessential Quintuplets.",
          "Each is a Llama-3 8B model (built on Stheno v3.2) fine-tuned with QLoRA on 700 to 890 chats, then merged and exported as an 8.5 GB Q8_0 GGUF file.",
          "They are public on Hugging Face under Adithya210207-Ryuu, and each one ships with its own Modelfile so it runs offline in Ollama."
        ],
        related: ["tqq-chatbox","ryuu-explainer-ai"]
      },
      art: 'layers', title: 'Ryuu v1 models', preview: 'img/preview/models.jpg', kind: 'Five open models',
      desc: 'The five sisters from TQQ Chatbox, published on Hugging Face so that anyone can download them and run them offline.',
      facts: ['Ichika, Nino, Miku, Yotsuba and Itsuki ryuu_v1', 'Llama-3 8B, merged and exported as 8.5 GB Q8_0 GGUF files', 'Each ships with its own Modelfile for Ollama'],
      shots: [['img/work/models-hub.jpg', 'My Hugging Face page with the five ryuu_v1 models'], ['img/work/models-miku.jpg', 'The Miku_ryuu_v1 model card on Hugging Face']],
      stack: 'Hugging Face · GGUF · Ollama',
      links: [['Open the model hub', 'https://huggingface.co/Adithya210207-Ryuu']]
    }
  ],

  skills: [
    ['AI and models', ['Fine-tuning with QLoRA', 'Local LLMs with Ollama', 'Dataset building', 'Prompt design', 'AI agents and MCP', 'GGUF models']],
    ['Web', ['HTML and CSS', 'JavaScript', 'React', 'Node.js and Express', 'MongoDB']],
    ['Firmware', ['ARM Cortex-M4', 'RTOS', 'Arduino C++', 'ADC, DAC, PWM, USART', 'Web Serial']],
    ['Foundations', ['Python', 'Java and JavaFX', 'C', 'Data structures and algorithms', 'Operating systems', 'Data analytics']],
    ['Beyond code', ['UI and UX design', 'Digital marketing', 'English, Cambridge B2', 'First aid']]
  ],

  /* id, title, category, issuer, date, verify link */
  certs: [
    [1, 'Firmware internship, ARM Cortex-M4', 'Development', 'Axiswin Technologies', 'Jul 2026'],
    [27, 'Finance Management traineeship', 'Beyond code', 'Maiyam', 'Nov 2026'],
    [28, 'Operating Systems', 'Development', 'Scaler Topics', 'Nov 2026'],
    [12, 'Data Analytics traineeship', 'Development', 'Maiyam', 'Jun 2026'],
    [13, 'Digital Marketing traineeship', 'Beyond code', 'Maiyam', 'May 2026'],
    [22, 'UI / UX Design traineeship', 'Beyond code', 'Maiyam', 'Apr 2026'],
    [7, 'AI Tools and ChatGPT workshop', 'AI', 'be10x', 'Apr 2026'],
    [23, 'The Agentic Future', 'AI', 'Yugam 2026, KCT', 'Mar 2026'],
    [24, 'Building LLMs from Scratch', 'AI', 'Yugam 2026, KCT', 'Mar 2026'],
    [9, 'C Programming', 'Development', 'iamneo, KCT', 'Feb 2026'],
    [5, 'Artificial Intelligence traineeship', 'AI', 'Maiyam', '2026'],
    [16, 'Full-Stack MERN traineeship', 'Development', 'Maiyam', '2026'],
    [15, 'Emerging Domains in Computing', 'Development', 'KCT and Coursera', 'Nov 2025', 'https://coursera.org/verify/W1EDP9VJY8DJ'],
    [14, 'Emerging Domains', 'Development', 'KCT and Coursera', 'Nov 2025', 'https://coursera.org/verify/DFQBQ8SNFCMP'],
    [6, 'PEER Life Support and First Aid', 'Beyond code', 'ALERT NGO', 'Oct 2025'],
    [3, 'Google AI Essentials', 'AI', 'Google and Coursera', 'Apr 2025', 'https://coursera.org/verify/PZKJWB56XLKV'],
    [4, 'AI for Youth', 'AI', 'Intel and CBSE', 'Nov 2024'],
    [11, 'Cambridge English, B2, score 167', 'Beyond code', 'Cambridge English', 'Jul 2024', 'https://cambridgeenglish.org/verifiers'],
    [10, 'Cambridge English certificate', 'Beyond code', 'Cambridge English', 'Jul 2024'],
    [2, 'AI Automation and Agents Expert', 'AI', 'Digital Scholar', ''],
    [17, 'Generative AI Expert', 'AI', 'Digital Scholar', ''],
    [20, 'Python Programming', 'Development', 'iamneo, KCT', ''],
    [18, 'C Programming and DSA', 'Development', 'Intellipaat', ''],
    [19, 'Data Structures using C', 'Development', 'Mindluster', ''],
    [21, 'Fundamentals of Data Structures in C', 'Development', 'Simplilearn SkillUp', ''],
    [8, 'Best Scientific and ICT Skills, Class 11', 'Beyond code', 'SSVM School of Excellence', '']
  ].map(([id, title, cat, issuer, date = '', verify = '']) => {
    const n = String(id).padStart(2, '0');
    const paper = null;
    const img = { 27: 'certificates/thumbs/27.png', 28: 'certificates/thumbs/28.jpg' }[id] || (paper ? '' : `certificates/thumbs/${n}.webp`);
    return { id, title, cat, issuer, date, verify, paper, img, file: id === 28 ? img : `certificates/pdf/${n}.pdf` };
  }),

  journey: [
    ['Now', 'A one-person web team at the KCT IDEA Lab', 'In my third semester I designed, built and now maintain idealab.kct.ac.in on my own and handle its support.'],
    ['2026', 'Smart City Hackathon 2026', 'Helped conduct the IDEA Lab and IEEE Smart Cities hackathon on local urban challenges, from 8 August to 13 October, as its software builder, running the portal for problem statements, team registrations and submissions.'],
    ['2026', 'Five fine-tuned models and TQQ Chatbox', 'Built datasets from every episode\'s subtitles plus hand-written chats, fine-tuned five Llama-3 8B models with QLoRA on Google Colab, and published them on Hugging Face inside an offline JavaFX app.'],
    ['2026', 'Firmware internship at Axiswin Technologies', 'Bare-metal firmware for an ARM Cortex-M4 intelligent battery monitor: RTOS tasks, PWM for electric vehicles, and GPIO, ADC, DAC and USART drivers.'],
    ['2026', 'Industry Connect Hackathon 2026', 'Built and ran the IDEA Lab portal for KCT\'s Industry Connect Hackathon on 10 and 11 April, with its problem statements, team registration and submissions.'],
    ['2026', 'A year of traineeships and workshops', 'Artificial intelligence, data analytics, full-stack MERN, UI/UX, digital marketing and finance with Maiyam, and two Yugam workshops on agentic AI and building LLMs from scratch.'],
    ['2025', 'Computer Science and Engineering at KCT', 'Began a BE at Kumaraguru College of Technology, Coimbatore. Register number 25BCS016.'],
    ['2025', 'School topper in Computer Science', 'CBSE Class XII at SSVM School of Excellence, with 99 out of 100 in Computer Science, 93 in Mathematics and 91 in English.'],
    ['2024', 'Cambridge English, level B2', 'An overall score of 167, with 182 in Speaking. In the same year, Intel\'s AI for Youth programme.'],
    ['2023', 'CBSE Class X', 'Secondary School Examination at Air Force School, Redfields, Coimbatore.']
  ]
};
