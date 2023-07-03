import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";


const Character = ({ character }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Card className="my-3 p-3 rounded" onClick={handlePopup}>
        <Card.Img
          src={character.image}
          style={{ width: "100%", aspectRatio: 1 }}
          variant="top"
        />

        <Card.Body>
          <Card.Title as="h3">
            <strong style={{ display: "flex", justifyContent: "center" }}>
              {character.name}
            </strong>
          </Card.Title>

          <Card.Text
            as="h6"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {character.age} years
          </Card.Text>

          <Card.Text
            as="h6"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {character.role}
          </Card.Text>

          <Card.Text
            as="h6"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {character.abilities}
          </Card.Text>

          <Card.Text
            as="h6"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Voiced by: {character.voiceActor}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal
        show={showPopup}
        onHide={handlePopup}
        animation={true}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{character.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{character.description}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Character;