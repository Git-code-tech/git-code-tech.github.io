import * as Util from './util.js';
import * as config from './config.js';
function draw(ctx, noofcirlces) {
    for (let qw = 0; qw < noofcirlces; qw++) {
        config.Squrs.push(createaRandomnumber());
    }
    for (let sqr = 0; sqr < config.Squrs.length; sqr++) {
        ctx.circle(config.Squrs[sqr].x, config.Squrs[sqr].y, config.Radious).attr({ "fill": "Red", "stroke": "green" });
        //ctx.text(config.Squrs[sqr].x, config.Squrs[sqr].y, (sqr+1));
    }
}
function createaRandomnumber() {
    //Util.log("createaRandomnumber ");
    let x = 0, y = 0;
    x = Util.getRndInteger(config.width, (config.X - config.width));
    y = Util.getRndInteger(config.width, (config.Y - config.width));

    while (isnumberinRange(x, y)) {
        x = Util.getRndInteger(config.width, (config.X - config.width));
        y = Util.getRndInteger(config.width, (config.Y - config.width));
    }
    setRange(x, y);
    return { "x": x, "y": y }
}
function isnumberinRange(x, y) {
    let checktemprange = getRange(x, y);
    for (let tempchkrange = 0; tempchkrange < checktemprange.length; tempchkrange++) {
        if (config.matrix[checktemprange[tempchkrange]] == true) {
            return true;
        }
    }
    return false;
}
function getRange(x, y) {
    //Util.log("getRange");
    let range = new Array();
    let startingpoint = (((y - (config.Radious)) * config.X) + ((x - (config.Radious))));
    let endingpoint = (((y + (config.Radious)) * config.X) + ((x + (config.Radious))));
    let setRngei = startingpoint;
    while (startingpoint <= endingpoint) {
        if (setRngei >= (startingpoint + config.width + 1)) {
            startingpoint = startingpoint + (config.X);
            setRngei = startingpoint;
        }
        else {
            range.push(setRngei);
            setRngei++;
        }
    }
    return range;
}
function setRange(x, y) {
    let temprange = getRange(x, y);
    for (let tempmat = 0; tempmat < temprange.length; tempmat++) {
        config.matrix[temprange[tempmat]] = true;
    }
}
function clear() {
    Util.log('Clear');
    config.matrix.length = 0;
    config.Squrs.length = 0;
    config.circles.length = 0;
}

export { draw, clear };