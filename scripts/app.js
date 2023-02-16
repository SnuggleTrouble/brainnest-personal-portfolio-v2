const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//getting the DOM elements we need for the swiper
const swiperWrap = document.querySelector(".swiper-wrap");
const swiperElements = document.querySelectorAll(".swiper-item-wrap");
const radioWrap = document.querySelector(".radio-wrap");
const width = document.querySelector("#width");
// adding radio buttons for how many elements we have
for (let i = 0; i < swiperElements.length; i++){
  const input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "radio");
  input.setAttribute("class", "radio-button");
  input.setAttribute("id", `radio${i}`);
  input.setAttribute("value", `${i}`);
  if (i === 0) {
    input.checked = true;
  }
  radioWrap.appendChild(input);
}

//display 3 elements only on screens bigger that 1024px
if (screen.width > 1024) {
  //showing the last and first 2 swiper elements
  swiperWrap.appendChild(swiperElements[swiperElements.length - 1]);
  swiperWrap.appendChild(swiperElements[0]);
  swiperWrap.appendChild(swiperElements[1]);
  swiperElements[swiperElements.length - 1].style.display = "block";
  swiperElements[0].style.display = "block";
  swiperElements[1].style.display = "block";
} else {
  //showing only one element
  swiperWrap.appendChild(swiperElements[0]);
  swiperElements[0].style.display = "block";
}

let value = 0;

const displaySwiperElements = (value) => {
  swiperElements.forEach (element => {
    element.style.display = "none";
  })
  //display 3 elements only on screens bigger that 1024px
  if (screen.width > 1024) {
    swiperElements[Number(value) === 0 ? swiperElements.length - 1 : Number(value) - 1].style.display = "block";
    swiperElements[Number(value)].style.display = "block";
    swiperElements[Number(value) >= swiperElements.length - 1 ? Number(value) + 1 - swiperElements.length : Number(value) + 1].style.display = "block";
    swiperWrap.appendChild(swiperElements[Number(value) === 0 ? swiperElements.length - 1 : Number(value) - 1]);
    swiperWrap.appendChild(swiperElements[Number(value)]);
    swiperWrap.appendChild(swiperElements[Number(value) >= swiperElements.length - 1 ? Number(value) + 1 - swiperElements.length : Number(value) + 1]);
  } else {
    swiperWrap.appendChild(swiperElements[Number(value)]);
    swiperElements[Number(value)].style.display = "block";
  }
  clearInterval(swipeTimer);
  swipeTimer = setInterval(swipeNext, 5000);
}

//showing different swiper elements depending on the clicked radio button
const radioElements = document.querySelectorAll(".radio-button");
radioElements.forEach(element => {
  element.addEventListener("click", (event) => {
    value = event.target.value;
    displaySwiperElements(value);
  })
})

//function that moves to next swiper element
const swipeNext = () => {
  for (var i = 0; i < radioElements.length; ++i) {
    if (radioElements[i].checked == true) {
      if (i == radioElements.length - 1) {
        radioElements[0].checked = true;
        displaySwiperElements(radioElements[0].value);
      } else {
        radioElements[i + 1].checked = true;
        displaySwiperElements(radioElements[i+1].value);
      }
      break;
    }
  }
}

//timer that every 5s swipes
let swipeTimer = setInterval(swipeNext, 5000)

// showing one or more elements depending on widow size
window.addEventListener ("resize", () => {
  displaySwiperElements(value);
})

const swiperObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("swiper-show");
    }else {
      entry.target.classList.remove("swiper-show");
    }
  });
});

const swiperHiddenElements = document.querySelectorAll(".swiper-hidden");
swiperHiddenElements.forEach((el) => swiperObserver.observe(el));