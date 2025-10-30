// js/main.js
// Load nội dung HTML động vào #content, ngăn trình duyệt điều hướng đi nơi khác
(function () {
  "use strict";

  // Kiểm tra tồn tại vùng C
  const content = document.getElementById("content");
  if (!content) {
    console.error("Không tìm thấy phần tử #content trong index.html. Vui lòng thêm <main id=\"content\"></main>.");
    return;
  }

  // Helpers
  const isLocalHtmlLink = (el) => {
    if (!el || el.tagName !== "A") return false;
    const href = el.getAttribute("href");
    if (!href) return false;
    // chỉ xử lý các link kết thúc bằng .html (relative hoặc absolute same-origin)
    if (!href.trim().toLowerCase().endsWith(".html")) return false;
    try {
      const linkUrl = new URL(href, location.href); // hỗ trợ relative paths
      return linkUrl.origin === location.origin; // cùng origin
    } catch (e) {
      return false;
    }
  };

  // Load file HTML và chèn vào content
  async function loadPageIntoContent(url) {
    try {
      content.innerHTML = `<p style="text-align:center;color:#0d47a1;padding:24px;">Đang tải <strong>${url}</strong> ...</p>`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      content.innerHTML = html;
      console.log(`Loaded: ${url}`);
      // optional: dispatch event để file con có thể bind JS khi cần
      document.dispatchEvent(new CustomEvent("pageLoaded", { detail: { url } }));
    } catch (err) {
      console.error("Lỗi khi load:", err);
      content.innerHTML = `<div style="padding:20px;text-align:center;color:#b00020;">
        Lỗi khi tải <strong>${url}</strong>: ${err.message}
      </div>`;
    }
  }

  // Bắt mọi click trên document (capture phase) để chặn navigation mặc định cho link .html
  document.addEventListener("click", function (evt) {
    const a = evt.target.closest("a");
    if (!a) return;
    if (isLocalHtmlLink(a)) {
      // chặn hành vi mặc định: chuyển trang
      evt.preventDefault();
      const url = new URL(a.getAttribute("href"), location.href).pathname;
      // normalized path (loại bỏ query/hash) - dùng relative path
      loadPageIntoContent(a.getAttribute("href"));
    }
  }, true /* capture */);

  // Bắt contextmenu (click phải) trên link .html — cũng load nội dung vào phần C
  document.addEventListener("contextmenu", function (evt) {
    const a = evt.target.closest("a");
    if (!a) return;
    if (isLocalHtmlLink(a)) {
      // chặn menu chuột phải mặc định để tránh confusion (nếu bạn muốn giữ menu chuột phải, bỏ dòng event.preventDefault())
      evt.preventDefault();
      loadPageIntoContent(a.getAttribute("href"));
    }
  });

  // Khi trang load lần đầu — load aboutme.html mặc định
  document.addEventListener("DOMContentLoaded", function () {
    // nếu URL hiện tại là index.html hoặc '/', load aboutme.html mặc định
    // chỉ load nếu nội dung rỗng hoặc chứa văn bản "Đang tải nội dung..." hoặc chưa được thay thế
    const shouldLoadDefault = !content.innerHTML || /đang tải/i.test(content.innerText) || content.innerText.trim().length < 10;
    if (shouldLoadDefault) {
      // dùng relative path
      loadPageIntoContent("aboutme.html");
    }
  });

  // Expose function nếu cần debug từ console
  window.__app = {
    loadPageIntoContent
  };
})();
