import React, { useEffect, useState } from "react";
import FunctionCard from "./components/FunctionCard";
import {
  FUNCTION_1,
  FUNCTION_2,
  FUNCTION_3,
  FUNCTION_4,
  FUNCTION_5,
} from "./components/FunctionCard/FunctionCardConstants";
import { drawLines } from "./Utils";
import "./DynamicFunctionCalculator.scss";
import InputFunctionContainer from "./components/InputFunctionContainer";
import { calculateEquation } from "./Utils"; // Import your calculate function

function DynamicCalculator() {
  const [inputValue, setInputValue] = useState(""); // Value of x
  const [outputValue, setOutputValue] = useState("");

  const [functionInputs, setFunctionInputs] = useState({
    [FUNCTION_1]: "",
    [FUNCTION_2]: "",
    [FUNCTION_3]: "",
    [FUNCTION_4]: "",
    [FUNCTION_5]: "",
  });

  // Calculate output based on function inputs and input value
  const calculateOutput = () => {
    const calculationSequence = [
      FUNCTION_1,
      FUNCTION_2,
      FUNCTION_4,
      FUNCTION_5,
      FUNCTION_3,
    ];

    let currentValue = inputValue;

    calculationSequence.forEach((functionName) => {
      const equation = functionInputs[functionName];
      if (equation) {
        currentValue = calculateEquation(equation, currentValue);
      }
    });

    setOutputValue(currentValue); // Set final output
  };

  useEffect(() => {
    setTimeout(() => {
      drawLines();
    });
  }, []);

  useEffect(() => {
    calculateOutput(); // Calculate output when function inputs change
  }, [functionInputs, inputValue]); // Depend on inputValue as well

  return (
    <div>
      Dynamic Calc
      <div>
        <svg>
          <path id="c1"></path>
          <path id="c2"></path>
          <path id="c3"></path>
          <path id="c4"></path>
          <path id="c5"></path>
          <path id="c6"></path>
        </svg>
        <div className="functionSection">
          <div className="upperFunctionsSection">
            <div className="firstConnection">
              <InputFunctionContainer
                name="X_INPUT"
                value={inputValue}
                onChange={({ target: { value } }) => setInputValue(value)}
              />
              <FunctionCard
                value={functionInputs[FUNCTION_1]}
                onChange={({ target: { value } }) =>
                  setFunctionInputs({ ...functionInputs, [FUNCTION_1]: value })
                }
                name={FUNCTION_1}
                nextFunction={FUNCTION_2}
              />
            </div>
            <FunctionCard
              value={functionInputs[FUNCTION_2]}
              onChange={({ target: { value } }) =>
                setFunctionInputs({ ...functionInputs, [FUNCTION_2]: value })
              }
              name={FUNCTION_2}
              nextFunction={FUNCTION_4}
            />
            <div className="firstConnection">
              <FunctionCard
                value={functionInputs[FUNCTION_3]}
                onChange={({ target: { value } }) =>
                  setFunctionInputs({ ...functionInputs, [FUNCTION_3]: value })
                }
                name={FUNCTION_3}
                nextFunction={"Output"}
              />
              <InputFunctionContainer
                name="X_OUTPUT"
                label={"Final Output y"}
                value={outputValue}
                disabled
                flip
              />
            </div>
          </div>
          <div className="lowerFunctionsSection">
            <FunctionCard
              value={functionInputs[FUNCTION_4]}
              onChange={({ target: { value } }) =>
                setFunctionInputs({ ...functionInputs, [FUNCTION_4]: value })
              }
              name={FUNCTION_4}
              nextFunction={FUNCTION_5}
            />
            <FunctionCard
              value={functionInputs[FUNCTION_5]}
              onChange={({ target: { value } }) =>
                setFunctionInputs({ ...functionInputs, [FUNCTION_5]: value })
              }
              name={FUNCTION_5}
              nextFunction={FUNCTION_3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicCalculator;
