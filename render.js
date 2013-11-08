(function() {

if(!Math.imul) {
    Math.imul = function(x, y) { return x * y; };
}

var MB = 1024 * 1024;
var SIZE = 256 * MB;
var STACK_SIZE = 2 * MB;
var HEAP_SIZE = SIZE - STACK_SIZE;
var buffer = new ArrayBuffer(SIZE);

if(typeof window !== 'undefined') {
    window.U1 = new Uint8Array(buffer);
    window.I1 = new Int8Array(buffer);
    window.U2 = new Uint16Array(buffer);
    window.I2 = new Int16Array(buffer);
    window.U4 = new Uint32Array(buffer);
    window.I4 = new Int32Array(buffer);
    window.F4 = new Float32Array(buffer);
    window.F8 = new Float64Array(buffer);

    window.asmBuffer = buffer;
}

var asm = (function (global, env, buffer) {
    "use asm";

    var stackSize = env.STACK_SIZE|0;
    var heapSize = env.HEAP_SIZE|0;
    var totalSize = env.TOTAL_SIZE|0;

    var random = env.random;
var now = env.now;

    var U1 = new global.Uint8Array(buffer);
    var I1 = new global.Int8Array(buffer);
    var U2 = new global.Uint16Array(buffer);
    var I2 = new global.Int16Array(buffer);
    var U4 = new global.Uint32Array(buffer);
    var I4 = new global.Int32Array(buffer);
    var F4 = new global.Float32Array(buffer);
    var F8 = new global.Float64Array(buffer);

    var acos = global.Math.acos;
    var asin = global.Math.asin;
    var atan = global.Math.atan;
    var cos = global.Math.cos;
    var sin = global.Math.sin;
    var tan = global.Math.tan;
    var ceil = global.Math.ceil;
    var floor = global.Math.floor;
    var exp = global.Math.exp;
    var log = global.Math.log;
    var sqrt = global.Math.sqrt;
    var abs = global.Math.abs;
    var atan2 = global.Math.atan2;
    var pow = global.Math.pow;
    var imul = global.Math.imul;

var globalSP = 21097792;
var PI = 3.14159265359;
var w = 0;
var h = 0;
var f = 0;
var pixelsLength = 0;
  function Vec2d$Vec2d(thisPtr, x, y) {
    thisPtr = thisPtr | 0;
    x = +x;
    y = +y;
    var $SP = 0;
    F8[(thisPtr) >> 3] = x;
    F8[((thisPtr) + 8 | 0) >> 3] = y;
  }
  function Vec3d$Vec3d(thisPtr, x, y, z) {
    thisPtr = thisPtr | 0;
    x = +x;
    y = +y;
    z = +z;
    var $SP = 0;
    F8[(thisPtr) >> 3] = x;
    F8[((thisPtr) + 8 | 0) >> 3] = y;
    F8[((thisPtr) + 16 | 0) >> 3] = z;
  }
function makeTexmap() {
  var _ = 0, _$1 = 0, _$2 = 0, _$3 = 0, _$4 = 0, _$5 = 0, _$6 = 0, _$7 = 0, _$8 = 0, _$9 = 0, _$10 = 0, _$11 = 0, i = 0, br = 0.0, y = 0, x = 0, color = 0, xd = 0, yd = 0, brr = 0.0, col = 0, $SP = 0;
  for (i = 1; (i | 0) < 16; _ = i, i = (i | 0) + 1 | 0, _) {
    br = +(255 - (~~(+(+random()) * +96) | 0) | 0);
    for (y = 0; (y | 0) < (imul(16, 3) | 0); _$1 = y, y = (y | 0) + 1 | 0, _$1) {
      for (x = 0; (x | 0) < 16; _$2 = x, x = (x | 0) + 1 | 0, _$2) {
        color = 9858122;
        if ((i | 0) == 4)
          color = 8355711;
        {
          _$3 = 0;
          {
            if ((i | 0) != 4) {
              _$3 = 1;
            }
            if ((~~(+(+random()) * +3) | 0) == 0) {
              _$3 = 1;
            }
          }
          {
            if (_$3) {
              br = +(255 - (~~(+(+random()) * +96) | 0) | 0);
            }
          }
        }
        {
          _$5 = 0;
          if ((i | 0) == 1) {
            if ((y | 0) < ((((imul(imul(x | 0, x | 0) | 0, 3) | 0) + (imul(x | 0, 81) | 0) | 0) >> 2 & 3 | 0) + 18 | 0)) {
              _$5 = 1;
            }
          }
          {
            if (_$5) {
              color = 6990400;
            } else {
              _$4 = 0;
              if ((i | 0) == 1) {
                if ((y | 0) < ((((imul(imul(x | 0, x | 0) | 0, 3) | 0) + (imul(x | 0, 81) | 0) | 0) >> 2 & 3 | 0) + 19 | 0)) {
                  _$4 = 1;
                }
              }
              {
                if (_$4) {
                  br = +(+br * +2 / +3);
                }
              }
            }
          }
        }
        if ((i | 0) == 7) {
          color = 6771249;
          {
            _$6 = 0;
            {
              _$10 = 0;
              if ((x | 0) > 0) {
                if ((x | 0) < 15) {
                  _$10 = 1;
                }
              }
              {
                if (_$10) {
                  {
                    _$7 = 0;
                    {
                      {
                        _$8 = 0;
                        if ((y | 0) > 0) {
                          if ((y | 0) < 15) {
                            _$8 = 1;
                          }
                        }
                        {
                          if (_$8) {
                            _$7 = 1;
                          }
                        }
                      }
                      {
                        _$9 = 0;
                        if ((y | 0) > 32) {
                          if ((y | 0) < 47) {
                            _$9 = 1;
                          }
                        }
                        {
                          if (_$9) {
                            _$7 = 1;
                          }
                        }
                      }
                    }
                    {
                      if (_$7) {
                        _$6 = 1;
                      }
                    }
                  }
                }
              }
            }
            {
              if (_$6) {
                color = 12359778;
                xd = (x | 0) - 7 | 0;
                yd = (y & 15 | 0) - 7 | 0;
                if ((xd | 0) < 0)
                  xd = 1 - (xd | 0) | 0;
                if ((yd | 0) < 0)
                  yd = 1 - (yd | 0) | 0;
                if ((yd | 0) > (xd | 0))
                  xd = yd;
                br = +((196 - (~~(+(+random()) * +32) | 0) | 0) + (imul((xd | 0) % 3 | 0, 32) | 0) | 0);
              } else if ((~~(+(+random()) * +2) | 0) == 0) {
                br = +(+br * +(150 - (imul(x & 1, 100) | 0) | 0) / +100);
              }
            }
          }
        }
        if ((i | 0) == 5) {
          color = 11876885;
          {
            _$11 = 0;
            {
              if ((((x | 0) + (imul(y >> 2, 4) | 0) | 0) % 8 | 0) == 0) {
                _$11 = 1;
              }
              if (((y | 0) % 4 | 0) == 0) {
                _$11 = 1;
              }
            }
            {
              if (_$11) {
                color = 12365733;
              }
            }
          }
        }
        if ((i | 0) == 9) {
          color = 4210943;
        }
        brr = br;
        if ((y | 0) >= 32)
          brr = +(+(+brr) / +2);
        if ((i | 0) == 8) {
          color = 5298487;
          if ((~~(+(+random()) * +2) | 0) == 0) {
            color = 0;
            brr = +255;
          }
        }
        col = ~~(+(color >> 16 & 255 | 0) * +brr / +255) << 16 | ~~(+(color >> 8 & 255 | 0) * +brr / +255) << 8 | ~~(+(color & 255 | 0) * +brr / +255);
        I4[(((totalSize - globalSP | 0) + 1048640 | 0) + ((((x | 0) + (imul(y | 0, 16) | 0) | 0) + (imul(imul(i | 0, 256) | 0, 3) | 0) | 0) * 4 | 0)) >> 2] = col;
      }
    }
  }
}
function makeMap() {
  var _ = 0, _$1 = 0, _$2 = 0, x = 0, y = 0, z = 0, i = 0, yd = 0.0, zd = 0.0, $SP = 0;
  for (x = 0; (x | 0) < 64; _ = x, x = (x | 0) + 1 | 0, _) {
    for (y = 0; (y | 0) < 64; _$1 = y, y = (y | 0) + 1 | 0, _$1) {
      for (z = 0; (z | 0) < 64; _$2 = z, z = (z | 0) + 1 | 0, _$2) {
        i = z << 12 | y << 6 | x;
        yd = +((+(y | 0) - 32.5) * 0.4);
        zd = +((+(z | 0) - 32.5) * 0.4);
        I4[(((totalSize - globalSP | 0) + 64 | 0) + (i * 4 | 0)) >> 2] = ~~(+(+random()) * +16);
        if (+(+random()) > +(+(+sqrt(+sqrt(+(+yd * +yd + +zd * +zd)))) - 0.8))
          I4[(((totalSize - globalSP | 0) + 64 | 0) + (i * 4 | 0)) >> 2] = 0;
      }
    }
  }
}
function render() {
  var _ = 0, _$1 = 0, _$2 = 0, _$3 = 0, xRot = 0.0, yRot = 0.0, yCos = 0.0, ySin = 0.0, xCos = 0.0, xSin = 0.0, o = 0, x = 0, ___xd = 0.0, y = 0, __yd = 0.0, __zd = 0.0, ___zd = 0.0, _yd = 0.0, _xd = 0.0, _zd = 0.0, col = 0, br = 0.0, ddist = 0.0, closest = 0.0, d = 0, dimLength = 0.0, ll = 0.0, xd = 0.0, yd = 0.0, zd = 0.0, initial = 0.0, dist = 0.0, p = 0, tex = 0, u = 0, v = 0, cc = 0, r = 0, g = 0, b = 0, $SP = 0;
  U4[1] = (U4[1] | 0) - 48 | 0;
  $SP = U4[1] | 0;
  xRot = +(+(+(+sin(+(+((now() | 0) % 10000 | 0) / +(+10000) * +PI * +2)))) * 0.4 + +PI / +2);
  yRot = +(+(+(+cos(+(+((now() | 0) % 10000 | 0) / +(+10000) * +PI * +2)))) * 0.4);
  yCos = +(+cos(yRot));
  ySin = +(+sin(yRot));
  xCos = +(+cos(xRot));
  xSin = +(+sin(xRot));
  F8[(($SP)) >> 3] = 32.5 + +((now() | 0) % 10000 | 0) / +(+10000) * +64;
  F8[((($SP)) + 8 | 0) >> 3] = 32.5;
  F8[((($SP)) + 16 | 0) >> 3] = 32.5;
  f = (f | 0) + 1 | 0;
  for (x = 0; (x | 0) < (w | 0); _ = x, x = (x | 0) + 1 | 0, _) {
    ___xd = +(+((x | 0) - ((w | 0) / 2 | 0) | 0) / +(+(h | 0)));
    for (y = 0; (y | 0) < (h | 0); _$1 = y, y = (y | 0) + 1 | 0, _$1) {
      __yd = +((+(y | 0) - +(h | 0) / +(+2)) / +(h | 0));
      __zd = +1.0;
      ___zd = +(+__zd * +yCos + +__yd * +ySin);
      _yd = +(+__yd * +yCos - +__zd * +ySin);
      _xd = +(+___xd * +xCos + +___zd * +xSin);
      _zd = +(+___zd * +xCos - +___xd * +xSin);
      col = 0;
      br = +255.0;
      ddist = +0.0;
      closest = +32.0;
      for (d = 0; (d | 0) < 3; _$2 = d, d = (d | 0) + 1 | 0, _$2) {
        dimLength = _xd;
        if ((d | 0) == 1)
          dimLength = _yd;
        if ((d | 0) == 2)
          dimLength = _zd;
        ll = +(+1 / +(+(+dimLength) < +(+(+0)) ? -dimLength : dimLength));
        xd = +(+_xd * +ll);
        yd = +(+_yd * +ll);
        zd = +(+_zd * +ll);
        initial = +(+F8[(($SP)) >> 3] - +(~~+F8[(($SP)) >> 3] | 0));
        if ((d | 0) == 1)
          initial = +(+F8[((($SP)) + 8 | 0) >> 3] - +(~~+F8[((($SP)) + 8 | 0) >> 3] | 0));
        if ((d | 0) == 2)
          initial = +(+F8[((($SP)) + 16 | 0) >> 3] - +(~~+F8[((($SP)) + 16 | 0) >> 3] | 0));
        if (+dimLength > +(+0))
          initial = +(+1 - +initial);
        dist = +(+ll * +initial);
        F8[(($SP) + 24 | 0) >> 3] = +F8[(($SP)) >> 3] + +xd * +initial;
        F8[((($SP) + 24 | 0) + 8 | 0) >> 3] = +F8[((($SP)) + 8 | 0) >> 3] + +yd * +initial;
        F8[((($SP) + 24 | 0) + 16 | 0) >> 3] = +F8[((($SP)) + 16 | 0) >> 3] + +zd * +initial;
        if (+dimLength < +(+0)) {
          if ((d | 0) == 0)
            F8[(($SP) + 24 | 0) >> 3] = +F8[(($SP) + 24 | 0) >> 3] - +1;
          if ((d | 0) == 1)
            F8[((($SP) + 24 | 0) + 8 | 0) >> 3] = +F8[((($SP) + 24 | 0) + 8 | 0) >> 3] - +1;
          if ((d | 0) == 2)
            F8[((($SP) + 24 | 0) + 16 | 0) >> 3] = +F8[((($SP) + 24 | 0) + 16 | 0) >> 3] - +1;
        }
        while (+dist < +closest) {
          tex = I4[(((totalSize - globalSP | 0) + 64 | 0) + (((~~+F8[((($SP) + 24 | 0) + 16 | 0) >> 3] & 63) << 12 | (~~+F8[((($SP) + 24 | 0) + 8 | 0) >> 3] & 63) << 6 | ~~+F8[(($SP) + 24 | 0) >> 3] & 63) * 4 | 0)) >> 2] | 0;
          if ((tex | 0) > 0) {
            u = ~~((+F8[(($SP) + 24 | 0) >> 3] + +F8[((($SP) + 24 | 0) + 16 | 0) >> 3]) * +16) & 15;
            v = (~~(+F8[((($SP) + 24 | 0) + 8 | 0) >> 3] * +16) & 15 | 0) + 16 | 0;
            if ((d | 0) == 1) {
              u = ~~(+F8[(($SP) + 24 | 0) >> 3] * +16) & 15;
              v = ~~(+F8[((($SP) + 24 | 0) + 16 | 0) >> 3] * +16) & 15;
              if (+yd < +(+0))
                v = (v | 0) + 32 | 0;
            }
            cc = I4[(((totalSize - globalSP | 0) + 1048640 | 0) + ((((u | 0) + (imul(v | 0, 16) | 0) | 0) + (imul(imul(tex | 0, 256) | 0, 3) | 0) | 0) * 4 | 0)) >> 2] | 0;
            if ((cc | 0) > 0) {
              col = cc;
              ddist = +(255 - (~~(+dist / +32 * +255) | 0) | 0);
              br = +((imul(255, 255 - (imul(((d | 0) + 2 | 0) % 3 | 0, 50) | 0) | 0) | 0) / 255 | 0);
              closest = dist;
            }
          }
          F8[(($SP) + 24 | 0) >> 3] = +F8[(($SP) + 24 | 0) >> 3] + +xd;
          F8[((($SP) + 24 | 0) + 8 | 0) >> 3] = +F8[((($SP) + 24 | 0) + 8 | 0) >> 3] + +yd;
          F8[((($SP) + 24 | 0) + 16 | 0) >> 3] = +F8[((($SP) + 24 | 0) + 16 | 0) >> 3] + +zd;
          dist = +(+(+dist) + +ll);
        }
      }
      r = ~~(+(col >> 16 & 255 | 0) * +br * +ddist / +(imul(255, 255) | 0));
      g = ~~(+(col >> 8 & 255 | 0) * +br * +ddist / +(imul(255, 255) | 0));
      b = ~~(+(col & 255 | 0) * +br * +ddist / +(imul(255, 255) | 0));
      U1[(((totalSize - globalSP | 0) + 1097792 | 0) + ((imul((x | 0) + (imul(y | 0, w | 0) | 0) | 0, 4) | 0) + 0 | 0)) >> 0] = r & 255;
      U1[(((totalSize - globalSP | 0) + 1097792 | 0) + ((imul((x | 0) + (imul(y | 0, w | 0) | 0) | 0, 4) | 0) + 1 | 0)) >> 0] = g & 255;
      U1[(((totalSize - globalSP | 0) + 1097792 | 0) + ((imul((x | 0) + (imul(y | 0, w | 0) | 0) | 0, 4) | 0) + 2 | 0)) >> 0] = b & 255;
      U1[(((totalSize - globalSP | 0) + 1097792 | 0) + ((imul((x | 0) + (imul(y | 0, w | 0) | 0) | 0, 4) | 0) + 3 | 0)) >> 0] = 255;
    }
  }
  return (_$3 = ~~((totalSize - globalSP | 0) + 1097792 | 0) | 0, U4[1] = (U4[1] | 0) + 48 | 0, _$3) | 0;
  U4[1] = (U4[1] | 0) + 48;
  return 0;
}
function getPixelsLength() {
  var $SP = 0;
  return pixelsLength | 0;
}
function getWidth() {
  var $SP = 0;
  return w | 0;
}
function getHeight() {
  var $SP = 0;
  return h | 0;
}
function main(_w, _h) {
  _w = _w | 0;
  _h = _h | 0;
  var $SP = 0;
  U4[1] = totalSize - 21097792;
  U4[0] = 4;
  w = _w;
  h = _h;
  pixelsLength = imul(imul(w, h) | 0, 4) | 0;
  if ((pixelsLength | 0) > 20000000) {
    return 1;
  }
  makeTexmap();
  makeMap();
  return 0;
}
    function memcpy(dest, src, num) {
        dest = dest|0; src = src|0; num = num|0;
        var ret = 0;
        ret = dest|0;
        if ((dest&3) == (src&3)) {
            while (dest & 3) {
                if ((num|0) == 0) return ret|0;
                U1[(dest)]=U1[(src)];
                dest = (dest+1)|0;
                src = (src+1)|0;
                num = (num-1)|0;
            }
            while ((num|0) >= 4) {
                U4[((dest)>>2)]=U4[((src)>>2)];
                dest = (dest+4)|0;
                src = (src+4)|0;
                num = (num-4)|0;
            }
        }
        while ((num|0) > 0) {
            U1[(dest)]=U1[(src)];
            dest = (dest+1)|0;
            src = (src+1)|0;
            num = (num-1)|0;
        }
        return ret|0;
    }

    function memset(ptr, value, num) {
        ptr = ptr|0; value = value|0; num = num|0;
        var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
        stop = (ptr + num)|0;
        if ((num|0) >= 20) {
            // This is unaligned, but quite large, so work hard to get to aligned settings
            value = value & 0xff;
            unaligned = ptr & 3;
            value4 = value | (value << 8) | (value << 16) | (value << 24);
            stop4 = stop & ~3;
            if (unaligned) {
                unaligned = (ptr + 4 - unaligned)|0;
                while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
                    U1[(ptr)]=value;
                    ptr = (ptr+1)|0;
                }
            }
            while ((ptr|0) < (stop4|0)) {
                U4[((ptr)>>2)]=value4;
                ptr = (ptr+4)|0;
            }
        }
        while ((ptr|0) < (stop|0)) {
            U1[(ptr)]=value;
            ptr = (ptr+1)|0;
        }
    }

    return { main: main,
render: render,
getPixelsLength: getPixelsLength,
getWidth: getWidth,
getHeight: getHeight };

})({ Uint8Array: Uint8Array,
     Int8Array: Int8Array,
     Uint16Array: Uint16Array,
     Int16Array: Int16Array,
     Uint32Array: Uint32Array,
     Int32Array: Int32Array,
     Float32Array: Float32Array,
     Float64Array: Float64Array,
     Math: Math },
   { random: random,
now: now,
     HEAP_SIZE: HEAP_SIZE,
     STACK_SIZE: STACK_SIZE,
     TOTAL_SIZE: SIZE },
   buffer);

function assertEqual(val1, val2) {
  var err = true;
  var msg;
  if(val1 | 0 !== val1) {
    if(Math.abs(val1 - val2) < .00000001) {
      err = false;
    }
    else {
      msg = 'eps';
    }
  }
  else if(val1 === val2) {
    err = false;
  }

  if(err) {
    throw new Error(val1 + ' does not equal ' + val2);
  }
}

function _print(/* arg1, arg2, ..., argN */) {
    var func = ((typeof console !== 'undefined' && console.log) || print);
    func.apply(null, arguments);
}

var _time;
function start() {
  _time = Date.now();
}

function end() {
  return Date.now() - _time;
}

window.minecraft = asm;
})();

