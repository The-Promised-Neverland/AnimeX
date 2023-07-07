import React, { useEffect, useState } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/Actions";
import axios from "axios";
import Spinner from "../components/Spinner";

const AdminScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  const uploadNewAnime = () => {
    navigate("/admin/uploadNewAnime");
  };

  const uploadNewCharacters = () => {
    navigate("/admin/uploadNewCharacters");
  };

  const isAdmin = userInfo && userInfo.admin; // Assuming userInfo has an 'isAdmin' property indicating admin status

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/getAllusers");
      setUsers(data.users);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/");
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const userRowStyles = {
    display: "flex",
    border: "0.5px solid black",
    alignItems: "center",
    marginBottom: "10px",
    padding: "5px",
    borderRadius: "5px",
  };

  const userImageStyles = {
    height: "100px",
    width: "100px",
  };

  const logoutButtonStyles = {
    padding: "10px 20px",
    fontSize: "16px",
  };

  return (
    <>
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "20px",
            }}
          >
            <Button onClick={handleLogout} style={logoutButtonStyles}>
              Logout
            </Button>
          </div>
          <Container>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Image
                src={userInfo.photoURL}
                style={{
                  height: "250px",
                  width: "250px",
                  borderRadius: "100%",
                }}
              />
              <div style={{ marginLeft: "20px" }}>
                <div style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
                  {userInfo.displayName}
                </div>
                <div style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
                  {userInfo.email}
                </div>
                <div style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
                  {userInfo.phoneNumber}
                </div>
                {isAdmin && (
                  <div style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
                    Administrator
                  </div>
                )}
              </div>
            </div>
            {isAdmin && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <Button
                    variant="dark"
                    type="button"
                    onClick={uploadNewAnime}
                    style={{ fontSize: "20px", padding: "10px" }}
                  >
                    Add New Anime
                  </Button>
                  <Button
                    variant="dark"
                    type="button"
                    onClick={uploadNewCharacters}
                    style={{ fontSize: "20px", padding: "10px" }}
                  >
                    Add Characters
                  </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                >
                  Users
                </div>
                <div>
                  {Object.keys(users).map((key) => (
                    <Row key={key} style={userRowStyles}>
                      <Col>{key}</Col>
                      <Col>{users[key].displayName}</Col>
                      <Col>
                        <Image
                          src={users[key].photoURL}
                          style={userImageStyles}
                          rounded
                        />
                      </Col>
                      <Col>Online/Offline Status</Col>
                    </Row>
                  ))}
                </div>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default AdminScreen;
