import { cart,removingFromCart,updateQuantity } from "../data/Cart.js";
import { products } from "../data/products.js";

updateQuantity();


 // Here,we're using the product Id to get the other details of a product that is added into a cart. Eg is image,price and name.
let matchingCartProduct = '';

let theAccumulator;

    cart.forEach((cartItem) =>{
      
      const cartId = cartItem.ID;

      products.forEach((allProducts) =>{
        
          if (allProducts.id === cartId) {
              matchingCartProduct = allProducts;
          }
      });

    // Using the same process we used for generating the HTML for all the products on the page,we use same for generating for all carts added to the cart page. 
      let HTML = `
              <div class="cart-item-container idName-${matchingCartProduct.id}">
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
                    <span class="delete-quantity-link link-primary " id="${matchingCartProduct.id}">
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

      // console.log(HTML);
      
      // The Accumulater variable.
      theAccumulator += HTML;
      
    });
document.querySelector('.order-summary').innerHTML = theAccumulator;


// Here we loop through all the delete link to find each button when click.
document.querySelectorAll('.delete-quantity-link').forEach((deleted)=>{

  // A click event has been added to make it interactive
  deleted.addEventListener('click',()=>{
    let deleteBtnId = deleted.id;
    
    // A function that has been created from the the Cart file has been called here with a Augument that is the particular Delete Button Id that has been clicked.
    removingFromCart(deleteBtnId);


    // using the DOM to collect the full from details and delete it from the Page.
    let aboutToDelete = document.querySelector(`.idName-${deleteBtnId}`);

    // The Removal function is called here.
    aboutToDelete.remove();
    
   
    


   let findingToDelete = '';
    cart.forEach((allCartProducts)=>{
      if (deleteBtnId === allCartProducts.ID) {
        findingToDelete = allCartProducts;
      }
      
    })
    
  });

  
})
