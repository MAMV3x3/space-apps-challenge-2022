const vertexShader = `
    varying vec3 vertexNormal;

    void main(){
        vertexNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.95);
    }
`;

export default vertexShader