# plant-tracker
Plant Tracker

## How to Run:
1.  cd backend
    npm run dev
    The server should start on port 5000.
2.  cd frontend
    npm start
    The React app should start on port 3000 and automatically open in your browser.

## Testing Backend API:
1.  http://localhost:5000/api/test
    You should see a JSON response: {"message":"API is working"}
2.  http://localhost:5000/api/plants
    You should see either a JSON response with plant data (if you have any) or an empty array []