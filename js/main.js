/* ===== IMT — main.js ===== */

/* ── Navbar: solid on scroll ── */
const nav = document.getElementById('nav');
const ham = document.getElementById('ham');
const mobNav = document.getElementById('mobNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 40);
}, { passive: true });

/* ── Hamburger ── */
ham.addEventListener('click', () => {
  mobNav.classList.toggle('open');
});
mobNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobNav.classList.remove('open'));
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });
});

/* ── Enquiry form (Formspree) ── */
const form = document.getElementById('enquiryForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.fsub');
    const ok  = document.getElementById('fsuccess');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST', body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        ok.style.display = 'block';
        setTimeout(() => ok.style.display = 'none', 7000);
      } else {
        alert('Could not send. Please call us directly or email inlandmachinetools@gmail.com');
      }
    } catch {
      alert('Network error. Please call us or email inlandmachinetools@gmail.com');
    }
    btn.textContent = 'Send Enquiry →';
    btn.disabled = false;
  });
}

/* ── Scroll-in animations ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = '1';
      en.target.style.transform = 'translateY(0)';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.prod-card, .proj-card, .group-card, .plant-c, .tl-item, .why-item, .hcard'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  io.observe(el);
});
