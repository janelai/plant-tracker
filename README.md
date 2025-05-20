# plant-tracker
Plant Tracker

## How to Run the Project:
1.  net start MongoDB in cmd as admin
2.  cd backend
    npm run dev
    The server should start on port 5000.
3.  cd frontend
    npm start
    The React app should start on port 3000 and automatically open in your browser.

## How to Stop the Project:
1. ctrl+C for backend and frontend
2. net stop MongoDB in cmd as admin

## Testing Backend API:
1.  http://localhost:5000/api/test
    You should see a JSON response: {"message":"API is working"}
2.  http://localhost:5000/api/plants
    You should see either a JSON response with plant data (if you have any) or an empty array []

## How to view items in the DB:
1. Open MongoDB Compass
2. Open MongoDB Shell
3. use plant-app
4. db.plants.find().pretty()