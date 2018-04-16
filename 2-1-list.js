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

    // если список пуст
    if (!currentNode) {
        this.head = node;
        this._length++;

        return node;
    }

    // если список не пуст
    while (currentNode.next) {
        currentNode = currentNode.next;
    }

    currentNode.next = node;

    this._length++;

    return node;
};

/**
 * Осуществляет поиск по заданного значения среди элементов листа
 * @param searchedValue
 * @returns {*}
 */
SinglyList.prototype.searchNode = function(searchedValue) {
    var currentNode = this.head,
        length = this._length,
        count = null,
        message = {failure: 'Element not found'};

    for(var indexer = 0; indexer < length; indexer++){

        if(currentNode.data == searchedValue) {
            count = indexer;
        }

        currentNode = currentNode.next;
    }

    if(count == null) {
        throw new Error(message.failure);
    }

    return count;
};
/**
 * Ищет в листе, а зачем удаляет требуемое значение
 * @param searchedValue - значение, которое нужно удалить
 * @returns возвращает удаленную ноду
 */
SinglyList.prototype.remove = function(searchedValue) {
    var currentNode = this.head,
        length = this._length,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
    // если список пуст
    if(!currentNode){
        throw new Error(message.failure);
    }
    // если нужно удалить первый узел
    if(currentNode.data == searchedValue) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;

        return deletedNode;
    }

    // если нужно удалить любой другой узел листа
    for(var indexer = 0; indexer < length; indexer++){

        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;

        if(nodeToDelete == null) {
            throw new Error(message.failure);
        }

        if(nodeToDelete.data == searchedValue) {

            beforeNodeToDelete.next = nodeToDelete.next;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
            this._length--;
            return deletedNode;
        }

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
};
/**
 * Вспомогательный метод: выводит в консоль значения поля data каждого узла
 * @param list - имя листа, данные из которого необходимо распечатать
 */
var print = function(list){
  var currentNode = list.head;

  if(!currentNode) {
      console.log('Empty list!');
  }

  for (var i = 0; i < list._length; i++) {
       console.log(currentNode.data);
       currentNode = currentNode.next;
  }
};

// создание тестового листа
var testList = new SinglyList();
print(testList);

var listDepth = 5;
// заполнение листа элементами от 1 до 5
for(var i = 0; i < listDepth; i++){
    testList.add(i+1);
}
print(testList);

var searchedValuePosition = testList.searchNode(5);
console.log('Позиция искомой ноды: ' + searchedValuePosition);

testList.remove(1);
console.log('List node was removed!');
print(testList); // возращает лист без элемента 4

var testNumber = numberToListConvert(123);
console.log('Number to list: ');
print(testNumber);
