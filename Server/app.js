const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json());

data = [{input: "Spain",
         results: ["a","b","c","d","e","f"]},
         {input: "Football",
         results: ["a","b","c","d","e","f"]},
         {input: "Music",
         results: ["a","b","c","d","e","f"]}
        ]

app.get('/', (req, res) => {
    res.send(data);
});

app.get("/:input", (req, res) => {
    try{
        let trial = req.params.input.toLowerCase();
        let requestedInput = data.find(i => i.input.toLowerCase() === trial)
        if (!requestedInput){
            throw new Error("Input not found!")
        }
        res.send(requestedInput);  
    } catch (error) {
        res.status(404).send({message: error.message})
    }

})

module.exports = app;