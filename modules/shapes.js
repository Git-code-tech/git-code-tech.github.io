import * as unitcle from './unitclircle.js';
import * as util from './util.js';

function draw(ctx) {
    let _radi = util.getRndInteger(75, 400);
    let tempshape = getRandomnShape(_radi);
    let pathString = "M";
    console.log("-->" + tempshape.Name);
    for (let shp = 0; shp <= (tempshape.coordinates.length); shp++) {
        if (shp < tempshape.coordinates.length - 1) {

            pathString += tempshape.coordinates[shp].x + "," + tempshape.coordinates[shp].y + "L";
        }
        else {
            if (tempshape.coordinates[shp]) {
                pathString += tempshape.coordinates[shp].x + "," + tempshape.coordinates[shp].y + "Z";
            }
        }

        if (tempshape.coordinates[shp]) {
            ctx.circle((tempshape.corners[shp].x), (tempshape.corners[shp].y), 20).attr({ "fill": "red", "stroke": "red", "strokeWidth": 2 });
        }
    }
    //ctx.path(pathString).attr({ "fill": "Red", "stroke": "green", "strokeWidth": 5 });
    //var lineLength = ctx.path.getTotalLength(pathString);
    var lineLength = (2 * 3.14 * _radi) + 100;
    var lineDraw = ctx.path(pathString);
    lineDraw.attr({
        fill: 'none',
        stroke: '#009FE3',
        'stroke-dasharray': lineLength + ' ' + lineLength,
        'stroke-dashoffset': lineLength,
        'stroke-width': 6,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-miterlimit': 10
    });
    lineDraw.animate({ strokeDashoffset: 0 }, 4000, mina.easein);
    ctx.text(tempshape.OffsetX, (tempshape.OffsetY - (tempshape.Name.length)), tempshape.Name).attr({ "fill": "Red", "stroke": "black", "strokeWidth": 2 });
    return tempshape;
}

function getShape(shapename) {
    switch (shapename.toLowerCase()) {
        case "triangle":
            return new Triangle(200)
            break;
        case "square":
            return new Square(200)
            break;
        case "rectangle":
            return new Rectangle(200)
            break;
        case "pentagon":
            return new Pentagon(200);
            break;
        case "hexagon":
            return new Hexagon(200);
            break;
        case "heptagon":
            return new Heptagon(200);
            break;
        case "octagon":
            return new Octagon(200);
            break;
        case "nanogon":
            return new Nanogon(200);
            break;
        case "decagon":
            return new Decagon(200);
            break;
        case "rhambus":
            return new Rhambus(200);
            break;
        case "star":
            return new Star(200);
            break;
        default:

    }
}
function getRandomnShape(radius) {
    let tempShapes = new Array();
    tempShapes.push(new Triangle(radius));
    tempShapes.push(new Square(radius));
    tempShapes.push(new Rectangle(radius));
    tempShapes.push(new Pentagon(radius));
    tempShapes.push(new Hexagon(radius));
    tempShapes.push(new Heptagon(radius));
    tempShapes.push(new Octagon(radius));
    tempShapes.push(new Nanogon(radius));
    tempShapes.push(new Decagon(radius));
    tempShapes.push(new Rhambus(radius));
    //tempShapes.push(new Star(radius));
    return tempShapes[util.getRndInteger(0, tempShapes.length - 1)];
}

