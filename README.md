## Personal and multi-room chat

The folder contains 2 sub-folders, chat-app and chat-backend.
Clone the repository, and run `npm install` for both subfolders.
To start the React frontend, run `npm start`, while to run the backend run `npm start` or `npm run dev` to run the server with nodemon.

Both subfolders contain a .env file. For the chat-app point to the backend url you are using, like:

`REACT_APP_API_URL=http://localhost:5000/api`<br>

For the chat-backend, fill the .env fields with the following details, for example.

`PORT = 5000`<br>
`LOCAL_MONGOURI = mongodb://localhost:27017/ `<br>
`JWTPRIVATEKEY = anyrandomtext`<br>
`CLUSTER = Local`<br>
`GOOGLE_KEY = put here your Google OAuth key`

The mongoDB databasae will be created with the name of "test". If you wish to change the name, add it at the end of the `LOCAL_MONGOURI`.

Check that the REACT_APP_API_URL and the PORT in the backend .env have the same port number.

The chat can register new users, both with choosen email and password, and authenticate with Google.

In the chat, you can write personal messages to other users, and create rooms for all the users to join. If a user leaves a room and re-enters, they will find an empty chat page, and will be able to read only the messages written after their entry.
