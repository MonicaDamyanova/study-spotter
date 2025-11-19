const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

let seatOccupied = false;
let distance = 0;
let angle = 0;
let presenceDetected = false;

app.post('/server', (req, res) => {
  res.send('Got a POST request');
  console.log(req.body);

  if (req.body.hasOwnProperty('seatOccupied')) {
    seatOccupied = req.body.seatOccupied;
  } else {
    distance = req.body.distance;
    angle = req.body.angle;
    presenceDetected = req.body.presence;
  }
})

app.get('/seat', (req, res) => {
  res.json({ seatOccupied });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
