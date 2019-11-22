import React from "react";
import ReactAwesomePlayer from "react-awesome-player";

class ARStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        sources: [
          {
            type: "rtmp/mp4",
            src: props.url
          }
        ]
      }
    };
  }
  loadeddata() {
    console.log("loadeddata");
  }
  canplay() {
    console.log("canplay");
  }
  canplaythrough() {
    console.log("canplaythrough");
  }
  play() {
    console.log("play");
  }
  pause() {
    console.log("pause");
  }
  waiting() {
    console.log("waiting");
  }
  playing() {
    console.log("playing");
  }
  ended() {
    console.log("ended");
  }
  error() {
    console.log("error");
  }

  render() {
    const { options } = this.state;
    return (
      <ReactAwesomePlayer
        options={options}
        loadeddata={this.loadeddata}
        canplay={this.canplay}
        canplaythrough={this.canplaythrough}
        play={this.play}
        pause={this.pause}
        waiting={this.waiting}
        playing={this.playing}
        ended={this.ended}
        error={this.error}
      />
    );
  }
}

export default ARStream;
