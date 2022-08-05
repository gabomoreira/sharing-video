import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchVideosTags } from "../api";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ currentVideo, tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await fetchVideosTags(tags);
      const videos = data.filter((videoId) => videoId._id !== currentVideo._id);
      setVideos(videos);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
