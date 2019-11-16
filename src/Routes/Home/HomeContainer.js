import React from "react";
import HomePresenter from "./HomePresenter";
import moviesAip from "../../api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: false
  };

  async componentDidMount() {
    try {
      const nowPlaying = await moviesAip.nowPlaying();
      console.log(nowPlaying);
    } catch (e) {
      //   console.log(e);
      this.setState({
        error: "Can't Find Movie information"
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

// const state = {
//   nowPlaying: null,
//   upcoming: null,
//   popular: null,
//   error: null,
//   loading: false
// };
// function HomeContainer() {
//   const [value] = useState(state);
//   const { nowPlaying, upcoming, popular, error, loading } = value;

//   return (
//     <HomePresenter
//       nowPlaying={nowPlaying}
//       upcoming={upcoming}
//       popular={popular}
//       error={error}
//       loading={loading}
//     />
//   );
// }

// export default HomeContainer;
