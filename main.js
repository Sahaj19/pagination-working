const API = "https://restcountries.com/v3.1/all";
const flagsDiv = document.querySelector("#flagsDiv");
const prevbtn = document.querySelector("#prevbtn");
let currentPageNumber = document.querySelector("#currentPageNumber");
const nextbtn = document.querySelector("#nextbtn");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let flagsData = [];
let currentPage = 1;
let flagsDataPerPage = 8;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

fetch(API)
.then((response) => {
    return response.json()
})
.then((data) => {
    flagsData = data
    displayData();
})
.catch((error) => {
    console.log("Error fetching data: ", error)
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function displayData() {
    flagsDiv.innerHTML = "";
    let startingIndex = (currentPage - 1) * flagsDataPerPage;
    let endingIndex = startingIndex + flagsDataPerPage;
    let slicedFlagsData = flagsData.slice(startingIndex, endingIndex);
    flagsDiv.innerHTML = slicedFlagsData.map((flagData) => {
        return `
        <div class="singleFlag">
            <img src="${flagData.flags.png}" title="${flagData.name.common}">
        </div>
        `
    }).join("")
    updatePaginationBtnState()
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

prevbtn.addEventListener("click" , function() {
    if(currentPage > 1) {
        currentPage--;
    }
    displayData();
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

nextbtn.addEventListener("click" , function() {
    if(currentPage < Math.ceil(flagsData.length/flagsDataPerPage)) {
        currentPage++;
    }
    displayData();
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function updatePaginationBtnState() {
    if(currentPage === 1) {
        prevbtn.setAttribute("disabled" , true);
    }else {
        prevbtn.removeAttribute("disabled")
    }

    if(currentPage === Math.ceil(flagsData.length/flagsDataPerPage)) {
        nextbtn.setAttribute("disabled", "true");
    }else {
        nextbtn.removeAttribute("disabled")
    }

    currentPageNumber.innerHTML = currentPage;
}