/* Minimal, dependency-free JS:
   - mobile nav toggle
   - reveal-on-scroll using IntersectionObserver
   - parallax mouse movement for hero images
   - set current year
*/
(() => {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('show'));
  }

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  } else {
    // fallback
    reveals.forEach(r => r.classList.add('visible'));
  }

  // hero parallax
  const hero = document.querySelector('.hero');
  if (hero) {
    const imgs = document.querySelectorAll('.hero-img');
    hero.addEventListener('mousemove', (ev) => {
      const rect = hero.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width - 0.5;
      const y = (ev.clientY - rect.top) / rect.height - 0.5;
      imgs.forEach((img, i) => {
        const depth = (i - 1) * 18; // -18, 0, +18
        img.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      imgs.forEach((img, i) => {
        img.style.transform = '';
      });
    });
  }

  // small floating animation via requestAnimationFrame (gentle)
  let t = 0;
  const floatEls = document.querySelectorAll('.hero-img');
  function floatLoop() {
    t += 0.02;
    floatEls.forEach((el, i) => {
      const amp = 6 + i * 2;
      el.style.transform += ` translateY(${Math.sin(t + i) * amp}px)`;
    });
    requestAnimationFrame(floatLoop);
  }
  // start after small delay so parallax takes precedence
  setTimeout(() => { if (floatEls.length) requestAnimationFrame(floatLoop); }, 800);

})();
