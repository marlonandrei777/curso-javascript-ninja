(function(win, doc) {
  'use strict';
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/

    var $input = doc.querySelector('[data-js="boxtext"]');
    var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
    var $buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]');
    var $buttonCE = doc.querySelector('[data-js="button-ce"]');
    var $buttonEqual = doc.querySelector('[data-js="button-equal"]');

    function initialize() {
        initEvents();
    }

    function initEvents() {
        Array.prototype.forEach.call($buttonsNumbers, function(button) {
            button.addEventListener('click', handleClickNumber, false);
        });
        Array.prototype.forEach.call($buttonsOperations, function(button) {
            button.addEventListener('click', handleClickOperation, false);
        });
        $buttonCE.addEventListener('click', handleClickCE, false);
        $buttonEqual.addEventListener('click', handleClikEqual, false);
    }
    
    function handleClickNumber() {
        $input.value += this.value;
    }

    function handleClickOperation() {
        $input.value = removeLastItemIfItIsAnOperator($input.value);
        $input.value += this.value;
    }

    function handleClickCE() {
        $input.value=0;
    }

    function isLastItemAnOperation(number) {
        var operations = getOperations();
        var lastItem = number.split('').pop();
        return operations.some(function(operator) {
            return operator === lastItem;
        });
    }

    function getOperations() {
        return Array.prototype.map.call(call$buttonsOperations, function(button) {
            return button.value;
        });
    }

    function removeLastItemIfItIsAnOperator(string) {
        if(isLastItemAnOperation(string))
            return string.slice(0, -1);
        return string;
    }

    function handleClikEqual() {
        $input.value = removeLastItemIfItIsAnOperator($input.value);
        var allValues = $input.value.match(getRegexOperations());
        $input.value = allValues.reduce(calculateAllValues); 
    }

    function getRegexOperations() {
        return new RegExp('\\d+[' + getOperations().join('') + ']?', 'g');
    }

    function calculateAllValues(accumulated, actual) {
        var firstValue = accumulated.slice(0, -1);
        var operator = accumulated.split('').pop();
        var lastValue =  removeLastItemIfItIsAnOperator(actual);
        var lastOperator = getLastOperatior(actual);
        return doOperation(operator, firstValue, lastValue) + lastOperator;
    }

    function getLastOperatior(value) {
        return isLastItemAnOperation(value) ? value.split('').pop() : '';
    }

    function doOperation(operator, firstValue, lastValue) {
        switch(operator) {
            case '+':
                return Number(firstValue) + Number(lastValue);
            case '-':
                return Number(firstValue) - Number(lastValue);
             case 'x':
                return Number(firstValue) * Number(lastValue);
            case '÷':
                return Number(firstValue) / Number(lastValue);            
        }
    }

    initialize();
  
  })(window, document);
