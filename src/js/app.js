// Required module
// ===============
import React, { Component } from 'react';
import logo from '../logo.svg';
import "../css/app.css";

// App Component
// =============
class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      clockStarted: false,
      timerStarted: false,
      timerStopped: true,
      timerReseted: false,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  handleTimerStart(event) {
    event.preventDefault();
    if (this.state.timerStopped || this.state.timerReseted || this.clockStarted) {
      this.timer = setInterval(() => {
        this.setState({
          timerStarted: true,
          clockStarted: false,
          timerStopped: false
        });
        if (this.state.timerStarted) {
          this.setState(prevState => ({ seconds: prevState.seconds + 1 })); // Updates the seconds in timer
          if (this.state.seconds >= 60) {
            this.setState(prevState => ({
              minutes: prevState.minutes + 1,
              seconds: 0
            })); // Updates the minutes in timer
          }
          if (this.state.minutes >= 60) {
            this.setState(prevState => ({
              hours: prevState.hours + 1,
              minutes: 0,
              seconds: 0
            })); // Updates the hours in timer
          }
        }
      }, 1000);
    }
  }

  handleClock(event) {
    event.preventDefault();
    const days = new Date();
    this.setState(prevState => ({
      hours: days.getHours(),
      minutes: days.getMinutes(),
      seconds: days.getSeconds()
    }));
    this.handleTimerStart(event);
  }

  handleTimerStop(event) {
    event.preventDefault();
    this.setState({
      clockStarted: false,
      timerStarted: false,
      timerStopped: true
    });
    clearInterval(this.timer);
  }

  handleTimerReset(event) {
    event.preventDefault();
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      clockStarted: 0,
      timerReseted: true
    });
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {" "}
            OBIFENIX <code>Clock</code>
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            {" "}
            Learning React
          </a>
        </header>

        <div className="container">
          <div className="timer-container">
            <div className="current-timer">
              {this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds}
            </div>
            <div className="timer-control">
              <button className="btn btn-md btn-info"    onClick={this.handleClock.bind(this)}>CLOCK</button>
              <button className="btn btn-md btn-success" onClick={this.handleTimerStart.bind(this)}>START TIMER</button>
              <button className="btn btn-md btn-default" onClick={this.handleTimerStop.bind(this)}>STOP TIMER</button>
              <button className="btn btn-md btn-danger"  onClick={this.handleTimerReset.bind(this)}>RESET TIMER</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
