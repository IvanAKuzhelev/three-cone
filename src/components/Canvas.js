import * as React from "react";
import { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import DrawValuesContext from "./DrawValuesContext";

const Canvas = () => {
  const drawValues = useContext(DrawValuesContext);
  const canvasRef = useRef(null);
  //remake
  useEffect(() => {
    const aspectRatio = (0.8 * window.innerWidth) / window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setClearColor(0xd3d3d3);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(0.8 * window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 3000);

    const scene = new THREE.Scene();

    // const light = new THREE.AmbientLight(0xffffff, 0.5);
    // const light2 = new THREE.PointLight(0xffffff, 1);

    // scene.add(light);
    // scene.add(light2);

    const controls = new TrackballControls(camera, renderer.domElement);

    controls.keys = [65, 83, 68];
    //geometry

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(drawValues.vertices), 3)
    );
    geometry.setIndex(drawValues.indices);
    geometry.computeVertexNormals();
    //const geometry = new THREE.CubeGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xa9a9a9 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    camera.position.set(0, -200, -200);

    function render() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  });

  return <canvas ref={canvasRef}></canvas>;
};
export default Canvas;
