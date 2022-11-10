window.onload = load_cards
const cardContainer = document.getElementById("pContainer");
const cardTemplate = document.getElementById("card-single");
const mainElement = document.getElementById("main_element");
let cardIds = [...Array(12).keys()];
let cardOrd = [...Array(24).keys()];
// test var

// holding the previous card id
let prevSelectionId = null;
let prevSelectionElement = null;

// status
const currentCountElement = document.getElementById("count_click");
const avgCountElement = document.getElementById("count_avg");
const lastCountElement = document.getElementById("count_last");
const timerMinElement = document.getElementById("timer_min");
const timerSecElement = document.getElementById("timer_sec");
const timeLastElement = document.getElementById("time_last");
const timeAvgElement = document.getElementById("avg_time")
let timerMin = 0;
let timerSec = 0;
let runner = null; // setIntervel object
let runner_count = 0;  // used in Runner
let currentCount = 0;
let currentPoint = 0;
let defeatCount = 0; // keep track the count of the found element .
// if it's reach 12 all cards are found and stop timer and save to local storage.


let avgClickCount = localStorage.getItem("acc");
let totalgames = localStorage.getItem("gc");
let lastClickCount = localStorage.getItem("lcc");
let timeLast = localStorage.getItem("tlp");
let timeavg = localStorage.getItem('tavg');

if(!avgClickCount){
    avgCountElement.textContent = "00"
}
else{
    avgClickCount = Number(avgClickCount);
    totalgames = Number(totalgames);
    avgCountElement.textContent = avgClickCount;
}
if(!lastClickCount){
    lastCountElement.textContent = "00";
}
else{
    lastClickCount = Number(lastClickCount);
    lastCountElement.textContent = lastClickCount;
}
if(timeLast){
    timeLast = Number(timeLast);
    timeLastElement.textContent = convertToMnts(timeLast);
}
else timeLastElement.textContent = "00";
if(timeavg){
    timeavg = Number(timeavg);
    timeAvgElement.textContent = convertToMnts(timeavg);
}

function load_cards(){

    cardIds.forEach((id)=>{
        const singCard = cardTemplate.content.firstElementChild.cloneNode(true);
        const dueCard = singCard.cloneNode(true);
        let temp;
        console.log("processing the current id:", id);
        temp = randomPos();
        singCard.classList.add(temp.ord_class);
        singCard.setAttribute("id", temp._id);
        temp = randomPos();
        dueCard.classList.add(temp.ord_class);
        dueCard.setAttribute("id", temp._id);
        let imgContainer = singCard.querySelector("[obj='img_load']");
        imgContainer.setAttribute("xid", id);
        imgContainer.setAttribute("src", `./Assets/img${id}.png`);
        let imgContainer_copy = dueCard.querySelector("[obj='img_load']");
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
    return {
        ord_class : `order-${random_position}`,
        _id : random_position
    }
}


function flipEvent(event){
    if(!prevSelectionId){
        //start timer. very first choice by the user
        setTimerRunning();
    }
    currentCount += 1;
    currentCountElement.textContent = currentCount;
    const target = event.target;
    let imgElement = target.querySelector("[obj='img_load']");
    if(!imgElement){
        imgElement = target;
    }
    if(imgElement == prevSelectionElement){
        return;
    }
    const currentSelectionId = imgElement.getAttribute("xid");
    console.log("img element fetched", imgElement)
    imgElement.classList.remove("hidden");

    if(prevSelectionId){
        if( prevSelectionId == currentSelectionId){
            currentPoint += 1;
            setTimeout(()=>{
                prevSelectionElement.setAttribute("src", "./Assets/win.gif");
                imgElement.setAttribute("src", "./Assets/win.gif");
            }, 100);
            // remove event listener from the both
            prevSelectionElement.parentElement.parentElement.classList.add("findout");
            imgElement.parentElement.parentElement.classList.add("findout");
            imgElement.parentElement.parentElement.classList.remove("btn");
            prevSelectionElement.parentElement.parentElement.classList.remove("btn");
            imgElement.setAttribute("founded", true);
            prevSelectionElement.setAttribute("founded", true);

            if(currentPoint == 12){
                // game end
                clearInterval(runner);
                cardContainer.textContent = "";
                mainElement.classList.remove("glass");
                mainElement.classList.add("bg_settings");
                // storing all values
                totalgames += 1;
                avgClickCount = Math.floor((avgClickCount * (totalgames-1)+ currentCount)/totalgames);
                timeavg = Math.floor((timeavg*(totalgames-1) + runner_count)/totalgames);
                localStorage.setItem('gc', totalgames);
                localStorage.setItem("tlp", runner_count);
                localStorage.setItem("lcc", currentCount);
                localStorage.setItem("tavg", timeavg);
                localStorage.setItem("acc", avgClickCount);

            }

        }
        else{
            if(!(prevSelectionElement.getAttribute("founded"))){
                prevSelectionElement.classList.add("hidden");
            }
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
        runner_count += 1;
        timerSec += 1;
        if(timerSec == 60){
            timerMin += 1;
            timerSec = 0;
        }
        timerMinElement.setAttribute("style", `--value:${timerMin}`);
        timerSecElement.setAttribute("style", `--value:${timerSec}`);

    }, 1000)
}


function convertToMnts(value){
    let divn = value/60;
    let sec = divn - Math.floor(divn);
    let mnts = divn - sec;
    sec = sec * 60;
    sec = sec.toFixed();
    return `${mnts}:${sec}`;
}