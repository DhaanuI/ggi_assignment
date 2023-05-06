
let url = "https://dull-pink-camel-robe.cyclic.app/"


let hamburger = document.querySelector(".hamburger")

let navMenu = document.querySelector(".navmenu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

let regform = document.getElementById("register")

regform.addEventListener("submit", async (event) => {
    event.preventDefault();

    let inputname = document.getElementById("name").value;
    let inputemail = document.getElementById("email").value;
    let inputpassword = document.getElementById("password").value;
    let inputdob = document.getElementById("dob").value;
    let inputphone = document.getElementById("phone").value;
    let phonecode = document.getElementById("country-code").value;
    console.log(inputphone.length)
    if (inputphone.length !== 10) {
        return alert("Please ensure you enter 10 digits of Phone number only")
    }

    let obj = {
        name: inputname,
        email: inputemail,
        password: inputpassword,
        dob: inputdob,
        code: phonecode,
        phone: +inputphone
    }



    let posting = await fetch(`${url}users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    let res = await posting.json()

    alert(res.message)

    regform.reset()

})


let loginform = document.getElementById("login")

loginform.addEventListener("submit", async (event) => {
    event.preventDefault();

    let inputemail = document.getElementById("loginemail").value;
    let inputpassword = document.getElementById("loginpassword").value;

    let obj = {
        email: inputemail,
        password: inputpassword,
    }

    let verifyingLogin = await fetch(`${url}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    let res = await verifyingLogin.json()

    alert(res.message ? res.message : res.error)
    if (res.token) {
        let token = res.token;
        sessionStorage.setItem("token", token)
        loginform.reset()

        window.location.href = "./view/todo.html"
    }


})