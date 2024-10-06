import {
  FUNCTION_1,
  FUNCTION_2,
  FUNCTION_3,
  FUNCTION_4,
  FUNCTION_5,
} from "./components/FunctionCard/FunctionCardConstants";
import { STROKE_OFFSET } from "./DynamicFunctionCalculatorConstants";
export function getPointPos(point) {
  const pos = point.getBoundingClientRect();
  return {
    left: pos.left + point.clientWidth / 2 + window.scrollX, // Move to the center horizontally
    top: pos.top - point.clientHeight / 2 + STROKE_OFFSET + window.scrollY, // Move to the center vertically
  };
}

// Function to create a straight line path
export function createStraightLine(source, target) {
  return `M${source[0]},${source[1]} L${target[0]},${target[1]}`;
}

// Function to create a curved line path
export function createCurvedLine(source, target, drawBelow = false) {
  const dx = target[0] - source[0];
  const dy = target[1] - source[1];
  const dr = Math.sqrt(dx * dx + dy * dy) / 1.5;

  const sweepFlag = drawBelow ? 1 : 0;

  return `M${source[0]},${source[1]}A${dr},${dr} 0 0,${sweepFlag} ${target[0]},${target[1]}`;
}

//Function to create wavy line
export function createSinWave(source, target, amplitude = 50, frequency = 1) {
  const [x1, y1] = source;
  const [x2, y2] = target;
  const pathLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2); // Distance between points

  let path = `M${x1},${y1} `;
  const segments = Math.floor(pathLength / 5); // Increase the number of segments for a smoother curve

  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const x = x1 + (x2 - x1) * t;
    const sineWave = amplitude * Math.sin(t * Math.PI * 2 * frequency); // Apply sine wave
    const y = y1 + (y2 - y1) * t + sineWave;

    path += `L${x},${y} `;
  }

  return path;
}

const connections = [
  {
    from: { func: "X_INPUT", point: "connection" },
    to: { func: FUNCTION_1, point: "input" },
    type: "straight",
  },
  {
    from: { func: FUNCTION_1, point: "output" },
    to: { func: FUNCTION_2, point: "input" },
    type: "curved",
  },
  {
    from: { func: FUNCTION_2, point: "output" },
    to: { func: FUNCTION_4, point: "input" },
    type: "sine",
  },
  {
    from: { func: FUNCTION_4, point: "output" },
    to: { func: FUNCTION_5, point: "input" },
    type: "curved",
  },
  {
    from: { func: FUNCTION_5, point: "output" },
    to: { func: FUNCTION_3, point: "input" },
    type: "curved",
  },
  {
    to: { func: "X_OUTPUT", point: "connection" },
    from: { func: FUNCTION_3, point: "output" },
    type: "straight",
  },
];

export const drawLines = () => {
  connections.forEach((connection, index) => {
    const path = document.getElementById(`c${index + 1}`);

    const fromElement = document.getElementById(
      `${connection.from.func}-${connection.from.point}`
    );
    const toElement = document.getElementById(
      `${connection.to.func}-${connection.to.point}`
    );

    if (fromElement && toElement && path) {
      const fromPos = getPointPos(fromElement);
      const toPos = getPointPos(toElement);

      // Determine which type of line to draw
      let pathData;
      switch (connection.type) {
        case "straight":
          pathData = createStraightLine(
            [fromPos.left, fromPos.top],
            [toPos.left, toPos.top]
          );
          break;
        case "curved":
          pathData = createCurvedLine(
            [fromPos.left, fromPos.top],
            [toPos.left, toPos.top]
          );
          break;
        case "sine":
          pathData = createSinWave(
            [fromPos.left, fromPos.top],
            [toPos.left, toPos.top]
          );
          break;
        default:
          pathData = createStraightLine(
            [fromPos.left, fromPos.top],
            [toPos.left, toPos.top]
          ); // default to straight
          break;
      }

      path.setAttribute("d", pathData);
    }
  });
};
export const calculateEquation = (equation, xValue) => {
  try {
    // Replace 'x' or 'X' with the actual value while keeping multiplication intact
    const sanitizedEquation = equation
      .replace(/(?<=\d)([xX])/g, `*${xValue}`) // Replace '2x' or '2X' with '2*xValue'
      .replace(/(?<![\d.])[xX]/g, xValue); // Replace 'x' or 'X' with xValue (e.g., 'x^2' or 'X^2' -> 'xValue^2')

    // Only allow certain characters to prevent security issues
    if (/^[0-9+\-*/().^xX\s]*$/.test(sanitizedEquation)) {
      // Use eval to calculate the result (make sure it's safe)
      // Replace '^' with '**' for exponentiation
      const result = eval(sanitizedEquation.replace(/\^/g, "**"));
      return result;
    } else {
      throw new Error("Invalid characters in equation.");
    }
  } catch (error) {
    console.error("Error evaluating equation:", error);
    return null;
  }
};
