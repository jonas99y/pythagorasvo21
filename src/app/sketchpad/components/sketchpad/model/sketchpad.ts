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

        this.canvas.onmousedown = this.startLine;
        this.canvas.onmousemove = this.drawLine;
        this.canvas.onmouseup = this.endLine;
        this.canvas.onmouseleave = this.endLine;

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



    public startLine(e) {

        e.preventDefault();

        let width = this.canvas.width;
        let height = this.canvas.height;

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

        let cursor = this.getCursor(e);
        this.strokes[this.strokes.length - 1].stroke.push({
            x: cursor.x / width,
            y: cursor.y / height
        });
    }

    public drawLine(e) {

        if (!this.sketching) {
            return;
        }

        let width = this.canvas.width;
        let height = this.canvas.height;

        let cursor = this.getCursor(e);
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


        if (!this.sketching) {
            return;
        }

        let width = this.canvas.width;
        let height = this.canvas.height;

        this.sketching = false;
        let cursor = this.getCursor(e);
        this.strokes[this.strokes.length - 1].stroke.push({
            x: cursor.x / width,
            y: cursor.y / height
        });

        this.redraw();
    }


}