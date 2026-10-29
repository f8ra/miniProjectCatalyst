```javascript
// ===== Data menu =====
const menuItems = [
  {
    name: "Kopi Susu Senja",
    category: "kopi",
    price: 18000,
    desc: "Espresso, susu segar, dan gula aren."
  },
  {
    name: "Americano",
    category: "kopi",
    price: 15000,
    desc: "Espresso ganda dengan air panas."
  },
  {
    name: "Cappuccino",
    category: "kopi",
    price: 22000,
    desc: "Espresso, susu panas, dan busa lembut."
  },
  {
    name: "V60 Single Origin",
    category: "kopi",
    price: 28000,
    desc: "Seduh manual, biji pilihan pekan ini."
  },
  {
    name: "Matcha Latte",
    category: "non-kopi",
    price: 24000,
    desc: "Matcha dengan susu dingin atau panas."
  },
  {
    name: "Cokelat Panas",
    category: "non-kopi",
    price: 20000,
    desc: "Cokelat pekat dengan sedikit garam laut."
  },
  {
    name: "Teh Lemon Serai",
    category: "non-kopi",
    price: 14000,
    desc: "Teh segar dengan serai dan lemon."
  },
  {
    name: "Roti Bakar Cokelat",
    category: "makanan",
    price: 17000,
    desc: "Roti tebal, cokelat leleh, keju parut."
  },
  {
    name: "Pisang Goreng Madu",
    category: "makanan",
    price: 15000,
    desc: "Pisang kepok renyah dengan madu."
  },
  {
    name: "Nasi Goreng Kampung",
    category: "makanan",
    price: 25000,
    desc: "Nasi goreng, telur mata sapi, kerupuk."
  }
];

// ===== Format harga rupiah =====
const formatRupiah = (harga) => {
  return "Rp " + harga.toLocaleString("id-ID");
};

// ===== Menampilkan menu =====
const grid = document.getElementById("menuGrid");
const filterButtons = document.querySelectorAll(".filter");

function renderMenu(filter = "all") {
  // Memilih menu sesuai kategori
  const filteredItems =
    filter === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  // Menampilkan pesan jika menu kosong
  if (filteredItems.length === 0) {
    grid.innerHTML = "<p>Menu tidak tersedia.</p>";
    return;
  }

  // Membuat kartu menu
  grid.innerHTML = filteredItems
    .map(
      (item) => `
        <article class="menu-item">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <span class="price">${formatRupiah(item.price)}</span>
        </article>
      `
    )
    .join("");
}

// ===== Filter kategori =====
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Memperbarui tombol aktif
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    // Menampilkan menu sesuai filter
    renderMenu(button.dataset.filter);
  });
});

// Menampilkan seluruh menu saat halaman dibuka
renderMenu("all");

// ===== Navbar mobile =====
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const toggle = document.getElementById("menuToggle");

// Membuka dan menutup navigasi mobile
toggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Menutup navigasi setelah link diklik
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Memberikan bayangan pada navbar ketika halaman digulir
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

// ===== Navigasi sesuai section =====
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll("a").forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));

// ===== Validasi form kontak =====
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  status.className = "";

  if (!name || !email || !message) {
    status.textContent =
      "Lengkapi nama, email, dan pesan terlebih dahulu.";
    status.classList.add("error");
  } else if (!emailPattern.test(email)) {
    status.textContent =
      "Format email belum benar. Contoh: nama@email.com";
    status.classList.add("error");
  } else {
    status.textContent =
      `Terima kasih, ${name}. Pesan Anda sudah kami terima.`;

    status.classList.add("ok");
    form.reset();
  }
});

// ===== Tahun otomatis di footer =====
document.getElementById("year").textContent =
  new Date().getFullYear();
```
