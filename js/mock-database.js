// mock-database.js
let mockDatabase = {
    users: []//创建多个用户是多加不是覆盖
};

// 哈希函数
function getHash(value) {
    return CryptoJS.SHA256(value).toString();
}

// 页面加载时加载 mockDatabase
window.addEventListener('load', function() {
    const storedDatabase = localStorage.getItem('mockDatabase');
    if (storedDatabase) {
        mockDatabase = JSON.parse(storedDatabase);
    }
});