# Temperature-Converter

## 1. Project Overview

### Project Title
Temperature-Converter

### Live Demo
[Live Demo](https://temperature-converter.zach-r-lines.workers.dev/)

### Author / Role
Zach - Developer

### Short Project Summary
The Temperature-Converter app allows IBM employees to check weather conditions and use it as a conversation piece during client meetings. It is designed to provide quick access to local and regional weather conditions with a clean and professional interface.

### What the App Does
- Converts temperatures between Celsius and Fahrenheit.
- Displays local and regional weather conditions.
- Provides a conversation starter for client meetings.

### Who It Is For
This app is for IBM employees who need quick weather updates to enhance client interactions.

### One or Two Standout Features
- Real-time temperature conversion.
- Integration with IBM Carbon Design System for a professional look and feel.

### Preview / Screenshot
- add iamge of preview
---

## 2. User Documentation (How to Run It)

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Hopvine15/Temperature-Converter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Temperature-Converter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### How to Run the Project Locally
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### How to Run Tests
(Currently not implemented. Add instructions here if tests are added.)

---

## 3. Technical Overview

### Technology Stack
- **Languages:** TypeScript, JavaScript
- **Frameworks / Libraries:** React, Vite, IBM Carbon Design System
- **Tooling:** ESLint, Prettier

### Key Files / Structure
- **Entry Points:** `src/main.tsx`
- **Styling Files:** `src/App.css`, `src/index.css`
- **Configuration Files:** `vite.config.ts`, `tsconfig.json`, `wrangler.jsonc`
- **External Services / APIs:** None currently.

---

## 4. Project Introduction & Rationale

### Project Motivation
This project was created to provide IBM employees with a tool to check weather conditions and use it as a conversation starter during client meetings.

### Problem You Are Solving
IBM employees often need quick and reliable weather updates to enhance client interactions and build rapport.

### Why This Project Exists
This project was developed as an internal tool for IBM, leveraging the IBM Carbon Design System to ensure a professional and consistent user experience.

### Intended Users
IBM employees who need to check weather conditions for client meetings.

---

## 5. Requirements Definition

### Functional Requirements
- Allow users to input a temperature in Celsius or Fahrenheit.
- Display the converted temperature in real-time.
- Provide a toggle to switch between Celsius and Fahrenheit scales.
- Display local and regional weather conditions.

### Non-Functional Requirements
- **Usability:** Simple and intuitive interface.
- **Performance:** Fast and responsive.
- **Accessibility:** Keyboard and screen-reader friendly.
- **Reliability:** Accurate conversions and weather data.

---

## 6. User Stories

1. **Role:** IBM Employee  
   **Goal:** Check the current weather conditions in a specific region.  
   **Reason:** To use the information as a conversation starter during a client meeting.  
   **Acceptance Criteria:** Input a location, see the current weather conditions instantly.

2. **Role:** IBM Employee  
   **Goal:** Convert a temperature from Celsius to Fahrenheit.  
   **Reason:** To understand the equivalent temperature in another scale.  
   **Acceptance Criteria:** Input a value in Celsius, see the Fahrenheit equivalent instantly.

---

## 7. Risk & Constraints

| Risk                  | Mitigation Strategy                     |
|-----------------------|-----------------------------------------|
| API dependency risks | Use local calculations for conversions. |
| Time constraints      | Focus on core features first.          |

---

## 8. Stakeholders & Roles

- **Zach:** Developer, responsible for all aspects of the project.
- **IBM Employees:** End users who will use the app during client meetings.

---

## 9. Project Management Approach

- **Methodology:** Agile
- **Tools Used:** GitHub Projects
- **Task Tracking:** Issues and pull requests

### Why This Approach?
Using an Agile methodology allowed for iterative development, ensuring that each feature was fully functional and tested before moving on to the next. By breaking the project into smaller tickets, I was able to:
- Maintain focus on individual components, such as the temperature conversion logic and UI cards.
- Adapt to changes and feedback quickly.
- Ensure traceability of all features through GitHub issues and pull requests.

---

## 10. Design & Prototyping

- **Wireframes:** (Add links or images here)
- **Design Decisions:** Focused on simplicity, usability, and alignment with IBM Carbon Design System.
- **Accessibility Considerations:** High contrast colors, keyboard navigation.

### Why These Design Choices?
The IBM Carbon Design System was chosen to ensure a professional and consistent user experience, aligning with IBM's internal standards. Accessibility was prioritized to make the app usable for all employees, including those with disabilities. Wireframes were created to visualize the layout and ensure a user-friendly interface before development began.

---

## 11. Implementation Overview

1. **Project Setup:** Initialized with Vite and TypeScript.
2. **Core Logic Implementation:** Temperature conversion logic in `utils/temperature.ts`.
3. **UI Development:** React components for input, toggle, and display, styled with IBM Carbon Design System.
4. **Error Handling:** Basic validation for user input.

### Why This Implementation?
The decision to use Vite and TypeScript was driven by the need for a fast development environment and strong type-checking to reduce runtime errors. React was chosen for its component-based architecture, which made it easier to build and maintain the UI. The IBM Carbon Design System ensured that the app adhered to IBM's design principles.

---

## 12. Coding Practices & Standards

- **Naming Conventions:** CamelCase for variables and functions.
- **File Organisation:** Grouped by feature (e.g., `components`, `utils`).
- **Commenting Approach:** Inline comments for complex logic.

---

## 13. Testing Strategy

(Currently not implemented. Add details here if tests are added.)

---

## 14. CI / Automation

- **Automation:** None currently. Add details here if CI/CD pipelines are added.

---

## 15. Performance & Accessibility

- **Tools Used:** Lighthouse (Add results here if tested.)
- **Key Results:** (Add results here if tested.)

---

## 16. Final Product

(Add screenshots or links to the deployed app here.)

---

## 17. Evaluation & Reflection

### What Went Well
- Simple and effective implementation.
- Clean and modular code structure.
- The Agile approach allowed for flexibility and iterative improvements.

### What Didn’t
- Limited time for advanced features.
- Some design iterations took longer than expected due to alignment with IBM Carbon standards.

### Known Limitations
- No support for Kelvin conversions.
- Limited testing coverage due to time constraints.

### What You Would Improve Next
- Add more temperature scales.
- Implement unit tests.
- Optimize the app further for performance.

### What You Learned
- Improved TypeScript and React skills.
- Gained experience with the IBM Carbon Design System.
- Learned the importance of accessibility and performance optimization in professional apps.

---

## 18. Future Work

- Add Kelvin conversions.
- Improve accessibility further.
- Implement CI/CD pipelines.
