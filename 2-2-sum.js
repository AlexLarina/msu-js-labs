'use strict';

/**
 * Создает ноду листа
 * @param data - данные, хранящиеся в узле списка
 * @constructor
 */
function Node(data) {
    this.data = data;
    this.next = null;
}

/**
 * Указывает на головной элемент списка
 * @constructor
 */
function SinglyList() {
    this._length = 0;
    this.head = null;
}

/**
 * Добавляет ноду в конец списка
 * @param value
 * @returns {Node}
 */
SinglyList.prototype.add = function(value) {
    var node = new Node(value),
        currentNode = this.head;

    if (!currentNode) {
        this.head = node;
        this._length++;

        return node;
    }

    while (currentNode.next) {
        currentNode = currentNode.next;
    }

    currentNode.next = node;

    this._length++;

    return node;
};
/**
 * Вспомогательный метод: выводит в консоль значения поля data каждого узла
 * @param list - имя листа, данные из которого необходимо распечатать
 */
var print = function(list){
    var currentNode = list.head;

    for(var i = 0; i < list._length; i++){
        console.log(currentNode.data);
        currentNode = currentNode.next;
    }
};
/**
 * Записывает в лист цифры десятичного числа в обратном порядке
 * @param list - лист, в который записываются цифры
 * @param number - число, представляемое в виде листа
 * @returns возвращает лист
 */
var numberToListConvert = function (number) {
    var list = new SinglyList();
    if(number === 0) {
        list.add(number);
    } else {
        while (number >= 1) {
            var remainder = number % 10;
            list.add(remainder);
            //console.log(remainder);
            number = (number - remainder) / 10;
        }
    }
    return list;
}
/**
 * Выполняет сложение двух чисел
 * @param firstNumberList - лист с цифрами первого числа
 * @param secondNumberList - лист с цифрами второго числа
 * @returns {SinglyList} - лист, содержащий цифры суммы
 */
var sumTwoNumbers = function (firstNumberList, secondNumberList) {
    var sum = new SinglyList();

    var currentFirst = firstNumberList.head;
    var currentSecond = secondNumberList.head;
    var digit = 0;
    var sumInDigit = null;

    //выполняет сложение младшего разряда
    if(currentFirst.data + currentSecond.data >= 10) {
        sum.head = sum.add((currentFirst.data + currentSecond.data)%10);
        digit = 1;
    } else {
        sum.head = sum.add(currentFirst.data + currentSecond.data);
    }

    // выполняет сложение всех остальных разрядов
    while (currentFirst.next && currentSecond.next) {

        currentFirst = currentFirst.next;
        currentSecond = currentSecond.next;

        if(digit == 1) {
            sumInDigit = currentFirst.data + currentSecond.data + digit;

            if(sumInDigit >= 10) {
                sum.next = sum.add((sumInDigit)%10);
                digit = 1;
            } else {
                sum.next = sum.add(sumInDigit);
                digit = 0;
            }

        } else {
            sumInDigit = currentFirst.data + currentSecond.data;

            if(sumInDigit >= 10) {
                sum.next = sum.add((currentFirst.data + currentSecond.data)%10);
                digit = 1;
            } else {
                sum.next = sum.add(sumInDigit);
                digit = 0;
            }
        }

    }

    // учитываем случай, если два числа имеют количество разрядов
    if(firstNumberList._length > secondNumberList._length) {
        while(currentFirst.next){
            currentFirst = currentFirst.next;
            sum.next = sum.add(currentFirst.data + digit);
        }
    } else {
        while(currentSecond.next){
            currentSecond = currentSecond.next;
            sum.next = sum.add(currentSecond.data + digit);
        }
    }

    return sum;
};

/**
 * Вспомогательный метод: возращает длину листа
 * @param list - имя листа, длину которого необходимо подсчитать
 */
var countLength = function (list) {
    var currentNode = this.head,
    length = null;

    if (!currentNode) {
        length = 0;
        return length;
    }

    while (currentNode.next) {
        currentNode = currentNode.next;
    }
    length++;

    return length;
};

var num1 = numberToListConvert(342);
print(num1);
console.log('num1.length ' + num1._length);

var num2 = numberToListConvert(465);
print(num2);
console.log('num2.length ' + num2._length);


var sum = sumTwoNumbers(num1, num2);
print(sum);
