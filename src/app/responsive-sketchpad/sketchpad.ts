export class Sketchpad {

    
    public canvas: HTMLCanvasElement;
    private context;
    private strokes;
    private undos;
    private opts;
    private sketching;
    constructor(el) {
        if (!el) {
            throw new Error('Must pass in a container element');
        }

        this.opts = this.opts || {};
        this.opts.aspectRatio = this.opts.aspectRatio || 1;
        this.opts.width = this.opts.width || el.clientWidth;
        this.opts.height = this.opts.height || this.opts.width * this.opts.aspectRatio;
        this.opts.data = this.opts.data || [];

        // Canvas Context
        this.opts.lineColor = this.opts.lineColor || 'black';
        this.opts.lineSize = this.opts.lineSize || 5;
        this.opts.lineCap = this.opts.lineCap || 'round';
        this.opts.lineJoin = this.opts.lineJoin || 'round';
        this.opts.lineMiterLimit = this.opts.lineMiterLimit || 10;

        this.strokes = this.opts.data;
        this.undos = [];

        // Boolean indicating if currently drawing
        var sketching = false;

        // Create a canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', this.opts.width);
        this.canvas.setAttribute('height', this.opts.height);
        this.canvas.style.width = this.opts.width + 'px';
        this.canvas.style.height = this.opts.height + 'px';
        el.appendChild(this.canvas);
        
        this.context = this.canvas.getContext('2d');




        // Event Listeners
        // this.canvas.addEventListener('mousedown', this.startLine);
        // this.canvas.addEventListener('mousemove', this.drawLine);
        // this.canvas.addEventListener('mouseup', this.endLine);
        // this.canvas.addEventListener('mouseleave', this.endLine);
        this.canvas.onmousedown = this.startLine;
        this.canvas.onmousemove = this.drawLine;
        this.canvas.onmouseup = this.endLine;
        this.canvas.onmouseleave = this.endLine;
        // Public variables
        // this.canvas = canvas;
        // this.strokes = strokes;
        // this.undos = undos;
        // this.opts = opts;

        // Public functions
        // this.redraw = redraw;
        console.log(this);
    }




    public getCursor(e) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    public redraw() {
        var strokes = this.strokes;

        var width = this.canvas.width;
        var height = this.canvas.height;

        this.context.clearRect(0, 0, width, height);  // Clear Canvas

        for (var i = 0; i < strokes.length; i++) {
            var stroke = strokes[i].stroke;

            this.context.beginPath();
            for (var j = 0; j < stroke.length - 1; j++) {
                this.context.moveTo(stroke[j].x * width, stroke[j].y * height);
                this.context.lineTo(stroke[j + 1].x * width, stroke[j + 1].y * height);
            }
            this.context.closePath();

            this.context.strokeStyle = strokes[i].lineColor;
            this.context.lineWidth = strokes[i].lineSize * width;
            this.context.lineJoin = strokes[i].lineJoin;
            this.context.lineCap = strokes[i].lineCap;
            this.context.miterLimit = strokes[i].lineMiterLimit;

            this.context.stroke()
        }
    }

    private testMethod(canvas)
    {
        console.log(this);
        console.log(canvas);
    }

    // On mouse down, create a new stroke with a start location
    public startLine(e) {
        
        console.log("StartLine");
        e.preventDefault();
        this.testMethod(this);
        
        var width = this.canvas.width;
        var height = this.canvas.height;

        this.strokes = this.strokes;
        this.sketching = true;
        this.undos = [];

        this.strokes.push({
            stroke: [],
            lineColor: this.opts.lineColor,
            lineSize: this.opts.lineSize / width,
            lineCap: this.opts.lineCap,
            lineJoin: this.opts.lineJoin,
            lineMiterLimit: this.opts.lineMiterLimit
        });

        var cursor = this.getCursor(e);
        this.strokes[this.strokes.length - 1].stroke.push({
            x: cursor.x / width,
            y: cursor.y / height
        });
    }

    public drawLine(e) {
        console.log("drawLine");
        if (!this.sketching) {
            return
        }

        var width = this.canvas.width;
        var height = this.canvas.height;

        var cursor = this.getCursor(e);
        this.strokes[this.strokes.length - 1].stroke.push({
            x: cursor.x / width,
            y: cursor.y / height
        });

        this.redraw();
    }

        public setLineColor = function (color) {
            this.opts.lineColor = color;
        }

    public endLine(e) {
        console.log("endLine");
        
        if (!this.sketching) {
            return
        }

        var width = this.canvas.width;
        var height = this.canvas.height;

        this.sketching = false;
        var cursor = this.getCursor(e);
        this.strokes[this.strokes.length - 1].stroke.push({
            x: cursor.x / width,
            y: cursor.y / height
        });

        this.redraw();
    }


}

// function Sketchpad(el, opts) {
//     var that = this;

//     if (!el) {
//         throw new Error('Must pass in a container element');
//     }

//     var opts = opts || {};
//     opts.aspectRatio = opts.aspectRatio || 1;
//     opts.width = opts.width || el.clientWidth;
//     opts.height = opts.height || opts.width * opts.aspectRatio;
//     opts.data = opts.data || [];

