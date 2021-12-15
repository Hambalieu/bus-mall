'use strict';
//console.log ('hello world!');

//create an array
let lastShownImage = [];
const allProducts = [];

let ATTEMPTS_ALLOWED = 25;
let clicks = 0;

//window into the DOM.
let myContainer = document.getElementById('container');
//window into the DOM for three images
let leftImage = document.getElementById('left-image');
let centerImage = document.getElementById('center-image');
let rightImage = document.getElementById('right-image');
//show result
let showResults = document.getElementById('show-results');




//Create a constructor function that creates an object associated with each product,
// and has the following properties:Name of the product/File path of image

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  //image source base on the product name
  this.src = `img/${name}.${fileExtension}`;
  //number of img views
  this.views = 0;
  //number of clicks
  this.clicks = 0;
  //push into allBusMall array
  allProducts.push(this);
}

//executable code.
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

//function to get random index to show 3 different products.
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

let productOneIndex = getRandomIndex();
let productTwoIndex = getRandomIndex();
let productThreeIndex = getRandomIndex();

console.log(productOneIndex, productTwoIndex, productThreeIndex);

// //create a while loop to make sure that no images displayed in any set of 3 are the same and none of them are the same images as last time


while (productOneIndex === productTwoIndex
  || productOneIndex === productThreeIndex
  || productTwoIndex === productThreeIndex
  || lastShownImage.includes(productOneIndex)
  || lastShownImage.includes(productTwoIndex)
  || lastShownImage.includes(productThreeIndex)) {

  productOneIndex = Math.floor(Math.random() * allProducts.length);

  productTwoIndex = Math.floor(Math.random() * allProducts.length);

  productThreeIndex = Math.floor(Math.random() * allProducts.length);
}


//console.log(productOneIndex, productTwoIndex, productThreeIndex);

//now i can display my three images
function renderImages() {

  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();


  //console.log(productOneIndex, productTwoIndex, productThreeIndex);

  // //create a while loop to make sure that no images displayed in any set of 3 are the same and none of them are the same images as last time
  while (productOneIndex === productTwoIndex
    || productOneIndex === productThreeIndex
    || productTwoIndex === productThreeIndex
    || lastShownImage.includes(productOneIndex)
    || lastShownImage.includes(productTwoIndex)
    || lastShownImage.includes(productThreeIndex)) {

    productOneIndex = Math.floor(Math.random() * allProducts.length);

    productTwoIndex = Math.floor(Math.random() * allProducts.length);

    productThreeIndex = Math.floor(Math.random() * allProducts.length);
  }
  lastShownImage[0] = productOneIndex;
  lastShownImage[1] = productTwoIndex;
  lastShownImage[2] = productThreeIndex;

  leftImage.src = allProducts[productOneIndex].src;
  leftImage.alt = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  centerImage.src = allProducts[productTwoIndex].src;
  centerImage.alt = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  rightImage.src = allProducts[productThreeIndex].src;
  rightImage.alt = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}

// Function that i need to render the chart
function renderProductChart() {
  const ctx = document.getElementById('Chart').getContext('2d');
  //label for Axis
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productVotes.push(allProducts[i].clicks);
    productViews.push(allProducts[i].views);
  }

  let myChartData = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of votes',
        data: productVotes,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },

      {
        label: '# of views',
        data: productViews,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const chart = new Chart(ctx, myChartData);

}


//event hander for the clicks
function handleImageClick(e) {
  clicks++;
  let imageClicked = e.target.alt;
  console.log(imageClicked);
  //after the click we want to know how many times a product is clicked.
  for (let i = 0; i < allProducts.length; i++) {
    if (imageClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  //rerender
  renderImages();
  //when it hits 25 dont allow anymore clicks
  if (clicks === ATTEMPTS_ALLOWED) {
    //stop the event handler by removing the event listener
    myContainer.removeEventListener('click', handleImageClick);
  }

}
//dispaly results in a list
function handleShowResultsClick() {
  let displayResults = document.getElementById('display-results');
  if (clicks === ATTEMPTS_ALLOWED) {

    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes and was seen ${allProducts[i].views} times `;
      displayResults.appendChild(li);
    }
    renderProductChart();
  }

}

//executable code for images.

renderImages();


//Event listener to listen to the click
myContainer.addEventListener('click', handleImageClick);

//Event listener for show result

showResults.addEventListener('click', handleShowResultsClick);


