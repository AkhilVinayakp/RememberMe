window.onload = load_cards
const cardContainer = document.getElementById("pContainer");
const cardTemplate = document.getElementById("card-single");
let cardIds = [...Array(12).keys()];
let cardOrd = [...Array(24).keys()];

// holding the previous card id
let prevSelectionId = null;
let prevSelectionElement = null;

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
    const target = event.target;
    const imgElement = target.querySelector("#img_load");
    const currentSelectionId = imgElement.getAttribute("xid");
    console.log("img element fetched", imgElement)
    imgElement.classList.remove("hidden");
    if(prevSelectionId){
        
        // console.log(currentSelectionId, typeof currentSelectionId);
        // console.log(prevSelectionId, typeof prevSelectionId);
        if( prevSelectionId == currentSelectionId){
            // got a point
            // TODO increment point
            prevSelectionElement.setAttribute("src", "./Assets/win.gif");
            imgElement.setAttribute("src", "./Assets/win.gif");

        }
        else{
            prevSelectionElement = imgElement;
            prevSelectionId = currentSelectionId;
            // prevSelectionElement.classList.add("hidden")
        }
    }
    else{
        prevSelectionElement = imgElement;
        prevSelectionId = currentSelectionId;
    }
}