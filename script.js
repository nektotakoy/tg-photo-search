function search() {
  const code = document.getElementById("code").value;
  const result = document.getElementById("result");

  const images = {
    "8720": "images/8720.jpg",
    "8730": "images/8730.jpg",
    "8739": "images/8739.jpg",
    "8780": "images/8780.jpg",
  };

  if (images[code]) {
    result.innerHTML = `<img src="${images[code]}">`;
  } else {
    result.innerHTML = "❌ Ничего не найдено";
  }
}
