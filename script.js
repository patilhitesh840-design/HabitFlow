
/* =========================================================
   HABITFLOW - HABIT TRACKER
   LocalStorage + Habit Time Support
========================================================= */

let habits = JSON.parse(localStorage.getItem("habitFlowHabits")) || [];
let calendarDate = new Date();

const $ = (id) => document.getElementById(id);

const modal = $("modal");
const habitForm = $("habitForm");
const habitList = $("habitList");
const emptyState = $("emptyState");

const habitName = $("habitName");
const habitCategory = $("habitCategory");
const habitIcon = $("habitIcon");
const habitGoal = $("habitGoal");
const habitTime = $("habitTime");
const editHabitId = $("editHabitId");

const modalTitle = $("modalTitle");

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    updateDate();
    setupNavigation();
    setupModal();
    setupEmojiPicker();
    renderAll();

    setInterval(checkHabitReminders, 30000);
});

/* =========================================================
   DATE
========================================================= */

function getDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function updateDate() {
    const now = new Date();

    $("currentDate").textContent = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const hour = now.getHours();

    let greeting = "Good morning 👋";

    if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon ☀️";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good evening 🌇";
    } else if (hour >= 21 || hour < 5) {
        greeting = "Good night 🌙";
    }

    $("pageTitle").textContent = greeting;
}

/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {
    document.querySelectorAll(".nav-item").forEach((button) => {
        button.addEventListener("click", () => {
            const sectionId = button.dataset.section;

            document.querySelectorAll(".nav-item").forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            document.querySelectorAll(".section").forEach((section) => {
                section.classList.remove("active-section");
            });

            $(sectionId).classList.add("active-section");

            const titles = {
                dashboard: "Dashboard",
                habits: "My Habits",
                statistics: "Statistics",
                calendar: "Calendar"
            };

            if (sectionId !== "dashboard") {
                $("pageTitle").textContent = titles[sectionId];
            } else {
                updateDate();
            }

            renderAll();
        });
    });
}

/* =========================================================
   MODAL
========================================================= */

function setupModal() {
    $("openModal").addEventListener("click", () => openCreateModal());

    $("openModal2").addEventListener("click", () => openCreateModal());

    $("emptyAdd").addEventListener("click", () => openCreateModal());

    $("closeModal").addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    habitForm.addEventListener("submit", saveHabit);

    $("prevMonth").addEventListener("click", () => {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        renderCalendar();
    });

    $("nextMonth").addEventListener("click", () => {
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        renderCalendar();
    });

    $("clearData").addEventListener("click", clearAllData);
}

function openCreateModal() {
    habitForm.reset();

    editHabitId.value = "";
    habitIcon.value = "📚";
    habitTime.value = "";

    document.querySelectorAll(".emoji").forEach((button, index) => {
        button.classList.toggle("active", index === 0);
    });

    modalTitle.textContent = "Create New Habit";

    const submitButton = habitForm.querySelector(".submit-btn");
    submitButton.textContent = "Create Habit";

    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

/* =========================================================
   EMOJI PICKER
========================================================= */

function setupEmojiPicker() {
    document.querySelectorAll(".emoji").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".emoji").forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");
            habitIcon.value = button.textContent.trim();
        });
    });
}

/* =========================================================
   SAVE / CREATE / EDIT HABIT
========================================================= */

function saveHabit(event) {
    event.preventDefault();

    const name = habitName.value.trim();

    if (!name) {
        alert("Please enter a habit name.");
        return;
    }

    const data = {
        name: name,
        category: habitCategory.value,
        icon: habitIcon.value || "📚",
        goal: habitGoal.value.trim() || "Daily",
        time: habitTime.value || "",
    };

    if (editHabitId.value) {
        const habit = habits.find(
            (item) => item.id === editHabitId.value
        );

        if (habit) {
            habit.name = data.name;
            habit.category = data.category;
            habit.icon = data.icon;
            habit.goal = data.goal;
            habit.time = data.time;
        }
    } else {
        habits.push({
            id: Date.now().toString(),
            ...data,
            createdAt: getDateKey(),
            completions: {}
        });
    }

    saveData();
    closeModal();
    renderAll();
}

/* =========================================================
   EDIT HABIT
========================================================= */

