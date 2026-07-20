export const cart = [];

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


