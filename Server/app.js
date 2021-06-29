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
    let trial = req.params.input;
    console.log(trial);
    console.log(typeof trial);
    let requestedInput = data.find(input => input.toString().toLowerCase() === trial.toLowerCase())

    if (!requestedInput) {
        throw new Error("Country Not Found!")
    }
    res.send(requestedInput);  
})

module.exports = app;