function editHabit(id) {
    const habit = habits.find((item) => item.id === id);

    if (!habit) return;

    editHabitId.value = habit.id;
    habitName.value = habit.name;
    habitCategory.value = habit.category;
    habitGoal.value = habit.goal || "";
    habitTime.value = habit.time || "";

    habitIcon.value = habit.icon || "📚";

    document.querySelectorAll(".emoji").forEach((button) => {
        button.classList.toggle(
            "active",
            button.textContent.trim() === habitIcon.value
        );
    });

    modalTitle.textContent = "Edit Habit";

    const submitButton = habitForm.querySelector(".submit-btn");
    submitButton.textContent = "Save Changes";

    modal.classList.add("show");
}

/* =========================================================
   DELETE HABIT
========================================================= */

function deleteHabit(id) {
    const habit = habits.find((item) => item.id === id);

    if (!habit) return;

    const confirmDelete = confirm(
        `Delete "${habit.name}"?`
    );

    if (!confirmDelete) return;

    habits = habits.filter((item) => item.id !== id);

    saveData();
    renderAll();
}

/* =========================================================
   COMPLETE HABIT
========================================================= */

function toggleHabit(id) {
    const habit = habits.find((item) => item.id === id);

    if (!habit) return;

    const today = getDateKey();

    if (!habit.completions) {
        habit.completions = {};
    }

    if (habit.completions[today]) {
        delete habit.completions[today];
    } else {
        habit.completions[today] = true;
    }

    saveData();
    renderAll();
}

/* =========================================================
   CHECK COMPLETION
========================================================= */

function isCompletedToday(habit) {
    const today = getDateKey();

    return Boolean(
        habit.completions &&
        habit.completions[today]
    );
}

/* =========================================================
   STREAK
========================================================= */

