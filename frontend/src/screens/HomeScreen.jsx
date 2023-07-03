import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Anime from "../components/Anime";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getAnimeList } from "../actions/Actions";
import { useParams } from "react-router-dom";
import NoDataFound from "../components/NoDataFound";

const HomeScreen = () => {
  const { id: keyword } = useParams();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.userLogin);

  const { loading: animeLoading, animeList } = useSelector(
    (state) => state.anime
  );

  useEffect(() => {
    dispatch(getAnimeList({ keyword }));
  }, [dispatch, keyword]);

  return (
    <>
      {loading || animeLoading ? (
        <Spinner />
      ) : Object.keys(animeList).length === 0 ? (
        <NoDataFound />
      ) : (
        <Row>
          {Object.keys(animeList).map(
            (key) =>
              key !== "users" && (
                <Col key={key} sm={13} md={6} lg={3} xl={4}>
                  <Anime anime={animeList[key]} _id={key} />
                </Col>
              )
          )}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
