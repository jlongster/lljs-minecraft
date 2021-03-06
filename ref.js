(function() {

var ctx;
var pixels;

var w;
var h;

var map = new Array(64 * 64 * 64);
var texmap = new Array(16 * 16 * 3 * 16);

function init(_w, _h) {
    w = _w;
    h = _h;

    for ( var i = 1; i < 16; i++) {
        var br = 255 - ((Math.random() * 96) | 0);
        for ( var y = 0; y < 16 * 3; y++) {
            for ( var x = 0; x < 16; x++) {
                var index = x + y * 16 + i * 256 * 3;

                var color = 0x966C4A;
                if (i == 4)
                    color = 0x7F7F7F;
                if (i != 4 || ((Math.random() * 3) | 0) == 0) {
                    br = 255 - ((Math.random() * 96) | 0);
                }
                if ((i == 1 && y < (((x * x * 3 + x * 81) >> 2) & 3) + 18)) {
                    color = 0x6AAA40;
                } else if ((i == 1 && y < (((x * x * 3 + x * 81) >> 2) & 3) + 19)) {
                    br = br * 2 / 3;
                }
                if (i == 7) {
                    color = 0x675231;
                    if (x > 0 && x < 15
                            && ((y > 0 && y < 15) || (y > 32 && y < 47))) {
                        color = 0xBC9862;
                        var xd = (x - 7);
                        var yd = ((y & 15) - 7);
                        if (xd < 0)
                            xd = 1 - xd;
                        if (yd < 0)
                            yd = 1 - yd;
                        if (yd > xd)
                            xd = yd;

                        br = 196 - ((Math.random() * 32) | 0) + xd % 3 * 32;
                    } else if (((Math.random() * 2) | 0) == 0) {
                        br = br * (150 - (x & 1) * 100) / 100;
                    }
                }

                if (i == 5) {
                    color = 0xB53A15;
                    if ((x + (y >> 2) * 4) % 8 == 0 || y % 4 == 0) {
                        color = 0xBCAFA5;
                    }
                }
                if (i == 9) {
                    color = 0x4040ff;
                }
                var brr = br;
                //if(index == 1056) { throw new Error((i*256*3) + ' ' + brr); }

                if (y >= 32)
                    brr /= 2;

                if (i == 8) {
                    color = 0x50D937;
                    if (((Math.random() * 2) | 0) == 0) {
                        color = 0;
                        brr = 255;
                    }
                }

                var col = (((color >> 16) & 0xff) * brr / 255) << 16
                        | (((color >> 8) & 0xff) * brr / 255) << 8
                        | (((color) & 0xff) * brr / 255);
                texmap[x + y * 16 + i * 256 * 3] = col;
            }
        }
    }

    // ctx = document.getElementById('game').getContext('2d');

    for ( var x = 0; x < 64; x++) {
        for ( var y = 0; y < 64; y++) {
            for ( var z = 0; z < 64; z++) {
                var i = z << 12 | y << 6 | x;
                var yd = (y - 32.5) * 0.4;
                var zd = (z - 32.5) * 0.4;
                map[i] = (Math.random() * 16) | 0;
                if (Math.random() > Math.sqrt(Math.sqrt(yd * yd + zd * zd)) - 0.8)
                    map[i] = 0;
            }
        }
    }

    pixels = new Uint8Array(w * h * 4);
};

function clock() {
    renderMinecraft();
    ctx.putImageData(pixels, 0, 0);
};

var f = 0;
var rot = {};
function render() {
    rot.x = (Math.sin(Date.now() % 10000 / 10000 * Math.PI * 2) * 0.4
             + Math.PI / 2);
    rot.y = Math.cos(Date.now() % 10000 / 10000 * Math.PI * 2) * 0.4;
    var yCos = Math.cos(rot.y);
    var ySin = Math.sin(rot.y);
    var xCos = Math.cos(rot.x);
    var xSin = Math.sin(rot.x);

    var o = {
        x: 32.5 + Date.now() % 10000 / 10000 * 64,
        y: 32.5,
        z: 32.5
    };

    f++;
    for ( var x = 0; x < w; x++) {
        var ___xd = (x - w / 2) / h;
        for ( var y = 0; y < h; y++) {
            var __yd = (y - h / 2) / h;
            var __zd = 1;

            var ___zd = __zd * yCos + __yd * ySin;
            var _yd = __yd * yCos - __zd * ySin;

            var _xd = ___xd * xCos + ___zd * xSin;
            var _zd = ___zd * xCos - ___xd * xSin;

            var col = 0;
            var br = 255;
            var ddist = 0;

            var closest = 32;

            for ( var d = 0; d < 3; d++) {
                var dimLength = _xd;
                if (d == 1)
                    dimLength = _yd;
                if (d == 2)
                    dimLength = _zd;

                var ll = 1 / (dimLength < 0 ? -dimLength : dimLength);
                var _d = {
                    x: (_xd) * ll,
                    y: (_yd) * ll,
                    z: (_zd) * ll
                };

                var initial = o.x - (o.x | 0);
                if (d == 1)
                    initial = o.y - (o.y | 0);
                if (d == 2)
                    initial = o.z - (o.z | 0);
                if (dimLength > 0)
                    initial = 1 - initial;

                var dist = ll * initial;

                var p = { 
                    x: o.x + _d.x * initial,
                    y: o.y + _d.y * initial,
                    z: o.z + _d.z * initial
                };

                if (dimLength < 0) {
                    if (d == 0)
                        p.x--;
                    if (d == 1)
                        p.y--;
                    if (d == 2)
                        p.z--;
                }

                while (dist < closest) {
                    var tex = map[(p.z & 63) << 12 | (p.y & 63) << 6 | (p.x & 63)];

                    if (tex > 0) {
                        var u = ((p.x + p.z) * 16) & 15;
                        var v = ((p.y * 16) & 15) + 16;
                        if (d == 1) {
                            u = (p.x * 16) & 15;
                            v = ((p.z * 16) & 15);
                            if (_d.y < 0)
                                v += 32;
                        }

                        var cc = texmap[u + v * 16 + tex * 256 * 3];
                        if (cc > 0) {
                            col = cc;
                            ddist = 255 - ((dist / 32 * 255) | 0);
                            br = 255 * (255 - ((d + 2) % 3) * 50) / 255;
                            closest = dist;
                        }
                    }

                    p.x += _d.x;
                    p.y += _d.y;
                    p.z += _d.z;
                    dist += ll;
                }
                //throw new Error(x + ' ' + y + ' ' + d + ': ' + cc);

            }

            //throw new Error(x + ' ' + y + ' ' + d + ': ' + col);

            var r = ((col >> 16) & 0xff) * br * ddist / (255 * 255);
            var g = ((col >> 8) & 0xff) * br * ddist / (255 * 255);
            var b = ((col) & 0xff) * br * ddist / (255 * 255);// + (255 -


            pixels[(x + y * w) * 4 + 0] = r | 0;
            pixels[(x + y * w) * 4 + 1] = g | 0;
            pixels[(x + y * w) * 4 + 2] = b | 0;
            pixels[(x + y * w) * 4 + 3] = 255;
        }
    }

    return pixels;
}

window.ref = {
    init: init,
    render: render,
    map: map,
    texmap: texmap,
    getWidth: function() { return w; },
    getHeight: function() { return h; }
}

})();
