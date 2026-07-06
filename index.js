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

          <div class="added-to-cart">
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
    

// This countDown  variable will count the number of of products added to the Cart.Same product will be counted as one.  
let countDown = 0;

// Identify the Add to Cart button by giving it a class name and loop through to take effect on all the buttons.
// We are solving all the Add to Cart functionalities here...
document.querySelectorAll('.js-button').forEach((addButton) => {

  // Here,we're giving the Add to cart button an Even Listener.
    addButton.addEventListener('click',() => {
      // Here a Data Atrribute has been given to all the products.It's called data-product-name.
      let productName = addButton.dataset.productName;

      // console.log(productName);
    
      // A  condition to check whether a product has already been added to cart or not,Using the products's ID.
      let sameProduct = '';
      cart.forEach((item) =>{
        // console.log(item.quantity);
        
        if (productName === item.Name) {
          sameProduct = item;
        }
      });

      // If there's a same product added,quantity will increase else product will be added to cart.
      if (sameProduct) {
        sameProduct.quantity += 1;

      } else {
          cart.push({
          Name:productName,
          quantity: 1
        });

        // The countDown increment.
        countDown  +=1;
      }

      // Demostration of number of cart on the page.
      let productCount = document.querySelector('.cart-quantity');
      productCount.innerHTML = countDown;
      // console.log(countDown);
    
      console.log(cart);


    }); 

});


      // After adding a product,a message will show at the bottom that the product has been added sucessfully.
      // document.querySelectorAll('.added-to-cart').forEach((addedMessage) => {
      //   console.log(addedMessage.innerHTML);
        
      // });
      // messagePopup.innerHTML = 'added';