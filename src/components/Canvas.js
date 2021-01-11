import * as React from "react";
import { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import DrawValuesContext from "./DrawValuesContext";

const Canvas = () => {
  const [drawValues] = useContext(DrawValuesContext);
  const canvasRef = useRef(null);
  useEffect(() => {
    const aspectRatio = (0.8 * window.innerWidth) / window.innerHeight;

    //renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setClearColor(0xd3d3d3);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(0.8 * window.innerWidth, window.innerHeight);
    //camera
    const camera = new THREE.PerspectiveCamera(
      55,
      aspectRatio,
      0.1,
      5 *
        Math.max(drawValues.camera.x, drawValues.camera.y, drawValues.camera.z)
    );
    camera.position.set(
      drawValues.camera.x,
      drawValues.camera.y,
      drawValues.camera.z
    );
    //scene

    const scene = new THREE.Scene();

    //controls

    const controls = new TrackballControls(camera, renderer.domElement);

    controls.keys = [65, 83, 68];
    //geometry

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(drawValues.vertices), 3)
    );
    geometry.setIndex(drawValues.indices);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      flatShading: true,
    });
    //mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    //lights
    const light = new THREE.AmbientLight(0xffffff, 0.2);
    const light3 = new THREE.PointLight(0xffffff, 0.8);
    scene.add(light);
    camera.add(light3);
    scene.add(camera);

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
