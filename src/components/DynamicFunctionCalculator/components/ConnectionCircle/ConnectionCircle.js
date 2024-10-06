import React from "react";
import "./ConnectionCircle.scss";
import { FUNCTION_1 } from "../FunctionCard/FunctionCardConstants";

function ConnectionCircle({ name = FUNCTION_1, type }) {
  return (
    <div
      className={`connectionContainer ${
        type === "output" ? "reverseItems" : ""
      }`}
    >
      <div className="outer-circle">
        <div
          id={`${name}-${type ? type : "connection"}`}
          className="inner-circle"
        ></div>
      </div>
      {type ? <span>{`${type === "input" ? "Input" : "Output"}`}</span> : null}
    </div>
  );
}

export default ConnectionCircle;
