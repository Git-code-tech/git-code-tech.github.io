import * as cvs from  './modules/canvas.js';
import * as dots from './modules/dots.js';
import * as config from './modules/config.js';
import * as util from './modules/util.js';
import * as shapes from './modules/shapes.js';
import * as spch from './modules/speech.js';
import * as colors from './modules/colors.js';
let myCanvas;
let baseobj = {};
let varsetinterval;
baseobj = {
    init: function (tpe) {
        console.log("Start");
        if (tpe == "Shapes") {
            baseobj.createShapes();         
        }
        else if (tpe == 'Color') {
            baseobj.createColors();        
        }
        else if (tpe=='dots'){
            varsetinterval = window.setInterval(function () { baseobj.createCircles(); }, 3000);
            //varsetinterval = window.setInterval(function () { baseobj.createShapes(); }, 5000);
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
        if (!myCanvas) {
            myCanvas = cvs.crte('target', config.X, config.Y);
        }
        else {
            myCanvas.clear();
        }
         varsetinterval = window.setInterval(function () {
              let shape = shapes.draw(myCanvas);
              spch.speech(shape.shapeinfo); }, 5000);
      
        //config.readytotalk(false);
    }
    , createColors: function () {
        if (!myCanvas) {
            myCanvas = cvs.crte('target', config.X, config.Y);
        }
        else {
            myCanvas.clear();
        }
        varsetinterval = window.setInterval(function () {
            let colorcode = colors.draw(myCanvas);
            spch.speech(colorcode.colorname); }, 3000);
     
        //config.readytotalk(false);
    }
}

export { baseobj };

