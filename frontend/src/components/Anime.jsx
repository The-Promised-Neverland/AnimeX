import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const Anime = ({ anime, _id }) => {
  const navigate = useNavigate();

  const animePage = () => {
    navigate(`/anime/${_id}`);
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img
        src={anime.Image}
        style={{ width: "100%", aspectRatio: 1 }}
        variant="top"
        onClick={animePage}
      />

      <Card.Body>
        <Card.Title as="h3" onClick={animePage}>
          <strong style={{ display: "flex", justifyContent: "center" }}>
            {anime.Name}
          </strong>
        </Card.Title>

        <Card.Text
          as="h6"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {anime.Genre}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Anime;
