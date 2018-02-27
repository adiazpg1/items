const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser);

app.route('/api/cats').post((req, res) => {
    res.send(201, req.body);
})


app.route('api/cats/:name').put((req, res) => {
    res.send(200, req.body);
})

app.route('api/cats/:name').delete((req, res) => {
    res.sendStatus(204);
})

app.route('/api/cats').get((req, res) => {
    res.send({
        cats: [
            { name: 'lily' }, { name: 'puppy' }, { name: 'dobby' }
        ]
    })
});


app.route('api/cats/:name').get((req, res) => {
    const requestedCatName = req.params['name'];
    res.send({ name: requestedCatName });
});


app.listen(2525, () => {
    console.log("Server started");
});
