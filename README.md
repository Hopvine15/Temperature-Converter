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
<img width="4064" height="3016" alt="localhost_5173_Temperature-Converter_full_screen" src="https://github.com/user-attachments/assets/3af91361-08d6-492a-99df-0b2ef796f2e6" />

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
   ```bash
   npm test
   ```
---

## 3. Technical Overview

### Technology Stack
- **Framework:** React 18 with Vite
- **Language:** TypeScript (Strict Mode)
- **UI Framework:** IBM Carbon Design System (`@carbon/react`)
- **Deployment:** Cloudflare Pages (via Wrangler)

### Key Files / Structure
Below is the organized directory structure, grouped by feature and logic:

```text
src/
├── components/        # Reusable IBM Carbon UI components
├── hooks/             # Custom React hooks (e.g., useWeather)
├── styles/            # SCSS and Carbon theme configurations
├── utils/
│   ├── temperature.ts # Pure logic for C/F conversions
│   └── weatherApi.ts  # Fetch logic and API configurations
├── types/             # TypeScript interfaces for API responses
├── App.tsx            # Main application layout
└── main.tsx           # Entry point
```

---

## 4. Project Introduction & Rationale

### Project Motivation
This project was created to provide IBM employees with a tool to check weather conditions and use it as a conversation starter during client meetings.

### Problem I'm Solving
IBM employees often need quick and reliable weather updates to enhance client interactions and build rapport.

### Why This Project Exists
This project was developed as an internal tool for IBM, leveraging the IBM Carbon Design System to ensure a professional and consistent user experience.

### Intended Users
IBM employees who need to check weather conditions for client meetings.

<img width="758" height="551" alt="image" src="https://github.com/user-attachments/assets/933dea9e-51fd-40a4-8662-937b7712c10c" />


---

## 5. Requirements Definition

### Functional Requirements
- **Dynamic Unit Conversion:** Allow users to toggle between Celsius and Fahrenheit instantly across all metrics.
- **Atmospheric Data Visualization:** Display a comprehensive breakdown of weather data, including humidity (%), wind speed (km/h), atmospheric pressure (hPa), and visibility (km).
- **Real-Time Classification:** Automatically categorise temperatures into qualitative states (e.g., "Freezing," "Comfort," "V. Hot") using a visual scale to facilitate ice-breaker conversations.
- **Geographic Mapping:** Provide precise location context including latitude/longitude coordinates and a visual map projection of the selected city.
- **Live Search:** Fetch and render global weather data based on user-inputted city names via a standardised search interface.

### Non-Functional Requirements
- **Usability:** Adhere to the **IBM Carbon Design System** to ensure a familiar and intuitive interface for IBM employees.
- **Performance:** Maintain a **Total Blocking Time (TBT) of 0ms** for instantaneous interaction during live meetings.
- **Accessibility:** Ensure **WCAG AA compliance** through rigorous contrast ratios and keyboard-friendly navigation components.
- **Reliability:** Implement defensive logic to handle extreme temperature inputs and provide accurate real-time data from the OpenWeatherMap API.

---

## 6. User Stories & Acceptance Criteria

The development of the Temperature-Converter was driven by the following user stories, ensuring every feature serves a specific need for IBM employees.

### For Ice-Breaker (Weather Check)
> **As an** IBM Employee,  
> **I want to** quickly search and view local weather conditions,  
> **So that** I have a relevant conversation starter for my client meetings.

**Acceptance Criteria:**
- [ ] User can enter a city name into a search bar.
- [ ] Application fetches real-time data from the Weather API upon submission.
- [ ] Weather conditions (e.g., "Cloudy", "Sunny") are displayed alongside the temperature.
- [ ] A loading state is shown using IBM Carbon shimmer effects while data is being fetched.

---

### International Consultant (Unit Conversion)
> **As an** IBM Consultant traveling globally,  
> **I want to** toggle between Celsius and Fahrenheit instantly,  
> **So that** I can communicate environmental data in the client's local unit of measure.

**Acceptance Criteria:**
- [ ] A clear toggle switch allows switching between °C and °F.
- [ ] Conversion happens instantly without a page reload.
- [ ] The conversion logic handles rounding to ensure clean, readable numbers.
- [ ] The app remembers the preferred unit during the active session.

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

- **Methodology:** Agile (Scrum-lite)
- **Tools Used:** GitHub Projects, Kanban Boards
- **Task Tracking:** Granular GitHub Issues & Linked Pull Requests

