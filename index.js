//handle mobile menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuExit = document.getElementById("mobile-menu-exit");

mobileMenuBtn.addEventListener("click", () =>{
    mobileMenu.style.opacity = 1;
    mobileMenu.style.pointerEvents = "all";
})

mobileMenuExit.addEventListener("click", () =>{
    mobileMenu.style.opacity = 0;
    mobileMenu.style.pointerEvents = "none";
})

//handle lightbox
const galleryImg = document.getElementsByName("gallery-img");
const lightbox = document.getElementById("lightbox");

galleryImg.forEach(picture => {
    picture.addEventListener("click", e =>{
        lightbox.style.opacity = 1;
        lightbox.style.pointerEvents = "all";
        let src = e.target.src;
        lightbox.children[0].src = src;
        lightbox.children[0].style.maxWidth = "90%";
    })
})

lightbox.addEventListener("click", () =>{
    lightbox.style.opacity = 0;
    lightbox.style.pointerEvents = "none";
})

//handle gallery switch event
const galleryBtns = document.querySelectorAll("[data-value]");
const galleryPages = document.getElementsByName("gallery-page");
const galleryLeftBtn = document.getElementById("gallery-left-btn")
const galleryRightBtn = document.getElementById("gallery-right-btn")

let page = 1;

galleryLeftBtn.addEventListener("click", () =>{
    page--;
    changePage();
})

galleryRightBtn.addEventListener("click", () =>{
    page++;
    changePage();
})

galleryBtns.forEach(button => {
    button.addEventListener("click", () =>{
        if(button.dataset.value == 1){
            page = 1;
        }
        else if(button.dataset.value == 2){
            page = 2;
        }
        else if(button.dataset.value == 3){
            page = 3;
        }
        changePage();
    })
})

function changePage(){
    if(page > 3){
        page = 1;
    }
    if(page < 1){
        page = 3;
    }

    galleryPages.forEach(page => {
        page.style.display = "none";
    })

    galleryPages[page - 1].style.display = "grid";

    galleryBtns.forEach(button => {
        button.style.backgroundColor = "#D9D9D9";
        if(button.dataset.value == page){
            button.style.backgroundColor = "#204497";
        }
    })
}

//first task
const firstTask = document.getElementById("first-task-btn");
const closeFirstTask = document.getElementById("close-first-task");

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const displayData = data.slice(0, 10);

        firstTask.addEventListener("click", () =>{
            firstTask.classList.add("task-active");
            closeFirstTask.classList.add("button-active");

            displayData.forEach(element => {
                firstTask.innerHTML += "userId: " + element.userId + ",<br>"
                firstTask.innerHTML += "id: " + element.id + ",<br>"
                firstTask.innerHTML += "title: " + element.title + ", <br>"
                firstTask.innerHTML += "body: " + element.body + " <br><br>"
            });
        })
    })
    .catch(error => {
        console.log(error)
    })

closeFirstTask.addEventListener("click", () =>{
    firstTask.parentElement.style.display = "none"
})