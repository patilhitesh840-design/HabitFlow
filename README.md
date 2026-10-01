````markdown
# 🌱 HabitFlow - Habit Tracker

> Build better habits. Stay consistent. Achieve your goals. 🚀

HabitFlow is a modern, responsive **Habit Tracker Web Application** designed to help users create, manage, track, and improve their daily habits.

The application provides a clean dashboard, habit scheduling, streak tracking, weekly progress, statistics, and a calendar-based completion history.

---

## ✨ Features

### 📊 Dashboard
- Today's progress percentage
- Completed habits count
- Total habits count
- Best streak
- Today's habit list
- Weekly activity overview
- Daily motivational message

### ✅ Habit Management
- Create new habits
- Edit existing habits
- Delete habits
- Select habit category
- Choose habit emoji/icon
- Set daily goal
- Set specific habit time
- Track daily completion

### ⏰ Habit Timing
Users can assign a specific time to every habit.

Example:

```text
📚 Study
🎯 Goal: 1 Hour
⏰ Time: 7:00 PM
````

HabitFlow also includes browser notification support for scheduled habits.

### 🔥 Streak Tracking

* Current streak
* Longest streak
* Best streak
* Automatic streak calculation

### 📈 Statistics

* Total completions
* Average progress
* Longest streak
* Individual habit performance
* Completion percentage

### 📅 Calendar

* Monthly calendar
* Current day highlight
* Habit completion indicators
* Previous/next month navigation

### 💾 Local Storage

All habit data is stored in the browser using:

```text
localStorage
```

No external database is required for the basic version.

---

## 🎨 UI / UX

HabitFlow uses a modern dashboard design with:

* Clean white cards
* Purple primary color
* Rounded UI components
* Responsive layout
* Sidebar navigation
* Progress indicators
* Habit cards
* Calendar interface
* Responsive mobile design

---

## 🛠️ Technologies Used

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| HTML5                 | Application structure         |
| CSS3                  | Styling and responsive design |
| JavaScript            | Application functionality     |
| LocalStorage          | Data persistence              |
| Browser Notifications | Habit reminders               |

---

## 📁 Project Structure

```text
HabitFlow/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the complete structure of the application:

* Sidebar
* Dashboard
* Habit management
* Statistics
* Calendar
* Add/Edit Habit modal

### `style.css`

Contains:

* UI design
* Layout
* Cards
* Buttons
* Charts
* Calendar
* Modal
* Responsive styling

### `script.js`

Handles:

* Creating habits
* Editing habits
* Deleting habits
* Completing habits
* Streak calculation
* Statistics
* Calendar
* Weekly chart
* Habit timing
* Notifications
* LocalStorage

---

## 🚀 How to Run

### Method 1: Using VS Code

1. Download or clone the project.
2. Open the project folder in **VS Code**.
3. Make sure these files exist:

```text
index.html
style.css
script.js
README.md
```

4. Open `index.html`.
5. Run it using a browser.

For easier development, install the **Live Server** extension in VS Code.

Then:

```text
Right Click → Open with Live Server
```

---

## 📝 How to Add a Habit

1. Open HabitFlow.
2. Click **+ Add Habit**.
3. Enter the habit name.

Example:

```text
Study JavaScript
```

4. Select a category.

Example:

```text
Study
```

5. Select an icon.

Example:

```text
💻
```

6. Enter your daily goal.

Example:

```text
1 Hour
```

7. Select the habit time.

Example:

```text
19:00
```

8. Click:

```text
Create Habit
```

Your habit will now appear on the dashboard.

---

## ⏰ Habit Reminder

When a habit has a scheduled time, HabitFlow can show a browser notification.

Example:

```text
⏰ HabitFlow

It's time for your habit!

Study JavaScript
Goal: 1 Hour
```

### Important

Browser notifications require notification permission.

Allow notifications when the browser asks for permission.

---

## 🔥 How Streaks Work

A streak increases when a habit is completed on consecutive days.

Example:

```text
Monday    ✅
Tuesday   ✅
Wednesday ✅
Thursday  ✅
```

Current streak:

```text
🔥 4 days
```

If a day is missed:

```text
Monday    ✅
Tuesday   ✅
Wednesday ❌
Thursday  ✅
```

The previous streak ends and a new streak starts.

---

## 📊 Statistics

HabitFlow calculates:

### Total Completions

Number of completed habit days across all habits.

### Average Progress

Average completion percentage across created habits.

### Longest Streak

The highest consecutive completion streak recorded by a habit.

---

## 💾 Data Storage

HabitFlow currently uses browser LocalStorage.

Example:

```javascript
localStorage.setItem(
    "habitFlowHabits",
    JSON.stringify(habits)
);
```

This means the data is stored locally in the user's browser.

### Advantages

* No backend required
* Free
* Fast
* Easy to use
* Works offline

### Limitation

LocalStorage data is specific to the browser/device.

If the user clears browser storage, the habit data may be deleted.

---

## 🔐 Security

The current version is a frontend-only application.

Security considerations include:

* HTML input escaping
* No passwords stored
* No sensitive personal information required
* No external database
* Local browser storage

For a production version, authentication and backend security should be added.

---

## 📱 Responsive Design

HabitFlow supports:

* 💻 Desktop
* 🖥️ Laptop
* 📱 Mobile
* 📲 Tablet

The layout automatically adjusts according to screen size.

---

## 🔮 Future Improvements

Possible future versions can include:

* 🔐 Firebase Authentication
* ☁️ Cloud database
* 👤 User accounts
* 📱 PWA support
* 🔔 Advanced notifications
* 📅 Google Calendar integration
* 🎯 Habit goals
* 🏆 Achievement system
* 🥇 Badges and rewards
* 📊 Advanced analytics
* 📈 Monthly/yearly charts
* 🌙 Dark mode
* 🔄 Cloud synchronization
* 📤 Export habit data
* 📥 Import habit data
* 🤖 AI habit recommendations
* 🎙️ Voice-based habit creation
* 🔥 Habit challenges
* 👥 Social accountability

---

## 🤖 Future AI Features

A future version of HabitFlow could include an AI Habit Coach.

Example:

```text
User:
I want to study 2 hours every day.

AI Habit Coach:
Create these habits:

📚 Study - 1 Hour
⏰ 7:00 PM

📚 Revision - 1 Hour
⏰ 9:00 PM
```

The AI could analyze consistency and provide personalized suggestions.

---

## 🎯 Project Goal

The main goal of HabitFlow is to make habit tracking:

```text
Simple
      ↓
Consistent
      ↓
Trackable
      ↓
Motivating
      ↓
Successful
```

Small actions repeated every day can create meaningful long-term progress.

---

## 👨‍💻 Developer

**Hitesh Patil**

B.Tech Computer Engineering Student

Maharashtra, India

### Interests

* 💻 Software Development
* ☁️ Cloud & DevOps
* 🤖 Artificial Intelligence
* 🌐 Web Development
* 🔐 Cybersecurity
* 🚀 Startup & SaaS Projects

---

## 📄 License

This project is created for educational and personal project purposes.

You are free to modify and improve the project for learning and development.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

# 🚀 HabitFlow

### Build Better Habits. Track Your Progress. Become Consistent.

**Made with ❤️ using HTML, CSS & JavaScript.**

```

You can save this directly as **`README.md`** in the same folder as `index.html`, `style.css`, and `script.js`.
```
