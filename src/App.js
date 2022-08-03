import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  DragStart,
  DragEnd,
  DragOver,
  DragEnter,
  DragLeave,
  DragDrop,
} from "./helper/Dragable";
import axios from "axios";

function App() {
  const [alphas, setalphas] = useState([]);
  const [promptVal, setpropmptVal] = useState(0);
  const containerRef = useRef();
  const operands = ["+", "-", "*", "/", ">", "<"];

  // fetch Alphabates through api
  useEffect(() => {
    fetchAlphas();
  }, []);

  // fetch alphas
  function fetchAlphas() {
    axios
      .get("https://drag-calc.herokuapp.com/")
      .then((result) => {
        setalphas(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // handle Drag functions

  function handleDragStart(e) {
    DragStart(e);
  }

  function handleDragEnd(e) {
    DragEnd(e);
  }

  function handleDragOver(e) {
    DragOver(e);
  }

  function handleDragEnter(e) {
    DragEnter(e);
  }
  function handleDragLeave(e) {
    DragLeave(e);
  }

  function handleDragDrop(e) {
    DragDrop(e);
  }

  // handlePrompt
  function handlePrompt(e) {
    let val = window.prompt("Enter value");
    if (val == null) {
      alert("Please enter valid number");
      return;
    } else if (
      (val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90) ||
      (val.charCodeAt(0) >= 97 && val.charCodeAt(0) <= 122)
    ) {
      alert("please enter any numerical value");
      return;
    } else {
      setpropmptVal(val);
    }

    // create new element
    let newElement = document.createElement("div");
    //   set innertext
    newElement.innerHTML = `<p>${val}</p>`;
    let span = document.createElement("span");
    span.innerText = "X"; // add inner text

    // add classes
    span.classList.add("close");
    span.addEventListener("click", closeRHS);
    newElement.classList.add("prompt-value");
    newElement.append(span); // append create new element
    containerRef.current.append(newElement);
  }

  let exp = "";
  let comparison = "";
  function handleEvaluate() {
    const containerChilds = containerRef.current.children;
    for (var i = 0; i < containerChilds.length - 1; i++) {
      let val = containerChilds[i].firstChild.innerText;

      //  handle expressions
      if (val === "+" || val === "-" || val === "*" || val === "/") {
        exp += val;
      } else if (val === ">" || val === "<") {
        comparison = val;
      } else {
        let dataVal = containerChilds[i].getAttribute("data-value").toString();
        exp += dataVal.toString();
      }
    }
    solveExpression(exp, comparison, promptVal);
  }

  // solve Expression
  function solveExpression(exp, comparison, val) {
    let evaluatedVal = eval(exp); // eslint-disable-line
    if (comparison === ">" && evaluatedVal > val) {
      window.alert(true);
    } else {
      window.alert(false);
    }
  }

  // close RHS
  function closeRHS(e) {
    let parentNode = e.target.parentNode;
    parentNode.style.transform = "scale(0)";
    parentNode.style.transition = "all .1s ease";
    setTimeout(() => {
      e.target.parentNode.remove();
    }, 250);
  }

  return (
    <div className="App">
      <div className="Alphabates">
        {alphas &&
          alphas.map((alpha) => (
            <div
              className="empty"
              draggable="true"
              key={alpha._id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              data-value={`${alpha.value}`}
            >
              {alpha.char}
            </div>
          ))}
      </div>
      <div className="operands">
        {operands.map((operand, idx) => (
          <div
            className="operand"
            draggable="true"
            key={idx}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >{`${operand}`}</div>
        ))}
        <div className="RHS" onClick={handlePrompt}>
          RHS Integer
        </div>
      </div>
      <div
        ref={containerRef}
        className="container"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
      ></div>
      <button
        type="button"
        className="evaluate-button"
        onClick={handleEvaluate}
      >
        Evaluate
      </button>
    </div>
  );
}

export default App;
