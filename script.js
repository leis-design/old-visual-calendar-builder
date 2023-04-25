/*==============================================================================*/
/*GLOBAL VARIABLES*/
/*==============================================================================*/
let numTiles = 84;
let clicked = null;
let tiles = [];
let tileElements = [];

/*
const symbolSources = {
  "lecture": "imgs/lecture-icon.png",
  "assessment": "imgs/assessment-icon.png",
  "lab-tutorial": "imgs/lab-tutorial-icon.png",
};
*/

const symbolSources = {
  "lecture": "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/223560152/lecture-icon.png",
  "assessment": "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/223560152/assessment-icon.png",
  "lab-tutorial": "https://eclass.yorku.ca/draftfile.php/3679546/user/draft/223560152/lab-tutorial-icon.png",
};

/*==============================================================================*/
/*DOM OBJECTS*/
/*==============================================================================*/

/*Create Modal DOM elements*/
/*-----------------------*/
const createEventModal = document.getElementById("create-event-modal");
const newEventModal = document.getElementById("save-event-modal");
const deleteEventModal = document.getElementById("delete-event-modal");
const optionsModal = document.getElementById("options-modal");
const backDrop = document.getElementById("modal-backdrop");

/*Create Input DOM elements*/
const categorySelector = document.getElementById(
  "create-event-modal-category-selector"
);
const addEventSelector = document.getElementById(
  "create-event-modal-event-selector"
);
const addEventOccurenceSelector = document.getElementById(
  "create-event-modal-occurence-selector"
);

const deleteEventSelector = document.getElementById("delete-event-selector");
const delteEventOccurenceSelector = document.getElementById(
  "delete-event-occurence-selector"
);

//const eventSelector = document.getElementById("event-selector");
//const eventLabelInput = document.getElementById("event-label-input");
/*const eventCategorySelector = document.getElementById(
  "event-category-selector"
);*/
/*const occurrenceTypeSelector = document.getElementById(
  "occurrence-type-selector"
);*/
//const eventTypeSelector = document.getElementById("event-type-selector");
//const eventSelectorDiv = document.getElementById("event-selection-container");

/*Create Button DOM elements*/
//const copyButton = document.getElementById("copy-HTML-button");
const cancelButton1 = document.getElementById("cancel-button-1");
const cancelButton2 = document.getElementById("cancel-button-2");
const closeButton = document.getElementById("close-button");
const newEventModalButton = document.getElementById("new-event-modal-button");
const deleteEventModalButton = document.getElementById(
  "delete-event-modal-button"
);
//const saveButton = document.getElementById("save-button");
//const deleteButton = document.getElementById("delete-button");
//const deleteAllButton = document.getElementById("delete-all-button");

/*Initialize Event Listeners*/
backDrop.addEventListener("click", closeModal);
//copyButton.addEventListener("click", copyToClipboard);
cancelButton1.addEventListener("click", closeModal);
cancelButton2.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);
//saveButton.addEventListener("click", saveEvent);
//deleteAllButton.addEventListener("click", deleteAllEvents);
//deleteButton.addEventListener("click", deleteEvent);

//eventTypeSelector.addEventListener("change", showLabelInput);
//eventCategorySelector.addEventListener("change", showEventDropDown);

/*==============================================================================*/
/*EVENT LISTENERS*/
/*==============================================================================*/

/*==============================================================================*/
/*FUNCTIONS */
/*==============================================================================*/

/*Set up functions*/
/*-----------------------*/
function accordionFunctionality() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

function createGrid(rows, cols) {
  //Track number of content tiles
  var contentTileNum = 1;

  //Creates day tiles
  for (let i = 0; i < cols; i++) {
    const dayTile = document.createElement("div");
    dayTile.setAttribute("class", "day-tile");
    dayTile.innerHTML = `Day ${i + 1}`;
    app.appendChild(dayTile);
  }

  //Creates week and content tiles
  for (let j = 0; j < rows; j++) {
    const weekTile = document.createElement("div");
    const weekText = document.createElement("div");
    weekTile.setAttribute("class", "week-tile");
    weekText.setAttribute("class", "week-tile-text");
    weekText.innerHTML = `Week ${j + 1}`;
    weekTile.appendChild(weekText);
    app.appendChild(weekTile);

    //Creates content tiles
    for (let h = 0; h < cols; h++) {
      const contentTile = document.createElement("div");
      contentTile.setAttribute("class", "content-tile");
      contentTile.setAttribute("id", `content-tile-${contentTileNum}`);
      contentTile.setAttribute("data-value", `${contentTileNum}`);
      app.appendChild(contentTile);
      contentTileNum++;
    }
  }

  //Update array to contain content tile divs
  tileElements = document.querySelectorAll(".content-tile");
}

function storageSetUp() {
  if (tiles != null && tiles.length == 0) {
    for (i = 0; i < numTiles; i++) {
      tiles.push([0, [], 0]);
    }
  }
}

