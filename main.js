import * as cvs from  './modules/canvas.js';
import * as dots from './modules/dots.js';
import * as config from './modules/config.js';
import * as util from './modules/util.js';
import * as shapes from './modules/shapes.js';
import * as spch from './modules/speech.js';

let myCanvas;
let baseobj = {};
let varsetinterval;
baseobj = {
    init: function (tpe) {
        console.log("Start");
        if (tpe != "Shapes") {
            varsetinterval = window.setInterval(function () { baseobj.createCircles(); }, 3000);
        }
        else {
            varsetinterval = window.setInterval(function () { baseobj.createShapes(); }, 5000);
        }
    },
    stop: function () {
        console.log('Stopping..');
        window.clearInterval(varsetinterval);
    },
    createCircles: function () {
        if (!myCanvas) {
            myCanvas = cvs.crte('target', config.X, config.Y);
            dots.clear();
        }
        else {
            myCanvas.clear();
            dots.clear();
        }
        if (config.readytotalkvar) {
            let nocir = util.getRndInteger(0, config.maxnoumberofCircles);
            document.getElementById("btn_dc").value = "___ (" + nocir + ") ___";
            let draw = dots.draw(myCanvas, nocir);
            console.log('--> ' + nocir);
            spch.speech(nocir);
            config.readytotalk(false);
        }
    },
    createShapes: function () {
        let info = "A square is a polygon with 4 sides of equal length and 4 right angle corners (90 degree corners). Because it has 4 sides of equal length, a square is a regular quadrilateral. A square is also a rectangle with equal sides and a rhombus with right angles. ... A square has 4 lines of reflectional symmetry."
        if (config.readytotalkvar) {
            let draw = shapes.draw(myCanvas);
            console.log('--> ' + nocir);
            spch.speech(info);
            config.readytotalk(false);
        }
    }
}

export { baseobj };

