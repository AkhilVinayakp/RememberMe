window.onload = load_cards
const cardContainer = document.getElementById("pContainer");
const cardTemplate = document.getElementById("card-single");
let cardIds = [...Array(12).keys()];
let cardOrd = [...Array(24).keys()];

function load_cards(){

    cardIds.forEach((id)=>{
        const singCard = cardTemplate.content.firstElementChild.cloneNode(true);
        const dueCard = singCard.cloneNode(true);
        singCard.setAttribute("xid", id);
        dueCard.setAttribute("xid", id);
        console.log("processing the current id:", id);
        singCard.classList.add(randomPos());
        dueCard.classList.add(randomPos());
        let imgContainer = singCard.querySelector("#img_load");
        imgContainer.setAttribute("src", `./Assets/img${id}.png`);
        let imgContainer_copy = dueCard.querySelector("#img_load");
        imgContainer_copy.setAttribute("src",`./Assets/img${id}.png`)
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
