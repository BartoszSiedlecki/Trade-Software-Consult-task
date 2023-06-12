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
const firstTaskBtn = document.getElementById("first-task-btn");
const closeFirstTask = document.getElementById("close-first-task");
const cancelFirstTask = document.getElementById("cancel-first-task");
const firstTask = document.getElementById("first-task");
const firstTaskLeft = document.getElementById("first-task-left");
const firstTaskRight = document.getElementById("first-task-right");
const firstTaskData = document.getElementById("first-task-data");
const taskPageNumber = document.getElementById("task-page-number");

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        let page = 1;
        let max = 10;
        localStorage.setItem("userData", JSON.stringify(data));
        console.log(JSON.parse(localStorage.userData));

        const sortedData = data.sort((a, b) => {
            if(a.title < b.title){
                return -1;
            } else if(a.title > b.title){
                return 1;
            } else{
                return 0;
            }
        })

        changeDataPage();

        firstTask.addEventListener("click", e => {
            if (e.target.id === "close-first-task") {
                firstTask.style.display = "none";
            }
            if (e.target.id === "first-task-left") {
                page--;
                if(page<=0){
                    page = 1;
                }
                changeDataPage();
                
            }
            if (e.target.id === "first-task-right") {
                page++;
                if(page>10){
                    page = 10;
                }  
                changeDataPage();
            }
        })

        function changeDataPage(){
            taskPageNumber.innerHTML = page;
            max = 10 * page;
            const displayData = sortedData.slice(max-10, max);

            firstTaskData.innerHTML = "";
            displayData.forEach(element => {
                firstTaskData.innerHTML += "userId: " + element.userId + ",<br>"
                firstTaskData.innerHTML += "id: " + element.id + ",<br>"
                firstTaskData.innerHTML += "title: " + element.title + ", <br>"
                firstTaskData.innerHTML += "body: " + element.body + " <br><br>"
            })
        }
        
    })
    .catch(error => {
        console.log(error)
    })


cancelFirstTask.addEventListener("click", () =>{
    cancelFirstTask.parentElement.style.display = "none";
})

firstTaskBtn.addEventListener("click", () =>{
    firstTask.style.display = "flex";
    cancelFirstTask.parentElement.style.display = "none";
})

    