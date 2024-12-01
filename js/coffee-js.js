// 获取 .login 元素
let Login = document.querySelector('.login');

// 当 #loginIcon 被点击时，添加 'active' 类到 .login 元素
document.querySelector('#loginIcon').onclick = function () {
    Login.classList.add('active');
}

// 当 #close 被点击时，从 .login 元素移除 'active' 类
document.querySelector('#close1').onclick = function () {
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

// let mockDatabase = {
//     users: []
// };

// 获取.signup-button
let signup = document.querySelector(".signup");

// 当点击sign up按钮时，给.signup添加active并移除.login的active
document.querySelector(".signup-button").onclick = function () {
    signup.classList.add("active");
    Login.classList.remove("active");
};

// 当点击关闭按钮的时候，移除.signup的active
document.querySelector('#close2').onclick = function () {
    signup.classList.remove('active');
};

// 当点击login按钮的时候，给.login添加active并移除.signup的active
document.querySelector(".login-button").onclick = function () {
    Login.classList.add("active");
    signup.classList.remove("active");
};

// 获取表单元素
const submit_signup = document.querySelector(".signup-submitButton");
let signupusername = document.querySelector("#signup-username");
let signupemail = document.querySelector("#signup-email");
let signuppassword1 = document.querySelector("#signup-password1");
let signuppassword2 = document.querySelector("#signup-password2");
const signuperror = document.querySelector(".signuperror");
const signupsuccess = document.querySelector(".signupsuccess");

submit_signup.addEventListener("click", validsignup);

function validsignup(event) {
    event.preventDefault(); // 防止表单提交刷新页面

    // 获取输入的用户名邮箱和密码
    const username = signupusername.value;
    const email = signupemail.value;
    const password1 = signuppassword1.value;
    const password2 = signuppassword2.value;

    // 检查密码是否一致且不为空
    if (password1 && password2 && getHash(password1) === getHash(password2)) {
        // 检查邮箱是否已经存在于模拟数据库中
        const storedDatabase = JSON.parse(localStorage.getItem('mockDatabase')) || { users: [] };
        const userExists = storedDatabase.users.some(user => user.email === email || user.username === username);

        if (!userExists) {
            // 添加新用户到模拟数据库
            mockDatabase.users.push({
                username: username,
                email: email,
                password: getHash(password1),
            });
            localStorage.setItem('mockDatabase' , JSON.stringify(mockDatabase));

            // 显示成功信息
            signupsuccess.style.opacity = 1;
            signupsuccess.style.transform = "translate(-50%, -50%)";

            // 隐藏错误信息
            signuperror.style.opacity = 0;
            signuperror.style.transform = "translate(-50%, -50%)";

            // 等待1.5秒后跳转回登录界面
            setTimeout(() => {
                signupsuccess.style.opacity = 0;
                signupsuccess.style.transform = "translate(-50%, -50%)";
                Login.classList.add("active");
                signup.classList.remove("active");
            }, 1500);
        } else {
            // 显示错误信息：用户已存在
            // signuperror.textContent = "User already exists";
            signuperror.style.opacity = 1;
            signuperror.style.transform = "translate(-50%,-50%)";

            // 清空输入框
            signupusername.value = "";
            signupemail.value = "";
            signuppassword1.value = "";
            signuppassword2.value = "";
        }
    } else {
        // 显示错误信息：密码不一致或为空
        // signuperror.textContent = "Passwords do not match or are empty";
        signuperror.style.opacity = 1;
        signuperror.style.transform = "translate(-50%,-50%)";

        // 清空输入框
        signupusername.value = "";
        signupemail.value = "";
        signuppassword1.value = "";
        signuppassword2.value = "";
    }
}


// function getHash(value) {
//     return CryptoJS.SHA256(value).toString();
// }

// 获取 .forget-password 元素
let forgetPassword = document.querySelector('.forget-password');

// 当点击 forget password 链接时，显示 forget-password 界面
document.querySelector('.forget-password-link').onclick = function () {
    forgetPassword.classList.add('active');
    Login.classList.remove('active');
};

// 当 #close3 被点击时，从 .forget-password 元素移除 'active' 类
document.querySelector('#close3').onclick = function () {
    forgetPassword.classList.remove('active');
};

// 当.signup-button被点击时，给.signup添加active并移除.forget-password的active
document.querySelectorAll(".signup-button").forEach(button => {
    button.onclick = function () {
        signup.classList.add("active");
        forgetPassword.classList.remove("active");
        Login.classList.remove("active");
    };
});

// 获取表单元素
const sendCodeButton = document.querySelector(".send-code-button");
const verifyCodeButton = document.querySelector(".verify-code-button");
let forgetEmail = document.querySelector("#forget-email");
let verificationCodeInput = document.querySelector("#verification-code");
const forgeterror = document.querySelector(".forgeterror");
const forgetsuccess = document.querySelector(".forgetsuccess");

let generatedCode = null;

sendCodeButton.addEventListener("click", sendVerificationCode);
verifyCodeButton.addEventListener("click", verifyCode);

function sendVerificationCode(event) {
    event.preventDefault(); // 防止表单提交刷新页面

    // 获取输入的邮箱
    const email = forgetEmail.value;

    // 检查邮箱是否存在于模拟数据库中
    const storedDatabase = JSON.parse(localStorage.getItem('mockDatabase')) || { users: [] };
    const userExists = storedDatabase.users.some(user => user.email === email);

    if (userExists) {
        // 生成验证码
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 显示成功信息
        // forgetsuccess.textContent = `Verification code sent: ${generatedCode}`;
        forgetsuccess.style.opacity = 1;
        forgetsuccess.style.transform = "translate(-50%, -50%)";

        // 隐藏错误信息
        forgeterror.style.opacity = 0;
        forgeterror.style.transform = "translate(-50%, -50%)";

        // 将生成的验证码插入到 span 元素中
        document.getElementById("generated-code").textContent = generatedCode;
    } else {
        // 显示错误信息：邮箱不存在
        // forgeterror.textContent = "Email does not exist";
        forgeterror.style.opacity = 1;
        forgeterror.style.transform = "translate(-50%,-50%)";

        // 清空输入框
        forgetEmail.value = "";
    }
}

function verifyCode(event) {
    event.preventDefault(); // 防止表单提交刷新页面

    // 获取输入的验证码
    const code = verificationCodeInput.value;

    // 检查验证码是否匹配
    if (code === generatedCode) {
        // 生成token并存储在localStorage
        // const token = generateToken();
        // localStorage.setItem("authToken", token);
         // 获取输入的新密码和确认密码
        const newPasswordValue = document.querySelector("#new-password").value;
        const confirmPasswordValue = document.querySelector("#confirm-password").value;
         // 获取输入的邮箱
        const email = forgetEmail.value;
        const storedDatabase = JSON.parse(localStorage.getItem('mockDatabase')) || { users: [] };
        // 检查新密码是否一致且不为空，并且与旧密码不同
        if (newPasswordValue && confirmPasswordValue && newPasswordValue === confirmPasswordValue) {
            // 查找用户
            const userIndex = storedDatabase.users.findIndex(user => user.email === email);
            if  (userIndex !== -1) {
                if (storedDatabase.users[userIndex].password !== getHash(newPasswordValue)) {
                    // 更新密码
                    storedDatabase.users[userIndex].password = getHash(newPasswordValue);
                    localStorage.setItem('mockDatabase', JSON.stringify(storedDatabase));

                    // 显示成功信息
                    forgetsuccess.style.opacity = 0;
                    forgeterror.style.opacity = 0;
                    forgetsuccess.style.opacity = 1;
                    forgetsuccess.style.transform = "translate(-50%, -50%)"; 

                    // 等待1.5秒后返回登录界面
                    setTimeout(() => {
                        forgetsuccess.style.opacity = 0;
                        forgetsuccess.style.transform = "translate(-50%, -50%)";
                        forgetPassword.classList.remove("active");
                        Login.classList.add("active");
                    }, 1500);
                } else {
                    // 显示错误信息：新密码与旧密码相同
                    forgetsuccess.style.opacity = 0;
                    forgeterror.style.opacity = 0;
                    forgeterror.style.opacity = 1;
                    forgeterror.style.transform = "translate(-50%,-50%)";

                    // 清空输入框
                    document.querySelector("#new-password").value = "";
                    document.querySelector("#confirm-password").value = "";
                }
            }
        } else {
            // 显示错误信息：新密码不一致或为空
            forgetsuccess.style.opacity = 0;
            forgeterror.style.opacity = 0;
            forgeterror.style.opacity = 1;
            forgeterror.style.transform = "translate(-50%,-50%)";

            // 清空输入框
            document.querySelector("#new-password").value = "";
            document.querySelector("#confirm-password").value = "";
        }
    } else {
        // 显示错误信息：验证码不匹配
        forgeterror.style.opacity = 0;
        forgetsuccess.style.opacity = 0;
        forgeterror.style.opacity = 1;
        forgeterror.style.transform = "translate(-50%,-50%)";

        // 清空输入框
        verificationCodeInput.value = "";
    }
}

// 获取表单元素
const submit_login = document.querySelector(".login-submitButton");
let loginemail = document.querySelector("#login-email");
let loginpassword = document.querySelector("#login-password");
const loginerror = document.querySelector(".loginerror");
const loginsuccess = document.querySelector(".loginsuccess");

submit_login.addEventListener("click", validlogin);

function validlogin(event) {
    event.preventDefault(); // 防止表单提交刷新页面

    // 获取输入的邮箱和密码
    const email = loginemail.value;
    const password = loginpassword.value;
    const storedDatabase = JSON.parse(localStorage.getItem('mockDatabase')) || { users: [] };

    // 检查邮箱和密码是否匹配
    const user = storedDatabase.users.find(user => user.email === email && user.password === getHash(password));

    if (user) {
        // 生成token并存储在localStorage
        const token = generateToken();
        localStorage.setItem("authToken", token);
        localStorage.setItem("user'sname", user.username); 

        // 显示成功信息
        loginsuccess.style.opacity = 1;
        loginsuccess.style.transform = "translate(-50%, -50%)";

        // 隐藏错误信息
        loginerror.style.opacity = 0;
        loginerror.style.transform = "translate(-50%, -50%)";

        // 等待1.5秒后跳转回首页
        setTimeout(() => {
            loginsuccess.style.opacity = 0;
            loginsuccess.style.transform = "translate(-50%, -50%)";
            Login.classList.remove("active");
        }, 1500);
    } else {
        // 显示错误信息：邮箱或密码不匹配
        // loginerror.textContent = "Email or password is incorrect";
        loginerror.style.opacity = 1;
        loginerror.style.transform = "translate(-50%,-50%)";

        // 清空输入框
        loginemail.value = "";
        loginpassword.value = "";
    }
}

// 生成token的函数
function generateToken() {
    return Math.random().toString(36).substr(2);
}

// 检查是否存在token
// function checkAuthToken() {
//     const token = localStorage.getItem("authToken");
//     if (token) {

//         showSidebar();
//     } else {

//         Login.classList.add("active");
//     }
// }

// 显示侧边栏选择界面的函数
function showSidebar() {
    // 实现显示侧边栏选择界面的逻辑
    console.log("Showing sidebar");
}

// 点击登录图标时检查token
// document.querySelector('#loginIcon').onclick = function () {
//     checkAuthToken();
// };

// 获取 #loginIcon 和 #userMenu 元素
let loginIcon = document.querySelector('#loginIcon');
let userMenu = document.querySelector('#userMenu');
let header = document.querySelector('.header');
// 当 #loginIcon 被点击时，显示或隐藏菜单
loginIcon.onclick = function (event) {
    event.preventDefault(); // 防止页面跳转
    if (localStorage.getItem("authToken")) {
        // 获取登录图标的位置和尺寸
        const iconRect = loginIcon.getBoundingClientRect();
        // 获取导航栏的高度
        const headerHeight = header.offsetHeight;
        // 设置菜单的位置
        userMenu.style.top = `${iconRect.bottom+headerHeight / 6}px`;
        userMenu.style.left = `${iconRect.left+headerHeight / 4}px`;
        // 切换菜单的显示状态
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block'; // 切换菜单的显示状态
    } else {
        Login.classList.add('active');
    }
};

// 当点击页面其他地方时，隐藏菜单
document.addEventListener('click', function (event) {
    if (!loginIcon.contains(event.target) && !userMenu.contains(event.target)) { // 如果点击的不是 #loginIcon 和 #userMenu 元素
        userMenu.style.display = 'none';
    }
});

// 当点击退出登录时，清除 token 并隐藏菜单
document.querySelector('#logout').onclick = function (event) {
    event.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("user'sname")
    userMenu.style.display = 'none';
    // Login.classList.add('active');
};

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
    title.style.opacity = 1
    // title.style.transform = 'translate(-150px,-100px)'
    font.style.opacity = 1
    // font.style.transform = 'translate(-150px,-100px)'
    linkBtn.style.opacity = 1
    // linkBtn.style.transform = 'translate(-150px,-100px)'
})
// 这个就是刚开始加载画面的时候，会把那些文字移动

