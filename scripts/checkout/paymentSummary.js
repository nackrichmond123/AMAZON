import { cart } from "../../data/Cart.js";
import { getProductById } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { toPriceFormat } from "../../Utilities/priceSolving.js";

// Here we are writing a function to get all the data on the Payment sumamary and use it to Generate the HMTL on the Page.
export function renderPaymentSummary(){

  // By starting,we will loop through the cart,find the product ID and use it to find the price of each product in the cart.
  let totalProductPrice = 0;
  let totalShippingPrice = 0;
  cart.forEach((cartProducts) => {

    console.log(cartProducts);
    
    // A function was created to get all the details of a product by passing in the product ID as an augument.So with that,we get all the product prices.
    const productsInCart =  getProductById(cartProducts.ID);
    // console.log(productsInCart);
    
    // Each price is multipled by it quantity and it is accumulated togetther to get one total value for all the prices in the cart.
    // 1.The Total cost of Products in Cart.
    totalProductPrice += productsInCart.priceCents * cartProducts.quantity;


    // Now we get on with finding the Shipping price.
    // Same as the product prices,We will use the same function with a deliveryOption ID,we will get the shipping price by looping through the deliveryOptions to find the Fees.
    const deliveryOption = getDeliveryOption(cartProducts.deliveryOptionsId);

    console.log(deliveryOption);
    
    // 2. The Total cost of Shipping fees
    totalShippingPrice += deliveryOption.shippingFees;
    
    
  })


  // 3.Cost of products before Taxing.    
  const totalBeforeTax = totalProductPrice + totalShippingPrice;

  // 4.Tax charged on the product costs 
  const taxRate = 0.1;  
  const taxPecentage = totalBeforeTax * taxRate;
  
  
  // 5.The Total amount of the Order 
  const totalAmountToPay = totalBeforeTax + taxPecentage; 

  
  console.log(totalProductPrice);
  console.log(totalShippingPrice);
  console.log(totalBeforeTax);
  console.log(taxPecentage);
  console.log(totalAmountToPay);
  

  
  let  HTML = ` 
        <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${toPriceFormat(totalProductPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${toPriceFormat(totalShippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${toPriceFormat(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${toPriceFormat(taxPecentage)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${toPriceFormat(totalAmountToPay)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `   

  document.querySelector('.demo').innerHTML = HTML;

}