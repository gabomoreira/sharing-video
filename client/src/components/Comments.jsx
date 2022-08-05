import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChannelImage = styled(Avatar)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  width: 100%;
  outline: none;
  padding: 5px;
  color: ${({ theme }) => theme.text};
`;

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await fetchComments(videoId);
      setComments(data);
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <ChannelImage src={currentUser?.img}>
          {!currentUser?.img && currentUser?.username?.substr(0, 1)}
        </ChannelImage>
        <Input placeholder="Add a comment" />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
