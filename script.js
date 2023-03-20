var input = document.getElementById('input'), // botão de entrada/saída
  number = document.querySelectorAll('.numbers div'), // botões numéricos
  operator = document.querySelectorAll('.operators div'), // botões do operador
  result = document.getElementById('result'), // botao de igual
  clear = document.getElementById('clear'), // limpar
  resultDisplayed = false; 
  
// adicionando manipuladores de clique a botões numéricos
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // armazenando a string de entrada atual e seu último caractere em variáveis ​​- usado posteriormente
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // se o resultado não for exibido, continue adicionando
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // se o resultado é exibido atualmente e o usuário pressionou um operador
      // precisamos continuar adicionando à string para a próxima operação
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // se o resultado é exibido atualmente e o usuário pressionou um número
      // precisamos limpar a string de entrada e adicionar a nova entrada para iniciar a nova operação
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adicionando manipuladores de clique a botões numéricos
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // armazenando a string de entrada atual e seu último caractere em variáveis ​​- usado posteriormente
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // se o último caractere digitado for um operador, substitua-o pelo atualmente pressionado
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // se a primeira tecla pressionada for um operador, não faça nada
      console.log("enter a number first");
    } else {
      // caso contrário, apenas adicione o operador pressionado à entrada
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// ao clicar no botão 'igual'
result.addEventListener("click", function() {

  // esta é a string que iremos processar, por exemplo. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // formando uma matriz de números. por exemplo, para a string acima, será: números = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // formando um array de operadores. para a string acima será: operator = ["+", "+", "-", "*", "/"]
  // primeiro substituímos todos os números e pontos por uma string vazia e depois dividimos
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // agora estamos percorrendo o array e fazendo uma operação por vez.
  // primeiro divide, depois multiplica, depois subtrai e depois soma
  // à medida que nos movemos, estamos alterando o array original de números e operadores
  // o elemento final restante no array será a saída

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // usar parseFloat é necessário, caso contrário, resultará em concatenação de strings
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // exibindo a saída

  resultDisplayed = true; // virando flag se o resultado for exibido
});

// limpando a entrada ao pressionar limpar
clear.addEventListener("click", function() {
  input.innerHTML = "";
})