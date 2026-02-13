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
    <button class="download-btn" onclick="downloadImage('${path}')">
      ⬇ Скачать
    </button>
  `;

  const img = document.getElementById("result-img");
  img.onerror = () => {
    result.innerText = "❌ Не найдено";
  };
}


function downloadImage(url) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

   
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
      const win = window.open();
      win.document.write(`
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <img src="${dataUrl}" style="width:100%;height:auto">
      `);
      return;
    }

   
    canvas.toBlob(blob => {
      const a = document.createElement("a");
      const blobUrl = URL.createObjectURL(blob);
      a.href = blobUrl;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, "image/jpeg", 1);
  };

  img.onerror = () => {
    alert("Ошибка загрузки изображения");
  };
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
