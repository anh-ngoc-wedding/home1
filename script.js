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
        thamGia: formData.get("thamGia"),
        loichuc: formData.get("loichuc")
    })
}

const images = document.querySelectorAll('img');

// Tạo một Intersection Observer để theo dõi các ảnh
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Thêm lớp zoom-in khi ảnh xuất hiện
      entry.target.classList.add('zoom-in');
     
    } else {
        entry.target.classList.remove('zoom-in');
    }
  });
}, { threshold: 0.5 }); // Kích hoạt khi 50% ảnh xuất hiện trong viewport

// Bắt đầu quan sát từng ảnh
images.forEach(image => {
  observer.observe(image);
});

async function send(data) {
    var loading = document.getElementById("loading");
    loading.classList.add("show");
    try {
        await window.addDoc(window.collection(window.db, "khaosat"), data);
        loading.classList.remove("show");
        showToast()
    } catch (e) {
        loading.classList.remove("show")
    }
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