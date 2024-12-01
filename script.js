let lastScrollTop = 0
document.addEventListener("scroll", function() {
    const s = document.querySelector('.a1');

    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Người dùng cuộn xuống
        s.classList.add('hide');
    } else {
        // Người dùng cuộn lên
        s.classList.remove('hide');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

});