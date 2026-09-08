import { cart, addToCart} from "../data/Cart.js";
import { products } from "../data/products.js";

// The Number of products in the cart will be load on the page as it was left previously.And it's displayed on the page here.Using  simple Function.
export function displayQuantity() {
  let Quantity = localStorage.getItem('numberOfQuantity');
  document.querySelector('.cart-quantity').innerHTML = Quantity;
  if (Quantity === 0) {
    Quantity.innerHTML = 0;
  }
}

displayQuantity();


let accumulativePattern = '';

// Here we're using all the products created as an Objects inside an Array,the Array name is products.Using the ForEach loop,we loop through and generate all the HTML elements needed and display it on the web page.
products.forEach((product) => {
    let generatedHTML = `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines ">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" "popup">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-button" data-product-name = "${product.name}" id="${product.id}">
            Add to Cart
          </button>
        </div>
        
    `;

    // We're using the Accumulator pattern to add all the elements generated together.
    // console.log(generatedHTML);
    accumulativePattern += generatedHTML;
    
});

// Target the products container and put all the product details in and display it on the Page.
document.querySelector('.products-grid').innerHTML = accumulativePattern;



// A function to update the cart quantity depending on the products added.
export function updateQuantity() {
        // This countDown  variable will count the number of products added to the Cart and save it to Local Storage..  
        let quantityCount = 0;

        cart.forEach((item) =>{
          // The countDown increment.
          quantityCount += item.quantity;

          localStorage.setItem('numberOfQuantity',quantityCount);
        })

        

      // Demostration of number of product quantity on the page.
      document.querySelector('.cart-quantity').innerHTML = quantityCount;
}


// Identify the Add to Cart button by giving it a class name and loop through to take effect on all the buttons.
// We are solving all the Add to Cart functionalities here...
document.querySelectorAll('.js-button').forEach((addButton) => {

  
  // Here,we're giving the Add to cart button an Even Listener.
    addButton.addEventListener('click',() => {
      let productName = addButton.dataset.productName;
      let idName = addButton.id;

      addToCart(idName);
      updateQuantity();

    }); 
});
