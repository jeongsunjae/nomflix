import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { BackIcon } from "Components/Icon";
import Loader from "../../Components/Loader";

const Container = styled.div`
  padding-top: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 4vh;
`;

const BackButton = styled.div`
  width: 5%;
  text-align: center;
  & svg {
    cursor: pointer;
    height: auto;
    fill: white;
  }
`;

const Title = styled.h1`
  width: 95%;
  font-size: 20px;
  &.center {
    text-align: center;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 88vh;
`;

const VideoViewerContainer = styled.div`
  width: 80%;
`;

const VideoPlayer = styled(YouTube)`
  width: 100%;
  height: 88vh;
`;

const VideoListContainer = styled.div`
  width: 20%;
  overflow-y: auto;
`;

const Videos = styled.ul``;

const Video = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 70px;
  font-size: 16px;
  :not(:last-child) {
    border-bottom: 1px solid #404040;
  }
  transition: all 0.2s ease-in-out;
  &.selected,
  &:hover {
    background-color: #404040;
  }
  a {
    widht: 100%;
    padding: 0 10px;
  }
`;

const VideoPresenter = ({ data, error, loading, isMovie }) => {
  //console.log(window.location.href);
  if (loading) {
    return <Loader />;
  } else if (error) {
    return <>{error}</>;
  } else if (data.results) {
    // console.log(data.id);
    return renderVideoList(data.results, error, isMovie, data.id);
  }
  return <div>테스트</div>;
};

const renderVideoList = (results, error, isMovie, id) => {
  //console.log(id);
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };

  const videoLink = isMovie ? `/movie/${id}/video` : `/show/${id}/video`;

  // console.log(`1${videoLink.split("/videos")[0]}`);
  // console.log(`2${results.key}`);
  // console.log(results);
  const youtubeid = window.location.href.split(
    `http://localhost:3000/#/movie/${id}/video/`
  )[1];
  console.log(youtubeid);
  // console.log(test.split("http://localhost:3000/#/movie/330457/video/"));
  return (
    <Container>
      <TitleContainer>
        <BackButton>
          <Link to={`${videoLink.split("/video")}`}>
            <BackIcon />
          </Link>
        </BackButton>
        <Title>{results[0].name}</Title>
      </TitleContainer>
      <VideoContainer>
        <VideoViewerContainer>
          {youtubeid === undefined ? (
            <VideoPlayer videoId={results[0].key} opts={youtubeOpts} />
          ) : (
            <VideoPlayer videoId={youtubeid} opts={youtubeOpts} />
          )}
        </VideoViewerContainer>
        <VideoListContainer>
          <Videos>
            {results &&
              results.map(video => {
                return (
                  <Video key={video.id} className={video.key && "selected"}>
                    <Link to={`${videoLink}/${video.key}`}>{video.name}</Link>
                  </Video>
                );
              })}
          </Videos>
        </VideoListContainer>
      </VideoContainer>
    </Container>
  );
};

VideoPresenter.propTypes = {
  result: PropTypes.object,
  videoInfo: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
    isMovie: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

export default VideoPresenter;
