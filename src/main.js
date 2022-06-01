// Fetch the items from the JSON file
async function loadItems() {
  return fetch("./data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `<li class="item">
    <img src="${item.image}" alt="tshirt" class="item__thubnail" />
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>`;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) return;

  //   const filterItem = items.filter((item) => item[key] == value);
  //   displayItems(filterItem);
  updateItems(items, key, value);
}

function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
