const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let transactionsArray = require("../models/transactionsModel")

//WORKS
//show all, entire list
router.get("/", (req, res) => {
    res.send(transactionsArray);
})

//WORKS
// show individual but id
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
//WORKS
//create, add to end of list 
router.post("/", (req, res) => {

    const transaction  = req.body;

    if(!transaction){
        res
        .status(400)
        .json({ status: false, message: "You cannot create an empty todo" });
    } else{
        // const newTransaction = {
        //     id: uuidv4(),
        //     item_name,
        //     amount,
        //     date,
        //     from,
        //     category,
        // };

        transactionsArray.push(transaction);

        res.status(201).json({ status: true, data: transaction });
    }
});

//WORKS
//Delete
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const matched = transactionsArray.find((item) => item.id === id)

    if (!matched) {
        res
          .status(404)
          .json({ status: false, message: "sorry, no transaction with this id is found" });
      } else {
    
        let newArray = transactionsArray.filter((item) => item.id !== id);

        transactionsArray = newArray
    
        //sending back the found object to delete
        res.json({
          status: true,
          message: "success",
          data: matched,
        });
      }

})

//WORKS
//UPDATE
router.put("/:id", (req, res) => {
    const { id } = req.params;

    const matched = transactionsArray.find((item) => item.id === id)

    const foundIndex = transactionsArray.findIndex((item) => item.id === id);

    if(!matched){
        res
        .status(404)
        .json({ status: false, message: "sorry, no transaction with this id is found" });
    } else{
        let newObject = {
            ...matched,
            ...req.body
        }

        transactionsArray.splice(foundIndex, 1, newObject)
        res.json({ message: "success", status: true, data: newObj });
    }
})





module.exports = router;