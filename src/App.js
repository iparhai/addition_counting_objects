import React, { Component } from 'react';
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from './redux/index'
import Start from './containers/Start';
import MathQuiz from './containers/MathQuiz';
import './App.css';
import backgroundGIF from './assets/gif/background.gif'
import Footer from './components/Footer';

class App extends Component {
  
  gameStart = () => {
    this.props.onStartGame();
  }
  handleURL(){
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('id')
    alert(token)
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={backgroundGIF} id="bg" alt="" />

          {
            !this.props.isStarted ? (
              <Start startPressed={this.gameStart} />
            ) : (
              <MathQuiz { ...this.props} gameStart={this.gameStart}/>
            )
          }
          <button onClick={this.handleURL}> get ID</button>
        </header>
        {/* <Footer></Footer> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
