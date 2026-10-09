const projects = [
  {
    id: "sora-studio",
    title: "Website Profile Dusun Gatak",
    category: "web",
    categoryLabel: "WEB DESIGN / 2026",
    description: "Sarana publikasi, penyampaian data, dan dokumentasi resmi untuk Dusun Gatak. Situs ini diciptakan guna meningkatkan efektivitas dalam penyebaran informasi kepada warga.",
    image: "assets/img/DusunGatak.png",
    imageAlt: "Moodboard desain dan tipografi di atas meja kerja",
    tags: ["Laravel", "PHP", "SQLite"],
    features: "Informasi Dusun Gatak yang terintegrasi, infografis yang jelas, berita terbaru, dan album foto yang mudah diakses.",
    demo: "https://example.com/",
    source: "https://github.com/khakidd/Website-Profile-Dusun-Gatak"
  },
  {
    id: "lumen-finance",
    title: "Perpustakaan Digital BookHouse",
    category: "web",
    categoryLabel: "WEB DESIGN / 2026",
    description: "Perpustakaan digital yang memudahkan pengguna untuk mengelola koleksi buku, melacak peminjaman, dan menganalisis data penggunaan.",
    image: "assets/img/BookHouse.png",
    imageAlt: "Proses peminjaman buku digital melalui perangkat laptop dan telepon",
    tags: ["PHP", "MySQL", "UX"],
    features: "Ringkasan arus kas, kategori transaksi, visualisasi data dengan kontras jelas, dan navigasi yang konsisten.",
    demo: "https://example.com/",
    source: "https://github.com/khakidd/Perpustakaan-Digital-BookHouse"
  },
  {
    id: "kopi-sore",
    title: "Avana",
    category: "ui",
    categoryLabel: "UI DESIGN / 2025",
    description: "Visualisasi aplikasi pemilahan sampah dan pengelolaan limbah rumah tangga yang dirancang untuk meningkatkan kesadaran lingkungan dan mempermudah proses daur ulang.",
    image: "assets/img/Avana.png",
    imageAlt: "Visualisasi aplikasi pemilahan sampah dan pengelolaan limbah rumah tangga",
    tags: ["React", "E-commerce", "Figma"],
    features: "Katalog ringkas, cerita produk, informasi pengiriman transparan, dan alur pembelian yang dirancang untuk mobile.",
    demo: "https://www.figma.com/proto/hN3DzvBoVkrgMrUFyzAy1D/Avana?node-id=29-612&p=f&t=OIpdbaGIvZ4SrAFV-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=65%3A8669&show-proto-sidebar=1",
    source: "https://github.com/"
  },
  {
    id: "teras-journal",
    title: "Teras Journal",
    category: "product",
    categoryLabel: "EDITORIAL UI / 2026",
    description: "Eksplorasi antarmuka publikasi digital yang mengutamakan keterbacaan, jeda, dan kurasi cerita.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Jurnal terbuka, catatan, dan alat tulis di meja",
    tags: ["UI/UX", "Figma", "Accessibility"],
    features: "Tipografi nyaman, hirarki konten editorial, tampilan daftar dan artikel, serta perhatian pada aksesibilitas.",
    demo: "https://example.com/",
    source: "https://github.com/"
  }
];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const projectGrid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const toast = document.querySelector("#toast");
let toastTimer;

document.querySelectorAll(".specular-button").forEach((button) => {
  button.addEventListener("focus", () => button.classList.add("is-specular-active"));
  button.addEventListener("blur", () => button.classList.remove("is-specular-active"));
});

window.addEventListener("pointermove", (event) => {
  document.querySelectorAll(".specular-button").forEach((button) => {
    if (!button.getClientRects().length) return;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    const distance = Math.hypot(dx, dy);
    const proximity = Math.max(0, 1 - distance / 250);
    const opacity = proximity * proximity * (3 - 2 * proximity);
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI) + 90;
    button.style.setProperty("--specular-angle", `${angle}deg`);
    button.classList.toggle("is-specular-active", opacity > 0.01);
  });
}, { passive: true });

