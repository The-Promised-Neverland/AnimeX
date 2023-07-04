import connectDB from "./config/db.js";
import { getDatabase, ref, get, push, set, child } from "firebase/database";
import express from "express";
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
    const animeRef = ref(database, "/anime");
    const snapshot = await get(animeRef);

    if (snapshot.exists()) {
      const animes = snapshot.val();

      // Exclude the "users" key
      if (keyword === undefined) {
        res.status(200);
        res.send(animes);
        return; // Add return statement to stop further processing
      }

      // Filter animes based on the starting keyword...This is a clever way to avoid users directory in firebase
      const matchingAnimes = Object.values(animes).filter((anime) =>
        anime.Name.toLowerCase().startsWith(keyword.toLowerCase())
      );

      res.send(matchingAnimes);
      res.send(200);
    }
  })
);

app.get(
  "/api/animePage/:id",
  asyncHandler(async (req, res) => {
    const animeID = req.params.id;

    const animeRef = ref(database, `/anime/${animeID}`);
    const snapshot = await get(animeRef);

    if (snapshot.exists()) {
      const anime = snapshot.val();
      res.send({ characters: anime.characters, synopsis: anime.Synopsis });
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

    const userRef = ref(database, `/users/${user.uid}`);
    const snapshot = await get(userRef);
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

app.put(
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

app.get(
  "/api/getAllusers",
  asyncHandler(async (req, res) => {
    const usersRef = ref(database, '/users');
    const snapshot = await get(usersRef);
    if(snapshot.exists()){
      res.send({users: snapshot.val()})
    }
  })
);

app.put(
  "/api/uploadAnime",
  asyncHandler(async (req, res) => {
    const user = auth.currentUser;
    if (user) {
      const { name, image, genre, synopsis } = req.body;
      const animeRef = ref(database, "/anime");

      // Check if the required data is provided
      const newData = {
        Name: name,
        Image: image,
        Genre: genre,
        Synopsis: synopsis,
      };

      const newChildRef = push(animeRef); // Generate a new child reference with a unique key
      await set(newChildRef, newData); // Set the data within the new child reference

      // Send a response indicating success
      res.status(200).send({ message: "New data added successfully" });
    }
  })
);

app.put(
  "/api/uploadCharacter/:id",
  asyncHandler(async (req, res) => {
    const animeID = req.params.id;
    const user = auth.currentUser;

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

    if (user) {
      const animeRef = ref(database, `/users/${animeID}`);
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
    }
  })
);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
