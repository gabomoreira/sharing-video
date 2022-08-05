import styled from "styled-components";
import LogoImg from "../img/logo.png";
import {
  SportsEsportsOutlined,
  ArticleOutlined,
  ExploreOutlined,
  FlagOutlined,
  HelpOutlined,
  HistoryOutlined,
  Home,
  LibraryMusicOutlined,
  LiveTvOutlined,
  MovieOutlined,
  SettingsBackupRestoreOutlined,
  SettingsOutlined,
  SportsBasketballOutlined,
  VideoLibraryOutlined,
  SubscriptionsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  overflow-y: auto;
  height: calc(100% - 36px);

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #acacac;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;

  :hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

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
  margin-top: 10px;
`;

const Title = styled.h2`
  color: #aaaaaa;
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Sidebar = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={LogoImg} /> GaboTube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <Home /> Home
          </Item>
        </Link>
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlined /> Explore
          </Item>
        </Link>
        <Link
          to="/subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlined /> Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlined /> Library
        </Item>
        <Item>
          <HistoryOutlined /> History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comments and subiscribe.
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlined /> Sign In
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF GABOTUBE</Title>
        <Item>
          <LibraryMusicOutlined /> Music
        </Item>
        <Item>
          <SportsBasketballOutlined /> Sports
        </Item>
        <Item>
          <SportsEsportsOutlined /> Gaming
        </Item>
        <Item>
          <MovieOutlined /> Movies
        </Item>
        <Item>
          <ArticleOutlined /> News
        </Item>
        <Item>
          <LiveTvOutlined /> Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlined /> Settings
        </Item>
        <Item>
          <FlagOutlined /> Report
        </Item>
        <Item>
          <HelpOutlined /> Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBackupRestoreOutlined />{" "}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
