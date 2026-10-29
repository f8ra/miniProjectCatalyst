// ===== Data menu =====
const menuItems = [
  { name: "Kopi Susu Senja", category: "kopi", price: 18000, desc: "Espresso, susu segar, dan gula aren." },
  { name: "Americano", category: "kopi", price: 15000, desc: "Espresso ganda dengan air panas." },
  { name: "Cappuccino", category: "kopi", price: 22000, desc: "Espresso, susu panas, dan busa lembut." },
  { name: "V60 Single Origin", category: "kopi", price: 28000, desc: "Seduh manual, biji pilihan pekan ini." },
  { name: "Matcha Latte", category: "non-kopi", price: 24000, desc: "Matcha dengan susu dingin atau panas." },
  { name: "Cokelat Panas", category: "non-kopi", price: 20000, desc: "Cokelat pekat dengan sedikit garam laut." },
  { name: "Teh Lemon Serai", category: "non-kopi", price: 14000, desc: "Teh segar dengan serai dan lemon." },
  { name: "Roti Bakar Cokelat", category: "makanan", price: 17000, desc: "Roti tebal, cokelat leleh, keju parut." },
  { name: "Pisang Goreng Madu", category: "makanan", price: 15000, desc: "Pisang kepok renyah dengan madu." },
  { name: "Nasi Goreng Kampung", category: "makanan", price: 25000, desc: "Nasi goreng, telur mata sapi, kerupuk." }
];

const formatRupiah = n => "Rp " + n.toLocaleString("id-ID");

// ===== Render menu =====
const grid = document.getElementById("menuGrid");

function renderMenu(filter) {
  const items = filter === "all" ? menuItems : menuItems.filter(i => i.category === filter);
  grid.innerHTML = items.map(i => `
    <article class="menu-item">
      <h3>${i.name}</h3>
      <p>${i.desc}</p>
      <span class="price">${formatRupiah(i.price)}</span>
    </article>
  `).join("");
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderMenu(btn.dataset.filter);
  });
});
renderMenu("all");

// ===== Navbar: menu mobile + bayangan saat scroll =====
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const toggle = document.getElementById("menuToggle");

toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

// ===== Tandai link navigasi sesuai section yang terlihat =====
const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll("a").forEach(a =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => observer.observe(s));

// ===== Validasi form kontak =====
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function setInvalid(input, invalid) {
  input.setAttribute("aria-invalid", invalid);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  setInvalid(nameInput, !name);
  setInvalid(emailInput, !email || !emailOk);
  setInvalid(messageInput, !message);

  formStatus.className = "";
  if (!name || !email || !message) {
    formStatus.textContent = "Lengkapi nama, email, dan pesan terlebih dahulu.";
    formStatus.classList.add("error");
    (!name ? nameInput : !email ? emailInput : messageInput).focus();
  } else if (!emailOk) {
    formStatus.textContent = "Format email belum benar. Contoh: nama@email.com";
    formStatus.classList.add("error");
    emailInput.focus();
  } else if (message.length < 10) {
    setInvalid(messageInput, true);
    formStatus.textContent = "Pesan terlalu pendek (minimal 10 karakter).";
    formStatus.classList.add("error");
    messageInput.focus();
  } else {
    formStatus.textContent = `Terima kasih, ${name}. Pesan Anda sudah kami terima.`;
    formStatus.classList.add("ok");
    form.reset();
  }
});

// Hapus tanda error saat pengguna mengetik ulang
[nameInput, emailInput, messageInput].forEach(el =>
  el.addEventListener("input", () => setInvalid(el, false))
);

// ===== Tahun otomatis di footer =====
document.getElementById("year").textContent = new Date().getFullYear();
