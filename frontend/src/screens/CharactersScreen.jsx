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
  const [characters, setCharacters] = useState({});
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [synopsis, setSynopsis] = useState("");
  const [loadingSynopsis, setLoadingSynopsis] = useState(true);

  const fetchCharacters = async () => {
    try {
      const { data } = await axios.get(`/api/getCharacters/${animeID}`);
      setCharacters(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCharacters(false);
    }
  };

  const fetchSynopsis = async () => {
    try {
      const { data } = await axios.get(`/api/getSynopsis/${animeID}`);
      setSynopsis(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSynopsis(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCharacters(), fetchSynopsis()]);
    };

    fetchData();
  }, []);

  return (
    <>
      {loadingCharacters || loadingSynopsis ? (
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
          <Synopsis synopsis={synopsis} />
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
          {Object.keys(characters).length === 0 ? (
            <NoDataFound />
          ) : (
            <Row>
              {Object.keys(characters).map((key) => (
                <Col key={key} sm={13} md={6} lg={3} xl={4}>
                  <Character character={characters[key]} />
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
