'use strict'
// 1) Переписать функцию-конструктор MyArray на классы. 
// *Переписать методы unshift, push для неограниченного числа аргументов.

console.group('Classes - task 1');
    class MyArray {
        constructor() {
            this.length = 0;
        };

        pop() {
            if (this.length === 0) {
                return;
            }
            const lastItem = this[this.length - 1];
            delete this[--this.length];
            return lastItem;
        };
        push() {
            for(let i = 0; i < arguments.length; i++) {
                this[this.length] = arguments[i];
                ++this.length;
            };
            return this.length;
        };
        shift() {
            if (this.length === 0) {
                return;
            }
            const fistItem = this[0];
            for (let i = 0; i < this.length - 1; i++) {
                this[i] = this[i + 1];
            }
            delete this[--this.length];
            return fistItem;
        };
        unshift() {
            for(let i = arguments.length - 1; i >= 0; i--) {
                for(let j = this.length; j > 0; j--) {
                    this[j] = this[j - 1];
                };

                this[0] = arguments[i];
                ++this.length;
            };
            
            return this.length;
        };
        filter(callback) {
            const returningArray = new MyArray();
            for (let i = 0; i < this.length; i++) {
                if (callback(this[i], i, this)) {
                    returningArray.push(this[i]);
                }
            }
            return returningArray;
        };
        flat(n = 1) {
            const superObj = new MyArray();
            const m = n;
    
            if (n === 0) {
                return this;
            };
    
            flatten.call(this, n);
            
            function flatten(n) {
                for(let i = 0; i < this.length; i++) {
                    if ( Array.isArray(this[i]) ) {
                        this[i].forEach(item => {
                            if ( !Array.isArray(item) ) {
                                superObj.push(item);
                            } else if (n === 1) { 
                                superObj.push(item);
                            } else {
                                flatten.call(this[i], n - 1);
                            }
                        });
                    } else if (this[i] === ' ') {
                        continue;
                    } else {
                        if (n === m) {
                            superObj.push(this[i]);
                        };
                    };      
                };
            };
            return superObj;
        };
    };
    
    //----------------------------------//
    const myArr1 = new MyArray();

    for(let i = 0; i <= 6; i++) {
        if (i === 2) {
            myArr1.push(' ');
        };
        if(i === 3) {
            myArr1.push(['lll', ['dddd', ['Ivan', 'Hert'], 'ffd'], 'GGGG']);
        };
        if(i === 4) {
            myArr1.push(['af', 'ft']);
        };
        if (i === 5) {
            myArr1.push(['w', 's', 'uyu']);
        };

        myArr1.push(i);
    };

    console.log('before unshift - ', myArr1);
    myArr1.unshift('unsh');
    console.log('after unshift - ', myArr1);

    const newArr1 = myArr1.flat();
    console.log('newArr1 >> flat()');
    console.dir(newArr1);

    const newArr2 = myArr1.flat(1);
    console.log('newArr2 >> flat(1)');
    console.dir(newArr2);

    const newArr3 = myArr1.flat(2);
    console.log('newArr3 >> flat(2)');
    console.dir(newArr3);


    console.log('before unshift (with arguments > 1):>> ', myArr1);

    myArr1.unshift('TTT', 'UUU', 1000000);
    console.log('after unshift (with arguments > 1) :>> ', myArr1);

console.groupEnd();


// 2) Реализовать класс RangeValidator, со следующими свойствами:
// ■ from (number);
// ■ to (number);
// Реализовать getter'ы и setter'ы для обоих свойств
// Реализовать getter range, который будет возвращать массив с двумя числами диапазона
// Реализовать метод validate, который будет принимать число и проверить входит ли число 
// в указанный диапазон.
console.groupCollapsed('Classes - task 2');

    class RangeValidator {
        constructor(from, to) {
            this.from = from;
            this.to = to;
        };
        get from() {
            return this._from;
        };
        set from(num) {
            if ( typeof num !== 'number' || !Number.isSafeInteger(num) ) {
                throw new TypeError('from - must be an integer number');
            } else if (num > this.to) {
                throw new RangeError('from - must be less than parameter to');
            } else {
                this._from = num;
            }
        };
        get to() {
            return this._to;
        };
        set to(num) {
            if ( typeof num !== 'number' || !Number.isSafeInteger(num) ) {
                throw new TypeError('to - must be an integer number');
            } else if (num < this.from) {
                throw new RangeError('to - must be bigger than parameter from');
            } else {
                this._to = num;
            }
        };
        getRange() {
            return [this.from, this.to];
        };
        validate(num) {
            return (num >= this.from && num <= this.to) ? 'value is entered to this range' 
            : 'value isn`t entered to this range'
        };
    };

    const range1 = new RangeValidator(3, 20);
    range1.from = 10;
    console.log('range1.from :>> ', range1.from);
    range1.to = 100;
    console.log('range1.to :>> ', range1.to);

    console.log('range1.getRange() :>> ', range1.getRange());
    console.log('range1.validate(12) :>> ', range1.validate(212));

console.groupEnd();