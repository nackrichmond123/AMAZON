import { cart,removingFromCart,updateQuantity } from "../data/Cart.js";
import { products } from "../data/products.js";
import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOption.js";

updateQuantity();


 // Here,we're using the product Id to get the other details of a product that is added into a cart. Eg is image,price and name.


let theAccumulator = '';

cart.forEach((cartItem) =>{

  console.log(cartItem);
  let mainId = cartItem.deliveryOptionsId;

  // console.log(mainId);
  
  
  
  const cartId = cartItem.ID;

  let matchingCartProduct = '';

  products.forEach((allProducts) =>{
    
      if (allProducts.id === cartId) {
          matchingCartProduct = allProducts;
          
      }
  });

  // Using the same process we used for generating the HTML for all the products on the page,we use same for generating for all carts added to the cart page. 
  theAccumulator +=  ` 
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
            ${(matchingCartProduct.priceCents /100).toFixed(2)}
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
          ${deliveryOptionsHTML(matchingCartProduct,mainId)}
        </div>
      </div>
    </div>
  `;
      
      
  // The Delivery Option HTML has been generated into a function and will be called up 
  function deliveryOptionsHTML(matchingCartProduct,cartItem) {
    let HTML = '';

    // Here we are looping through the DeliveryOptions Array to find it delivery days,fees to pay and an ID that matches a product added to the cart.
    deliveryOptions.forEach((AllOptions)=>{

      // An Extended Library called 'dayjs' has been integrated to be used for the delivery option dates.It is also used to find the proper Date format for each of the delivery Options enlisted.
      const dateOfToday = dayjs();
      const deliveryDate = dateOfToday.add(AllOptions.deliveryDays,'days');
      const properDateFormat = deliveryDate.format('dddd, MMMM D');
      

      // Here we try to calculate each price for each delivery Option since they are have different Prices.We are using thr tenarry Conditional statement.
      const properPrice = AllOptions.shippingFees === 0
      ? 'FREE'

      : `$${(AllOptions.shippingFees / 100).toFixed(2)} -`;

      // Solving the problem of the radio button when it is clicked.
      // The radio button will be checked if it matches the product in the cart deliveryOptionId Array.
      const isChecked = deliveryOptions.id === cartItem.deliveryOptionsId;
      
      
      HTML += `
          <div class="delivery-option">
            <input type="radio"
              ${isChecked ? 'checked' : ''} 
              id="${AllOptions.id}"
              class="delivery-option-input"
              name="delivery-option-${matchingCartProduct.id}">
              <div>
              <div class="delivery-option-date">
                ${properDateFormat}
              </div>
              <div class="delivery-option-price">
                ${properPrice} Shipping
              </div>
            </div>
          </div>
          `     
    })

    // Here we return the HTML so it can be used again.
    return HTML;
    
  }
  
  

});
document.querySelector('.js-order-summary').innerHTML = theAccumulator;


// Here we loop through all the delete link to find each button when click.
document.querySelectorAll('.delete-quantity-link').forEach((deleted)=>{

  // A click event has been added to make it interactive
  deleted.addEventListener('click',()=>{
    let deleteBtnId = deleted.id;
    
    // A function that has been created from the the Cart file has been called here with a Augument that is the particular Delete Button Id that has been clicked.
    removingFromCart(deleteBtnId);


    // Using the DOM to collect the full details of a product and delete it from the Page.
    let aboutToDelete = document.querySelector(`.idName-${deleteBtnId}`);

    // The Removal function is called here.
    aboutToDelete.remove();
    
  });
})