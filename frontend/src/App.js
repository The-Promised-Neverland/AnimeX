import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CharactersScreen from "./screens/CharactersScreen";
import AnimeuploadScreen from "./screens/AnimeuploadScreen";
import CharactersuploadScreen from "./screens/CharactersuploadScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:id" element={<HomeScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/anime/:id" element={<CharactersScreen />} />
            <Route
              path="/admin/uploadNewAnime"
              element={<AnimeuploadScreen />}
            />
            <Route
              path="/admin/uploadNewCharacters"
              element={<CharactersuploadScreen />}
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
