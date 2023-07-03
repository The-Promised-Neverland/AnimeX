import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect sticky="top">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>AnimeChan</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search anime character"
                className="me-2"
                aria-label="Search"
                style={{ width: "20rem" }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
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
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