function getCurrentStreak(habit) {
    if (!habit.completions) return 0;

    let streak = 0;
    const date = new Date();

    while (true) {
        const key = getDateKey(date);

        if (habit.completions[key]) {
            streak++;
            date.setDate(date.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

function getLongestStreak(habit) {
    if (!habit.completions) return 0;

    const dates = Object.keys(habit.completions)
        .filter((date) => habit.completions[date])
        .sort();

    if (!dates.length) return 0;

    let longest = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {
        const previous = new Date(dates[i - 1]);
        const currentDate = new Date(dates[i]);

        const difference =
            (currentDate - previous) /
            (1000 * 60 * 60 * 24);

        if (difference === 1) {
            current++;
            longest = Math.max(longest, current);
        } else {
            current = 1;
        }
    }

    return longest;
}

/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(time) {
    if (!time) {
        return "No time set";
    }

    const [hours, minutes] = time.split(":");

    let hour = parseInt(hours, 10);
    const minute = minutes;

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
        hour = 12;
    }

    return `${hour}:${minute} ${period}`;
}

/* =========================================================
   RENDER DASHBOARD
========================================================= */

function renderDashboard() {
    const total = habits.length;

    const completed = habits.filter(
        (habit) => isCompletedToday(habit)
    ).length;

    const progress =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    $("todayProgress").textContent = `${progress}%`;
    $("completedToday").textContent = completed;
    $("totalHabits").textContent = total;

    const bestStreak =
        habits.length === 0
            ? 0
            : Math.max(
                  ...habits.map((habit) =>
                      getLongestStreak(habit)
                  )
              );

    $("bestStreak").textContent =
        `${bestStreak} ${bestStreak === 1 ? "day" : "days"}`;

    $("smallProgress").textContent =
        `${completed}/${total}`;

    renderTodayHabits();
    renderWeeklyChart();

    updateMotivation(progress);
}

/* =========================================================
   TODAY HABITS
========================================================= */

function renderTodayHabits() {
    habitList.innerHTML = "";

    if (habits.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    habits.forEach((habit) => {
        const completed = isCompletedToday(habit);
        const streak = getCurrentStreak(habit);

        const item = document.createElement("div");
        item.className = "habit-item";

        item.innerHTML = `
            <button
                class="check-box ${completed ? "completed" : ""}"
                onclick="toggleHabit('${habit.id}')"
                aria-label="Complete habit"
            >
                ${completed ? "✓" : ""}
            </button>

            <div class="habit-icon">
                ${habit.icon || "📚"}
            </div>

            <div class="habit-info">
                <h3>${escapeHTML(habit.name)}</h3>
                <p>
                    ${escapeHTML(habit.category)}
                    •
                    ${escapeHTML(habit.goal || "Daily")}
                    ${
                        habit.time
                            ? ` • ⏰ ${formatTime(habit.time)}`
                            : ""
                    }
                </p>
            </div>

            <div class="habit-streak">
                🔥 ${streak}
            </div>
        `;

        habitList.appendChild(item);
    });
}

/* =========================================================
   WEEKLY CHART
========================================================= */

function renderWeeklyChart() {
    const chart = $("weekChart");

    chart.innerHTML = "";

    const today = new Date();

    const dayOfWeek = today.getDay();

    const sunday = new Date(today);

    sunday.setDate(
        today.getDate() - dayOfWeek
    );

    for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);

        date.setDate(
            sunday.getDate() + i
        );

        const key = getDateKey(date);

        const completed = habits.filter(
            (habit) =>
                habit.completions &&
                habit.completions[key]
        ).length;

        const percentage =
            habits.length === 0
                ? 0
                : Math.round(
                      (completed / habits.length) *
                          100
                  );

        const column =
            document.createElement("div");

        column.className = "day-column";

        column.innerHTML = `
            <div class="day-bar-area">
                <div
                    class="day-bar"
                    style="height:${Math.max(
                        percentage,
                        3
                    )}%"
                    title="${percentage}% completed"
                ></div>
            </div>

            <span>
                ${date.toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                ).charAt(0)}
            </span>
        `;

        chart.appendChild(column);
    }
}

/* =========================================================
   MOTIVATION
========================================================= */

function updateMotivation(progress) {
    let message;

    if (habits.length === 0) {
        message =
            "Create your first habit and start building your routine.";
    } else if (progress === 100) {
        message =
            "Amazing! You completed all your habits today. 🎉";
    } else if (progress >= 75) {
        message =
            "You're almost there! Finish the remaining habits. 💪";
    } else if (progress >= 40) {
        message =
            "Great progress! Keep your momentum going. 🚀";
    } else if (progress > 0) {
        message =
            "Every completed habit is one step closer to your goal.";
    } else {
        message =
            "Start with one small habit today. You've got this! 🌱";
    }

    $("motivationText").textContent = message;
}

/* =========================================================
   MY HABITS
========================================================= */

function renderAllHabits() {
    const container = $("allHabits");

    container.innerHTML = "";

    if (habits.length === 0) {
        container.innerHTML = `
            <div class="panel empty-state">
                <div>🌱</div>
                <h3>No habits created</h3>
                <p>Create your first habit to get started.</p>
                <button
                    class="add-btn small"
                    onclick="openCreateModal()"
                >
                    + Create Habit
                </button>
            </div>
        `;

        return;
    }

    habits.forEach((habit) => {
        const streak = getCurrentStreak(habit);

        const card =
            document.createElement("div");

        card.className = "habit-card";

        card.innerHTML = `
            <div class="habit-card-top">
                <div class="habit-card-icon">
                    ${habit.icon || "📚"}
                </div>

                <div class="habit-streak">
                    🔥 ${streak}
                </div>
            </div>

            <h3>${escapeHTML(habit.name)}</h3>

            <div class="habit-card-category">
                ${escapeHTML(habit.category)}
            </div>

            <div class="habit-card-details">

                <div class="habit-detail">
                    🎯 Goal:
                    ${escapeHTML(habit.goal || "Daily")}
                </div>

                <div class="habit-detail">
                    ⏰ Time:
                    ${habit.time
                        ? formatTime(habit.time)
                        : "Not set"}
                </div>

                <div class="habit-detail">
                    📅 Created:
                    ${formatDate(habit.createdAt)}
                </div>

            </div>

            <div class="card-actions">
                <button
                    class="edit-btn"
                    onclick="editHabit('${habit.id}')"
                >
                    ✏ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteHabit('${habit.id}')"
                >
                    🗑 Delete
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

/* =========================================================
   STATISTICS
========================================================= */

function renderStatistics() {
    let totalCompletions = 0;

    habits.forEach((habit) => {
        if (habit.completions) {
            totalCompletions += Object.keys(
                habit.completions
            ).filter(
                (key) => habit.completions[key]
            ).length;
        }
    });

    $("totalCompletions").textContent =
        totalCompletions;

    if (habits.length === 0) {
        $("averageProgress").textContent = "0%";
        $("longestStreak").textContent = "0 days";
        $("performanceChart").innerHTML =
            `<p style="color:#8b93aa;font-size:12px;">
                No statistics available yet.
            </p>`;
        return;
    }

    const performances = habits.map((habit) => {
        const completionCount = habit.completions
            ? Object.keys(habit.completions).filter(
                  (key) => habit.completions[key]
              ).length
            : 0;

        const created = new Date(
            habit.createdAt
        );

        const now = new Date();

        const daysSinceCreation =
            Math.floor(
                (now - created) /
                    (1000 * 60 * 60 * 24)
            ) + 1;

        const percentage = Math.min(
            100,
            Math.round(
                (completionCount /
                    Math.max(
                        daysSinceCreation,
                        1
                    )) *
                    100
            )
        );

        return {
            habit,
            percentage
        };
    });

    const average = Math.round(
        performances.reduce(
            (sum, item) =>
                sum + item.percentage,
            0
        ) / performances.length
    );

    const longest =
        Math.max(
            ...habits.map((habit) =>
                getLongestStreak(habit)
            )
        );

    $("averageProgress").textContent =
        `${average}%`;

    $("longestStreak").textContent =
        `${longest} ${
            longest === 1 ? "day" : "days"
        }`;

    const chart = $("performanceChart");

    chart.innerHTML = "";

    performances.forEach((item) => {
        chart.innerHTML += `
            <div class="performance-row">

                <div class="performance-info">
                    <span>
                        ${item.habit.icon || "📚"}
                        ${escapeHTML(item.habit.name)}
                    </span>

                    <span>
                        ${item.percentage}%
                    </span>
                </div>

                <div class="performance-track">
                    <div
                        class="performance-fill"
                        style="width:${item.percentage}%"
                    ></div>
                </div>

            </div>
        `;
    });
}

/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {
    const grid = $("calendarGrid");

    grid.innerHTML = "";

    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    $("monthTitle").textContent =
        calendarDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        grid.appendChild(empty);
    }

    const todayKey = getDateKey();

    for (let day = 1; day <= daysInMonth; day++) {
        const date =
            new Date(
                year,
                month,
                day
            );

        const key = getDateKey(date);

        const completedCount =
            habits.filter(
                (habit) =>
                    habit.completions &&
                    habit.completions[key]
            ).length;

        const dayElement =
            document.createElement("div");

        dayElement.className =
            "calendar-day";

        if (key === todayKey) {
            dayElement.classList.add("today");
        }

        dayElement.innerHTML = `
            <div class="calendar-day-number">
                ${day}
            </div>

            ${
                completedCount > 0
                    ? `
                    <div
                        class="calendar-complete"
                        title="${completedCount} habit(s) completed"
                    ></div>
                    `
                    : ""
            }
        `;

        grid.appendChild(dayElement);
    }
}

/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderAll() {
    renderDashboard();
    renderAllHabits();
    renderStatistics();
    renderCalendar();
}

/* =========================================================
   REMINDER / TIMING
========================================================= */

function checkHabitReminders() {
    const now = new Date();

    const currentTime =
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}`;

    habits.forEach((habit) => {
        if (
            habit.time &&
            habit.time === currentTime &&
            !isCompletedToday(habit)
        ) {
            showReminder(habit);
        }
    });
}

function showReminder(habit) {
    /*
       Browser notifications require permission.
       If permission is not granted, use an alert.
    */

    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {
        new Notification(
            `HabitFlow ⏰ ${habit.name}`,
            {
                body:
                    `It's time for your habit! Goal: ${
                        habit.goal || "Daily"
                    }`,
                icon: ""
            }
        );
    } else {
        alert(
            `⏰ Habit Reminder\n\n` +
            `${habit.name}\n` +
            `Goal: ${habit.goal || "Daily"}`
        );
    }
}

/* =========================================================
   REQUEST NOTIFICATION PERMISSION
========================================================= */

function requestNotificationPermission() {
    if (
        "Notification" in window &&
        Notification.permission === "default"
    ) {
        Notification.requestPermission();
    }
}

/* =========================================================
   CLEAR ALL DATA
========================================================= */

function clearAllData() {
    if (habits.length === 0) {
        alert("There is no data to clear.");
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to delete ALL habits and progress?"
    );

    if (!confirmClear) return;

    habits = [];

    localStorage.removeItem(
        "habitFlowHabits"
    );

    renderAll();
}

/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveData() {
    localStorage.setItem(
        "habitFlowHabits",
        JSON.stringify(habits)
    );
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}

/* =========================================================
   SECURITY / HTML ESCAPE
========================================================= */

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   ENABLE NOTIFICATIONS ON FIRST USER INTERACTION
========================================================= */

document.addEventListener(
    "click",
    () => {
        requestNotificationPermission();
    },
    { once: true }
);

