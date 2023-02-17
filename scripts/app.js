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
swiperWrap.innerHTML="";
if (window.innerWidth > 1450) {
  //showing the last and first 2 swiper elements
  swiperWrap.appendChild(swiperElements[swiperElements.length - 1]);
  swiperWrap.appendChild(swiperElements[0]);
  swiperWrap.appendChild(swiperElements[1]);
  setTimeout(() => {
    swiperElements[swiperElements.length - 1].classList.add("swiper-show");
    swiperElements[0].classList.add("swiper-show");
    swiperElements[1].classList.add("swiper-show");
  }, 20);
} else {
  //showing only one element
  swiperWrap.appendChild(swiperElements[0]);
  setTimeout(() => {
    swiperElements[0].classList.add("swiper-show");
  }, 20);
}

const displaySwiperElements = (value) => {
  swiperWrap.innerHTML="";
  swiperElements.forEach (element => {
    element.classList.remove("swiper-show");
  })
  //display 3 elements only on screens bigger that 1024px
  if (window.innerWidth > 1450) {
    swiperWrap.appendChild(swiperElements[Number(value) === 0 ? swiperElements.length - 1 : Number(value) - 1]);
    swiperWrap.appendChild(swiperElements[Number(value)]);
    swiperWrap.appendChild(swiperElements[Number(value) >= swiperElements.length - 1 ? Number(value) + 1 - swiperElements.length : Number(value) + 1]);
    setTimeout(() => {
      swiperElements[Number(value) === 0 ? swiperElements.length - 1 : Number(value) - 1].classList.add("swiper-show");
      swiperElements[Number(value)].classList.add("swiper-show");
      swiperElements[Number(value) >= swiperElements.length - 1 ? Number(value) + 1 - swiperElements.length : Number(value) + 1].classList.add("swiper-show");
    }, 20);
  } else {
    swiperWrap.appendChild(swiperElements[Number(value)]);
    setTimeout(() => {
      swiperElements[Number(value)].classList.add("swiper-show");
    }, 20);
  }
  clearInterval(swipeTimer);
  swipeTimer = setInterval(swipeNext, 5000);
}

//value is used to store the last event on the radio button click
let value = 0;

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

// timer that every 5s swipes
let swipeTimer = setInterval(swipeNext, 5000)

// showing one or more elements depending on widow size
window.addEventListener ("resize", () => {
  displaySwiperElements(value);
})

// Get all the modals
const modal = document.querySelectorAll(".modal");

// Get the link modals
const linkModal = document.querySelectorAll(".link-modal");

// Get the plus modals
const plusModal = document.querySelectorAll(".plus-modal");

// Get the link button that opens the modal
const link = document.querySelectorAll("#link");

// Get the link button that opens the modal
const plus = document.querySelectorAll("#plus");

// Get the <span> element that closes the modal
const closeModal = document.querySelectorAll(".close");

// When the user clicks the link button, open the link modal
link.forEach ((element, index) => element.onclick = () => linkModal[index].style.display = "flex");

// When the user clicks the plus button, open the plus modal
plus.forEach ((element, index) => element.onclick = () => plusModal[index].style.display = "flex");

// When the user clicks on <span> (x), close the modal
closeModal.forEach ((element, index) => element.onclick = () => modal[index].style.display = "none");


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  modal.forEach (element => {
    if (event.target == element) {
      element.style.display = "none";
    }
  })
}
