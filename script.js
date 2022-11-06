const calculatorHistory = document.querySelectorAll('h1')[0];
const calculatorDisplay = document.querySelectorAll('h1')[1];
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let nextValue = false;

function numberValue(number) {
  if (nextValue) {
    calculatorDisplay.textContent = number;
    nextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  if (nextValue) return;
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function addPlusOrMinus() {
  let currentValue = Number(calculatorDisplay.textContent);
  if (
    calculatorDisplay.textContent.includes('') &&
    !calculatorDisplay.textContent.includes('-')
  ) {
    calculatorDisplay.textContent = currentValue * -1;
  } else if (calculatorDisplay.textContent.includes('-')) {
    calculatorDisplay.textContent = currentValue * -1;
  }
}

const calculate = {
  '/': (firstNumber, secoundNumber) => (firstNumber / secoundNumber).toFixed(2),
  '*': (firstNumber, secoundNumber) =>
    Number(firstNumber * secoundNumber).toFixed(2),
  '+': (firstNumber, secoundNumber) =>
    Number(firstNumber + secoundNumber).toFixed(2),
  '-': (firstNumber, secoundNumber) =>
    Number(firstNumber - secoundNumber).toFixed(2),
  '=': (firstNumber, secoundNumber) => secoundNumber,
  sqrt: (firstNumber, secoundNumber) => Math.sqrt(secoundNumber).toFixed(2),
  sqr: (firstNumber, secoundNumber) => Math.pow(secoundNumber, 2).toFixed(2),
  '^-1': (firstNumber, secoundNumber) => Math.pow(secoundNumber, -1).toFixed(2),
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && nextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](
      Number(firstValue),
      currentValue
    );
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
    writeHistory();
  }
  nextValue = true;
  operatorValue = operator;
}

function operation(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue) {
    operatorValue = operator;
  }
  const calculation = calculate[operator](Number(firstValue), currentValue);
  calculatorDisplay.textContent = calculation;
  firstValue = calculation;
  writeHistory();
  nextValue = true;
  operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => numberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  } else if (inputBtn.classList.contains('delete')) {
    inputBtn.addEventListener('click', () => deleteData());
  } else if (inputBtn.classList.contains('operation')) {
    inputBtn.addEventListener('click', () => operation(inputBtn.value));
  } else if (inputBtn.classList.contains('plusOrMinus')) {
    inputBtn.addEventListener('click', () => addPlusOrMinus());
  }
});

function deleteData() {
  if (calculatorDisplay.textContent && calculatorDisplay.textContent != '0') {
    calculatorDisplay.textContent = String(calculatorDisplay.textContent).slice(
      0,
      -1
    );
    if (calculatorDisplay.textContent == '') {
      calculatorDisplay.textContent = '0';
    }
  }
}

function writeHistory() {
  if (calculatorDisplay.textContent) {
    calculatorHistory.textContent = calculatorDisplay.textContent;
  }
}

function clearAll() {
  firstValue = 0;
  operatorValue = '';
  nextValue = false;
  calculatorDisplay.textContent = '0';
  calculatorHistory.textContent = '0';
}

clearBtn.addEventListener('click', clearAll);

const switchKey = document.querySelector('input');

const calculatorButton = document.querySelector('.calculator-button');
const calculatorDisplayTable = document.querySelector('.calculator-display');

switchKey.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  calculatorButton.classList.toggle('dark');
  calculatorDisplayTable.classList.toggle('dark');
});