function tileSetUp() {
  tileElements.forEach((elm) => {
    elm.addEventListener("click", (e) => {
      //removing all the previous selections
      tileElements.forEach((x) => x.classList.remove("selected"));
      //selecting the current one
      e.target.classList.add("selected");
      clicked = e.target;
    });
  });

  for (let i = 0; i < tileElements.length; i++) {
    tileElements[i].addEventListener("click", function () {
      openModal(tileElements[i]);
    });
  }
}

/*Modal functions*/
/*-----------------------*/

function openNewEventModal() {
  optionsModal.style.display = "none";
  createEventModal.style.display = "block";
}

function openDeleteEventModal() {
  optionsModal.style.display = "none";
  deleteEventModal.style.display = "block";
  updateDeleteEventSelector();
}

function openModal(targetTile) {
  clicked = targetTile;
  numEventsInClicked = tiles[clicked.dataset.value - 1][[0]];

  if (numEventsInClicked == 0) {
    createEventModal.style.display = "block";
  } else {
    optionsModal.style.display = "block";
  }
  backDrop.style.display = "block";

  newEventModalButton.addEventListener("click", openNewEventModal);
  deleteEventModalButton.addEventListener("click", openDeleteEventModal);

  /*
    eventSelector.innerHTML = "";
  
    if (clicked.innerHTML == "") {
      newEventModal.style.display = "block";
    } else {
      optionsModal.style.display = "block";
    }
  

  
    backDrop.style.display = "block";*/

  console.log(clicked.id);
}

function closeModal() {
  optionsModal.style.display = "none";
  createEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  clicked = null;
}

/*Event functions*/
/*-----------------------*/

function updateAddEventSelector() {
  addEventSelector.innerHTML = "";

  let selectedCategory =
    categorySelector.options[categorySelector.selectedIndex].value;

  if (selectedCategory == "lecture") {
    var option1 = document.createElement("option");
    option1.classList.add("value");
    option1.value = "1";
    option1.text = "in-person lecture";
    addEventSelector.add(option1);

    var option2 = document.createElement("option");
    option2.classList.add("value");
    option2.value = "1";
    option2.text = "remote lecture";
    addEventSelector.add(option2);

    var option3 = document.createElement("option");
    option3.classList.add("value");
    option3.value = "1";
    option3.text = "hyflex lecture";
    addEventSelector.add(option3);
  } else if (selectedCategory == "assessment") {
    var option1 = document.createElement("option");
    option1.classList.add("value");
    option1.value = "2";
    option1.text = "quiz";
    addEventSelector.add(option1);

    var option2 = document.createElement("option");
    option2.classList.add("value");
    option2.value = "2";
    option2.text = "midterm";
    addEventSelector.add(option2);

    var option3 = document.createElement("option");
    option3.classList.add("value");
    option3.value = "2";
    option3.text = "exam";
    addEventSelector.add(option3);
  } else if (selectedCategory == "lab-tutorial") {
    var option1 = document.createElement("option");
    option1.classList.add("value");
    option1.value = "3";
    option1.text = "tutorial";
    addEventSelector.add(option1);

    var option2 = document.createElement("option");
    option2.classList.add("value");
    option2.value = "3";
    option2.text = "lab";
    addEventSelector.add(option2);

    var option3 = document.createElement("option");
    option3.classList.add("value");
    option3.value = "3";
    option3.text = "remote lab";
    addEventSelector.add(option3);
  } else {
    return;
  }
}

function compare(a, b) {
  if (a.priority < b.priority) return -1;
  if (a.priority > a.priority) return 1;
  return 0;
}
function sortEvents() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i][1].sort(compare);
  }
}

function loadEvents() {
  for (let i = 0; i < tiles.length; i++) {
    tileElements[i].innerHTML = "";

    for (let j = 0; j < tiles[i][1].length; j++) {

      const newEvent = document.createElement("div");
      const newEventContent = document.createElement("div");
      const newEventSymbolWrapper = document.createElement("div");
      const newSymbol = document.createElement("img");
      newEvent.setAttribute("class", `event ${tiles[i][1][j].category}`);
      newEventContent.setAttribute("class", `event-content`);
      newEventSymbolWrapper.setAttribute(
        "class",
        `symbol-wrapper`
      );
      newSymbol.setAttribute("src", symbolSources[tiles[i][1][j].category]);
      newSymbol.setAttribute("alt", symbolSources[tiles[i][1][j].category]);
      newSymbol.setAttribute("class", "symbol");
  
      newEvent.appendChild(newEventSymbolWrapper);
      newEvent.appendChild(newEventContent);
      newEventSymbolWrapper.appendChild(newSymbol);

      newEventContent.innerHTML = tiles[i][1][j].title;

      tileElements[i].append(newEvent);
    }
  }
}

