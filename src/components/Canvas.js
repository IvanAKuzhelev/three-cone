import * as React from "react";
import { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import DrawValuesContext from "./DrawValuesContext";

const Canvas = () => {
  const [drawValues] = useContext(DrawValuesContext);
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

    const camera = new THREE.PerspectiveCamera(
      55,
      aspectRatio,
      0.1,
      5 * drawValues.camera.x
    );
    camera.position.set(
      drawValues.camera.x,
      drawValues.camera.y,
      drawValues.camera.z
    );

    const scene = new THREE.Scene();
    // const axesHelper = new THREE.AxesHelper(600);
    // scene.add(axesHelper);

    const light = new THREE.AmbientLight(0xffffff, 0.2);
    const light2 = new THREE.PointLight(0xffffff, 1);
    const light3 = new THREE.PointLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-500, -500, -500);
    // light3.position.set(500, 500, 500);
    directionalLight.position.set(500, 500, 500);
    // scene.add(directionalLight);
    scene.add(light);
    // scene.add(light2);
    // scene.add(light3);
    camera.add(light3);
    scene.add(camera);
    // camera.add(directionalLight);

    const controls = new TrackballControls(camera, renderer.domElement);

    controls.keys = [65, 83, 68];
    //geometry

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(drawValues.vertices), 3)
    );
    geometry.setIndex(drawValues.indices);
    // geometry.computeVertexNormals();
    //const geometry = new THREE.CubeGeometry(100, 100, 100);
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0xa9a9a9,
    // });
    // const material = new THREE.MeshNormalMaterial({
    //   color: 0xa9a9a9,
    //   // flatShading: true,
    // });
    // const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // const material = new THREE.MeshPhysicalMaterial({
    //   color: 0xa9a9a9,
    //   flatShading: true,
    // });
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000, // red (можно также использовать css цвета)
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

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
