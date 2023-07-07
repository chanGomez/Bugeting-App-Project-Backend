const { v4: uuidv4 } = require("uuid");

const transactionsModel = [
  {
    id: uuidv4(),
    item_name: "berkin bag",
    amount: 15000,
    date: 7.5,
    from: "deli",
    category: "nacessities "
  },
  {
    id: uuidv4(),
    item_name: "hamster",
    amount: 15000,
    date: 7.5,
    from: "deli",
    category: "nacessities "
  },
  {
    id: uuidv4(),
    item_name: "skateboard",
    amount: 15000,
    date: 7.5,
    from: "deli",
    category: "nacessities "
  }
];

module.exports = transactionsModel;