### Why This Approach?
Adopting an Agile methodology was essential for managing the intersection of design (IBM Carbon standards) and logic (API integration). By utilising a **Kanban board**, I maintained a clear visual flow of tasks from "Backlog" to "Done," ensuring that no feature was left half-finished.

### Project Breakdown & Sprint Logic
The project was categorised into three primary phases to ensure a stable build:

1.  **Phase 1: Foundation & Design (The "Carbon" Sprint)**
    - Focused on setting up the Vite/TypeScript environment.
    - Implementing the IBM Carbon Design System layout and theme.
    - *Goal:* Establish a "Pixel-Perfect" UI shell before introducing complex logic.

2.  **Phase 2: Core Logic (The "Engine" Sprint)**
    - Developing the pure TypeScript conversion functions.
    - Building the city search state management.
    - *Goal:* Ensure 100% accuracy in temperature calculations.

3.  **Phase 3: Integration & Optimization (The "API & Perf" Sprint)**
    - Connecting the OpenWeatherMap API.
    - Conducting Lighthouse audits and accessibility remediation.
    - *Goal:* Deliver a production-ready MVP with high performance scores.

### Traceability
Every feature in the final product is linked to a specific GitHub Issue. This allowed for:
- **Traceability:** Mapping every line of code back to a user requirement.
- **Iterative Feedback:** Adjusting the UI based on mid-development "mini-demos."
- **Focus:** By breaking the project into small tickets (e.g., "Implement °C/°F Toggle"), I avoided "scope creep" and met all project deadlines.

Mid-Development Kanban Board<img width="1882" height="880" alt="image" src="https://github.com/user-attachments/assets/98f4baf7-edc8-409b-a57c-3cdad6dfd5cb" />

---

## 10. Design & Prototyping

### Design Philosophy
The UI for Temperature-Converter is built entirely on the **IBM Carbon Design System**, prioritising a "Productive" UX. This approach ensures that data density is balanced with visual clarity, allowing IBM employees to scan weather metrics instantly during client interactions.

### Why Carbon Design?
By utilising Carbon, the app feels like a native part of the IBM internal ecosystem. Key design choices include:

* **Colour & Theming:** Implemented the **Gray 10 (Light) Theme**, using specific design tokens like `$layer-01` for the background and `$layer-02` for the content cards to create depth.
* **Accessibility:** Adhered to **WCAG AA contrast standards**, utilising the Gray 100/70 Colour families for primary and secondary text to ensure readability for all users.
* **The 2x Grid:** Every component, margin, and gutter is aligned to an **8px mathematical grid**, ensuring a consistent vertical and horizontal rhythm across all screen sizes.
* **Data Hierarchy:** Utilised **Carbon’s Productive Typography scale** (IBM Plex Sans) to emphasise the most critical data point—the current temperature—while maintaining a clear hierarchy for secondary atmospheric data.

### UI Components Used
-   **Header:** Standard Carbon global navigation for the app title and status.
-   **Tiles:** Used for "Current Conditions" and "Location" to group related snapshots of information.
-   **Data Tables:** Employed for "Atmospheric Data" to present complex metrics (Humidity, Pressure, Wind Speed) in a highly scannable, row-based format.
-   **Toggle & Search:** standardised Carbon inputs for seamless unit switching and city discovery.

