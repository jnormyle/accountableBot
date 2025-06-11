
      // Saving date to add to the .csv, Jan is 0 

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to get the correct month
const year = today.getFullYear();
const formattedDate = month + '/' + day + '/' + year;


const announcements = document.getElementById('Announcements');

//checking localStorage for values ty CHATGPT
const lastSubmittedDate = localStorage.getItem('lastSubmittedDate');

if (lastSubmittedDate !== formattedDate) {
  localStorage.setItem('alreadySent', 'false');
  localStorage.setItem('todayExercise', 'false');
  localStorage.removeItem('todayWorkHours');
  localStorage.removeItem('todayGameHours');
  localStorage.setItem('lastSubmittedDate', formattedDate);
}

let alreadySent = localStorage.getItem('alreadySent') === 'true';
let todayExercise = localStorage.getItem('todayExercise') === 'true';
let todayWorkHours = localStorage.getItem('todayWorkHours') || '';
let todayGameHours = localStorage.getItem('todayGameHours') || '';

document.getElementById('userInputWork').value = todayWorkHours;
document.getElementById('userInputGame').value = todayGameHours;

window.setWorkingOutTrue = function () {
  console.log("Working out true");
  todayExercise = true
};

window.sendData = function () {
  if(alreadySent) {
    announcements.innerHTML = "Today's data was already entered, try again tomorrow";
    return;
  }

  todayWorkHours = document.getElementById('userInputWork').value;
  todayGameHours = document.getElementById('userInputGame').value;
  
  localStorage.setItem('todayWorkHours', todayWorkHours);
  localStorage.setItem('todayGameHours', todayGameHours);

  // Assuming you're sending or saving this formattedDate along with other data:
  console.log("Today's date: " + formattedDate);

  // Send the data to the server, ty chatgpt 
  fetch('http://localhost:3000/store-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      workHours: todayWorkHours,
      gameHours: todayGameHours,
      workingOut: todayExercise,
      date: formattedDate
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data stored successfully:', data);
    alreadySent = true;
    localStorage.setItem('alreadySent', 'true');
    localStorage.setItem('lastSubmittedDate', formattedDate);
    announcements.innerHTML = "✅ Data submitted for today!";
  })
  .catch((error) => {
    console.error('Error storing data:', error);
    announcements.innerHTML = "⚠️ Submission failed. Try again.";
  });
}

