import React from 'react';
class LabeledNumberInput extends React.Component {
    render() {
      return (
        <div><label htmlFor="imp">{this.props.label}</label>
          <input type="number" className="form-control form-control-lg" id="imp"
            onChange={this.props.onChange}
            value={this.props.value}
            placeholder="..." />
          <small id="smll" className="form-text">{this.props.message}</small>
        </div>);
    }
  }
  export default LabeledNumberInput;