import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 45%;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
`;

const Image = styled.div`
  width: 120px;
  height: 200px;
  background-image: url(${props => props.bg});
  background-size: cover;
  border-radius: 4px;
  transition: opacity 0.2s linear;
  margin: 10px;
`;
const Title = styled.span`
  display: block;
  margin-bottom: 3px;
  margin: 10px;
`;

const ImageContainer = styled.div`
  margin-left: 90px;
  margin-top: 5px;
  &:hover {
    ${Image} {
      opacity: 0.8;
    }
  }
`;

const SeasonPoster = props => (
  <Container>
    <ImageContainer>
      <Title>{props.title}</Title>
      <Image
        bg={
          props.image
            ? `https://image.tmdb.org/t/p/w200${props.image}`
            : require("../assets/noPosterSmall.png")
        }
      />
    </ImageContainer>
  </Container>
);

SeasonPoster.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default SeasonPoster;
