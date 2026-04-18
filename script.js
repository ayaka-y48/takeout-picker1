let mood = null;

let foodOptions = {
    hungry: ["McDonald's", "Chipotle", "In-N-Out", "Taco Bell", "KFC", "Domino's"],
    healthy: ["Sweetgreen", "Chipotle", "Panera Bread"],
    comfort: ["Panda Express", "Olive Garden", "Chick-fil-A"]
};

function setMood(button, selectedMood) {
    let buttons = document.querySelectorAll("#moods button");

    if (mood === selectedMood) {
        mood = null;
        button.classList.remove("selected");
        return;
    }

    mood = selectedMood;

    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

function pickFood() {
    renderCustomList();
    let result = document.getElementById("result");
    
    if (!mood && !usingCustom) {
        result.innerText = "Pick a mood first!";
        return;
    }

    let list = usingCustom ? customFoods : foodOptions[mood];
    if (!list || list.length === 0) return;

    let counter = 0;
    let interval = setInterval(() => {
        result.innerText = list[Math.floor(Math.random() * list.length)];
        counter++;

        if (counter > 10) {
            clearInterval(interval);
            
            const rect = result.getBoundingClientRect();
            
            const centerX = (rect.left + rect.width / 2) / window.innerWidth;
            const centerY = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 80,
                spread: 50,
                origin: { x: centerX, y: centerY },
                colors: ['#9ec0db', '#5e96c3', '#ffffff'],
                zIndex: 999
            });

            result.innerHTML = `${result.innerText}`;
        }
    }, 100);
}

let customFoods = [];
let usingCustom = false;

function addFood() {
    let input = document.getElementById("foodInput");
    let value = input.value.trim();

    if (value === "") return;

    customFoods.push(value);

    input.value = "";
    renderCustomList();
}

function toggleCustomList() {
  let list = document.getElementById("customList");
  let btn = document.getElementById("toggleBtn");

  if (list.style.display === "none") {
    list.style.display = "block";
    renderCustomList();
    btn.innerText = "Hide list";
  } else {
    list.style.display = "none";
    btn.innerText = "Show list";
  }
}

function renderCustomList() {
    let list = document.getElementById("customList");
    list.innerHTML = "";

    customFoods.forEach((food, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span class="food-text">${food}</span>
        <button class="remove-btn" onclick="removeFood(${index})">X</button>`;
        list.appendChild(li);
    });
}

function removeFood(index) {
    customFoods.splice(index, 1);
    renderCustomList();
}

function useCustomList() {
    let btn = document.getElementById("useBtn");

    if (usingCustom) {
        usingCustom = false;
        btn.innerText = "Use custom list";
        showTemporaryMessage("Switched back to mood list");
    } else {
        if (customFoods.length === 0) {
        alert("Add some foods first!");
        return;
        }

        usingCustom = true;
        btn.innerText = "Using custom list ✓";
        showTemporaryMessage("Using custom list");
    }
}

function showTemporaryMessage(text) {
  let result = document.getElementById("result");

  result.innerText = text;
  result.classList.remove("fade-out");

  setTimeout(() => {
    result.classList.add("fade-out");
  }, 1500);

  setTimeout(() => {
    result.innerText = "";
    result.classList.remove("fade-out");
  }, 2300);
}