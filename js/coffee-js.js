let Login = document.querySelector('.login');

document.querySelector('#loginIcon').onclick = function() {
    Login.classList.add('active');
}

document.querySelector('#close').onclick = function() {
    Login.classList.remove('active');
}

window.onscroll = function() {
    if(window.scrollY > 0){ // 假如滚动页面
        document.querySelector('.header').classList.add('active'); // 导航栏显示     
    }
    else{
        document.querySelector('.header').classList.remove('active'); // 否则导航栏隐藏
    }
}