// import calculate from "./Calculate";

const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator__display');
const keys = calculator.querySelector('.calculator__keys');

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    
const calculate = (n1, operator, n2) => {
  console.log('calculate values :',parseFloat(n1), operator, n2);
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }
  console.log(result);
  return result;
};
    
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = 'number';
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator') {
        display.textContent = '0.';
      }
      calculator.dataset.previousKey = 'decimal';
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      console.log('first',secondValue);

      // Note: It'a sufficient to check for firstValue and operator because secodValue always exists
      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ) {
        const calValue = calculate(firstValue, operator, secondValue);
        display.textContent = calValue;

        // Update calculated value as firstValue
        calculator.dataset.firstValue = calValue;
      } else {
        // If there are no calculatiion, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed')
      // Add custom attribute
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }
    
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      console.log('second', secondValue);
      
      if (firstValue) {
        if (previousKeyType ==='calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      // Set modValue attribute
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }
        
    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      } else {
        key.textContent = 'AC';
      }
      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear';
    }

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))
  }

})
