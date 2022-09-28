const fragmentShader = `
    varying vec3 vertexNormal;
    void main(){
        float intensity = pow(0.5 - dot(vertexNormal, vec3(0, 0, 1.0)), 1.0);
        gl_FragColor = vec4(0.3, 0.5, 1.0, 1.0) * intensity;
    }
`;

export default fragmentShader