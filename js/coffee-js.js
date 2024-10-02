// 获取 .login 元素
let Login = document.querySelector('.login');

// 当 #loginIcon 被点击时，添加 'active' 类到 .login 元素
document.querySelector('#loginIcon').onclick = function() {
    Login.classList.add('active');
}

// 当 #close 被点击时，从 .login 元素移除 'active' 类
document.querySelector('#close').onclick = function() {
    Login.classList.remove('active');
}

// 获取 #menu-btn 和 .header .navigation 元素
let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".header .navigation");

// 当 #menu-btn 被点击时，切换 'fa-times' 类和 'active' 类
menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
}

// 当窗口滚动时，执行以下函数
window.onscroll = function() {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
    if (window.scrollY > 0) { // 如果页面滚动
        document.querySelector('.header').classList.add('active'); // 添加 'active' 类到 .header 元素，显示导航栏
    } else {
        document.querySelector('.header').classList.remove('active'); // 否则移除 'active' 类，隐藏导航栏
    }
}