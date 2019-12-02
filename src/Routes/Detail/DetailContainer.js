import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      //string.includes는 문자열에 해당 문자가 포함됬는지 비교
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        //params에서 id값을 가져옴
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        //await 해서 가벼온 값중 data를 result라는 이름으로 저장
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    const {
      location: { pathname }
    } = this.props;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        pathname={pathname}
      />
    );
  }
}
