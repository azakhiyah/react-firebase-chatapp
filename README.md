# Real-time React-Firebase Chat App

The React-Firebase Chat Application is a real-time communication platform built using ReactJS for the user interface and Firebase for the backend, including authentication and data storage. This application is designed to provide a seamless and intuitive user experience for sending and receiving messages.

# Key Features:

#### 1.User Authentication:

Supports login with email and password.
Integrates with Google Sign-In for quick and secure authentication.
#### 2.Real-Time Messaging:

Messages are sent and received instantly using Firebase Firestore.
Users can view the latest messages without reloading the page.

#### 3.Profile Picture Support:

Users logged in through Google use their Google avatar.
Email/password users can use a default avatar.

#### 4.Message Format:

Messages are displayed in the format `<username>`: `<message>` `<current time>`.

Message timestamps are automatically formatted using date-fns.

#### 5.Notifications and Feedback:

Utilizes React Toastify to display user-friendly notifications such as successful login confirmations and error alerts.

# Technologies Used:

`-` ReactJS: To build responsive user interface components.

`-` Firebase Auth: To securely manage user authentication.

`-` Firebase Firestore: To store and manage chat data in real-time.

`-` React Toastify: To provide clear user feedback.

`-` date-fns: To format message timestamps.


## Available Scripts

In the project directory, you can run:

### `npm install`

Install dependencies required by the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

