import * as unitcle from './unitclircle.js';

function draw(ctx) {
    let temparrays = unitcle.unitcircle.p.getSquare(200);
    for (let shp = 0; shp < temparrays.length; shp++) {
        ctx.line(temparrays[shp].x, temparrays[shp].y, config.Radious).attr({ "fill": "Red", "stroke": "green" });
    }
}
export { draw };