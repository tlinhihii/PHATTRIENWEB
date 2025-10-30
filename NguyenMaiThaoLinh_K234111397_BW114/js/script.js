// script.js - Routing + About default
(() => {
  const student = {
    id: '113',
    name: 'Linh Thảo',
    className: 'BW114',
    avatar: 'https://i.pravatar.cc/160?img=47'
  };

  const partC = document.getElementById('partC');
  const designed = document.getElementById('designed');

  // show About content
  function showAbout() {
    partC.innerHTML = `
      <div style="display:flex;gap:20px;align-items:center">
        <img src="${student.avatar}" alt="avatar" style="width:140px;height:140px;border-radius:12px;object-fit:cover;border:4px solid rgba(255,105,180,0.12)">
        <div>
          <h2 style="margin-bottom:8px;color:#ff2fa0">About me</h2>
          <p style="margin:6px 0"><strong>Student ID:</strong> ${student.id}</p>
          <p style="margin:6px 0"><strong>Student Name:</strong> ${student.name}</p>
          <p style="margin:6px 0"><strong>Class Name:</strong> ${student.className}</p>
        </div>
      </div>
    `;
  }

  // fallback page template
  function showPlaceholder(title) {
    partC.innerHTML = `<h2 style="color:#ff2fa0">${title}</h2><p style="margin-top:12px;color:#555">Nội dung mục <strong>${title}</strong> sẽ hiện ở đây.</p>`;
  }

  // route handler
  function route(page) {
    switch (page) {
      case 'about': showAbout(); break;
      case 'products': showPlaceholder('Products'); break;
      case 'employees': showPlaceholder('Employees'); break;
      case 'weather': showPlaceholder('Weather API'); break;
      case 'rss': showPlaceholder('RSS'); break;
      case 'login': showPlaceholder('Login/Logout'); break;
      default: showAbout();
    }
  }

  // attach menu handlers
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const page = el.dataset.page;
      route(page);
      // For small screens, close submenu if desired (not implemented here)
    });
  });

  // footer clock auto-update
  function startClock() {
    function tick() {
      const now = new Date();
      designed.textContent = `Designed by Student ${student.name}, today is ${now.toLocaleString()}`;
    }
    tick();
    setInterval(tick, 1000);
  }

  // initial
  route('about');
  startClock();
})();
