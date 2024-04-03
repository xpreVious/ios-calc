import React, { useState } from "react";
import "./sass/App.scss";

function App() {
	const [input, setInput] = useState(""); //	Input state
	const [activeButton, setActiveButton] = useState(null); //	Active button state
	const [firstNumber, setFirstNumber] = useState(null); //	First number state
	const [secondNumber, setSecondNumber] = useState(null); //	Second number state

	//	Toggle class "active" on button click
	const toggleClass = (buttonName) => {
		setActiveButton(buttonName);
	};

	//	Clear input function
	const handleClearClick = () => {
		setInput("");
		setActiveButton(null);
		setFirstNumber(null);
		setSecondNumber(null);
	};

	//	Handle operator click function
	const handleOperatorClick = (value) => {
		switch (value) {
			case "%":
				setInput(input / 100);
				break;

			case "+/-":
				setInput(input * -1);
				break;
			default:
				setInput(input + value);
				setFirstNumber(input);
				setInput("");
				break;
		}
	};

	//	Handle button click function
	const handleButtonClick = (value) => {
		switch (value) {
			case ".":
				if (input == 0) {
					setInput("0.");
				} else if (!input.toString().includes(".")) {
					setInput(input + ".");
				}
				break;
			case "0":
				if (input == 0) {
					break;
				}
			default:
				setInput(input + value);
				setSecondNumber(input + value);
				break;
		}
	};

	//	Equals button click function
	const equals = () => {
		setActiveButton(null);
		if (
			eval(input) != "Infinity" &&
			eval(input) != "-Infinity" &&
			eval(input) != undefined &&
			input !== "Error"
		) {
			switch (activeButton) {
				case "buttonPlus":
					setInput(eval(`${firstNumber} + ${secondNumber}`));
					break;
				case "buttonMinus":
					setInput(eval(`${firstNumber} - ${secondNumber}`));
					break;
				case "buttonDivision":
					setInput(eval(`${firstNumber} / ${secondNumber}`));
					break;
				case "buttonMulti":
					setInput(eval(`${firstNumber} * ${secondNumber}`));
					break;
				default:
					break;
			}
		} else if (input == 0) {
			setInput("0");
		} else {
			setInput("Error");
		}
	};

	return (
		<div className="calculator">
			<input
				type="text"
				className="calculator-screen"
				value={input}
				placeholder="0"
				readOnly
			/>
			<div className="calculator-keys">
				<button className="top" onClick={() => handleClearClick("C")}>
					AC
				</button>
				<button className="top" onClick={() => handleOperatorClick("+/-")}>
					+/-
				</button>
				<button className="top" onClick={() => handleOperatorClick("%")}>
					%
				</button>
				<button
					className={activeButton === "buttonDivision" ? "active" : "right"}
					onClick={() => {
						handleOperatorClick("/");
						toggleClass("buttonDivision");
					}}>
					/
				</button>

				<button className="main" onClick={() => handleButtonClick("7")}>
					7
				</button>
				<button className="main" onClick={() => handleButtonClick("8")}>
					8
				</button>
				<button className="main" onClick={() => handleButtonClick("9")}>
					9
				</button>
				<button
					className={activeButton === "buttonMulti" ? "active" : "right"}
					onClick={() => {
						handleOperatorClick("*");
						toggleClass("buttonMulti");
					}}>
					x
				</button>

				<button className="main" onClick={() => handleButtonClick("4")}>
					4
				</button>
				<button className="main" onClick={() => handleButtonClick("5")}>
					5
				</button>
				<button className="main" onClick={() => handleButtonClick("6")}>
					6
				</button>
				<button
					className={activeButton === "buttonMinus" ? "active" : "right"}
					onClick={() => {
						handleOperatorClick("-");
						toggleClass("buttonMinus");
					}}>
					-
				</button>

				<button className="main" onClick={() => handleButtonClick("1")}>
					1
				</button>
				<button className="main" onClick={() => handleButtonClick("2")}>
					2
				</button>
				<button className="main" onClick={() => handleButtonClick("3")}>
					3
				</button>
				<button
					className={activeButton === "buttonPlus" ? "active" : "right"}
					onClick={() => {
						handleOperatorClick("+");
						toggleClass("buttonPlus");
					}}>
					+
				</button>

				<button className="zero main" onClick={() => handleButtonClick("0")}>
					0
				</button>
				<button className="main" onClick={() => handleButtonClick(".")}>
					.
				</button>
				<button className="right" onClick={() => equals()}>
					=
				</button>
			</div>
		</div>
	);
}

export default App;
