// Exporting module

console.log("Exporting module.");

let billAmount = 0;
const pizzaOrdered = [];
const deliveryCharges = 20;

export const orderPizza = function (pizzaName, quantity) {
  console.log(`You ordered ${quantity} ${pizzaName}..!!`);
  pizzaOrdered.push({ pizzaName, quantity });
  billAmount = 120 * quantity;
};

export { billAmount as bill, deliveryCharges as charges, pizzaOrdered };

// Default export

export default function (messageForChef) {
  console.log(`You special instruction is ${messageForChef}..!!`);
}
