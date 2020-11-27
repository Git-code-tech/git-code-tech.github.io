import * as config from './config.js';

var radions = new Array();
let oneby2 = (Math.sqrt(1) / 2);
let sq2by2 = (Math.sqrt(2) / 2);
let sq3by2 = (Math.sqrt(3) / 2);
radions.push({ "index":0,"angle": "0", "x": 1, "y": 0 } );
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

var unitcircle = {};

unitcircle = {
    getTriangle: function (radious) {
        let pointsarray = [0, 9, 15];
        return points(pointsarray, radious);
    },
    getSquare: function (radious) {
        let pointsarray = [2, 6, 10, 14];
        return pointsarray;
        //points(pointsarray, radious);
    },
    getReactangle: function (radious) {
        let pointsarray = [3, 5, 11, 13];
        return points(pointsarray, radious);
    },
    getPentagon: function (radious) {
        let pointsarray = [4, 1, 7, 9, 12, 15];
        return points(pointsarray, radious);
    },
    getHexagon: function (radious) {
        let pointsarray = [0, 2, 4, 6, 8, 10, 12, 14];
        return points(pointsarray);
    },
    getOctagon: function (radious) {
        let pointsarray = [0, 2, 4, 6, 8, 10, 12, 14];
        return points(pointsarray, radious);
    },
    points: function (pointsarray, radious) {
        let tempArray = new Array();
        let x, y = 0;
        for (var i = 0; i < pointsarray.length; i++) {
            x = ((radions[pointsarray[i]].x * radious) + config.offsetx);
            y = ((radions[pointsarray[i]].y * radious) + config.offsety);
            tempArray.push({ "x": x, "y": y });
        }
        return tempArray;
    }
}

export { unitcircle };