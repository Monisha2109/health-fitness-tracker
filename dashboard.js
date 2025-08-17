// ✅ Ensure user is logged in
const currentUser = localStorage.getItem("loggedInUser");
if (!currentUser) {
  alert("User not logged in!");
  location.href = "index.html";
}

// ✅ Show user's name
document.getElementById("user-name").textContent = currentUser;

// ✅ Load data specific to the logged-in user
let logs = JSON.parse(localStorage.getItem(`${currentUser}_currentWeekLogs`)) || [];

// Prepare chart data
let stepsData = logs.map(log => log.steps);
let waterData = logs.map(log => log.water);
let sleepData = logs.map(log => log.sleep);
let moodData = logs.map(log => log.mood);
let labels = logs.map(log => log.date || "Day");

// Count mood frequency
let moodCount = { Happy: 0, Tired: 0, Stressed: 0, Energetic: 0 };
moodData.forEach(mood => {
  if (moodCount[mood] !== undefined) {
    moodCount[mood]++;
  }
});

// Graph 1: Steps
new Chart(document.getElementById('stepsChart'), {
  type: 'line',
  data: {
    labels,
    datasets: [{
      label: 'Steps',
      data: stepsData,
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 2,
      tension: 0.4
    }]
  },
  options: { responsive: true }
});

// Graph 2: Water Intake
new Chart(document.getElementById('waterChart'), {
  type: 'bar',
  data: {
    labels,
    datasets: [{
      label: 'Water (Liters)',
      data: waterData,
      backgroundColor: 'rgba(0, 200, 255, 0.6)',
      borderColor: 'rgba(0, 200, 255, 1)',
      borderWidth: 1
    }]
  },
  options: { responsive: true }
});

// Graph 3: Sleep Duration
new Chart(document.getElementById('sleepChart'), {
  type: 'bar',
  data: {
    labels,
    datasets: [{
      label: 'Sleep (Hours)',
      data: sleepData,
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  },
  options: { responsive: true }
});

// Graph 4: Mood Pie Chart
new Chart(document.getElementById('moodChart'), {
  type: 'pie',
  data: {
    labels: Object.keys(moodCount),
    datasets: [{
      label: 'Mood Count',
      data: Object.values(moodCount),
      backgroundColor: [
        'rgba(255, 206, 86, 0.7)',   // Happy
        'rgba(54, 162, 235, 0.7)',   // Tired
        'rgba(255, 99, 132, 0.7)',   // Stressed
        'rgba(75, 192, 192, 0.7)'    // Energetic
      ],
      borderColor: '#fff',
      borderWidth: 1
    }]
  },
  options: { responsive: true }
});

// Logout function
function logout() {
  localStorage.removeItem("loggedInUser"); // clear session
  location.href = "index.html";
}
