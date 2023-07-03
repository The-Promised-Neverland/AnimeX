import React from "react";
import { Button, ListGroup, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/Actions";

const AdminScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const uploadNewAnime = () => {
    navigate("/admin/uploadNewAnime");
  };

  const uploadNewCharacters = () => {
    navigate("/admin/uploadNewCharacters");
  };

  const isAdmin = userInfo && userInfo.admin; // Assuming userInfo has an 'isAdmin' property indicating admin status

  const handler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <ListGroup style={{ flex: "0 1 auto" }}>
        <ListGroup.Item style={{ whiteSpace: "nowrap" }}>
          <Image src={userInfo.photoURL} style={{ height: "100px" }} rounded />
        </ListGroup.Item>
        <ListGroup.Item style={{ whiteSpace: "nowrap", padding: "20px" }}>
          Name: {userInfo.displayName}
        </ListGroup.Item>
        <ListGroup.Item style={{ whiteSpace: "nowrap", padding: "20px" }}>
          Email: {userInfo.email}
        </ListGroup.Item>
        <ListGroup.Item style={{ whiteSpace: "nowrap", padding: "20px" }}>
          Phone Number: {userInfo.phoneNumber}
        </ListGroup.Item>
        {isAdmin && (
          <ListGroup.Item style={{ whiteSpace: "nowrap", padding: "20px" }}>
            Administrator
          </ListGroup.Item>
        )}
      </ListGroup>
      <Container>
        {isAdmin && (
          <>
            <div className="admin-screen">
              <Button
                variant="dark"
                type="button"
                onClick={uploadNewAnime}
                className="admin-screen-button"
              >
                Add New Anime
              </Button>
            </div>
            <div>
              <Button
                variant="dark"
                type="button"
                onClick={uploadNewCharacters}
                className="admin-screen-button"
              >
                Add Characters
              </Button>
            </div>

            <Button onClick={handler}>Logout</Button>
          </>
        )}
      </Container>
    </>
  );
};

export default AdminScreen;
