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
  if (!code) {
    document.getElementById("result").innerText = "❌ Введите код";
    return;
  }
  showImage(`images/${mode}/${code}.jpg`);
}

function openItem(name) {
  showImage(`images/${mode}/${name}.jpg`);
}

function showImage(path) {
  const result = document.getElementById("result");

  result.innerHTML = `
    <img id="result-img" src="${path}">
    <button class="download-btn" onclick="shareImage('${path}')">
      ⬇ Скачать
    </button>
  `;

  document.getElementById("result-img").onerror = () => {
    result.innerText = "❌ Не найдено";
  };
}


async function shareImage(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const fileName = url.split("/").pop();
    const file = new File([blob], fileName, { type: blob.type });


    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Image",
      });
      return;
    }

  
    const a = document.createElement("a");
    const blobUrl = URL.createObjectURL(blob);
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

  } catch (e) {
    alert("Не удалось открыть меню сохранения");
  }
}

function showList() {
  const result = document.getElementById("result");
  let items = [];

  if (mode === "diod") items = ["Лупа", "240 wwat", "4040", "5054"];
  if (mode === "banner") items = ["tent", "500gr", "340gr"];
  if (mode === "fomax") items = ["3mm", "4mm", "5mm", "8mm", "10mm", "16mm"];

  result.innerHTML = items
    .map(item => `<button onclick="openItem('${item}')">${item}</button>`)
    .join("");
}

function highlightActiveTab() {
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.getElementById(`tab-${mode}`).classList.add("active");
}
