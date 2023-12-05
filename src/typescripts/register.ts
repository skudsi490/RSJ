import User from "./utils/classes.js"
localStorage.clear();

let userArr:User[]=[];

const initData=():void=>{
    let xhr=new XMLHttpRequest();
    xhr.open("GET","../../../build/data/users.json",true);
    xhr.onload=function(){
        let response=JSON.parse(this.responseText);
        response=response.users;
        userArr.push(...response);
        localStorage.setItem("userData",JSON.stringify(response));
     }
     console.log(userArr);
     
     xhr.send();
}

initData();

const rgst_handler=():void=>{
    let fname = document.getElementById("fname") as HTMLInputElement;
    let lname = document.getElementById("lname") as HTMLInputElement;
    let city = document.getElementById("city") as HTMLInputElement;
    let country = document.getElementById("country") as HTMLInputElement;
    let age = document.getElementById("age") as HTMLInputElement;
    let username=document.getElementById("username") as HTMLInputElement;
    let password=document.getElementById("password") as HTMLInputElement;

    if(fname.value=="" || lname.value=="" || city.value=="" || country.value=="" || age.value=="" 
          || username.value=="" || password.value=="" )
    {
        alert("Missing data ,Please Fill All Fields!");
    } else{
        const ids=userArr.map(u=>{
            return u.id;
        })
        let nextId=Math.max(...ids)+1;
        let user=new User(nextId,fname.value,lname.value,city.value,country.value,Number(age.value),username.value,password.value);
        
        console.log(user);
        console.log(nextId);
        
        userArr.push(user)
        localStorage.setItem("userData",JSON.stringify(userArr));   
        fname.value="";
        lname.value="";
        city.value="";
        country.value="";
        age.value="";
        username.value="";
        password.value="";
        //refreshData();
        console.log(userArr);
    }
}

const login_handler=():void=>{
    setTimeout(function()
            {
                window.location.href = "../../pages/Login.html";
            } , 3000);
}

document.getElementById("rgst")?.addEventListener("click",rgst_handler);
document.getElementById("Login")?.addEventListener("click",login_handler)
