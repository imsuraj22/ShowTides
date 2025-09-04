# TideShow



## NOTE:- In this application for next high and low tide time I have used World Tides API but there was no such free API to get nearest coast data so that data is hardcoded in JSON file.

## URL to access deploy application
https://show-tides.vercel.app/

## Built UI components:

- <h4>TideList:</h4> Fetches and lists nearest coasts with tide data.

- <h4>TideCard:</h4> Displays detailed tide information with countdowns, safe windows, and a dynamic tide height chart.

- <h4>MapView:</h4> Interactive map using React-Leaflet showing tide locations with markers and popups.

- <h4>TideChart:</h4> Dynamic line chart displaying tide height cycles using Chart.js and Luxon for date/time formatting.

- <h4>SafeWindows:</h4> Calculates safe time windows for activities like swimming, fishing, and boating based on real tide extremes and presents them in interactive cards.

## Output
![WhatsApp Image 2025-09-04 at 17 24 39](https://github.com/user-attachments/assets/70aad0d5-4b6c-4b53-afe4-9ba09e33ee94)
![WhatsApp Image 2025-09-04 at 17 25 06](https://github.com/user-attachments/assets/d645d8cc-ded6-437f-9b17-b285df65c717)
![WhatsApp Image 2025-09-04 at 17 25 58](https://github.com/user-attachments/assets/bb86f4cf-22d7-4e6b-9445-4dc1ede8a014)

## Installation Instructions

To get the project running locally on your machine, follow these steps:

1. **Clone the repository:**
   git clone https://github.com/imsuraj22/ShowTides.git
2. **Install the dependencies:**
   Using npm:
   npm install
   Or using yarn:
   yarn
3. **Start the development server:**
   npm start
   
This will launch the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to see it. The page will reload automatically as you make changes.

## Environment Variables Setup

This project requires a World Tides API key to fetch tide data securely without exposing it in the codebase.

To set this up:

1. **Create a `.env` file in the root of the project directory (same level as `package.json`).**

2. **Add the following environment variable in `.env`:**

REACT_APP_WORLD_TIDES_KEY=your_actual_api_key_here

Replace `your_actual_api_key_here` with your real API key from [World Tides API](https://www.worldtides.info/).

3. **Ensure `.env` is added to `.gitignore` to prevent it from being committed and exposing your key.**

4. **In the app code, the API key is accessed via:**

const WORLD_TIDES_KEY = process.env.REACT_APP_WORLD_TIDES_KEY;

5. **Restart the development server if it was running to load the new environment variable.**

Feel free to contribute, raise issues or suggest features to help improve the project!