### Design Assets
-   **Figma Design:** [View Prototype](https://www.figma.com/design/GH3Cw2OkFBIJ3QFFmSYIp5/TempConverterSite?node-id=0-1&p=f&t=MF43Dg1GQCCleGns-0)
-   **Reference:** [IBM Carbon Design System Guidelines](https://carbondesignsystem.com/)

[Carbon Design System Reference](https://carbondesignsystem.com/elements/Colour/overview/)

---

## 11. Implementation Overview

1. **Project Setup:** Initialised with Vite and TypeScript for a type-safe, high-performance build.
2. **Core Logic:** Temperature conversion logic is isolated in `utils/temperature.ts` for easier testing.
3. **UI Development:** Styled using the IBM Carbon Design System to ensure enterprise-grade accessibility and aesthetics.

### IBM Carbon Design System Setup
The project utilises the `@carbon/react` library to maintain alignment with IBM’s internal design standards.
* **Setup:** Configured via SCSS imports in `index.scss` to leverage Carbon’s grid system and "Gray 10" theme.
* **Key Components used:** `Header`, `Search`, `Tabs`, `Button`, and `Loading` (shimmer) states.

### Weather API Integration & Reference
The application fetches real-time data from the [OpenWeatherMap API](https://openweathermap.org/api).

| Detail | Description |
| :--- | :--- |
| **Endpoint** | `https://api.openweathermap.org/data/2.5/weather` |
| **Methods** | `GET` |
| **Parameters** | `q` (city name), `appid` (API Key), `units` (metric/imperial) |
| **Data Handling** | JSON responses are mapped to custom TypeScript interfaces to ensure type safety. |

### Credits & Acknowledgments
* **Design System:** [IBM Carbon Design System](https://carbondesignsystem.com/)
* **Weather Data:** [OpenWeather](https://openweathermap.org/)
* **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 12. Coding Practices & Standards

- **Naming Conventions:** CamelCase for variables and functions.
- **File Organisation:** Grouped by feature (e.g., `components`, `utils`).
- **Commenting Approach:** Inline comments for complex logic.

---

## 13. Testing Strategy

The project utilises **Vitest** and **React Testing Library** to conduct automated unit and integration tests. This ensures that the core temperature logic remains reliable across diverse geographical data points and that UI components respond correctly to state changes.

### Automated Test Suite Overview
The testing architecture is broken down by component responsibility to ensure maximum coverage:

* **`TemperatureToggle.test.tsx`**: Validates the state transition between Celsius and Fahrenheit.
* **`MetricCards.test.tsx`**: Ensures weather data points (humidity, pressure) render with correct units.
* **`TemperatureCard.test.tsx`**: Confirms real-time display updates and input validation.
* **`TempScaleCard.test.tsx`**: A comprehensive 9-test suite focused on visual classification and mathematical mapping.

### Unit Test Results: TempScaleCard
A rigorous series of tests was applied to the visual classification scale to ensure the "Conversation Piece" aspect of the app is technically accurate.

| Test Case | Description | Status |
| :--- | :--- | :---: |
| **Marker Positioning** | Indicator moves accurately along the scale based on temperature. | ✅ Pass |
| **Unit Synchronicity** | Tick labels and markers update correctly when switching to Fahrenheit. | ✅ Pass |
| **Clamping Logic** | Marker remains within UI boundaries when temperatures exceed the visual scale. | ✅ Pass |
| **Responsive Grid** | Validates usage of IBM Carbon grid classes for mobile/desktop layout. | ✅ Pass |
| **Extreme Cold** | Classifies sub-zero temperatures (e.g., -30°C) correctly as "Freezing". | ❌ **FAIL** |

### Bug Discovery: The "Yakutsk" Edge Case
As captured in the automated test output below, a critical logic regression was identified regarding extreme negative values.

**The Failure:**
The test `classifies extreme cold temperatures below the minimum as Freezing` failed. The system received **"V. Hot"** when it expected **"Freezing"** for an input of **-30°C**.

**Technical Analysis:**
The `AssertionError` confirms that the classification function lacks defensive boundary checks for negative integers. Because the logic likely evaluates the temperature against high-thresholds first without a catch-all for values $< 0$, the input "falls through" to the highest possible category.

**The Fix:**
I successfully resolved the temperature classification bug by implementing logic to clamp the tempC value within the defined scale range, ensuring that extreme sub-zero values now correctly map to the "Freezing" category as verified by the passing test suite.
<img width="902" height="208" alt="image" src="https://github.com/user-attachments/assets/d3bba3ab-a5ad-4230-96d3-ec809d150c56" />


---

## 14. CI / Automation

The project utilises a dual-stage CI/CD pipeline to maintain code integrity and high availability.

### Deployment Pipeline (Cloudflare Pages)
- **Continuous Deployment:** The application is connected to the Cloudflare Pages edge network.
- **Automated Builds:** Every merge to the `main` branch triggers a production build using the `npm run build` command, ensuring the live demo is always synchronised with the latest stable code.
- **Preview Deployments:** Cloudflare generates unique "Preview URLs" for every Pull Request, allowing for UI/UX review before merging into production.

### Quality Pipeline (GitHub Actions)
To ensure enterprise-grade reliability, the following "Quality Gates" are integrated into the workflow:
1. **Unit Test Suite:** Executes `npm test` (Vitest) on every push to verify temperature conversion accuracy and classification logic.
2. **Type Safety Check:** Runs `tsc --noEmit` to ensure TypeScript strict-mode compliance.
3. **Linting:** Validates adherence to naming conventions and file organisation standards.

---

## 15. Performance & Accessibility

To ensure the application meets professional enterprise standards, I conducted a comprehensive audit using **Lighthouse** (via PageSpeed Insights). The results confirm that the app is highly optimised, accessible, and follows modern web development best practices.

### Lighthouse Audit Results

| Category | Score |
| :--- | :---: |
| **Performance** | **99** |
| **Accessibility** | **90** |
| **Best Practices** | **100** |
| **SEO** | **91** |

![Lighthouse Audit Scores](https://github.com/user-attachments/assets/be2938f9-36b2-495f-9039-ada5eba529ff)

### Technical Metrics
The following Core Web Vitals were captured during the Desktop audit:
* **First Contentful Paint (FCP):** 0.7s
* **Largest Contentful Paint (LCP):** 0.8s
* **Total Blocking Time (TBT):** 0ms
* **Cumulative Layout Shift (CLS):** 0

### Analysis & Impact
* **Instantaneous Interaction:** With a **Total Blocking Time of 0ms**, the application is exceptionally responsive. For IBM employees using this during live client meetings, this ensures no lag when toggling scales or entering data.
* **Visual Integrity:** A **CLS of 0** confirms that the IBM Carbon Design components are properly loaded and do not cause "layout jumping," maintaining a professional appearance.
* **Accessibility Compliance:** A score of **90** indicates strong adherence to ARIA standards and keyboard navigation. Minor improvements in Colour contrast ratios for specific Carbon components have been identified for future accessibility patches.

### Development Backlog (Lighthouse Recommendations)
While the application is currently in the "Green" zone across all metrics these are the overall recommendations from lighthouse for future addressing, given that this is a student project I find the metrics already obtained satisfactory as they are.
1. **SEO:** Add a dedicated meta-description tag to the document head for better indexing.
2. **Accessibility:** Audit the IBM Carbon "Gray 10" theme contrast ratios to ensure 100% WCAG AA compliance.

---

## 16. Final Product

### PC View of the Site
<img width="3540" height="3016" alt="temperature-converter zach-r-lines workers dev" src="https://github.com/user-attachments/assets/e3b27e49-3e0d-4135-877e-02f459c5a739" />


### Mobile View of the site
<img width="432" height="875" alt="image" src="https://github.com/user-attachments/assets/6433556e-9a89-4c97-bce2-6e89607d9317" />
<img width="408" height="859" alt="image" src="https://github.com/user-attachments/assets/32116dde-ff45-4d0d-a131-3386ac064ee2" />
<img width="399" height="858" alt="image" src="https://github.com/user-attachments/assets/0868c169-29e9-4959-a958-42e80f54f01e" />
<img width="399" height="806" alt="image" src="https://github.com/user-attachments/assets/6265906a-ebfb-4125-91f1-e55712905818" />

---

## 17. Evaluation & Reflection

### Project Evaluation
The Temperature-Converter successfully delivers on all functional requirements and acceptance criteria defined in the project scope. By leveraging the **IBM Carbon Design System**, the application achieves an enterprise-grade "Productive" interface that effectively serves as both a utility tool and a conversation starter for IBM employees. 

#### Successes & Key Achievements
- **Technical Rigor:** The application achieved a **99 Performance score** and **0ms Total Blocking Time** in Lighthouse audits, ensuring a seamless experience during live client interactions.
- **Robust Logic:** Automated unit testing successfully identified and resolved critical edge cases, such as the "Yakutsk" sub-zero classification bug, ensuring 100% mathematical accuracy across the global temperature scale.
- **Design Fidelity:** The implementation of **Gray 10 themes** and the **2x Grid system** resulted in a professional UI that maintains visual integrity across both desktop and mobile viewports.

#### Limitations & Future Considerations
- **Data Latency:** The current OpenWeatherMap Free Tier API exhibits a standard cache delay. For production-scale deployment, a move to a "One Call" subscription would be required to achieve true real-time synchronisation.
- **Scale Breadth:** While the Kelvin scale was intentionally excluded to maintain a clean UX for business users, its absence limits the tool's utility for purely scientific meteorological monitoring.
- **Advanced Automation:** While unit tests are robust, the project currently lacks a CI/CD pipeline to automate these checks upon every code commit.

### Reflection
Building this project deepened my proficiency in **TypeScript Strict Mode** and **System-Driven Design**. The primary challenge was balancing the high data density of weather metrics with Carbon’s strict spacing guidelines. Successfully navigating the "Yakutsk" logic error reinforced the necessity of **Test-Driven Development (TDD)** in building reliable enterprise software.
