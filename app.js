
var ctx;
var pixels;
var stats;

var renderer;
var w = 800;
var h = 600;
var render = true;

var random = Math.random;
var now = Date.now;
var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var PI = Math.PI;

function init() {
    if(window.ref) {
        ref.init(w, h);
    }
    else {
        if(minecraft.init(w, h) !== 0) {
            throw new Error("error initializing (probably too large screen)");
        }
    }

    stats = new Stats();
    stats.setMode(1); // 0: fps, 1: ms
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    var canvas = document.getElementById('game');
    canvas.width = w;
    canvas.height = h;
    renderer = new GLRenderer(canvas);

    if(renderer.unsupported) {
        alert('WebGL is required and not supported on your system.');
    }

    var renderToggle = document.querySelector('input[name=render]');
    render = renderToggle.value;
    renderToggle.addEventListener('change', function() {
        if(this.checked) {
            render = true;
        }
        else {
            render = false;
        }
    });

    requestAnimationFrame(clock);
};

function clock() {
    stats.begin();
    var pixels;

    if(window.ref) {
        pixels = ref.render();
        w = ref.getWidth();
        h = ref.getHeight();
    }
    else {
        var ptr = minecraft.render();
        var length = minecraft.getPixelsLength();
        w = minecraft.getWidth();
        h = minecraft.getHeight();
        pixels = window.U1.subarray(ptr, ptr + length);
    }

    if(render) {
        if(renderer.isReady) {
            renderer.loadTexture(pixels, w, h);
            renderer.render();
        }
    }

    stats.end();
    requestAnimationFrame(clock);
};

var random = Math.random;
var now = Date.now;

document.addEventListener('DOMContentLoaded', init);
