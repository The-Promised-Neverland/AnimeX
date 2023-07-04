import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  }, [keyword]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect sticky="top">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>AnimeChan</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search anime character"
                className="me-2"
                aria-label="Search"
                style={{ width: "20rem" }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Form>
          </Nav>

          {userInfo ? (
            <Nav style={{ marginRight: "1rem" }}>
              <LinkContainer to="/admin">
                <Nav.Link>
                  {userInfo.photoURL && (
                    <Image
                      src={userInfo.photoURL}
                      alt={userInfo.displayName}
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                    />
                  )}
                  <div>{userInfo.displayName}</div>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer to="/login">
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: "0.5rem",
                  }}
                >
                  <FaUserTie color="white" size={40} />
                  <div style={{ color: "white" }}>Login</div>
                </div>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
