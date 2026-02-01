let mode = "oracal";

function setMode(newMode) {
  mode = newMode;

  const result = document.getElementById("result");
  const input = document.getElementById("code");
  const searchBtn = document.getElementById("search-btn");

  result.innerHTML = "";

  if (mode === "diod" || mode === "banner" || mode === "fomax") {
    input.style.display = "none"; 
    searchBtn.style.display = "none"; 
    showList(); 
  } else {
    input.style.display = "block"; 
    searchBtn.style.display = "block"; 
  }

  highlightActiveTab();
}

function search() {
  const code = document.getElementById("code").value.trim();
  const result = document.getElementById("result");

  if (!code) {
    result.innerText = "❌ Введите код";
    return;
  }

  const path = `images/${mode}/${code}.jpg`;

  result.innerHTML = `
    <img src="${path}"
      onerror="
        this.remove();
        document.getElementById('result').innerText = '❌ Не найдено';
      ">
  `;
}

function showList() {
  const result = document.getElementById("result");
  let items = [];

  if (mode === "diod") items = ["Лупа", "240 wwat", "4040", "5054"];
  if (mode === "banner") items = ["tent", "500gr", "340gr"];
  if (mode === "fomax") items = ["3mm", "4mm","5mm","8mm","10mm","16mm"];

  result.innerHTML = items
    .map(item => `<button onclick="openItem('${item}')">${item}</button>`)
    .join("");
}

function openItem(name) {
  const result = document.getElementById("result");
  const path = `images/${mode}/${name}.jpg`;

  result.innerHTML = `
    <img src="${path}"
      onerror="
        this.remove();
        document.getElementById('result').innerText = '❌ Не найдено';
      ">
  `;
}

function highlightActiveTab() {
  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`tab-${mode}`).classList.add('active');
}
