import React from "react";
import AnswerModal from "./AnswerModal";
import { MathHelper } from "../utils";
import bowl from "../assets/bowl.png"
import rooster from "../assets/rooster.png"
import './Quiz.css'

class Quiz extends React.Component {
  _isMounted = false;
  _secondsIntervalRef;

  state = {
    problem: "",
    firstNumber: 0,
    secondNumber: 0,
    symbol: "",
    answer: 0,
    modal: "",
    modalShowing: false,
    streaks: 0,
    images: [bowl, rooster],
    randomImage: "",
    data: [],
  };

  earnLife = () => {
    this.props.onEarnLife();
    this.showModal("success", "STREAK!! You won a life ♥");
    this.setState({
      streaks: 0
    });
  };
  getFirstNumber
  correctAnswer = () => {
    if (this.state.streaks > 2) {
      this.earnLife();
    } else {
      this.showModal("success");
    }

    this._isMounted && this.props.onCorretAnswer();
    this.setState(state => {
      return {
        streaks: state.streaks + 1
      };
    });

    this.nextProblem();
  };

  componentDidMount() {
    this._isMounted = true;
    this.getProblem();
    this.answerInput.focus();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.lifes < 1) {
      this.props.onEndGame(this.state.points);
      return false;
    }
    return nextProps.lifes > -1;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  wrongAnswer = () => {
    this._isMounted && this.props.onWrongAnswer();
    this.setState({
      streaks: 0
    });
    this.showModal("error", MathHelper.solve(this.state.problem).toString());
    this.nextProblem();
  };

  nextProblem = () => {
    setTimeout(() => {
      this.getProblem();
      this._isMounted &&
        this.setState({
          modalShowing: false
        });
      if (this.props.lifes > 0) (this.answerInput && this.answerInput.focus());
    }, 2500);
  };

  evaluateProblem = () => {
    const temp = MathHelper.solve(this.state.problem);
    if (this.state.data.length === 0) {
      this.setState({
        data: [{ problem: this.state.problem, attemptedAnswer: this.state.answer, corectAnswer: temp, timeTaken: 20 - this.props.seconds }]
      })
    }
    else {
      this.setState(previousState => ({
        data: [...previousState.data, { problem: this.state.problem, attemptedAnswer: this.state.answer, corectAnswer: temp, timeTaken: 20 - this.props.seconds }]
      }));
    }
    console.log(this.state.data)
    if (MathHelper.compare(this.state.problem, this.state.answer)) {
      return this.correctAnswer();
    }
    return this.wrongAnswer();
  };

  keyingUp = ev => {
    if (ev.key === "Enter") {
      this.evaluateProblem();
    }
    const val = ev.target.value;

    this.setState({
      answer: Number(val.match(/((-?)\d+)/g)) // accept just numbers and the minus symbol
    });
  };

  showModal = (type, text) => {
    this.setState({
      modal: <AnswerModal type={type} text={text} />,
      modalShowing: true
    });
  };


  getProblem = () => {
    // const newProblemSet = MathHelper.generateAdditionProblem(this.props.points);
    const newProblemSet = MathHelper.generateSubtractionProblem(this.props.points);
    const randomImage = this.getImage()
    console.log(newProblemSet)
    this._isMounted &&
      this.setState({
        problem: newProblemSet.problem,
        firstNumber: newProblemSet.firstNumber,
        secondNumber: newProblemSet.secondNumber,
        symbol: newProblemSet.symbol,
        randomImage: randomImage
      });
  };

  getImage = () => {
    return this.state.images[MathHelper.getRandomInt(0, this.state.images.length - 1)]
  }

  render() {
    // const images = [...Array(parseInt(this.state.firstNumber))].map((e, i) => {
    //   return <img key={i} src={bowl} style={{ width: "100px", height: "80px" }} />
    // });

    return (
      <section className="show-up">

        <div>
          {this.state.modalShowing ? (
            this.state.modal
          ) : (
            <div>
              <table >
                <tbody>
                  <tr >
                    {[...Array(parseInt(this.state.firstNumber))].map((e, i) => {
                      return <td style={{ padding: "40px" }}><img key={i} src={this.state.randomImage} style={{ width: "100px", height: "80px" }} /> &thinsp; </td>
                    })}

                    <td className="center" style={{ paddingLeft: "80px" }}><h1 style={{ fontSize: "3.5em" }}> {this.state.symbol} </h1></td>

                    {[...Array(parseInt(this.state.secondNumber))].map((e, i) => {
                      return <td style={{ padding: "40px" }}><img key={i} src={this.state.randomImage} style={{ width: "100px", height: "80px" }} /> &thinsp;</td>
                    })}
                  </tr>
                </tbody>
              </table>
              <input
                ref={input => {
                  this.answerInput = input;
                }}
                className="App-input"
                type="number"
                placeholder="Enter"
                onKeyUp={this.keyingUp}
              />
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Quiz;
