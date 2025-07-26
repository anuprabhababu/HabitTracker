let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const name = input.value.trim();
  if (name === "") return;

  habits.push({ name, streak: 0, lastDone: null });
  saveHabits();
  input.value = "";
  displayHabits();
}

function toggleHabit(index) {
  const today = new Date().toDateString();

  if (habits[index].lastDone === today) {
    alert("Already marked for today!");
    return;
  }

  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (habits[index].lastDone === yesterday) {
    habits[index].streak += 1; // Continue streak
  } else {
    habits[index].streak = 1; // Reset streak
  }

  habits[index].lastDone = today;
  saveHabits();
  displayHabits();
  displayBadges();
}

function deleteHabit(index) {
  if (confirm("Delete this habit?")) {
    habits.splice(index, 1);
    saveHabits();
    displayHabits();
    displayBadges();
  }
}

function displayHabits() {
  const list = document.getElementById("habitsList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const div = document.createElement("div");
    div.className = "habit";
    div.innerHTML = `
      <div class="habit-details">
        <input type="checkbox" onclick="toggleHabit(${index})" />
        <strong>${habit.name}</strong> – Streak: ${habit.streak} 🔥
      </div>
      <button class="delete-btn" onclick="deleteHabit(${index})">🗑️</button>
    `;
    list.appendChild(div);
  });
}

function displayBadges() {
  const badgesDiv = document.getElementById("badges");
  badgesDiv.innerHTML = "";

  habits.forEach(habit => {
    if (habit.streak >= 3) badgesDiv.innerHTML += `<span>🏅 3-Day Streak (${habit.name})</span>`;
    if (habit.streak >= 7) badgesDiv.innerHTML += `<span>🥇 7-Day Streak (${habit.name})</span>`;
    if (habit.streak >= 30) badgesDiv.innerHTML += `<span>🏆 30-Day Champion (${habit.name})</span>`;
  });
}

displayHabits();
displayBadges();
