// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get('/api/:date?', (req, res) => {
  let date;

  // Check if the date parameter is provided
  if (!req.params.date) {
    // Use the current date and time if no date parameter is provided
    date = new Date();
  } else {
    const dateString = req.params.date;
    // Check if the dateString is a valid number (Unix timestamp)
    if (!isNaN(dateString)) {
      // Convert the Unix timestamp to a Date object
      date = new Date(parseInt(dateString));
    } else {
      // Attempt to parse the dateString as a date
      date = new Date(dateString);
    }
  }

  // Check if the date is invalid
  if (date.toString() === 'Invalid Date') {
    // Return an error response for invalid dates
    res.json({ error: 'Invalid Date' });
  } else {
    // Return the Unix timestamp and UTC string for valid dates
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
