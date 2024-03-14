import React, { createContext, useContext, useState } from 'react';
import './calculator.css'; 
const CalculatorContext = createContext();

function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculateResult = () => {
    try {
      const result = eval(
        input
          .replace(/([0-9.]+)([+])([0-9.]+)/g, '($1)+($3)') 
          .replace(/([0-9.]+)([-])([0-9.]+)/g, '($1)-($3)') 
          .replace(/([0-9.]+)([*])([0-9.]+)/g, '($1)*($3)') 
          .replace(/([0-9.]+)(\/)([0-9.]+)/g, '($1)/($3)') 
      );
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <CalculatorContext.Provider value={{ handleClick, calculateResult, clearInput }}>
      <div className="calculator">
        <input type="text" className="input" value={input} readOnly />
        <div className="buttons">
          <div className="row">
            <NumberButton value="7" />
            <NumberButton value="8" />
            <NumberButton value="9" />
            <OperatorButton value="+" />
          </div>
      


          <div className="row">
            <NumberButton value="4" />
            <NumberButton value="5" />
            <NumberButton value="6" />
            <OperatorButton value="-" />
          </div>
          <div className="row">
            <NumberButton value="1" />
            <NumberButton value="2" />
            <NumberButton value="3" />
            <OperatorButton value="*" />
          </div>
          <div className="row">
            <NumberButton value="0" />
            <NumberButton value="." />
            <OperatorButton value="/" />
            <EqualButton />
          </div>
      
          <div className="row">
            <ClearButton />
          </div>
        </div>
      </div>
    </CalculatorContext.Provider>
  );
}

function NumberButton({ value }) {
  const { handleClick } = useContext(CalculatorContext);
  return <button onClick={() => handleClick(value)}>{value}</button>;
}

function OperatorButton({ value }) {
  const { handleClick } = useContext(CalculatorContext);
  return <button onClick={() => handleClick(value)}>{value}</button>;
}

function EqualButton() {
  const { calculateResult } = useContext(CalculatorContext);
  return <button onClick={calculateResult}>=</button>;
}


function ClearButton() {
  const { clearInput } = useContext(CalculatorContext);
  return <button onClick={clearInput}>Clear</button>;
}

export default Calculator;






















