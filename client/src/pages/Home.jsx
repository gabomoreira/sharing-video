import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";
import { fetchVideos } from "../api";

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  min-height: 100px;
`;
const H1 = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const { data } = await fetchVideos(type);
        setVideos(data);
      } catch (error) {
        setVideos([]);
      }
    };
    fetchAllVideos();
  }, [type]);

  return (
    <Container>
      {!videos?.length && type === "sub" && (
        <H1>subscribe to channels to follow your videos</H1>
      )}
      {videos?.length === 0 && type !== "sub" ? (
        <H1>Loading...</H1>
      ) : (
        videos?.map((video) => <Card key={video._id} video={video} />)
      )}
    </Container>
  );
};

export default Home;
