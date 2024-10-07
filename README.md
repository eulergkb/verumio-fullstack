# Rectangle API (Verumio-Test)

![image](https://github.com/user-attachments/assets/32d0d763-6da5-480b-b563-e0db8132ee29)


## Frontend (React 18)
Contains React + Typescript source code
- Drawing component `frontend/src/components/DrawingCanvas`

## Backend (.NET 8 Required)
Contains .NET 8 Web API project (using minimal APIS). 
- Json Data store file can be located in the directory `Sources/database.json`

### How to run application
- Navigate to `backend` directory and run `dotnet restore` followed by `dotnet run` and wait for the service to start. - Make sure you have .NET 8 installed
- Navigate to `frontend` directory and run `npm install` followed by `npm run start` to start frontend and navigate to http://localhost:3000

Note: It is important to start the `backend` before trying to navigate to the `frontend` url

## How to resize rectangle

![image](https://github.com/user-attachments/assets/2d8a8d02-7bdc-414a-8aca-8a4ffc972cc0)

- Locate the sky-blue dot at the bottom of the rectangle
- Click and drag to resize the width or height

## How to move rectangle

![image](https://github.com/user-attachments/assets/aa8fcf94-77d7-4839-9fcb-cbc5a375975a)

- Hover the mouse over the surface of the rectangle (black color)
- Drag to move the rectangle in any location
