"use strict";

class Shape {
    constructor(name, sides, sidelength) {
        this.name = name;
        this.sides = sides;
        this.sidelength = sidelength;
    }

    calcPerimeter() {
        return this.sides * this.sidelength;
    }
    calcArea() {
    }
}

class Triangle extends Shape {
    constructor(sidelength) {
        super("Triangle", 3, sidelength);
    }
    calcArea() {
        return (Math.sqrt(3) / 4) * this.sidelength ** 2;
    }
}

class Square extends Shape {
    constructor(sidelength) {
        super("Square", 4, sidelength); 
    }
    calcArea() {
        return this.sidelength ** 2;
    }
}

let triangle = new Triangle(5);
let square = new Square(10);

console.log("the perimeter of the triangle is",triangle.calcPerimeter(),"the area of the triangle is",triangle.calcArea()); 
console.log("the perimeter of the squre is",square.calcPerimeter(),"the area of the squre is",square.calcArea()); 