import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchVideosSearch } from "../api";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await fetchVideosSearch(query);
      setVideos(data);
    };
    fetchVideo();
  }, [query]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
