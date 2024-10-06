import React, { useState } from "react";
import "./InputFunctionContainer.scss";
import ConnectionCircle from "../ConnectionCircle/ConnectionCircle";

function InputFunctionContainer({
  label = "Input value of x",
  value,
  onChange,
  name,
  flip = false,
}) {
  return (
    <div className="outerContainer">
      <div className={`tagText ${flip ? "greenTag" : "yellowTag"}`}>
        {label}
      </div>
      <div
        className={`InputFunctionContainer ${flip ? "reverseContent" : ""}`}
        id={name}
      >
        <input type="text" value={value} onChange={onChange} />
        <ConnectionCircle name={name} />
      </div>
    </div>
  );
}

export default InputFunctionContainer;
