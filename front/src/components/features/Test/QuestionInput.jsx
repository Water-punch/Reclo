import React from "react";
import { Button } from "@mui/material";

const QuestionInput = ({ question, onSubmit }) => {
  if (!question) {
    return null;
  }

  return (
    <div>
      <h2>{question.text}</h2>
      {question.type === "range" && (
        <input
          type="range"
          min={1}
          max={10}
          onChange={(e) => onSubmit(e.target.value)}
        />
      )}
      {question.type === "multiple" && (
        <div>
          {question.options.map((option) => (
            <Button
              variant="contained"
              disableElevation
              style={{ marginLeft: "20px" }}
              key={option}
              onClick={() => onSubmit(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
