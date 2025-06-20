exports.calculate = function(expression) {
  if (!expression || expression.trim() === '') {
      return 0;
  }
  const tokens = expression.trim().split(/\s+/).filter(token => token !== '');
  if (tokens.length === 1) {
      const num = parseFloat(tokens[0]);
      if (isNaN(num)) {
          throw new Error(`Invalid number: ${tokens[0]}`);
      }
      return num;
  }
  const stack = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];

      if (!isNaN(parseFloat(token))) {
          stack.push(parseFloat(token));
      }
    
      else if (['+', '-', '*', '/'].includes(token)) {
          if (stack.length < 2) {
              throw new Error(`Insufficient operands for operator: ${token}`);
          }
          const operand1 = stack.pop();
          const operand2 = stack.pop();
          
          let result;
          switch (token) {
              case '+':
                  result = operand1 + operand2;
                  break;
              case '-':
                  result = operand1 - operand2;
                  break;
              case '*':
                  result = operand1 * operand2;
                  break;
              case '/':
                  if (operand2 === 0) {
                      throw new Error('Division by zero');
                  }
                  result = operand1 / operand2;
                  break;
          }
          stack.push(result);
      }
      else {
          throw new Error(`Invalid token: ${token}`);
      }
  }
  if (stack.length !== 1) {
      throw new Error('Invalid expression: incorrect number of operators and operands');
  }
  return stack[0];
};
