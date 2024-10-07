// 获取 .login 元素
let Login = document.querySelector('.login');

// 当 #loginIcon 被点击时，添加 'active' 类到 .login 元素
document.querySelector('#loginIcon').onclick = function () {
    Login.classList.add('active');
}

// 当 #close 被点击时，从 .login 元素移除 'active' 类
document.querySelector('#close').onclick = function () {
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
window.onscroll = function () {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
    if (window.scrollY > 0) { // 如果页面滚动
        document.querySelector('.header').classList.add('active'); // 添加 'active' 类到 .header 元素，显示导航栏
    } else {
        document.querySelector('.header').classList.remove('active'); // 否则移除 'active' 类，隐藏导航栏
    }
}


let count = 0
// 初始化一个计数器
const btn = document.querySelectorAll('.slides input')
// 获取input
const stopTimer = document.querySelectorAll('.imgnavigation .bar')
// 获取bar
const title = document.querySelector('.home-maker .coffee-house')
// 获取coffee_house
const font = document.querySelector('.home-maker .font')
// 获取coffeehouse下面那段字
const linkBtn = document.querySelector('.home-maker .link-btn')
// 获取get—start按钮

let timer = setInterval(function () {
    // 这个是定时器，每4s +1
    count = count + 1
    if (count > 4) {
        count = 0
    }

    btn[count].checked = true
    // 让input的对应按钮改成已选

    if (count === 0) {
        stopTimer[stopTimer.length - 1].classList.remove('changeColor')
        stopTimer[count].classList.add('changeColor')
    }
    //添加changecolor类，判断它从最后一张图片回来的时候把最后
    // 那个按钮给改成未选状态 

    if (count !== 0) {
        stopTimer[count].classList.add('changeColor')
        stopTimer[count - 1].classList.remove('changeColor')
    }
    // 如果就是从第一张切到第二张这些普通案例的话，就是这个来
    // 判断




}
    , 4000)

stopTimer.forEach(function (items) {
    // 这个是获取全部bar，然后分别对它们创函数

    items.addEventListener('mouseenter', function () {
        clearInterval(timer)
    })
    // 这个是鼠标停留在下面那个bar的时候控制图片不会动的

    items.addEventListener('mouseleave', function () {

        timer = setInterval(function () {
            count = count + 1
            if (count > 4) {
                count = 0
            }

            btn[count].checked = true

            if (count === 0) {
                stopTimer[stopTimer.length - 1].classList.remove('changeColor')
                stopTimer[count].classList.add('changeColor')
            }
            if (count !== 0) {
                stopTimer[count].classList.add('changeColor')
                stopTimer[count - 1].classList.remove('changeColor')
            }

        }
            , 4000)
    })
    // 这一整个就是重新搞回计数器，鼠标离开的时候重启计数器
    items.addEventListener('click', function () {
        const index = Array.from(stopTimer).indexOf(this)
        stopTimer[index].classList.add('changeColor')
        stopTimer[count].classList.remove('changeColor')
        count = index
    })
    // 这个呢就是假如我点击其中一个bar，我的选定状态就变成那个对应
    // bar的下标，变成白色
})

document.addEventListener('DOMContentLoaded', function () {
    font.style.opacity = 1
    font.style.transform = 'translate(-150px,-100px)'
    title.style.opacity = 1
    title.style.transform = 'translate(-150px,-100px)'
    linkBtn.style.opacity = 1
    linkBtn.style.transform = 'translate(-150px,-100px)'
})
// 这个就是刚开始加载画面的时候，会把那些文字移动