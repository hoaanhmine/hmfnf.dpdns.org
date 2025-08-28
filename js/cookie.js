// Đặt cookie (ví dụ: lưu tên người dùng)
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Đọc cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Ví dụ: lưu tên người dùng khi lần đầu vào web
if (!getCookie('username')) {
  setCookie('username', 'hoaanhmine', 365);
}
// Bạn có thể dùng getCookie('username') để lấy lại giá trị này ở bất cứ đâu trong JS
