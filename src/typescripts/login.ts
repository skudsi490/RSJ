import User from "./utils/classes.js";

let userList: User[] = [];
const errMsg = document.getElementById("showError") as HTMLDivElement;

errMsg.style.display = 'none';

// Function to initialize user data
const initUsers = async (): Promise<void> => {
    let userData = localStorage.getItem("userData");

    if (!userData) {
        userData = await fetchUserData();
        localStorage.setItem("userData", userData);
    }

    userList = JSON.parse(userData).users;
}

// Fetch user data from users.json
// Fetch user data from users.json
const fetchUserData = async (): Promise<string> => {
    try {
        const response = await fetch("../../build/data/users.json"); // Corrected path
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error("Failed to load user data:", error);
        return JSON.stringify({ users: [] });
    }
}


initUsers();

// Login handler function
const login_handler = (): void => {
    const userName = document.getElementById("userName") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

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
    } else {
        errMsg.textContent = 'User not exist';
        errMsg.style.display = 'block';
    }
}

document.getElementById("logIn")?.addEventListener("click", login_handler);
