function saveData(e) {
  e.preventDefault();

  const steps = parseInt(document.getElementById("steps").value);
  const water = parseFloat(document.getElementById("water").value);
  const sleep = parseFloat(document.getElementById("sleep").value);
  const mood = document.getElementById("mood").value;

  if (!steps || !water || !sleep || !mood) {
    document.getElementById("msg").textContent = "Please fill all fields!";
    return;
  }

  const currentUser = localStorage.getItem("loggedInUser");
  if (!currentUser) {
    alert("User not logged in!");
    return;
  }

  const todayData = {
    steps,
    water,
    sleep,
    mood,
    date: new Date().toLocaleDateString()
  };

  const currentKey = `${currentUser}_currentWeekLogs`;
  const historyKey = `${currentUser}_weeklyHistory`;

  let currentWeek = JSON.parse(localStorage.getItem(currentKey)) || [];
  let history = JSON.parse(localStorage.getItem(historyKey)) || [];

  if (currentWeek.length === 7) {
    history.push(currentWeek);
    localStorage.setItem(historyKey, JSON.stringify(history));
    currentWeek = [todayData];
  } else {
    currentWeek.push(todayData);
  }

  localStorage.setItem(currentKey, JSON.stringify(currentWeek));
  document.getElementById("msg").textContent = "✅ Data saved!";
  document.querySelector("form").reset();
}
