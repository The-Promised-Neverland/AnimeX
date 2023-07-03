import connectDB from "./config/db.js";
import { getDatabase, ref, get, push, set, child } from "firebase/database";
import express from "express";
import { Socket } from "socket.io";
import asyncHandler from "express-async-handler";
import { notFound, errorHandler } from "./middleware/errorHandlers.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

connectDB();

const PORT = 8000;
const io = new Server(9000);


io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});


const app = express();
const auth = getAuth();

app.use(express.json());

const database = getDatabase();

app.get(
  "/api",
  asyncHandler((req, res) => {
    res.send("API is running...");
  })
);

app.post(
  "/api/getAllAnimes",
  asyncHandler(async (req, res) => {
    const { keyword } = req.body;
    const rootRef = ref(database);
    const snapshot = await get(rootRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Exclude the "users" key
      const { users, ...animes } = data;

      if (keyword === undefined) {
        res.status(200);
        res.send(animes);
        return; // Add return statement to stop further processing
      }

      // Filter animes based on the starting keyword...This is a clever way to avoid users directory in firebase
      const matchingAnimes = Object.values(animes).filter(
        (anime) =>
          anime.Name &&
          anime.Name.toLowerCase().startsWith(keyword.toLowerCase())
      );

        res.send(matchingAnimes);
        res.send(200);
    }
  })
);

app.get(
  "/api/getSynopsis/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const animeRef = ref(database, `/${id}`);
    const snapshot = await get(animeRef);

    if (snapshot.exists()) {
      const anime = snapshot.val();
      res.status(200);
      res.send(anime.Synopsis);
    } else {
      res.status(404);
    }
  })
);

app.get(
  "/api/getCharacters/:id",
  asyncHandler(async (req, res) => {
    const animeID = req.params.id;

    const animeRef = ref(database, `/${animeID}`);
    const charactersRef = child(animeRef, "characters");
    const snapshot = await get(charactersRef);

    if (snapshot) {
      const anime = snapshot.val();
      res.send(anime);
      res.status(200);
    } else {
      res.status(404);
    }
  })
);

app.post(
  "/api/users/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const usersRef = ref(database, "/users");
    const snapshot = await get(child(usersRef, user.uid));
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const displayName = userData.displayName;
      const phoneNumber = userData.phoneNumber;
      const photoURL = userData.photoURL;
      const admin = userData.admin === undefined ? false : true;
      res.send({ displayName, phoneNumber, photoURL, email, admin });
    } else {
      // Handle the case when user data doesn't exist
      res.status(404);
    }
  })
);

app.post(
  "/api/users/register",
  asyncHandler(async (req, res) => {
    const { displayName, phoneNumber, photoURL, email, password } = req.body;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Assuming you have the Firebase Realtime Database initialized
    const usersRef = ref(database, "/users");

    // Create the user object with additional information
    const userData = {
      uid: user.uid,
      displayName: displayName,
      phoneNumber: phoneNumber,
      photoURL: photoURL,
    };

    // Store the user object in the database
    const userRef = child(usersRef, user.uid);
    await set(userRef, userData);

    res.send(200);
  })
);

app.get(
  "/api/users/logout",
  asyncHandler(async (req, res) => {
    await signOut(auth);
    res.send(200);
  })
);

// -------------------------------------------------ADMINS-------------------------------------------------------

app.post(
  "/api/uploadAnime",
  asyncHandler(async (req, res) => {
    const { name, image, genre, synopsis } = req.body;
    const rootRef = ref(database, "/");

    // Check if the required data is provided
    if (name && image && genre) {
      const newData = {
        Name: name,
        Image: image,
        Genre: genre,
        Synopsis: synopsis,
      };

      const newChildRef = push(rootRef); // Generate a new child reference with a unique key
      await set(newChildRef, newData); // Set the data within the new child reference

      // Send a response indicating success
      res.status(200).send({ message: "New data added successfully" });
    } else {
      // Send an error response indicating missing data
      res.status(400).send({ error: "Missing required data" });
    }
  })
);

app.post(
  "/api/uploadCharacter/:id",
  asyncHandler(async (req, res) => {
    try {
      const animeID = req.params.id;

      const {
        name,
        image,
        age,
        gender,
        description,
        role,
        abilities,
        voiceActor,
      } = req.body;

      const animeRef = ref(database, `/${animeID}`);
      const charactersRef = child(animeRef, "characters");
      const newCharacterRef = push(charactersRef);

      await set(newCharacterRef, {
        name,
        image,
        age,
        gender,
        description,
        role,
        abilities,
        voiceActor,
      });

      res.status(200).json({ message: "Character uploaded successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error uploading character." });
    }
  })
);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
