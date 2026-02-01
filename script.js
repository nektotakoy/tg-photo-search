let mode = "oracal";

function setMode(newMode) {
  mode = newMode;

  const result = document.getElementById("result");
  const input = document.getElementById("code");

  result.innerHTML = "";

  // 👇 поле ввода показываем только для оракалов
  if (mode === "diod" || mode === "banner" || mode === "fomax") {
    input.style.display = "none";
    showList();
  } else {
    input.style.display = "block";
  }
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

// СПИСОК КНОПОК
function showList() {
  const result = document.getElementById("result");
  let items = [];

  if (mode === "diod") items = ["red", "blue", "green", "purple"];
  if (mode === "banner") items = ["big", "small", "enormous", "tiny"];
  if (mode === "fomax") items = ["white", "black"];

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
