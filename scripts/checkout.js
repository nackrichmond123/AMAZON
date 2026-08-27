import { cart } from "../data/Cart.js";
import { products } from "../data/products.js";

 // Here,we're using the product Id to get the other details of a product that is added into a cart.Eg is image,price and name.
let matchingCartProduct = '';

let theAccumulator;

    cart.forEach((cartItem,index) =>{

      // console.log(cartItem);
      
      const cartId = cartItem.ID;

      products.forEach((allProducts) =>{
        
          if (allProducts.id === cartId) {
              matchingCartProduct = allProducts;
          }
      });

    // Using the same process we used for generating the HTML for all the products on the page,we use same for generating for all carts added to the cart page. 
      let HTML = `
              <div class="cart-item-container">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingCartProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingCartProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingCartProduct.priceCents /100}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingCartProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingCartProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingCartProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
      `;

      // The Accumulater variable.
      theAccumulator += HTML;
      
      // This part also shows the number of products added to the cart and display it on top of the CheckOut page.
      // We use the ".length" property to count it..
      document.querySelector('.return-to-home-link').innerHTML = cart.length +' ' + 'items';

    });

document.querySelector('.order-summary').innerHTML = theAccumulator;
