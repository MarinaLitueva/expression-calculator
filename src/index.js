function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/ /g, "").replace(/\+/g, ",+,").replace(/-/g, ",-,").replace(/\//g, ",/,").replace(/\*/g, ",*,").replace(/\(/g, ",(,").replace(/\)/g, ",),");
    var exprArr = expr.split(",");

    if (expr.split('(').length != expr.split(')').length) throw new Error('ExpressionError: Brackets must be paired');

    let stack = [];
    let postfixExpr = [];
 
    exprArr.forEach(function(el, index, array) {
      switch (el) {
        case "":
            break;
        case "(":
          stack.push(el)
          break;
        case ")":
          while (true) {
            if (stack.length === 0) {
              break;
            }
            let s = stack.pop()
            if (s === "(") {
              break;
            }
            postfixExpr.push(s)
          }
          break;
          case "+":
          case "-":
          case "*":
          case "/":
  
          while (true) {
            if (stack.length === 0 || stack[stack.length - 1] === "(") {
              break;
            }
            if (el === "/" && (stack[stack.length - 1] === "*" || stack[stack.length - 1] === "+" || stack[stack.length - 1] === "-") ) {
                break;
              }
              if (el === "*" && (stack[stack.length - 1] === "+" || stack[stack.length - 1] === "-") ) {
                break;
              }
            let s = stack.pop()
            postfixExpr.push(s)
          }
          stack.push(el)
          break;
        default:
          postfixExpr.push(el)
      }
    });
  
    while (true) {
      if (stack.length === 0) {
        break;
      }
      s = stack.pop()
      postfixExpr.push(s)
    }


    postfixExpr.forEach(function(el, index, array) {
  
      if (el == "+" || el == "-" || el == "*" || el == "/") {
        let el1 = +stack.pop();
        let el2 = +stack.pop();
        var result
        switch (el) {
          case "+":
            result = el1 + el2;
            break;
          case "-":
            result = el2 - el1;
            break;
          case "*":
            result = el1 * el2;
            break;
          case "/":
            if (el1 === 0) {
              throw "TypeError: Division by zero.";
            }
            result = el2 / el1;
            break;
          default:
            break;
        }
        stack.push(String(result))
      } else {
        stack.push(el)
      }
    });
    return +stack.pop()
  }


module.exports = {
    expressionCalculator
}