function createEvent() {
  let selectedCategory =
    categorySelector.options[categorySelector.selectedIndex];
  let selectedOption = addEventSelector.options[addEventSelector.selectedIndex];
  const selectedCategoryText = selectedCategory.value;
  const selectedOptionText = selectedOption.text;
  const selectedOptionValue = selectedOption.value;

  let eventPriority = selectedOptionValue;
  let totalNumEvents = tiles[clicked.dataset.value - 1][2];
  //let icon = symbolSources[selectedText];

  let event = {
    priority: eventPriority,
    id: totalNumEvents + 1,
    category: selectedCategoryText,
    title: `${selectedOptionText}`,
    //img: icon,
  };

  return event;
}
function createEvents() {
  let selectedCategory =
    categorySelector.options[categorySelector.selectedIndex];
  let selectedOption = addEventSelector.options[addEventSelector.selectedIndex];
  const selectedCategoryText = selectedCategory.value;
  const selectedOptionText = selectedOption.text;
  const selectedOptionValue = selectedOption.value;
  let eventPriority = selectedOptionValue;
  //let icon = symbolSources[selectedText];

  let events = [];

  tileElements.forEach((tile) => {
    let clickedTileNumber = parseInt(clicked.dataset.value);
    let loopTileNumber = parseInt(tile.dataset.value);

    if (
      loopTileNumber <= 84 &&
      loopTileNumber >= clickedTileNumber &&
      loopTileNumber % 7 == clickedTileNumber % 7
    ) {
      let totalNumEvents = tiles[loopTileNumber - 1][2];
      console.log(loopTileNumber);
      let event = {
        priority: eventPriority,
        id: totalNumEvents + 1,
        category: selectedCategoryText,
        title: `${selectedOptionText}`,
        reoccurring: true,
        //img: icon
      };

      events.push(event);
    }
  });

  return events;
}
function addEvent() {
  let occurence =
    addEventOccurenceSelector.options[addEventOccurenceSelector.selectedIndex]
      .value;

  if (occurence == 1) {
    let events = createEvents();
    let addEventtileIndex = parseInt(clicked.dataset.value);
    console.log(events);

    events.forEach((eventElement) => {
      console.log(addEventtileIndex);
      console.log(eventElement);
      tiles[addEventtileIndex - 1][1].push(eventElement);
      tiles[addEventtileIndex - 1][0]++;
      tiles[addEventtileIndex - 1][2]++;
      addEventtileIndex += 7;
    });
  } else {
    tiles[clicked.dataset.value - 1][1].push(createEvent());
    tiles[clicked.dataset.value - 1][0]++; //Current tota; number of elements
    tiles[clicked.dataset.value - 1][2]++; //Historical total number of elements
  }
  console.log(occurence);
  console.log(tiles);
  sortEvents();
  loadEvents();
  closeModal();
}

function updateDeleteEventSelector() {
  deleteEventSelector.innerHTML = "";

  for (let i = 0; i < tiles[clicked.dataset.value - 1][0]; i++) {
    var option = document.createElement("option");
    option.classList.add("value");
    option.value = tiles[clicked.dataset.value - 1][1][i].id;
    option.text = tiles[clicked.dataset.value - 1][1][i].title;
    deleteEventSelector.add(option);
  }
}

function deleteEvent() {
  let selectedEvent =
    deleteEventSelector.options[deleteEventSelector.selectedIndex];

  let repeatDelete =
    delteEventOccurenceSelector.options[
      delteEventOccurenceSelector.selectedIndex
    ].value;

  if (repeatDelete == 1) {
    tileElements.forEach((tile) => {
      let clickedTileNumber = parseInt(clicked.dataset.value);
      let loopTileNumber = parseInt(tile.dataset.value);

      if (
        loopTileNumber <= 84 &&
        loopTileNumber >= clickedTileNumber &&
        loopTileNumber % 7 == clickedTileNumber % 7
      ) {
        let deleteEventIndex = tiles[loopTileNumber - 1][1].findIndex(
          (element) => {
            return (element.reoccurring == true) && (element.title == selectedEvent.text);
          }
        );

        tiles[loopTileNumber - 1][1].splice(deleteEventIndex, 1);
        tiles[loopTileNumber - 1][0]--;
      }
    });
  } else {
    let selectedEventID = selectedEvent.value;

    let deleteEventIndex = tiles[clicked.dataset.value - 1][1].findIndex(
      (element) => {
        return element.id == selectedEventID;
      }
    );

    tiles[clicked.dataset.value - 1][1].splice(deleteEventIndex, 1);
    tiles[clicked.dataset.value - 1][0]--;
  }

  sortEvents();
  loadEvents();
  closeModal();
}

function deleteAllEvents(){
  tiles[clicked.dataset.value - 1][0] = 0;
  tiles[clicked.dataset.value - 1][1] = [];

  loadEvents();
  closeModal();
}

/*Clipboard Copy functions*/
/*-----------------------*/
function copyToClipboard(){
  let htmlText = document.getElementById("main").outerHTML;
  let textArea = document.getElementById("text-area");

  textArea.value = htmlText;

  document.getElementById("text-area").select();
  document.execCommand("copy");
}
/*==============================================================================*/
/*FUNCTION CALLS */
/*==============================================================================*/
accordionFunctionality();
createGrid(12, 7);
storageSetUp();
tileSetUp();

console.log(tileElements);
console.log(tiles);
