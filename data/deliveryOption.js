export function getDeliveryOption(deliveryOptionId) {
        let deliveryOption = '';  

    deliveryOptions.forEach((option) =>{ 
      // console.log(option.deliveryDays);
      
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
          
        }
    });

    return deliveryOption;
}

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        shippingFees: 0
    },

    {
        id: '2',
        deliveryDays: 3,
        shippingFees: 499
    },

    {
        id: '3',
        deliveryDays: 1,
        shippingFees: 999
    }
];


