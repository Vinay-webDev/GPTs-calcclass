import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      operation: ''
    };
  }

  handleClick = (value) => {
    const { display, operation } = this.state;

    if (value === 'C') {
      this.setState({
        display: '0',
        operation: ''
      });
    } else if (value === '=') {
      try {
        let result = eval(operation);
        result = parseFloat(result).toPrecision(10);
        this.setState({
          display: result.toString(),
          operation: result.toString()
        });
      } catch (e) {
        this.setState({
          display: 'Error'
        });
      }
    } else {
      if (['+', '-', '*', '/'].includes(value)) {
        const lastChar = operation.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
          this.setState({
            operation: operation.slice(0, -1) + value,
            display: value
          });
        } else {
          this.setState({
            operation: operation + value,
            display: value
          });
        }
      } else if (value === '.') {
        const lastNumber = operation.split(/[\+\-\*\/]/).pop();
        if (lastNumber.includes('.')) return;
        this.setState({
          operation: operation + value,
          display: display + value
        });
      } else {
        if (display === '0' && value !== '.') {
          this.setState({
            display: value,
            operation: operation + value
          });
        } else {
          this.setState({
            display: display + value,
            operation: operation + value
          });
        }
      }
    }
  };

  render() {
    return (
      <div className="calculator">
        <div id="display" className="display">
          {this.state.display}
        </div>
        <div className="buttons">
          <button id="clear" className="double-width" onClick={() => this.handleClick('C')}>C</button>
          <button id="divide" className="operator" onClick={() => this.handleClick('/')}>/</button>
          <button id="multiply" className="operator" onClick={() => this.handleClick('*')}>*</button>
          <button id="subtract" className="operator" onClick={() => this.handleClick('-')}>-</button>
          <button id="add" className="operator" onClick={() => this.handleClick('+')}>+</button>
          <button id="decimal" onClick={() => this.handleClick('.')}>.</button>
          {[...Array(10).keys()].map((num) => (
            <button key={num} id={num.toString()} onClick={() => this.handleClick(num.toString())}>
              {num}
            </button>
          ))}
          <button id="equals" className="operator double-width" onClick={() => this.handleClick('=')}>=</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
