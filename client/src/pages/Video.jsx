import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDownAlt,
  ThumbDownAltOutlined,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
  dislike,
} from "../features/videoSlice";
import moment from "moment";
import { subscription } from "../features/userSlice";
import Recommendation from "../components/Recommendation";
import { Avatar } from "@mui/material";
import {
  addViewVideo,
  dislikeVideo,
  fetchChannel,
  fetchVideo,
  likeVideo,
  subChannel,
  unSubChannel,
} from "../api";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  gap: 5px;
  color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.textSoft};
  margin: 15px 0;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const ChannelImage = styled(Avatar)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const ChannelDescription = styled.p`
  font-size: 14px;
`;

const ChannelSubscribe = styled.button`
  background-color: #cc1a00;
  color: white;
  font-weight: 500;
  border: none;
  height: max-content;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  background-color: #999;
`;

const Video = () => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const videoId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchView = async () => {
      await addViewVideo(currentVideo._id);
    };
    fetchView();
  }, [currentVideo?._id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const { data } = await fetchVideo(videoId);

        dispatch(fetchSuccess(data));
      } catch (error) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [videoId]);

  useEffect(() => {
    const fetchChannelFunc = async () => {
      try {
        const { data } = await fetchChannel(currentVideo?.userId);

        setChannel(data);
      } catch (error) {
        dispatch(fetchFailure());
      }
    };
    fetchChannelFunc();
  }, [currentVideo]);

  const handleLike = async () => {
    await likeVideo(currentVideo._id);
    dispatch(like(currentUser?._id));
  };

  const handleDislike = async () => {
    await dislikeVideo(currentVideo?._id);
    dispatch(dislike(currentUser?._id));
  };

  const handleSub = async () => {
    currentUser?.subscribedUsers.includes(channel._id)
      ? await unSubChannel(channel?._id)
      : await subChannel(channel?._id);
    dispatch(subscription(channel?._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views •{" "}
            {moment(currentVideo?.createdAt).fromNow()}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpAlt />
              ) : (
                <ThumbUpAltOutlined />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <ThumbDownAlt />
              ) : (
                <ThumbDownAltOutlined />
              )}{" "}
              {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelImage src={channel?.img}>
              {!channel?.img && channel?.username?.substr(0, 1)}
            </ChannelImage>
            <ChannelDetails>
              <ChannelName>{channel?.username}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <ChannelDescription>{currentVideo?.desc}</ChannelDescription>
            </ChannelDetails>
          </ChannelInfo>
          {currentVideo?.userId !== currentUser?._id && (
            <ChannelSubscribe onClick={handleSub}>
              {currentUser?.subscribedUsers.includes(channel?._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </ChannelSubscribe>
          )}
        </Channel>
        <Hr />
        {/* <Comments videoId={currentVideo?._id} /> */}
      </Content>
      <Recommendation currentVideo={currentVideo} tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
