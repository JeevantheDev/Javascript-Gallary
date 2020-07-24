var form = document.getElementById("image-form");
var parentDiv = document.getElementById("collection");
var filter = document.getElementById("filter");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var reader = new FileReader();

  var name = document.getElementById("image").files[0].name;
  var desc = document.getElementById("description");

  reader.addEventListener("load", function () {
    if (this.result && localStorage) {
      window.localStorage.setItem(desc.value, this.result);
      alert("Image stored");
      parentDiv.innerHTML = "";
      location.reload();
      showImg();
    } else {
      alert("Not successfull");
    }
  });

  reader.readAsDataURL(document.getElementById("image").files[0]);
  console.log(name);
});

function showImg() {
  for (let i = 0; i < window.localStorage.length; i++) {
    let res = window.localStorage.getItem(window.localStorage.key(i));
    let text = Object.entries(localStorage)[i][0];

    var image = new Image();
    image.className = "card-img-top";
    image.src = res;

    var h3 = document.createElement("h3");
    h3.className = "card-text";
    h3.textContent = text;

    var link = document.createElement("a");
    link.className = "btn btn-danger";
    link.innerHTML = '<i class="fa fa-times"></i>';

    var divText = document.createElement("div");
    divText.className = "card-body";
    divText.appendChild(h3);
    divText.appendChild(link);

    var divImg = document.createElement("div");
    divImg.className = "card";
    divImg.appendChild(image);
    divImg.appendChild(divText);

    var divCol = document.createElement("div");
    divCol.className = "col mb-4";
    // divCol.className = "mb-4";
    divCol.appendChild(divImg);

    parentDiv.appendChild(divCol);
  }
}

// Remove image
parentDiv.addEventListener("click", function (e) {
  if (e.target.parentElement.classList.contains("btn-danger")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.parentElement.remove();
      localStorage.removeItem(
        e.target.parentElement.parentElement.parentElement.innerText
      );
      location.reload();
    }
  }
});

// Filter image
filter.addEventListener("keyup", function (e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".col").forEach(function (img) {
    const item = img.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
});

// Clear All
function remove() {
  window.localStorage.clear();
  parentDiv.innerHTML = "";
}

showImg();
