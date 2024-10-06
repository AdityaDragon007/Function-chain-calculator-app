import React, { useState } from "react";
import "./FunctionCard.scss";
import { AVAILABLE_FUNCTIONS, FUNCTION_1 } from "./FunctionCardConstants";
import ConnectionCircle from "../ConnectionCircle/ConnectionCircle";

function FunctionCard({
  name = FUNCTION_1,
  value,
  onChange,
  nextFunction = FUNCTION_1,
}) {
  const [selectedFunction, setSelectedFunction] = useState(nextFunction);

  return (
    <div className={"card"} id={name}>
      <div className="labelContainer">
        <div class="icon-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        {name}
      </div>
      <div className={"inputsContainer"}>
        <div className="equation">
          <div>Equation</div>
          <input
            className={"equationText"}
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
        <div className="nextFunction">
          <div>Next function</div>
          <select
            disabled
            className="selectInput"
            value={selectedFunction}
            onChange={({ target: { value } }) => {
              setSelectedFunction(value);
            }}
          >
            {[...AVAILABLE_FUNCTIONS, "Output"].map((functionName) => (
              <option key={functionName} value={functionName}>
                {functionName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={"connectionsContainer"}>
        <ConnectionCircle type="input" name={name} />
        <ConnectionCircle type="output" name={name} />
      </div>
    </div>
  );
}

export default FunctionCard;
