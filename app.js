window.onload = load_cards
const cardContainer = document.getElementById("pContainer");
const cardTemplate = document.getElementById("card-single");
let cardIds = [...Array(12).keys()];
let cardOrd = [...Array(24).keys()];

// holding the previous card id
let prevSelectionId = null;
let prevSelectionElement = null;

// status
const currentCountElement = document.getElementById("count_click");
const avgCountElement = document.getElementById("count_avg");
const lastCountElement = document.getElementById("count_last");
const timerMinElement = document.getElementById("timer_min");
const timerSecElement = document.getElementById("timer_sec");
let timerMin = 0;
let timerSec = 0;
let runner = null; // setIntervel object
let currentCount = 0;
let avgcount = 0;
let currentPoint = 0;


function load_cards(){

    cardIds.forEach((id)=>{
        const singCard = cardTemplate.content.firstElementChild.cloneNode(true);
        const dueCard = singCard.cloneNode(true);
        console.log("processing the current id:", id);
        singCard.classList.add(randomPos());
        dueCard.classList.add(randomPos());
        let imgContainer = singCard.querySelector("#img_load");
        imgContainer.setAttribute("xid", id);
        imgContainer.setAttribute("src", `./Assets/img${id}.png`);
        let imgContainer_copy = dueCard.querySelector("#img_load");
        imgContainer_copy.setAttribute("xid", id);
        imgContainer_copy.setAttribute("src",`./Assets/img${id}.png`)
        singCard.addEventListener("click", flipEvent);
        dueCard.addEventListener("click", flipEvent);
        cardContainer.append(singCard, dueCard);

        
    })
    console.log("cardOrder after:", cardOrd);



}

function randomPos(){
    let idc = Math.floor(Math.random()*cardOrd.length);
    let random_position = cardOrd[idc];
    cardOrd.splice(idc, 1);
    console.log("generated random position is :", `order-${random_position}`);
    return `order-${random_position}`;
}


function flipEvent(event){
    if(!prevSelectionId){
        //start timer. very first choice by the user
        setTimerRunning();
    }
    currentCount += 1;
    currentCountElement.textContent = currentCount;
    const target = event.target;
    let imgElement = target.querySelector("#img_load");
    if(!imgElement){
        imgElement = target;
    }
    const currentSelectionId = imgElement.getAttribute("xid");
    console.log("img element fetched", imgElement)
    imgElement.classList.remove("hidden");

    if(prevSelectionId){
        
        // console.log(currentSelectionId, typeof currentSelectionId);
        // console.log(prevSelectionId, typeof prevSelectionId);
        if( prevSelectionId == currentSelectionId){
            // got a point
            // TODO increment point
            setTimeout(()=>{
                prevSelectionElement.setAttribute("src", "./Assets/win.gif");
                imgElement.setAttribute("src", "./Assets/win.gif");
            }, 100);
        }
        else{
            prevSelectionElement.classList.add("hidden");
            prevSelectionElement = imgElement;
            prevSelectionId = currentSelectionId;
        }
    }
    else{
        prevSelectionElement = imgElement;
        prevSelectionId = currentSelectionId;
    }
}

function setTimerRunning(){
    runner = setInterval(()=>{
        timerSec += 1;
        if(timerSec == 60){
            timerMin += 1;
            timerSec = 0;
        }
        timerMinElement.setAttribute("style", `--value:${timerMin}`);
        timerSecElement.setAttribute("style", `--value:${timerSec}`);

    }, 1000)
}