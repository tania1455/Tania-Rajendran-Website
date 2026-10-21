/* ==========================================================
   EDIT THIS FIRST — your name, email and social links.
   The header (with social icons) and footer on every page
   are built from these settings, so you only change them here.
   Icon names come from Font Awesome: https://fontawesome.com/search?ic=brands
   Delete a line to hide that icon; copy a line to add one.
   ========================================================== */
const SITE = {
  name: "Tania Rajendran",
  email: "hzntania@gmail.com",
  socials: [
    { label: "LinkedIn",  icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com/in/tania-rajendran/" },
    { label: "GitHub",    icon: "fa-brands fa-github",      url: "https://github.com/tania1455" },
    { label: "X",         icon: "fa-brands fa-x-twitter",   url: "https://x.com/RajendranT51989" },
    { label: "Instagram", icon: "fa-brands fa-instagram",   url: "https://www.instagram.com/taniatells/" },
    { label: "Email",     icon: "fa-solid fa-envelope",     url: "mailto:hzntania@gmail.com" },
  ],
};

const NAV = [
  { id: "about",      label: "About",                  href: "index.html" },
  { id: "projects",   label: "Projects",               href: "projects.html" },
  // Blog is hidden for now — remove the "//" below to bring it back.
  // { id: "blog",       label: "Blog",                   href: "blog.html" },
  { id: "contact",    label: "Contact",                href: "contact.html" },
];

/* ---------- You shouldn't need to edit below this line ---------- */
(function () {
  const body = document.body;
  const root = body.dataset.root || "";      // "../" for pages in sub-folders
  const current = body.dataset.page || "";

  const socials = SITE.socials
    .map(s => {
      const external = !s.url.startsWith("mailto:");
      return `<a href="${s.url}" aria-label="${s.label}" title="${s.label}"${external ? ' target="_blank" rel="noopener"' : ""}><i class="${s.icon}" aria-hidden="true"></i></a>`;
    })
    .join("");

  const links = NAV
    .map(n => `<a href="${root}${n.href}"${n.id === current ? ' aria-current="page"' : ""}>${n.label}</a>`)
    .join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-inner">
      <a class="brand" href="${root}index.html">${SITE.name}</a>
      <nav class="nav" id="site-nav" aria-label="Main">${links}</nav>
      <div class="socials">${socials}</div>
      <button class="menu-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu">
        <i class="fa-solid fa-bars" aria-hidden="true"></i>
      </button>
    </div>`;
  body.prepend(header);

  const toggle = header.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <span>© ${new Date().getFullYear()} ${SITE.name}</span>
      <div class="socials">${socials}</div>
    </div>`;
  body.append(footer);

  document.querySelectorAll("[data-email]").forEach(el => {
    el.textContent = SITE.email;
    el.href = `mailto:${SITE.email}`;
  });

  // Launch countdown: <div data-countdown="2027-01-01T00:00:00+08:00"> with [data-unit] children
  document.querySelectorAll("[data-countdown]").forEach(el => {
    const target = new Date(el.dataset.countdown).getTime();
    const units = {};
    el.querySelectorAll("[data-unit]").forEach(u => (units[u.dataset.unit] = u));
    const pad = n => String(n).padStart(2, "0");
    const tick = () => {
      const left = Math.max(0, target - Date.now());
      const s = Math.floor(left / 1000);
      units.days.textContent = Math.floor(s / 86400);
      units.hours.textContent = pad(Math.floor(s / 3600) % 24);
      units.minutes.textContent = pad(Math.floor(s / 60) % 60);
      units.seconds.textContent = pad(s % 60);
      if (left === 0) {
        el.innerHTML = `<p class="launched">Out now</p>`;
        clearInterval(timer);
      }
    };
    const timer = setInterval(tick, 1000);
    tick();
  });
})();
