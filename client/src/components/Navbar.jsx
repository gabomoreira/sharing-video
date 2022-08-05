import {
  AccountCircleOutlined,
  Logout,
  SearchOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Upload from "./Upload";
import { Avatar } from "@mui/material";
import { logout } from "../features/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ currentUser }) =>
    currentUser ? "space-between" : "flex-end"};
  height: 100%;
  padding: 0 20px;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid#ccc;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  flex: 1;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px 15px;
  font-weight: 500;
  border-radius: 3px;
  color: #3ea6ff;
  border: 1px solid #3ea6ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelImage = styled(Avatar)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <>
      <Container>
        <Wrapper currentUser={currentUser}>
          {currentUser && (
            <Button onClick={handleLogout}>
              <Logout style={{ cursor: "pointer" }} />
              Logout
            </Button>
          )}

          <Search>
            <Input
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlined
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/search?q=${q}`)}
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlined
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
              />
              <ChannelImage src={currentUser.img}>
                {currentUser?.username?.substr(0, 1)}
              </ChannelImage>
              {currentUser.username}
            </User>
          ) : (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
