# 🚗 AI Car Price Predictor
### Rule-Based Expert System for Used Car Valuation

<p align="center">

![Python](https://img.shields.io/badge/Python-3.7%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![AI](https://img.shields.io/badge/AI-Rule--Based%20Expert%20System-00C853?style=for-the-badge)
![ML](https://img.shields.io/badge/ML-Not%20Required-4CAF50?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-College%20Lab%20Ready-8E24AA?style=for-the-badge)

</p>

<p align="center">
  <b>🚘 Explainable • Deterministic • Lightweight • Zero ML Dependencies</b>
</p>

---

## 📌 Quick Navigation

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🧠 AI Concept](#-ai-concept)
- [🏗️ System Architecture](#️-system-architecture)
- [⚙️ How the Prediction Works](#️-how-the-prediction-works)
- [📐 Mathematical Model](#-mathematical-model)
- [🔄 Prediction Flow](#-prediction-flow)
- [🌐 Web Application](#-web-application)
- [💻 Python CLI](#-python-cli)
- [🧪 Test Cases](#-test-cases)
- [🎓 Viva Questions](#-viva-questions)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [🔮 Future Improvements](#-future-improvements)
- [👨‍💻 Authors](#-authors)

---

# 🎯 Project Overview

**AI Car Price Predictor** is a lightweight **Rule-Based Artificial Intelligence Expert System** designed to estimate the fair resale price of used cars.

Unlike Machine Learning systems that learn patterns from historical datasets, this project uses a predefined **Knowledge Base** and a collection of deterministic **IF-THEN heuristic rules**.

The system evaluates:

- 🚘 Brand
- 🚗 Model
- 📅 Manufacturing year
- 🛣️ Kilometers driven
- ⛽ Fuel type
- 👤 Number of owners
- 💰 Original ex-showroom price

It then calculates an estimated resale price with a complete explanation of how the final value was obtained.

---

# ✨ Features

| Feature | Description |
|---|---|
| 🧠 Rule-Based AI | Uses symbolic AI and deterministic heuristics |
| 💰 Price Prediction | Estimates used-car resale value |
| 🔍 Explainable AI | Shows every deduction and adjustment |
| 🌐 Web Interface | Interactive HTML/CSS/JavaScript dashboard |
| 💻 CLI Interface | Python terminal-based implementation |
| ⚡ Lightweight | No ML libraries required |
| 📦 Zero Dependencies | Uses Python standard library |
| 🛡️ Input Validation | Prevents invalid values and crashes |
| 📉 Depreciation Engine | Calculates age-based depreciation |
| 🛣️ Mileage Analysis | Applies odometer wear rules |
| ⛽ Fuel Adjustment | Adjusts value according to fuel type |
| 👥 Ownership Penalty | Considers number of previous owners |
| 🔒 Safety Floor | Maintains minimum residual value |

---

# 🧠 AI Concept

## What type of AI is this?

This project implements a:

> **Rule-Based AI Expert System**

It belongs to the **Symbolic AI** family.

Instead of learning from data, the system stores domain knowledge as explicit rules.

### Example

```text
IF vehicle_age <= 1
THEN apply 15% depreciation

IF mileage > 100000
THEN apply 20% mileage depreciation

IF fuel_type == "Electric"
THEN increase value by 8%

IF owners == 2
THEN apply 7% ownership penalty

The inference engine evaluates these rules sequentially to produce the final valuation.

🆚 Rule-Based AI vs Machine Learning
Parameter	Rule-Based AI 🏆	Machine Learning
Training Dataset	❌ Not required	✅ Required
Explainability	⭐⭐⭐⭐⭐	⭐⭐
Prediction Speed	Very fast	Fast after training
Hardware	Basic CPU	Can require significant resources
Dependencies	Minimal	Often many
Deterministic	✅ Yes	❌ Not necessarily
Overfitting	❌ No training overfit	⚠️ Possible
Rule Modification	Easy	Requires retraining
College Viva	⭐⭐⭐⭐⭐	⭐⭐⭐

🏗️ System Architecture
The project follows the classical architecture of an Expert System.

👤 User Input
✅ Input Validation
(🧠 Knowledge Base)
⚙️ Inference Engine
📊 Price Calculation
🔍 Explanation Facility
💰 Final Predicted Price
🌐 Web / 💻 CLI Output
Main Components
1. 🧠 Knowledge Base
Contains domain-specific information such as:

Brand benchmark prices
Depreciation rates
Mileage brackets
Fuel adjustments
Ownership penalties
Minimum residual value
2. ⚙️ Inference Engine
Applies the rules sequentially.

Base Price
    ↓
Age Depreciation
    ↓
Mileage Depreciation
    ↓
Fuel Adjustment
    ↓
Ownership Penalty
    ↓
Safety Floor
    ↓
Final Price

3. 🔍 Explanation Facility
The system explains:

Base Price:              ₹8,00,000
Age Depreciation:       -₹3,20,000
Mileage Adjustment:       -₹48,000
Fuel Adjustment:          +₹22,400
Ownership Penalty:        -₹30,240
-----------------------------------
Predicted Price:         ₹4,24,160

This makes the system transparent and auditable.

⚙️ How the Prediction Works
The prediction consists of six major stages.

1️⃣ Base Price Lookup
The system first determines a benchmark price from the Knowledge Base.

Brand Category	Example Brands	Approx. Benchmark
Economy	Maruti, Renault, Nissan	₹6–6.5 Lakh
Mid-Range	Hyundai, Tata, Ford	₹7.5–8 Lakh
Upper Mid-Range	Honda, Mahindra, Kia, VW, Skoda	₹9.5–11 Lakh
Premium / SUV	Toyota, MG	₹12 Lakh
Luxury	BMW, Audi, Mercedes, Jaguar, Volvo	₹32–40 Lakh

If the user knows the original ex-showroom price, that value overrides the benchmark.

📅 2️⃣ Age Depreciation
Vehicle age is calculated as:

Age = Current Year - Manufacturing Year

Depreciation Rules
Vehicle Age	Depreciation
0 years	5%
1 year	15%
2–5 years	15% + 8% per additional year
6–10 years	47% + 5% per additional year
>10 years	72% + 3% per additional year

Maximum age depreciation is capped at:

80%

This prevents the vehicle value from being completely eliminated.

🛣️ 3️⃣ Mileage Wear
Kilometers	Wear Level	Deduction
0–20,000	🟢 Minimal	2%
20,001–50,000	🟢 Moderate	6%
50,001–100,000	🟡 Average	12%
100,001–150,000	🟠 High	20%
>150,000	🔴 Heavy	28%

The mileage rule represents increasing mechanical wear as the vehicle accumulates kilometers.

⛽ 4️⃣ Fuel Adjustment
Fuel Type	Adjustment
🛢️ Diesel	+5%
⛽ Petrol	0%
🔵 CNG	-3%
⚡ Electric	+8%
🔋 Hybrid	+6%

Example:

Current value = ₹5,00,000

Electric adjustment
= ₹5,00,000 × 8%

= +₹40,000

Adjusted value
= ₹5,40,000

👥 5️⃣ Ownership History
Owners	Penalty
1st Owner	0%
2nd Owner	-7%
3rd Owner	-15%
4+ Owners	-25%

The assumption is that vehicles with fewer ownership transfers may have stronger buyer confidence and clearer service history.

🛡️ 6️⃣ Residual Value Floor
The system never allows the predicted value to fall below:

8% of the base price

Formula:

Final Price = max(Current Price, Base Price × 0.08)

This represents residual value such as:

🔧 Spare parts
♻️ Scrap value
🚘 Structural components
⚙️ Recoverable mechanical components
📐 Mathematical Model
Let:

B = Base Price
A = Age Depreciation
M = Mileage Depreciation
F = Fuel Adjustment
O = Ownership Penalty

The valuation pipeline is:

P1 = B - A

P2 = P1 - M

P3 = P2 + F

P4 = P3 - O

Final Price = max(P4, B × 0.08)

Overall Concept
┌─────────────┐
│ Base Price  │
└──────┬──────┘
       ↓
┌─────────────┐
│ Age Factor  │
└──────┬──────┘
       ↓
┌─────────────┐
│ Mileage     │
└──────┬──────┘
       ↓
┌─────────────┐
│ Fuel Factor │
└──────┬──────┘
       ↓
┌─────────────┐
│ Owner Factor│
└──────┬──────┘
       ↓
┌─────────────┐
│ 8% Floor    │
└──────┬──────┘
       ↓
┌─────────────┐
│Final Price  │
└─────────────┘

🔄 Prediction Flow
No
Yes
Yes
No
Yes
No
[🚀 Start]
📝 Enter Vehicle Details
✅ Valid Input?
❌ Display Error
1️⃣ Find Base Price
2️⃣ Calculate Age Depreciation
3️⃣ Calculate Mileage Wear
4️⃣ Apply Fuel Adjustment
5️⃣ Apply Ownership Penalty
💰 Below 8% Floor?
🛡️ Apply Residual Floor
📊 Calculate Final Price
🔍 Generate Explanation
🚘 Display Predicted Price
🔁 Another Vehicle?
[🏁 End]
🌐 Web Application
The project contains an interactive browser-based interface.

Web Technologies
HTML5
   +
CSS3
   +
Vanilla JavaScript ES6

No React, Angular, Vue, Node.js or external framework is required.

Web Features
🎚️ Interactive vehicle controls
📊 Real-time valuation
🌙 Dark glassmorphism interface
⚡ Instant rule evaluation
📋 Explanation breakdown
🚘 Quick vehicle presets
📱 Responsive layout
📖 AI Rulebook
💻 Python CLI
The project also contains a terminal-based Python implementation.

Run:

python car_price_predictor.py

Example:

======================================================================
        AI-POWERED USED CAR PRICE PREDICTOR
         (Heuristic Rule-Based Expert System)
======================================================================

Please enter the car details below:

Brand: Hyundai
Model: Creta
Manufacturing Year: 2021
Kilometers Driven: 35000
Fuel Type: Diesel
Number of Owners: 1
Original Ex-showroom Price: No

The system then generates:

======================================================================
                PREDICTED SELLING PRICE
======================================================================

₹ XXXXXXX
Approx. ₹ XX.XX Lakhs

AI INFERENCE BREAKDOWN
----------------------

1. Base Price Benchmark
2. Vehicle Age Depreciation
3. Mileage / Odometer Wear
4. Fuel Type Adjustment
5. Ownership History Factor
6. Residual Value Check

🚀 Installation & Setup
Requirements
Only Python is required for the CLI/local server.

Python 3.7+
Modern Web Browser

No ML libraries are needed.

Option 1 — Run Web Application
Clone/download the project and enter its directory:

cd yugd

Start Python's built-in HTTP server:

python -m http.server 8000

Open:

http://localhost:8000

Alternative Ports
python -m http.server 3000

or:

python -m http.server 5500

Option 2 — Open HTML Directly
Simply open:

index.html

in:

Chrome
Edge
Firefox
Brave
No backend is required for the frontend.

Option 3 — VS Code Live Server
Open the project in VS Code.
Open index.html.
Right-click.
Select Open with Live Server.
🧪 Test Cases
Test Case 1 — Maruti Suzuki Swift
Brand       : Maruti Suzuki
Model       : Swift
Year        : 2018
Mileage     : 45,000 km
Fuel        : Petrol
Owners      : 2

Expected output:

Predicted Price:
₹1,93,440

Approx:
₹1.93 Lakhs

Rule Breakdown
Base Price                 ₹6,50,000

Age Depreciation -62%     -₹4,03,000

Mileage Depreciation -6%    -₹39,000

Fuel Adjustment               0%

Ownership Penalty             -7%

Final Price               ₹1,93,440

Test Case 2 — Toyota Innova Crysta
Brand       : Toyota
Model       : Innova Crysta
Fuel        : Diesel
Owners      : 1

Example predicted output:

₹5.29 Lakhs

🎓 Viva Questions
<details> <summary><b>Q1. Why is this an AI project without Machine Learning?</b></summary>
Artificial Intelligence is broader than Machine Learning.

This project uses Symbolic AI, specifically a Rule-Based Expert System. It represents domain knowledge using explicit rules and uses an inference engine to derive conclusions.

</details>
<details> <summary><b>Q2. What is the Knowledge Base?</b></summary>
The Knowledge Base stores domain-specific facts and rules such as:

Brand prices
Depreciation percentages
Mileage brackets
Fuel adjustments
Ownership penalties
Residual value limits
</details>
<details> <summary><b>Q3. What is the Inference Engine?</b></summary>
The Inference Engine applies the rules stored in the Knowledge Base to the user's vehicle information and derives the predicted price.

</details>
<details> <summary><b>Q4. What inference strategy is used?</b></summary>
The project uses a sequential forward-chaining style of rule evaluation.

The system starts with known facts such as vehicle age and mileage and progressively applies rules until it derives the final price.

</details>
<details> <summary><b>Q5. Why use Rule-Based AI instead of Machine Learning?</b></summary>
The main reasons are:

No training dataset required
Easy implementation
Fast execution
Highly explainable
Easy to demonstrate in a laboratory
Every prediction can be manually traced
</details>
<details> <summary><b>Q6. How do you prevent negative prices?</b></summary>
Two constraints are used:

Age depreciation has an 80% maximum.
The final value cannot fall below 8% of the base price.
</details>
<details> <summary><b>Q7. How are invalid inputs handled?</b></summary>
The Python program uses validation functions and try-except blocks to check:

Manufacturing year
Mileage
Number of owners
Fuel type
Numeric input formats
Invalid input causes the user to be prompted again instead of crashing the program.

</details>
📁 Project Structure
yugd/
│
├── 📄 index.html
│   └── Web application structure
│
├── 🎨 style.css
│   └── UI styling and responsive design
│
├── ⚡ app.js
│   └── JavaScript rule engine
│
├── 🐍 car_price_predictor.py
│   └── Python CLI expert system
│
└── 📖 README.md
    └── Project documentation

🧩 Technologies Used
┌─────────────────────────────────────┐
│          TECHNOLOGY STACK           │
├─────────────────────────────────────┤
│ 🐍 Python 3.x                       │
│ 🌐 HTML5                            │
│ 🎨 CSS3                             │
│ ⚡ JavaScript ES6                   │
│ 🧠 Rule-Based Artificial Intelligence│
└─────────────────────────────────────┘

📊 Advantages
✅ Strengths
Explainable — every prediction has a reason.
Deterministic — same inputs produce the same result.
Lightweight — no ML frameworks.
Fast — calculations happen instantly.
Easy to maintain — rules can be manually changed.
Viva friendly — algorithm is easy to demonstrate.
Offline capable — no external API is required.
⚠️ Limitations
A rule-based valuation system cannot automatically learn changing market trends.

The current system does not directly account for:

Exact vehicle trim/variant
Accident history
Service records
Geographic market differences
Insurance status
Tyre condition
Vehicle modifications
Current live marketplace listings
Demand/supply fluctuations
Therefore, the output should be considered a heuristic estimate, not a guaranteed market selling price.

🔮 Future Improvements
Possible future versions could add:

 📊 Historical vehicle price dataset
 🤖 Machine Learning comparison model
 🌍 Location-based pricing
 🚘 Exact variant detection
 📷 Vehicle image inspection
 🔧 Service-history scoring
 📈 Market trend analysis
 ☁️ Cloud deployment
 📱 Mobile application
 🔄 Automatic rule updates
 📊 Interactive price charts
🏆 Learning Outcomes
By completing this project, students learn:

Rule-Based AI
      ↓
Expert Systems
      ↓
Knowledge Representation
      ↓
Inference Engines
      ↓
Heuristic Algorithms
      ↓
Input Validation
      ↓
Python Programming
      ↓
Web Development
      ↓
Explainable AI

🧑‍🏫 Suitable For
This project is suitable for:

🎓 B.Tech
🎓 BCA
🎓 MCA
🎓 B.Sc Computer Science
🤖 Artificial Intelligence Laboratory
🐍 Python Laboratory
💻 Mini Projects
🧪 Practical Examinations
🎤 Viva Voce Demonstrations
📌 Project Summary
Category	Details
Project	AI Car Price Predictor
AI Paradigm	Rule-Based Expert System
Programming	Python
Frontend	HTML5 + CSS3 + JavaScript
ML Required	❌ No
External Dependencies	❌ None
Inference	Forward-Chaining Style
Output	Used-Car Price Estimate
Explainability	✅ Full
Interface	Web + CLI

👨‍💻 Authors & Lab Submission
Project Title:
Car Price Predictor using Rule-Based AI

Domain:
Artificial Intelligence / Expert Systems

Languages:
Python 3.x • HTML5 • CSS3 • JavaScript ES6

Project Type:
College Laboratory / Mini Project

<p align="center">
🚗 Built with Python + Rules + AI
No Black Box. No Training. Just Explainable AI.

⭐ If this project helped you, consider giving the repository a star!

</p> ```
One improvement I'd strongly recommend
Your current README calls the algorithm "forward chaining", which is reasonable as a description of the sequential rule evaluation, but technically this isn't a classical production-rule expert system unless your implementation actually represents facts/rules and fires them from a rule engine.

For a college viva, the safest wording is:

"The system uses a deterministic, sequential rule-based inference mechanism inspired by forward chaining."

That prevents an examiner from challenging you with questions such as "Where is your agenda/conflict-resolution mechanism?" or "How are rules dynamically fired?" while still accurately describing your project.



