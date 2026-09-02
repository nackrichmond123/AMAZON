export let cart = JSON.parse(localStorage.getItem('savedToPage'));

if (!cart) {
  cart =  [
  {
    Name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    quantity: 1,
    ID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  },

  {
    Name: "Intermediate Size Basketball",
    quantity:1,
    ID: "15b6fc6f-327a-4ec4-896f-486349e85a3d"
  }
];
}


// A Function to save all the saved products into Local Storage.
// It stores into storage when the Add to Cart and Delete Buttons are  clicked.
export function savingToStorage() {
  localStorage.setItem('savedToPage',JSON.stringify(cart));
} 

// A function to add to Cart. 
export function addToCart(productName,idName) {
      // A  condition to check whether a product has already been added to cart or not,Using the products's ID.
      let sameProduct = '';
      
      cart.forEach((item) =>{
        // console.log(item);
        
        if (idName === item.ID) {
          sameProduct = item;
        }
      });

      // If there's a same product added,quantity will increase else product will be added to cart.
      
      if (sameProduct) {
        sameProduct.quantity += 1;

      } else {
          cart.push({
          Name:productName,
          quantity: 1,
          ID:idName
        });
        
      }

      savingToStorage();
}



// Delecting a product from the Cart.
export let Length = '';

export function removingFromCart(selectedId) {
  const newCart = [];
  
  cart.forEach((cartItem)=>{
    
    
    if (cartItem.ID !== selectedId) {
      newCart.push(cartItem);
      updateQuantity();
    //  console.log(cartItem);
    }
    
  });

  cart = newCart;

  updateQuantity();


  savingToStorage();
}

// Updating the cart quantity after Deleting a product.
export function updateQuantity() {
        // This countDown  variable will count the number of products added to the Cart and save it to Local Storage..  
        let quantityCount = 0;

        cart.forEach((item) =>{
          // The countDown increment.
          quantityCount += item.quantity;

          localStorage.setItem('numberOfQuantity',quantityCount);
          
        })

        

      // Demostration of number of product quantity on the page.
      document.querySelector('.return-to-home-link').innerHTML = quantityCount + ' ' + 'items';
}