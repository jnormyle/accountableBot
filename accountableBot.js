var todayWorkHours;
var todayGameHours;
var todayExercise = false;

      // Saving date to add to the .csv, Jan is 0 

var today = new Date();
var day = String(today.getDate()).padStart(2, '0');
var month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to get the correct month
var year = today.getFullYear();

function setWorkingOutTrue() {
  todayExercise = true;
  console.log("Working out today: " + todayExercise);
  }

function sendData() {
  todayWorkHours = document.getElementById('userInputWork').value;
  todayGameHours = document.getElementById('userInputGame').value;
  // Format the date as MM/DD/YYYY
  var formattedDate = month + '/' + day + '/' + year;
  
  // Assuming you're sending or saving this formattedDate along with other data:
  console.log("Today's date: " + formattedDate);

  // Send the data to the server
  fetch('http://localhost:3000/store-data', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    date: today,
    workHours: todayWorkHours,
    gameHours: todayGameHours,
    workingOut: todayExercise
    })
  })
  .then(response => response.json())
  .then(data => console.log('Data stored successfully:', data))
  .catch((error) => console.error('Error storing data:', error));
  }