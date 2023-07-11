const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let transactionsArray = require("../models/transactionsModel")


//SHOW
router.get("/", (req, res) => {
    res.send(transactionsArray);
})


// SHOW BY ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const matched = transactionsArray.find((item) => item.id === id)

    if(!matched){
        res.status(404).json({
            status: false,
            message: "Id not found",
          });
    } else {
        res.json({ status: true, data: matched });
    }
})

//CREATE
router.post("/new-transaction", (req, res) => {

    const transaction  = req.body;

    if(!transaction){
        res
        .status(400)
        .json({ status: false, message: "You cannot create an empty todo" });
    } else{
        const newTransaction = {
            id: uuidv4(),
            item_name: transaction.item_name,
            amount: transaction.amount,
            date: transaction.date,
            from: transaction.from,
            category: transaction.category,
        }

        transactionsArray.push(newTransaction);
        res.status(201).json({ status: true, data: newTransaction });
    }
});

//Delete
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    let foundIndex = transactionsArray.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
        res
          .status(404)
          .json({ status: false, message: "sorry, no transaction with this id is found" });
      } else {

        let foundTransaction = transactionsArray[foundIndex];
        let newArray = transactionsArray.filter((item) => item.id !== id);

        transactionsArray = newArray
    
        res.json({
          status: true,
          message: "success",
          data: foundTransaction,
        });
      }

})

//UPDATE
router.put("/:id/edit", (req, res) => {
    const id = req.params.id;

    const foundIndex = transactionsArray.findIndex((item) => item.id === id);

    if(foundIndex === -1){
        res
        .status(404)
        .json({ status: false, message: "Id not found!" });
    } else{

        let foundTransaction = transactionsArray[foundIndex];

        let newObj = {
            ...foundTransaction,
            ...req.body,
          };

        transactionsArray.splice(foundIndex, 1, newObj)
        
        res.json({ message: "success", status: true, data: newObj});
    }
})



module.exports = router;