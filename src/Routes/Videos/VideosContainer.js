import React, { useState, useEffect } from "react";
import VideoPresenter from "./VideoPresenter";
import { moviesApi, tvApi } from "../../api";

function VideosContainer(props) {
  const [isMovie, setIsMovie] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    match: {
      params: { id }
    },
    location: { pathname }
  } = props;

  const movie = pathname.includes("/movie/");

  if (!isMovie) {
    setIsMovie(movie);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        setError(null);
        setLoading(true);

        if (isMovie) {
          const res = await moviesApi.videos(parseInt(id));
          setData(res.data);
          // console.log(res.data);
        } else {
          const res = await tvApi.videos(parseInt(id));
          setData(res.data);
        }
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setLoading(false);
        setIsMovie(false);
      }
    };
    fetch();
  }, [id, isMovie]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러</div>;
  // console.log(isMovie);
  return (
    <VideoPresenter
      error={error}
      data={data}
      loading={loading}
      isMovie={isMovie}
    ></VideoPresenter>
  );
}
export default VideosContainer;
