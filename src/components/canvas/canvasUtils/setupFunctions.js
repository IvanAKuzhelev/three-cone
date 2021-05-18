import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

const rendererSetup = (renderer, canvasRef, sceneColor) => {
  renderer.current = new THREE.WebGLRenderer({
    canvas: canvasRef.current,
    antialias: true,
  });
  renderer.current.setClearColor(sceneColor);
  renderer.current.setPixelRatio(window.devicePixelRatio);
  renderer.current.setSize(
    canvasRef.current.clientWidth,
    canvasRef.current.clientHeight,
    false
  );
};

const sceneSetup = (scene) => {
  scene.current = new THREE.Scene();
};

const cameraSetup = (camera, canvasRef, scene) => {
  camera.current = new THREE.PerspectiveCamera(
    55,
    canvasRef.current.clientWidth / canvasRef.current.clientHeight,
    0.1,
    4500
  );
  camera.current.position.set(900, 600, 300);
  scene.current.add(camera.current);
};

const controlsSetup = (controls, camera, renderer) => {
  controls.current = new TrackballControls(
    camera.current,
    renderer.current.domElement
  );
};

const lightsSetup = (scene, camera) => {
  const light = new THREE.AmbientLight(0xffffff, 0.6);
  const light2 = new THREE.SpotLight(0xffffff, 0.25);

  scene.current.add(light);
  camera.current.add(light2);
};

const geometrySetup = (geometry, drawValues) => {
  geometry.current = new THREE.BufferGeometry();
  geometry.current.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(drawValues.vertices), 3)
  );
  geometry.current.setAttribute(
    "normal",
    new THREE.BufferAttribute(new Float32Array(drawValues.normals), 3)
  );
  geometry.current.setIndex(drawValues.indices);
};

const materialSetup = (material, theme) => {
  material.current = new THREE.MeshPhongMaterial({
    color: theme.figure,
  });
};

const meshSetup = (mesh, geometry, material, scene) => {
  mesh.current = new THREE.Mesh(geometry.current, material.current);
  mesh.current.position.set(0, 0, 0);
  scene.current.add(mesh.current);
};

export {
  rendererSetup,
  sceneSetup,
  cameraSetup,
  controlsSetup,
  lightsSetup,
  geometrySetup,
  materialSetup,
  meshSetup,
};
