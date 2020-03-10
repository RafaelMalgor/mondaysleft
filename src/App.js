import React from 'react';
import './App.css';
import LabeledNumberInput from './LabeledNumberInput';
import Results from './Results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      ageMessage: "C'mon don't lie",
      death: 0,
      deathMessage: "",
      loadingbar: "",
      displayResults: false
    };
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeDeath = this.onChangeDeath.bind(this);
    this.onClickCalculate = this.onClickCalculate.bind(this);
    this.skullCount = 0;
  }
  render() {
    return (
      <div className="App container-fluid overflow-auto">
        <h1 className="d-flex justify-content-center">How many mondays you have left</h1>
        <div className="d-flex flex-row justify-content-center">
          <div className="d-flex flex-column justify-content-center">
            <form className="border border-info rounded p-3">
              <LabeledNumberInput
                min="0"
                label="Age:"
                onChange={this.onChangeAge}
                value={this.state.age}
                message={this.state.ageMessage}>

              </LabeledNumberInput>
              <div className="mt-3">
                <LabeledNumberInput
                  min="0"
                  className="m-top-2"
                  label="You think you are going to die at:"
                  onChange={this.onChangeDeath}
                  value={this.state.death}
                  message={this.state.deathMessage}></LabeledNumberInput>
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <button onClick={this.onClickCalculate} className="btn btn-warning">Calculate</button>
              </div>
            </form>
            <div className="mt-3 d-flex justify-content-center">
              {this.state.loadingbar}
            </div>
            {this.showResults()}
          </div>
        </div>
      </div>)
      ;
  }

  onClickCalculate(event) {
    event.preventDefault();

    // Reset state
    this.setState({ loadingbar: "", displayResults: false });
    clearInterval(this.skullInterval);
    this.skullCount = 0;

    this.skullInterval = setInterval(() => {
      this.skullCount++;
      this.setState((prevState) => {
        return { loadingbar: prevState.loadingbar + "☠️" };
      });
      if (this.skullCount > 6) {
        clearInterval(this.skullInterval);
        this.setState({
          displayResults: true,
          results: this.calculateResults()
        });
      }
    }, 500);
  }

  getAgeMessage(age) {
    let message = "";
    if (age < 16) {
      message = "You shouldn't be here";
    }
    else if (age > 80) {
      message = "Wow! Still kicking!";
    }
    else {
      message = "Mmmm... ok";
    }
    return message;
  }

  onChangeAge(event) {
    let age = parseInt(event.target.value);

    this.setState({
      age: age,
      ageMessage: this.getAgeMessage(age),
      deathMessage: this.getDeathMessage(this.state.death, age)
    });
  }

  getDeathMessage(death, age) {
    let message = "";
    if (age > death) {
      message = "You time travelling bastard!";
    }
    else if (death - age === 0) {
      message = "Hello darkness my old friend...";
    }
    else if (death - age === 1) {
      message = "Can you add me to your will?";
    }
    else if (death - age <= 5) {
      message = "I've seen worse";
    }
    else if (death > 90) {
      message = "There is optimism and then there is this";
    }
    else if (death > 80) {
      message = "Yeah sure...";
    }
    else if (death > 60) {
      message = "Saving for retirement?";
    }
    else if (death > 50) {
      message = "Maybe take a walk from time to time";
    }
    else {
      message = "Live Fast, Die Young?";
    }
    return message;
  }

  onChangeDeath(event) {
    let death = event.target.value;
    let age = parseInt(this.state.age);
    this.setState({
      death: death,
      ageMessage: this.getAgeMessage(age),
      deathMessage: this.getDeathMessage(death, age),
    });
  }

  showResults() {
    if (!this.state.displayResults) return null;
    return (
      <div className="border border-info rounded p-3">
        <Results results={this.state.results}>
        </Results>
      </div>)
  }

  calculateResults() {
    let yearsLeft = this.state.death - this.state.age;
    return {
      mondays: this.calculateMondays(yearsLeft),
      hours: this.calculateHours(yearsLeft),
      seconds: this.calculateSeconds(yearsLeft)
    };
  }

  calculateMondays(yearsLeft) {
    if (yearsLeft >= 0) {
      return yearsLeft * 52;
    }
    else {
      return undefined;
    }
  }

  calculateHours(yearsLeft) {
    if (yearsLeft >= 0) {
      return yearsLeft * 8760;
    }
    else {
      return undefined;
    }
  }

  calculateSeconds(yearsLeft) {
    if (yearsLeft >= 0) {
      return yearsLeft * 31556952;
    }
    else {
      return undefined;
    }
  }
}

export default App;
