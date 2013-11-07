attribute vec2 a_position;
attribute vec2 a_coord;
uniform mat4 worldTransform;
varying vec4 color;
varying vec2 coord;

void main() {
    gl_Position = worldTransform * vec4(a_position, 0, 1);
    color = vec4(1, 1, .5, 1);
    coord = a_coord;
}
