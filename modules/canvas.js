
function crte(elem,x,y) {
    const target = document.getElementById(elem);
    const s = new Snap(x, y);
    s.addClass("Canvasbackgroundcolor");
    s.appendTo(target);
    return s;
}
function create(id, parent, width, height) {
    let divWrapper = document.createElement('div');
    let canvasElem = document.createElement('canvas');
    parent.appendChild(divWrapper);
    divWrapper.appendChild(canvasElem);

    divWrapper.id = id;
    canvasElem.width = width;
    canvasElem.height = height;

    let ctx = canvasElem.getContext('2d');

    return {
        ctx: ctx,
        id: id
    };
}

function createReportList(wrapperId) {
    let list = document.createElement('ul');
    list.id = wrapperId + '-reporter';
    let canvasWrapper = document.getElementById(wrapperId);
    canvasWrapper.appendChild(list);

    return list.id;
}
function clear(elem) {
    elem.clear();
}
export { crte,create, createReportList, clear };