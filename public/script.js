// ---------- Helpers ----------
const LS_KEY = "names";
const getNames  = () => JSON.parse(localStorage.getItem(LS_KEY)) || [];
const saveNames = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

// ---------- Elements ----------
const list   = document.getElementById("list");
const input  = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const search = document.getElementById("search");

// ---------- Render ----------
function render(filter = "") {
  list.innerHTML = "";
  getNames()
    .filter(n => n.toLowerCase().startsWith(filter.toLowerCase()))
    .forEach((name, i) => list.appendChild(rowTemplate(name, i)));
}

// ---------- Row template ----------
function rowTemplate(name, index) {
  const row  = document.createElement("div"); row.className = "row";
  const span = document.createElement("span"); span.className = "name"; span.textContent = name;

  const edit = document.createElement("button");
  edit.className = "btn btn-edit"; edit.textContent = "EDIT";
  edit.onclick = () => {
    const newName = prompt("Edit name:", name);
    if (newName && newName.trim()) {
      const arr = getNames(); arr[index] = newName.trim();
      saveNames(arr); render(search.value);
    }
  };

  const del = document.createElement("button");
  del.className = "btn btn-del"; del.textContent = "REMOVE";
  del.onclick = () => {
    if (confirm(`Remove "${name}"?`)) {
      const arr = getNames().filter((_, j) => j !== index);
      saveNames(arr); render(search.value);
    }
  };

  row.append(span, edit, del);
  return row;
}

// ---------- Add handler ----------
addBtn.onclick = () => {
  const val = input.value.trim();
  if (val) {
    saveNames([...getNames(), val]);
    input.value = "";
    render(search.value);
  }
};

// ---------- Live search ----------
search.oninput = () => render(search.value);

// ---------- First render ----------
render();