//     // Canvas Context
//     opts.lineColor = opts.lineColor || 'black';
//     opts.lineSize = opts.lineSize || 5;
//     opts.lineCap = opts.lineCap || 'round';
//     opts.lineJoin = opts.lineJoin || 'round';
//     opts.lineMiterLimit = opts.lineMiterLimit || 10;

//     strokes = opts.data;
//     undos = [];

//     // Boolean indicating if currently drawing
//     var sketching = false;

//     // Create a canvas element
//     var canvas = document.createElement('canvas');
//     canvas.setAttribute('width', opts.width);
//     canvas.setAttribute('height', opts.height);
//     canvas.style.width = opts.width + 'px';
//     canvas.style.height = opts.height + 'px';
//     el.appendChild(canvas);

//     context = canvas.getContext('2d');

//     // Return the mouse/touch location
//     function getCursor(e) {
//         var rect = that.canvas.getBoundingClientRect();
//         return {
//             x: e.clientX - rect.left,
//             y: e.clientY - rect.top
//         };
//     }

//     function redraw() {
//         var strokes = that.strokes;

//         var width = that.canvas.width;
//         var height = that.canvas.height;

//         context.clearRect(0, 0, width, height);  // Clear Canvas

//         for (var i = 0; i < strokes.length; i++) {
//             var stroke = strokes[i].stroke;

//             context.beginPath();
//             for (var j = 0; j < stroke.length - 1; j++) {
//                 context.moveTo(stroke[j].x * width, stroke[j].y * height);
//                 context.lineTo(stroke[j + 1].x * width, stroke[j + 1].y * height);
//             }
//             context.closePath();

//             context.strokeStyle = strokes[i].lineColor;
//             context.lineWidth = strokes[i].lineSize * width;
//             context.lineJoin = strokes[i].lineJoin;
//             context.lineCap = strokes[i].lineCap;
//             context.miterLimit = strokes[i].lineMiterLimit;

//             context.stroke()
//         }
//     }

//     // On mouse down, create a new stroke with a start location
//     function startLine(e) {
//         e.preventDefault();

//         var width = that.canvas.width;
//         var height = that.canvas.height;

//         strokes = that.strokes;
//         sketching = true;
//         that.undos = [];

//         strokes.push({
//             stroke: [],
//             lineColor: opts.lineColor,
//             lineSize: opts.lineSize / width,
//             lineCap: opts.lineCap,
//             lineJoin: opts.lineJoin,
//             lineMiterLimit: opts.lineMiterLimit
//         });

//         var cursor = getCursor(e);
//         strokes[strokes.length - 1].stroke.push({
//             x: cursor.x / width,
//             y: cursor.y / height
//         });
//     }

//     function drawLine(e) {
//         if (!sketching) {
//             return
//         }

//         var width = that.canvas.width;
//         var height = that.canvas.height;

//         var cursor = getCursor(e);
//         that.strokes[strokes.length - 1].stroke.push({
//             x: cursor.x / width,
//             y: cursor.y / height
//         });

//         that.redraw();
//     }

//     function endLine(e) {
//         if (!sketching) {
//             return
//         }

//         var width = that.canvas.width;
//         var height = that.canvas.height;

//         sketching = false;
//         var cursor = getCursor(e);
//         that.strokes[strokes.length - 1].stroke.push({
//             x: cursor.x / width,
//             y: cursor.y / height
//         });

//         that.redraw();
//     }

//     // Event Listeners
//     canvas.addEventListener('mousedown', startLine);
//     canvas.addEventListener('mousemove', drawLine);
//     canvas.addEventListener('mouseup', endLine);
//     canvas.addEventListener('mouseleave', endLine);

//     // Public variables
//     this.canvas = canvas;
//     this.strokes = strokes;
//     this.undos = undos;
//     this.opts = opts;

//     // Public functions
//     this.redraw = redraw;
// }


// Sketchpad.prototype.undo = function () {
//     if (this.strokes.length === 0) {
//         return;
//     }

//     this.undos.push(this.strokes.pop());
//     this.redraw();
// }


// Sketchpad.prototype.redo = function () {
//     if (this.undos.length === 0) {
//         return;
//     }

//     this.strokes.push(this.undos.pop());
//     this.redraw();
// }


// Sketchpad.prototype.clear = function () {
//     this.undos = [];
//     this.strokes = [];
//     this.redraw();
// }


// Sketchpad.prototype.toJSON = function () {
//     return {
//         aspectRatio: 0,
//         strokes: this.strokes
//     };
// }


// Sketchpad.prototype.loadData = function (data) {
//     this.strokes = data.strokes;
//     this.redraw();
// }


// Sketchpad.prototype.getImage = function () {
//     return '<img src="' + this.canvas.toDataURL('image/png') + '"/>';
// }


// Sketchpad.prototype.setLineSize = function (size) {
//     this.opts.lineSize = size;
// }


// Sketchpad.prototype.setLineColor = function (color) {
//     this.opts.lineColor = color;
// }


// Sketchpad.prototype.resize = function (width) {
//     var height = width * this.opts.aspectRatio;
//     this.opts.lineSize = this.opts.lineSize * (width / this.opts.width);
//     this.opts.width = width;
//     this.opts.height = height;

//     this.canvas.setAttribute('width', width);
//     this.canvas.setAttribute('height', height);
//     this.canvas.style.width = width + 'px';
//     this.canvas.style.height = height + 'px';

//     this.redraw();
// }


// module.exports = Sketchpad;
