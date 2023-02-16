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

//showing different swiper elements depending on the clicked radio button
const radioElements = document.querySelectorAll(".radio-button");
radioElements.forEach(element => {
  element.addEventListener("click", (event) => {
    swiperElements.forEach (element => {
      element.style.display = "none";
    })
    //display 3 elements only on screens bigger that 1024px
    if (screen.width > 1024) {
      swiperWrap.appendChild(swiperElements[Number(event.target.value) === 0 ? swiperElements.length - 1 : Number(event.target.value) - 1]);
      swiperWrap.appendChild(swiperElements[Number(event.target.value)]);
      swiperWrap.appendChild(swiperElements[Number(event.target.value) >= swiperElements.length - 1 ? Number(event.target.value) + 1 - swiperElements.length : Number(event.target.value) + 1]);
      swiperElements[Number(event.target.value) === 0 ? swiperElements.length - 1 : Number(event.target.value) - 1].style.display = "block";
      swiperElements[Number(event.target.value)].style.display = "block";
      swiperElements[Number(event.target.value) >= swiperElements.length - 1 ? Number(event.target.value) + 1 - swiperElements.length : Number(event.target.value) + 1].style.display = "block";
    } else {
      swiperWrap.appendChild(swiperElements[Number(event.target.value)]);
      swiperElements[Number(event.target.value)].style.display = "block";
    }
  })
})