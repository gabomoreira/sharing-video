import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { Avatar } from "@mui/material";
import { fetchChannel } from "../api";

const Container = styled.div`
  width: ${({ type }) => type !== "sm" && "260px"};
  margin-bottom: ${({ type }) => (type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${({ type }) => type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  flex: ${({ type }) => type === "sm" && "1"};
  height: ${({ type }) => (type === "sm" ? "100px" : "163px")};
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  flex: ${({ type }) => type === "sm" && "1"};
  margin-top: ${({ type }) => type !== "sm" && "8px"};
  gap: 10px;
`;

const ChannelImage = styled(Avatar)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${({ type }) => type === "sm" && "none"};
`;

const Texts = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0;
`;

const Info = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannelFunc = async () => {
      const { data } = await fetchChannel(video?.userId);
      setChannel(data);
    };
    fetchChannelFunc();
  }, [video?.userId]);

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          {!type && (
            <ChannelImage type={type} src={channel?.img}>
              {channel?.username?.substr(0, 1)}
            </ChannelImage>
          )}
          <Texts>
            <Title>{video?.title.split(" ").slice(0, 6).join(" ")}...</Title>
            <ChannelName>{channel?.username}</ChannelName>
            <Info>
              {video?.views} views • {moment(video?.createdAt).fromNow()}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
