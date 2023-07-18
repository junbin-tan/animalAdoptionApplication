# IS3106_Project Group 8 (AY22-23 Semester 2)
It should contain both Frontend (Admin side), public_frontend(public facing side) and Common Backend

## Instructions to run our application

### To run Java Backend
1. Use NetBeans to open our backend "AnimalAdoptionApplication".
2. Do a clean and build.
3. Deploy the "Purple Triangle".
4. Use Postman to test if the our RESTFUL API server is working or not.
Use this ENDPOINT to test: http://localhost:8080/AnimalAdoptionApplication-war/webresources/member/login. 
Use the following json to test the above ENDPoint:
{
    "email": "xiaofeng@gmail.com",
    "password": "password"
}
It should not return NULL POINTER EXCEPTION. Keep re-deploy until you don't get NULL POINTER EXCEPTION

### To run React ADMIN Frontend (MAKE SURE BACKEND IS STARTED AND WORKING)
1. Go inside "Frontend" folder by doing "cd Frontend"
2. Install required project packages by doing "npm install"
3. After "npm install", run the app by doing "npm start". The browser should pop up with our website.

### To run React PUBLIC Frontend (MAKE SURE BACKEND IS STARTED AND WORKING)
1. Go inside "public_frontend" folder by doing "cd public_frontend"
2. Install required project packages by doing "npm install"
3. After "npm install", run the app by doing "npm start". The browser should pop up with our website.

### Video Demo
https://youtu.be/-0h5f99wD6Q.

