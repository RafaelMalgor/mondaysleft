import React from 'react';
import styles from './Results.module.css';
class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = { results: props.results };
        this.setCountDown();
    }

    render() {
        if (!this.state.results.mondays) {
            return (
                <img className="img-fluid" src="https://media.giphy.com/media/LTFbyWuELIlqlXGLeZ/giphy.gif"></img>
            );
        }
        return (
            <div>
                <ul className={styles.list + " list-group list-group-flush"}>
                    <li className="list-group-item">⚰️ You have roughly {this.state.results.mondays} mondays left</li>
                    <li className="list-group-item">⚰️ You have around {this.state.results.hours} hours left</li>
                    <li className="list-group-item">⚰️ You have at most {this.state.results.seconds} seconds left</li>
                </ul>
            </div>);
    }

    setCountDown() {
        setInterval(() => {
            this.setState((prevState) => {
                return { results: { ...prevState.results, seconds: prevState.results.seconds - 1 } };
            });
        }, 1000);
    }
}

export default Results;