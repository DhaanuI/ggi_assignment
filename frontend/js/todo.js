let hamburger = document.querySelector(".hamburger")

let navMenu = document.querySelector(".navmenu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})


let form = document.querySelector("form")
if (sessionStorage.getItem("token")) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let inputname = document.getElementById("name").value;
        let inputpriority = document.getElementById("priority").value;
        console.log(inputname, inputpriority)
        let obj = {
            name: inputname,
            priority: inputpriority
        }

        let posting = await fetch("http://localhost:4500/todos/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token")
            },
            body: JSON.stringify(obj)
        })

        let res = await posting.json()

        console.log(res)
        alert(res.message)

        form.reset()

    })

}
else{
    alert("Please login")
}



document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear()
})