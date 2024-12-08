let lastScrollTop = 0
let isScrollUp = true
document.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        // Người dùng cuộn xuống
        isScrollUp = false
    } else {
        // Người dùng cuộn lên
        isScrollUp = true
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

});

setInterval(() => {
    if(isScrollUp) {
        const s = document.querySelector('.a1').classList.remove('hide');
    } else {
        const s = document.querySelector('.a1').classList.add('hide');
    }
}, 200)

function submitForm() {
    if(window.isSubmit) {
        showToastErr("Bạn đã phản hồi trước đó. Xin cảm ơn!")
        remove
    }
    var form = document.getElementById('weddingForm');
    var formData = new FormData(form);
    if(formData.get("ten").trim().length == 0) {
        showToastErr("Hãy cho mình biết tên của bạn nhé!")
        return
    }
    if(formData.get("thamGia") == null) {
        showToastErr("Hãy lựa chọn tham gia giúp mình nhé bạn!")
        return
    }
    window.isSubmit = true
    send({
        ten: formData.get("ten"),
        sdt: formData.get("sdt"),
        thamGia: formData.get("thamGia")
    })
}

function send(data) {
    var loading = document.getElementById("loading");
    loading.classList.add("show");
    fetch('https://formspree.io/f/mdkovojj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // Chỉ định kiểu dữ liệu gửi đi là JSON
        },
        body: JSON.stringify(data)  // Chuyển đổi dữ liệu thành chuỗi JSON
      })
        .then(response => response.json())  // Nhận phản hồi và chuyển đổi nó thành JSON
        .then(data => {
            loading.classList.remove("show");
            showToast()
        })
        .catch(error => {
            loading.classList.remove("show");
            console.error('Có lỗi xảy ra:', error);  // Xử lý lỗi
        });
}

function showToast() {
    var toast = document.getElementById("toast");
    toast.classList.add("show");

    // Ẩn thông báo sau 3 giây
    setTimeout(function() {
      toast.classList.remove("show");
    }, 3000);
}

function showToastErr(msg) {
    var toast = document.getElementById("toastErr");
    toast.innerHTML = msg
    toast.classList.add("show");

    // Ẩn thông báo sau 3 giây
    setTimeout(function() {
      toast.classList.remove("show");
    }, 3000);
}