class Shape {
    Radius = 1;
    OffsetX = 500;
    OffsetY = 400;
    shapeinfo = "";
    Name = "BaseShape";
    coordinates;
    constructor(radius, shapeinfo) {
        this.Radius = radius;
        this.OffsetX = 500;
        this.OffsetY = 400;
        this.shapeinfo = shapeinfo;
        this.coordinates = new Array();
        this.corners = new Array();
        /*x = r cos(θ)
        y = rsin(θ)*/
    }
    getpoints(pointsarray) {
        //console.log('--> pointarray ' + JSON.stringify(pointsarray));
        //console.log('--> unit ' + JSON.stringify(unitcle.radions));
        let x, y, x1, y1 = 0;
        for (var i = 0; i < pointsarray.length; i++) {
            x = ((unitcle.radions[pointsarray[i]].x * this.Radius) + this.OffsetX);
            y = ((unitcle.radions[pointsarray[i]].y * this.Radius) + this.OffsetY);
            x1 = (unitcle.radions[pointsarray[i]].x * (this.Radius + 25) + (this.OffsetX));
            y1 = (unitcle.radions[pointsarray[i]].y * (this.Radius + 25) + (this.OffsetY));
            this.coordinates.push({ "x": x, "y": y });
            this.corners.push({ "x": x1, "y": y1 });
        }
    }
   
}
/*radions.push({ "index":0,"angle": "0", "x": 1, "y": 0 } );
radions.push({ "index":1,"angle": "30", "x": sq3by2, "y": oneby2 });
radions.push({ "index":2,"angle": "45", "x": sq3by2, "y": oneby2 });
radions.push({ "index":3,"angle": "60", "x": oneby2, "y": sq3by2 });
radions.push({ "index":4,"angle": "90", "x": 0, "y": 1 });
radions.push({ "index":5,"angle": "120", "x": -(oneby2), "y": sq3by2 });
radions.push({ "index":6,"angle": "135", "x": -(sq2by2), "y": sq2by2 });
radions.push({ "index":7,"angle": "150", "x": -(sq3by2), "y": oneby2 });
radions.push({ "index":8,"angle": "180", "x": -1, "y": 0 });
radions.push({ "index":9,"angle": "210", "x": -(sq3by2), "y": -(oneby2) });
radions.push({ "index":10,"angle": "225", "x": -(sq2by2), "y": -(sq2by2) });
radions.push({ "index":11,"angle": "240", "x": -(oneby2), "y": -(sq3by2) });
radions.push({ "index":12,"angle": "270", "x": 0, "y": -1 });
radions.push({ "index":13,"angle": "300", "x": oneby2, "y": -(sq3by2) });
radions.push({ "index":14,"angle": "315", "x": sq2by2, "y": -(sq2by2) });
radions.push({ "index":15,"angle": "330", "x": sq3by2, "y": -(oneby2) });
radions.push({ "index":16,"angle": "360", "x": 1, "y": 0 });
*/
class Triangle extends Shape {
    constructor(radius) {
        super(radius, "A triangle is a three sided polygon."
        );
        super.Name = "Triangle";
        super.getpoints([4, 9, 15]);
    }
}
class Square extends Shape {
    constructor(radius) {
        super(radius, "A square is a four sided polygon with all 4 sides of equal length 90 degree corners.");
        super.Name = "Square";
        super.getpoints([2, 6, 10, 14]);
    }
}
class Rectangle extends Shape {
    constructor(radius) {
        super(radius, "A rectangle is a four sided polygon.");
        super.Name = "Reactangle";
        super.getpoints([3, 5, 11, 13]);
    }
}
class Pentagon extends Shape {
    constructor(radius) {
        super(radius, "Pentagon is a five sided polygon.");
        super.Name = "Pentagon";
        super.getpoints([1, 4, 7, 10, 14]);
    }

}
class Hexagon extends Shape {
    constructor(radius) {
        super(radius, "Heptagon is a six sided polygon.");
        super.Name = "Hexagon";
        super.getpoints([1, 4, 7, 9, 12, 15]);
    }
}

class Heptagon extends Shape {
    constructor(radius) {
        super(radius, "Heptagon is a seven sided polygon.");
        super.Name = "Heptagon";
        super.getpoints([0, 3, 6, 9, 12, 15, 14]);
    }
}
class Octagon extends Shape {
    constructor(radius) {
        super(radius, "Octagon is a eight sided polygon.");
        super.Name = "Octagon";
        super.getpoints([0, 3, 6, 9, 12, 15, 14]);
    }
}
class Nanogon extends Shape {
    constructor(radius) {
        super(radius, "Nanogon is a nine sided polygon.");
        super.Name = "Nanogon";
        super.getpoints([0, 2, 4, 6, 8, 10, 12, 14,16]);
    }
}

class Decagon extends Shape {
    constructor(radius) {
        super(radius, "Decagon is a ten sided polygon");
        super.Name = "Decagon";
        super.getpoints([0, 2, 4, 6, 8, 10, 12, 14]);
    }
}
class Rhambus extends Shape {
    constructor(radius) {
        super(radius, "a rhombus is a quadrilateral whose four sides.");
        super.Name = "Rhombus";
        super.getpoints([0, 4, 8, 12]);
    }

}

class Star extends Shape {
    constructor(radius) {
        super(radius, "A star.");
        super.Name = "Star";
        super.getpoints([4, 9, 12, 15, 2, 6]);
    }

}

/*class Circle extends Shape {
    constructor(radius) {
        super(radius);
    }
}*/
export { draw, getShape };


