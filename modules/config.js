let dpi_x = document.getElementById('testdiv').offsetWidth;
let dpi_y = document.getElementById('testdiv').offsetHeight;
let dpi_x_x = ((11 * dpi_x) - 100);
let dpi_y_y = ((11 * dpi_y) - 100);
let x_x = (document.documentElement.clientWidth - 200);
let y_y = (document.documentElement.clientHeight - 200);
//console.log('x_X')
var X = (x_x > dpi_x_x ) ? dpi_x_x : x_x;
var Y = (y_y > dpi_y_y) ? dpi_y_y : y_y; 
let NOOFCIRCLES = 1;
var matrix = new Array(X * Y);
var Squrs = new Array();
var circles = new Array();
const Mainradious = 20;
const Radious = 30;
const offsetx = 200;
const offsety = 200;
var maxnoumberofCircles = Math.ceil(((X * Y) / (Math.PI * (35 * 35))) / 4);
const width = (Radious * 2);
console.log('-->dpi x ' + dpi_x + ' X ' + X + ' -->dpi y ' + dpi_y + ' Y ' + Y + ' Max --> ' + maxnoumberofCircles);
let readytotalkvar = true;
function readytotalk(val) {
    readytotalkvar = val;
}
export { X, Y, NOOFCIRCLES, matrix, Squrs, circles, Radious, width, maxnoumberofCircles, readytotalkvar, readytotalk, Mainradious, offsetx, offsety }