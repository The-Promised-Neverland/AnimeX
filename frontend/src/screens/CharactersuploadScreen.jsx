import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Success from "../components/Success";
import Unsuccess from "../components/Unsuccess";

const CharactersuploadScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [abilities, setAbilities] = useState("");
  const [voiceActor, setVoiceActor] = useState("");
  const [updated, setUpdated] = useState(null);
  const [anime, setAnime] = useState({});
  const [id, setID] = useState("");

  const submitHandler = async (e) => {
    console.log(`id: ${id}`);
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        `/api/uploadCharacter/${id}`,
        {
          name,
          image,
          age,
          gender,
          description,
          role,
          abilities,
          voiceActor,
        },
        config
      );
      setUpdated(true);
      setTimeout(() => {
        setUpdated(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setUpdated(false);
    }
  };

  const fetchAnime = async () => {
    try {
      const { data } = await axios.get("/api/getAllAnimes");
      if (data) {
        setAnime(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnime();
    setAge("");
    setName("");
    setImage("");
    setDescription("");
    setAbilities("");
    setGender("");
    setRole("");
    setVoiceActor("");
    setID("");
  }, [updated]);

  return (
    <FormContainer>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Update character details
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="anime" style={{ marginTop: "2rem" }}>
          <Form.Label>Anime:</Form.Label>
          <Form.Control
            as="select"
            value={id}
            onChange={(e) => setID(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select an anime
            </option>
            {Object.keys(anime).length > 0 &&
              Object.keys(anime).map((key) => (
                <option key={key} value={key}>
                  {anime[key].Name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="name" style={{ marginTop: "2rem" }}>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" style={{ marginTop: "2rem" }}>
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="age" style={{ marginTop: "2rem" }}>
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="gender" style={{ marginTop: "2rem" }}>
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" style={{ marginTop: "2rem" }}>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="role" style={{ marginTop: "2rem" }}>
          <Form.Label>Role:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="abilities" style={{ marginTop: "2rem" }}>
          <Form.Label>Abilities:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter abilities"
            value={abilities}
            onChange={(e) => setAbilities(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="voiceActor" style={{ marginTop: "2rem" }}>
          <Form.Label>Voice Actor:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter voice actor"
            value={voiceActor}
            onChange={(e) => setVoiceActor(e.target.value)}
            required
          />
        </Form.Group>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <Button type="submit" style={{ backgroundColor: "orange" }}>
            Upload
          </Button>
        </div>
      </Form>
      {updated === true && <Success />}
      {updated === false && <Unsuccess />}
    </FormContainer>
  );
};

export default CharactersuploadScreen;
