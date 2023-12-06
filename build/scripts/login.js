var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
let userList = [];
const errMsg = document.getElementById("showError");
errMsg.style.display = 'none';
// Function to initialize user data
const initUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let userData = localStorage.getItem("userData");
    if (!userData) {
        userData = yield fetchUserData();
        localStorage.setItem("userData", userData);
    }
    userList = JSON.parse(userData).users;
});
// Fetch user data from users.json
const fetchUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("../../build/data/users.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return yield response.text();
    }
    catch (error) {
        console.error("Failed to load user data:", error);
        return JSON.stringify({ users: [] });
    }
});
initUsers();
// Login handler function
const login_handler = () => {
    const userName = document.getElementById("userName");
    const password = document.getElementById("password");
    if (userName.value === "" || password.value === "") {
        errMsg.textContent = 'Missing Data';
        errMsg.style.display = 'block';
        return;
    }
    const currentUser = userList.find(user => user.username === userName.value && user.password === password.value);
    if (currentUser) {
        localStorage.setItem("currentUserData", JSON.stringify(currentUser));
        setTimeout(() => {
            window.location.href = "../pages/home.html";
        }, 3000);
    }
    else {
        errMsg.textContent = 'User not exist';
        errMsg.style.display = 'block';
    }
};
(_a = document.getElementById("logIn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", login_handler);
export {};
