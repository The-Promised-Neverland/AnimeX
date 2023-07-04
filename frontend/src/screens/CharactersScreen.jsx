import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Character from "../components/Character";
import Spinner from "../components/Spinner";
import Synopsis from "../components/Synopsis";
import NoDataFound from "../components/NoDataFound";

const CharactersScreen = () => {
  const { id: animeID } = useParams();
  const [animeDetail, setAnimeDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAnimePage = async () => {
    try {
      const { data } = await axios.get(`/api/animePage/${animeID}`);
      setAnimeDetail(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimePage();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <Synopsis synopsis={animeDetail.synopsis} />
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              justifyContent: "center",
              fontSize: "xxx-large",
            }}
          >
            Characters
          </div>
          {!animeDetail.characters || Object.keys(animeDetail.characters).length === 0 ? (
            <NoDataFound />
          ) : (
            <Row>
              {Object.keys(animeDetail.characters).map((key) => (
                <Col key={key} sm={13} md={6} lg={3} xl={4}>
                  <Character character={animeDetail.characters[key]} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default CharactersScreen;
