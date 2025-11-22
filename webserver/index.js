const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());              // <-- enable CORS
app.use(express.json());

app.use(express.json());

let arduino1 = { weightSensor: false };        // Arduino 1
let arduino2 = { irSensor: false, presenceSensor: false }; // Arduino 2
let seatOccupied = false;
let distance = 0;
let angle = 0;
let presenceDetected = false;
let weightSensor = false;
let irSensor = false;
let presenceSensor = false;


app.post('/server', (req, res) => {
  if (req.body.hasOwnProperty('weightSensor')) {
    arduino1.weightSensor = req.body.weightSensor;
  }

  // Arduino 2 updates IR and presence sensors
  if (req.body.hasOwnProperty('irSensor')) {
    arduino2.irSensor = req.body.irSensor;
  }
  if (req.body.hasOwnProperty('presenceSensor')) {
    arduino2.presenceSensor = req.body.presenceSensor;
  }

  // Compute overall seat occupancy
  seatOccupied = arduino1.weightSensor && arduino2.irSensor && arduino2.presenceSensor;

  console.log("Arduino 1:", arduino1);
  console.log("Arduino 2:", arduino2);
  console.log("Seat occupied:", seatOccupied);

  res.json({ seatOccupied });
  
})

app.get('/seat', (req, res) => {
  res.json({ seatOccupied });
});

app.get('/test/seat/:state', (req, res) => {
  const input = req.params.state;

  if (input === "true") seatOccupied = true;
  else if (input === "false") seatOccupied = false;
  else return res.status(400).send("Use true or false");

  res.send(`Seat manually set to: ${seatOccupied}`);
  console.log("Seat manually set:", seatOccupied);
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
