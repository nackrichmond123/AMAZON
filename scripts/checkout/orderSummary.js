import { cart,removingFromCart,updateQuantity,updateDeliveryOption } from "../../data/Cart.js";
import { products,getProductById } from "../../data/products.js";
import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOption.js";
import { toPriceFormat } from "../../Utilities/priceSolving.js";

export function renderOrderSummary() {
  updateQuantity();


  // Here,we're using the product Id to get the other details of a product that is added into a cart. Eg is image,price and name.
  //  This thing caused an ERROR and I debugged it for 3 good days.I wrote "let theAccumulator;" instead of the proper format.
  let theAccumulator = '';

  cart.forEach((cartItem) =>{
    
    const cartId = cartItem.ID;

    const matchingCartProduct = getProductById(cartId);



    // Finding from the Cart,the delivery Option Id and compare it to the Options in the DeliveryOption Array.
    const deliveryOptionId = cartItem.deliveryOptionsId;
    // console.log(deliveryOptionId);
    
    
    let deliveryOption = getDeliveryOption(deliveryOptionId);  


  
    const dateOfToday = dayjs();
    const deliveryDate = dateOfToday.add(deliveryOption.deliveryDays,'days');
    const properDateFormat = deliveryDate.format('dddd, MMMM D');
    

    // Using the same process we used for generating the HTML for all the products on the page,we use same for generating for all carts added to the cart page. 
    theAccumulator +=  ` 
      <div class="cart-item-container idName-${matchingCartProduct.id}">
        <div class="delivery-date">
          Delivery date: ${properDateFormat}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingCartProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingCartProduct.name}
            </div>
            <div class="product-price">
              ${toPriceFormat(matchingCartProduct.priceCents)}
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
            ${deliveryOptionsHTML(matchingCartProduct,cartItem)}
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
        // I had an ERROR here that caused me almost a week to debug.
        const properPrice = AllOptions.shippingFees === 0
        ? 'FREE'

        : `$${toPriceFormat(AllOptions.shippingFees)} -`;

        // Solving the problem of the radio button when it is clicked.
        // The radio button will be checked if it matches the product in the cart deliveryOptionId Array.
        const isChecked = AllOptions.id === cartItem.deliveryOptionsId;
      
        
        
        HTML += `
            <div class="delivery-option js-delivery-Option" data-product-id="${matchingCartProduct.id}"
            data-delivery-option-id="${AllOptions.id}">
              <input type="radio"
                ${isChecked ? 'checked' : ''} 
                id="${cartItem.deliveryOptionsId}"
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
      });

      // Here we return the HTML so it can be used again.
      return HTML;
      
    }
    
    // console.log(deliveryOptionsHTML(matchingCartProduct,cartItem));
    
    
  });
  document.querySelector('.js-order-summary').innerHTML = theAccumulator;




  // Here we loop through all the delete link to find each button when click.
  // Using the forEach loop.
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

  // This code works so that the radio button will be interactive when it is changed.

  document.querySelectorAll('.js-delivery-Option').forEach((value)=>{
    // console.log(value);
    
    value.addEventListener('click', () => {
      const {productId,deliveryOptionId} = value.dataset;  
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
    });
  })
  
}

