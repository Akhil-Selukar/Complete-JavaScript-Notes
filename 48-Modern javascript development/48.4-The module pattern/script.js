// Importing module

const pizzaShop = (function () {
  const pizzaOrdered = [];
  const deliveryCharges = 20;

  const orderPizza = function (pizzaName, quantity) {
    console.log(`You ordered ${quantity} ${pizzaName}..!!`);
    pizzaOrdered.push({ pizzaName, quantity });
  };

  const specialInstructions = function (messageForChef) {
    console.log(`You special instruction is ${messageForChef}..!!`);
  };

  return {
    deliveryCharges,
    pizzaOrdered,
    orderPizza,
  };
})();

console.log("Ordering pizza");

pizzaShop.orderPizza("Pepperoni pizza", 3);

console.log("Your order is below");
console.log(pizzaShop.pizzaOrdered);

console.log(
  `Total bill amount including delivery charges is ${
    pizzaShop.pizzaOrdered[0].quantity * 120 + pizzaShop.deliveryCharges
  }`
);

// console.log(pizzaShop.specialInstructions("Please use fresh cheese."));
