export let cart = [
  {
    Name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    quantity: 1,
    ID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
  },

  {
    Name: "Intermediate Size Basketball",
    quantity:1,
    ID: "15b6fc6f-327a-4ec4-896f-486349e85a3d"
  },

  {
    Name: "Adults Plain Cotton T-Shirt - 2 Pack",
    quantity: 1,
    ID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"
  },

  {
    ID: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    quantity: 1
  },

  {
    ID: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    quantity: 1
  }
];


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
}

// Delecting a product from the Cart
export function removingFromCart(selectedId) {
  const newCart = [];
  
  cart.forEach((cartItem)=>{
    if (cartItem.ID !== selectedId) {
      newCart.push(cartItem);
    }
    
  });

  cart = newCart;
  // console.log(cart);
  
}