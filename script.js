import { data } from "./data.js";
let selectedRow = null;

const upArrow = document.querySelector(".up-arrow");
const downArrow = document.querySelector(".down-arrow");
const deleteButton = document.querySelector(".delete");
const refreshButton = document.querySelector(".refresh");
const saveButton = document.querySelector(".save");

upArrow.addEventListener("click", moveUp);
downArrow.addEventListener("click", moveDown);
deleteButton.addEventListener("click", deleteTask);
refreshButton.addEventListener("click", refreshData);
refreshButton.addEventListener("click", refreshData);
saveButton.addEventListener("click", saveData);

function renderTable() {
  const tableBody = document.querySelector("#table-body tbody");
  tableBody.innerHTML = "";
  data.map((item, index) => {
    const row = tableBody.insertRow();
    row.onclick = () => selectRow(row, index);

    row.innerHTML = `
    <td> <i class="fa-solid fa-check"></i></td>
                <td >${item.chemical_name}</td>
                <td >${item.vendor}</td>
                <td >${item.density}</td>
                <td >${item.viscosity}</td>
                <td >${item.packaging}</td>
                <td >${item.pack_size}</td>
                <td>${item.unit}</td>
                <td>${item.quantity}</td>
            `;
  });
}
function selectRow(row, index) {
  if (selectedRow !== null) {
    selectedRow.classList.remove("table-active");
  }
  row.classList.add("table-active");
  selectedRow = row;
  selectedRow.index = index;
}

function addTask() {
  const newData = {
    id: data.length + 1,
    name: "New Chemical",
    vendor: "LG Chem",
    density: "3524.7",
    viscosity: "56.76",
    packaging: "bag",
    pack_size: 100,
    unit: "1kg",
    quantity: 6292.9,
  };
  data.push(newData);
  renderTable();
}

function moveUp() {
  if (selectedRow && selectedRow.index > 0) {
    const index = selectedRow.index;
    const temp = data[index];
    data[index] = data[index - 1];
    data[index - 1] = temp;
    renderTable();
  }
}

function moveDown() {
  if (selectedRow && selectedRow.index < data.length - 1) {
    const index = selectedRow.index;
    const temp = data[index];
    data[index] = data[index + 1];
    data[index + 1] = temp;
    renderTable();
  }
}

function deleteTask() {
  if (selectedRow) {
    data.splice(selectedRow.index, 1);
    selectedRow = null;
    renderTable();
  }
}

function refreshData() {
  renderTable();
}

function saveData() {
  alert("Saving data...");
}

renderTable();