function renderProjects(filter = "all") {
  const visibleProjects = projects.filter((project) => filter === "all" || project.category === filter);
  projectGrid.innerHTML = visibleProjects.map((project, index) => `
    <article class="project-card reveal is-visible" data-project="${project.id}">
      <button class="project-image project-open-button" type="button" data-open-project="${project.id}" aria-label="Lihat detail ${project.title}">
        <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" width="1200" height="680">
        <span class="project-index">0${index + 1} / 0${projects.length}</span>
        <span class="project-open" aria-hidden="true">↗</span>
      </button>
      <div class="project-meta">
        <p class="project-category">${project.categoryLabel} <span>· CONCEPT</span></p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
}

function openProject(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-category").textContent = `${project.categoryLabel} · CONCEPT`;
  document.querySelector("#dialog-description").textContent = `${project.description} ${project.features}`;
  document.querySelector("#dialog-image").src = project.image;
  document.querySelector("#dialog-image").alt = project.imageAlt;
  document.querySelector("#dialog-tags").innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#dialog-demo").href = project.demo;
  document.querySelector("#dialog-source").href = project.source;
  dialog.showModal();
}

renderProjects();

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  navMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") setMenuOpen(false);
});

const header = document.querySelector(".site-header");
const progressBar = document.querySelector("#scroll-progress-bar");
let scrollQueued = false;
window.addEventListener("scroll", () => {
  if (scrollQueued) return;
  scrollQueued = true;
  window.requestAnimationFrame(() => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    scrollQueued = false;
  });
}, { passive: true });

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link[href^='#']")];
const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

let countsStarted = false;
const aboutSection = document.querySelector("#about");
const countObserver = new IntersectionObserver((entries) => {
  if (countsStarted || !entries.some((entry) => entry.isIntersecting)) return;
  countsStarted = true;
  document.querySelectorAll(".fact-number").forEach((counter) => {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    if (reducedMotion) {
      counter.textContent = `${target}${suffix}`;
      return;
    }
    const start = performance.now();
    const duration = 850;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = `${Math.round(target * (1 - (1 - progress) ** 3))}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  });
}, { threshold: 0.25 });
countObserver.observe(aboutSection);

const roles = ["Frontend Developer", "UI Engineer", "Creative Builder"];
const roleElement = document.querySelector(".typed-role");
if (!reducedMotion) {
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;
  const typeRole = () => {
    const currentRole = roles[roleIndex];
    roleElement.textContent = currentRole.slice(0, charIndex);
    roleElement.setAttribute("aria-label", currentRole);
    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    } else if (!deleting && charIndex === roles[roleIndex].length) {
      deleting = true;
      window.setTimeout(typeRole, 1550);
      return;
    }
    charIndex += deleting ? -1 : 1;
    window.setTimeout(typeRole, deleting ? 42 : 78);
  };
  window.setTimeout(typeRole, 2300);
}

document.querySelectorAll("[data-skill-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-skill-filter]").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("is-selected", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".skill-item").forEach((item) => {
      item.hidden = button.dataset.skillFilter !== "all" && item.dataset.skill !== button.dataset.skillFilter;
    });
  });
});

document.querySelectorAll("[data-project-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-project-filter]").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-selected", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    renderProjects(button.dataset.projectFilter);
  });
});

projectGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-open-project]");
  if (trigger) openProject(trigger.dataset.openProject);
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog.open) dialog.close();
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const formFields = {
  name: { input: document.querySelector("#name"), error: document.querySelector("#name-error") },
  email: { input: document.querySelector("#email"), error: document.querySelector("#email-error") },
  message: { input: document.querySelector("#message"), error: document.querySelector("#message-error") }
};

function validateField(name) {
  const { input, error } = formFields[name];
  const value = input.value.trim();
  let message = "";
  if (!value) message = name === "name" ? "Nama perlu diisi." : name === "email" ? "Email perlu diisi." : "Pesan perlu diisi.";
  else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Masukkan alamat email yang valid.";
  input.setAttribute("aria-invalid", String(Boolean(message)));
  error.textContent = message;
  return !message;
}

Object.entries(formFields).forEach(([name, field]) => {
  field.input.addEventListener("blur", () => validateField(name));
  field.input.addEventListener("input", () => {
    if (field.input.getAttribute("aria-invalid") === "true") validateField(name);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (document.querySelector("#website").value) return;
  const isValid = Object.keys(formFields).map(validateField).every(Boolean);
  if (!isValid) {
    formStatus.textContent = "Periksa kembali kolom yang ditandai.";
    Object.values(formFields).find(({ input }) => input.getAttribute("aria-invalid") === "true")?.input.focus();
    return;
  }
  const name = formFields.name.input.value.trim();
  const email = formFields.email.input.value.trim();
  const subject = document.querySelector("#subject").value.trim() || `Pesan dari ${name}`;
  const message = `${formFields.message.input.value.trim()}\n\nDari: ${name}\nEmail: ${email}`;
  const mailto = `mailto:hello@rakha.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  formStatus.textContent = "Draft email siap. Kirim pesan dari aplikasi email Anda.";
  showToast("Draft email dibuka. Silakan kirim dari aplikasi email Anda.");
  window.location.href = mailto;
});