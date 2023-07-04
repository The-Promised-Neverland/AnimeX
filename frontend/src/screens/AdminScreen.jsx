import React, { useEffect, useState } from "react";
import { Button, ListGroup, Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/Actions";
import axios from "axios";

const AdminScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [users, setUsers] = useState({});

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
      console.log(error);
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
  };

  const logoutButtonStyles = {
    padding: "10px 20px",
    fontSize: "16px",
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
        <Button onClick={handleLogout} style={logoutButtonStyles}>
          Logout
        </Button>
      </div>
      <Container>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <Image src={userInfo.photoURL} style={{ ...userImageStyles, borderRadius: "50%" }} />
          <div style={{ marginLeft: "20px" }}>
            <div style={{ marginBottom: "10px" }}>Name: {userInfo.displayName}</div>
            <div style={{ marginBottom: "10px" }}>Email: {userInfo.email}</div>
            <div style={{ marginBottom: "10px" }}>Phone Number: {userInfo.phoneNumber}</div>
            {isAdmin && <div>Administrator</div>}
          </div>
        </div>
        {isAdmin && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <Button variant="dark" type="button" onClick={uploadNewAnime}>
                Add New Anime
              </Button>
              <Button variant="dark" type="button" onClick={uploadNewCharacters}>
                Add Characters
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "30px" }}>Users</div>
            <div>
              {Object.keys(users).map((key) => (
                <Row key={key} style={userRowStyles}>
                  <Col>{key}</Col>
                  <Col>{users[key].displayName}</Col>
                  <Col>
                    <Image src={users[key].photoURL} style={userImageStyles} rounded />
                  </Col>
                  <Col>Online/Offline Status</Col>
                </Row>
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default AdminScreen;