//activities
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let items = document.querySelectorAll(".carousel .item");

let countItem = items.length;
let active = 1;
let other_1 = null;
let other_2 = null;

next.onclick = () => {
  carousel.classList.remove("prev");
  carousel.classList.add("next");

  active = active + 1 >= countItem ? 0 : active + 1;
  other_1 = active - 1 < 0 ? countItem - 1 : active - 1;
  other_2 = active + 1 >= countItem ? 0 : active + 1;
  changeSlider();
};

prev.onclick = () => {
  carousel.classList.remove("next");
  carousel.classList.add("prev");
  active = active - 1 < 0 ? countItem - 1 : active - 1;
  other_1 = active + 1 >= countItem ? 0 : active + 1;
  other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
  changeSlider();
};

const changeSlider = () => {
  let itemOldActive = document.querySelector(".carousel .item.active");
  if (itemOldActive) itemOldActive.classList.remove("active");

  let itemOldOther_1 = document.querySelector(".carousel .item.other_1");
  if (itemOldOther_1) itemOldOther_1.classList.remove("other_1");

  let itemOldOther_2 = document.querySelector(".carousel .item.other_2");
  if (itemOldOther_2) itemOldOther_2.classList.remove("other_2");

  items.forEach((e) => {
    // 清除动画效果
    e.querySelector(".image img").style.animation = "none";
    e.querySelector(".image figcaption").style.animation = "none";
    // 强制重新布局 (reflow)
    void e.offsetWidth;
    // 恢复动画效果
    e.querySelector(".image img").style.animation = "";
    e.querySelector(".image figcaption").style.animation = "";
  });

  items[active].classList.add("active");
  items[other_1].classList.add("other_1");
  items[other_2].classList.add("other_2");

  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    next.click();
  }, 5000);
};

let autoPlay = setInterval(() => {
  next.click();
}, 5000);
