import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Success from "../components/Success";
import Unsuccess from "../components/Unsuccess";

const AnimeuploadScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [updated, setUpdated] = useState(null);
  const [synopsis, setSynopsis] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { status } = await axios.post(
      "/api/uploadAnime",
      { name, image, genre, synopsis },
      config
    );
    if (status === 200) {
      setUpdated(true);
      setTimeout(() => {
        setUpdated(null);
      }, 5000);
    } else {
      setUpdated(false);
    }
  };

  useEffect(() => {
    setImage("");
    setGenre("");
    setName("");
    setSynopsis("");
  }, [updated]);

  return (
    <FormContainer>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Submit details for the anime
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="text" style={{ marginTop: "3rem" }}>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="text" style={{ marginTop: "3rem" }}>
          <Form.Label>Image: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="text" style={{ marginTop: "3rem" }}>
          <Form.Label>Genre: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="text" style={{ marginTop: "3rem" }}>
          <Form.Label>Synopsis: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          ></Form.Control>
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

export default AnimeuploadScreen;
