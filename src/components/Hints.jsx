import React from "react";
import './Hints.css'
import onClickOutside from 'react-onclickoutside'
class Hints extends React.Component {
    wrapperRef = React.createRef();
    state = {
        problemHint: [{
            problem: '2+3',
            Hint: "علی نے آپ کو 3 روپے اور اسامہ نے آپ کو 2 روپے دیے۔ تو آپ کے پاس کل کتنے روپے ہیں؟"
        }],
        showHint: false,
        currentProblem : null,

    };

    componentDidUpdate(prevProps, prevState){
        if(this.props.currentProblem != prevProps.currentProblem || !this.state.currentProblem){
            this.setState({
                currentProblem : this.props.currentProblem,
            })
        }
    }
    handleClickOutside = () => {
        this.setState({
            showHint: false
        })
    }
    toggleHint(value) {
        this.setState({ showHint: value })
    }
    render() {
        return (
            <div>
                <div>
                    <div onClick={() => { this.toggleHint(true) }} >Show Hint</div>
                </div>
                <div >
                    {this.state.showHint && <div class="thought " style={{ color: "black",margin: "auto" ,width: "50%"}} ref={this.wrapperRef} >{this.state.problemHint[0].Hint}</div>}
                </div>
            </div>
        );
    }
}

export default onClickOutside(Hints);
