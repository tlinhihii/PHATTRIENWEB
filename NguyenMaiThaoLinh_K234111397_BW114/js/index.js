const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  // Click để active
  item.addEventListener('click', () => {
    menuItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
  });

  // Hover để hiện menu con (thêm class active)
  item.addEventListener('mouseenter', () => {
    const submenu = item.querySelector('ul');
    if (submenu) {
      submenu.style.display = 'block';
    }
  });

  item.addEventListener('mouseleave', () => {
    const submenu = item.querySelector('ul');
    if (submenu) {
      submenu.style.display = 'none';
    }
  });
});
