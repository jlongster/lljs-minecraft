
function ajaxGet(url, success) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if(ajax.readyState == 4 && ajax.status == 200) {
            success(ajax.responseText);
        }
    };

    ajax.open('GET', url, true);
    ajax.send();
}

function GLRenderer(canvas) {
    var glOpts = {
        antialias: false,
        depth: false,
        preserveDrawingBuffer: true
    };

    this.width = canvas.width;
    this.height = canvas.height;
    this.gl = canvas.getContext('webgl', glOpts) || canvas.getContext('experimental-webgl', glOpts);
    this.persMatrix = mat4.create();
    this.worldTransform = mat4.create();
    this.finalMatrix = mat4.create();
    this.isReady = false;

    if(!this.gl) {
        this.unsupported = true;
        return;
    }

    mat4.ortho(0, 1, 1, 0, -1, 1, this.persMatrix);
    mat4.identity(this.worldTransform);

    mat4.multiply(this.persMatrix,
                  this.worldTransform,
                  this.finalMatrix);

    // Fetch the shaders

    var vsrc, fsrc, renderer = this;

    ajaxGet('shaders/basic.vsh', function(r) {
        vsrc = r;

        if(vsrc && fsrc) {
           renderer.init(vsrc, fsrc);
        }
    });

    ajaxGet('shaders/basic.fsh', function(r) {
        fsrc = r;
        
        if(vsrc && fsrc) {
           renderer.init(vsrc, fsrc);
        }
    });
}

GLRenderer.prototype.init = function(vertexSrc, fragmentSrc) {
    var gl = this.gl;

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    var vertices = [
        0, 0,
        0, 1,
        1, 1,

        0, 0,
        1, 1,
        1, 0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    this.texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
    var coords = [
        0, 0,
        0, 1,
        1, 1,

        0, 0,
        1, 1,
        1, 0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);

    // program

    function compile(shader, src) {
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        var status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if(!status) {
            var err = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error('shader compilation error: ' + err);
        }

        return shader;
    }

    var vshader = compile(gl.createShader(gl.VERTEX_SHADER), vertexSrc);
    var fshader = compile(gl.createShader(gl.FRAGMENT_SHADER), fragmentSrc);

    var program = gl.createProgram();
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var status = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(!status) {
        var err = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error('program linking error: ' + err);
    }

    this.program = program;
    this.worldTransformLoc = gl.getUniformLocation(program, 'worldTransform');
    gl.uniformMatrix4fv(this.worldTransformLoc, false, this.finalMatrix);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    var loc = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    loc = gl.getAttribLocation(this.program, 'a_coord');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    this.createTexture();
    this.isReady = true;
};

GLRenderer.prototype.createTexture = function() {
    var gl = this.gl;
    this.tex = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
};

GLRenderer.prototype.loadTexture = function(data, w, h) {
    var gl = this.gl;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
};

GLRenderer.prototype.clear = function() {
    var gl = this.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

GLRenderer.prototype.render = function() {
    if(!this.isReady) {
        return;
    }

    var gl = this.gl;
    this.clear();

    gl.drawArrays(gl.TRIANGLES, 0, 6);
};
