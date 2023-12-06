import User from "./utils/classes.js";

let userList: User[] = [];
const errMsg = document.getElementById("showError") as HTMLDivElement;
errMsg.style.display = 'none';

// Function to initialize user data
const initUsers = (): void => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        console.log("Loading data from localStorage");
        const userData = JSON.parse(userDataString);
        if (Array.isArray(userData)) {
            userList = userData;
        } else {
            console.error("Invalid data format in localStorage");
            fetchUserDataUsingXHR(); // Attempt to fetch if local data is invalid
        }
    } else {
        console.log("Fetching data using XMLHttpRequest");
        fetchUserDataUsingXHR();
    }
};

// Fetch user data using XMLHttpRequest
const fetchUserDataUsingXHR = (): void => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../build/data/users.json", true); 

    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            if (Array.isArray(data.users)) {
                userList = data.users;
                localStorage.setItem("userData", JSON.stringify(userList));
            } else {
                console.error("Invalid data format in JSON file");
            }
        } else {
            console.error("Failed to load user data:", xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = () => {
        console.error("Network error occurred while fetching user data.");
    };

    xhr.send();
};

// Login handler function
const login_handler = (): void => {
    const userName = (document.getElementById("userName") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!userName || !password) {
        errMsg.textContent = 'Missing Data';
        errMsg.style.display = 'block';
        return;
    }

    const currentUser = userList.find(user => user.username === userName && user.password === password);
    if (currentUser) {
        localStorage.setItem("currentUserData", JSON.stringify(currentUser));
        localStorage.setItem("currentUserFullName", `${currentUser.fname} ${currentUser.lname}`);
        setTimeout(() => window.location.href = "../pages/home.html", 3000);
    } else {
        errMsg.textContent = 'User not exist';
        errMsg.style.display = 'block';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("logIn")?.addEventListener("click", login_handler);
    initUsers();
});
