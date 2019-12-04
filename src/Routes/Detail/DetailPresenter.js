import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { YoutubeIcon } from "../../Components/Icon";
import SeasonPoster from "../../Components/SeasonPoster";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  margin-top: 5px;
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Companies = styled.ul`
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  & > h2 {
    font-size: 14px;
    margin: 12px;
  }
`;
const Production = styled.li`
  display: inline-block;
  margin: 20px;
`;
const Logo = styled.img`
  width: 100px;
`;
const Seasons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 50px;
  padding-top: 70px;
  width: 80%;
`;

const DetailPresenter = ({ result, loading, error, pathname }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <Overview>
            <span role="img" gria-lable="video">
              <Link to={`${pathname}/video`}>
                <YoutubeIcon />
              </Link>
            </span>
            {/* <Divider>•</Divider> */}
            {/* <span role="img">
              <Imdb>
                <img src={require("../../assets/logoImdb.png")} />
              </Imdb>
            </span> */}
          </Overview>

          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && (
              <>
                <Divider />
                <Item></Item>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.production_companies &&
            result.production_companies.length > 0 && (
              <Companies>
                <h2>Production Companies</h2>
                {result.production_companies.map(company => (
                  <Production>
                    {company.logo_path ? (
                      <Logo
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        title={company.name}
                      />
                    ) : (
                      company.name
                    )}
                  </Production>
                ))}
              </Companies>
            )}

          {result.seasons && result.seasons.length > 0 && (
            <Companies>
              <Title>Seasons</Title>
              <Seasons>
                {result.seasons.map(value => (
                  <SeasonPoster
                    id={value.id}
                    image={value.poster_path}
                    title={value.name}
                  />
                ))}
              </Seasons>
            </Companies>
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
