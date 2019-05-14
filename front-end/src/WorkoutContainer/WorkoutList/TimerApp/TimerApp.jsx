import React, {Component} from 'react';

class TimerApp extends Component {
    constructor(){
        super();
        this.state = {
            seconds: 0,
            intervalEnd: 0,
            cycles: 0,
            interval: null,
            whichInterval: 'Interval One',
            victoryMessage: ""
        }    
    }

    componentDidMount = () => {
        this.setState({
            seconds: 0,
            intervalEnd: this.props.workout.intervalOne,
            cycles: 0
        })
    }

    secondsGoUp = () => {
            if(this.state.cycles === (this.props.workout.cycles * 2)){
                document.getElementById(`image${this.props.index}`).classList.toggle('hidden');
                clearInterval(this.state.interval);
                this.setState({
                    seconds: null,
                    victoryMessage: "Crushed It!",
                    cycles: 199
                })
            }else if(this.state.seconds < this.state.intervalEnd){
                this.setState({
                    seconds: this.state.seconds += 1
                })
            } else if(this.state.cycles % 2 === 0 && this.state.seconds === this.state.intervalEnd){
                this.setState({
                    seconds: 0,
                    intervalEnd: this.props.workout.intervalTwo,
                    cycles: this.state.cycles += 1,
                    whichInterval: 'Interval Two'
                    
                })            
            } else if(this.state.cycles % 2 !== 0 && this.state.seconds === this.state.intervalEnd){
                this.setState({
                    seconds: 0,
                    intervalEnd: this.props.workout.intervalOne,
                    cycles: this.state.cycles += 1,
                    whichInterval: 'Interval One'
                })
            }        
    }

    timer = () => {
        this.setState({
            interval: setInterval(this.secondsGoUp, 1000)
        })
    }

    pause = () => {
        console.log('clear function hit');
        clearInterval(this.state.interval);
    }

    render(){
        return(
            <div className="flex-container">
                <div>
                    <div id="timer-div" className='timer'>
                        <p>Cycle: {Math.floor(this.state.cycles / 2)  + 1}</p>
                        <p>{this.state.whichInterval}</p>
                        <h1>{this.state.seconds}</h1>
                        <img id={`image${this.props.index}`} className="hidden victoryImg" src={require('../../../images/crushed_it.png')} alt="name" />
                    </div>
                    <div className="flex-container">
                        <button onClick={this.timer} className='start-button'>Start</button>
                        <button onClick={this.pause} className='stop-button'>Pause</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimerApp;
