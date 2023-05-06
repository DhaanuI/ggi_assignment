let hamburger = document.querySelector(".hamburger")

let navMenu = document.querySelector(".navmenu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

let url = "https://dull-pink-camel-robe.cyclic.app/"

let arrayofdata = []
if (sessionStorage.getItem("token")) {
    fun()
}
else {
    alert("Please login")
}


async function fun() {
    let data = await fetch(`${url}todos/`, {
        method: "GET",
        headers: {
            Authorization: sessionStorage.getItem("token")
        }
    })

    let arr = await data.json()
    arrayofdata = arr.Todos

    renderthis(arrayofdata)
}

function renderthis(data) {
    let tbody = document.querySelector("tbody")
    tbody.innerHTML = ""

    data.forEach((item, index) => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.innerText = item.name
        td1.style.backgroundColor = "#f1e39b";
        let td2 = document.createElement("td")
        td2.innerText = item.priority
        if (item.priority === "High") {
            td2.style.backgroundColor = "red";
        }
        else {
            td2.style.backgroundColor = "green";
        }
        td2.style.fontWeight = "bold";
        let td3 = document.createElement("td")
        td3.innerText = item.status;
        let td4 = document.createElement("td")
        let button = document.createElement("button")
        button.innerText = "Remove"
        button.setAttribute("id", item._id)

        td4.append(button);

        button.addEventListener('click', async () => {
            await fetch(`${url}todos/${item._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            })

            alert("Todo has been removed")
            fun()

        });

        tr.append(td1, td2, td3, td4)
        tbody.append(tr)
    })


}


document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear()
})