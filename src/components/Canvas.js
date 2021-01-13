import * as React from "react";
import { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import DrawValuesContext from "./DrawValuesContext";

const Canvas = () => {
  const [drawValues] = useContext(DrawValuesContext);
  const canvasRef = useRef(null);
  //scene variables
  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const material = useRef(null);
  const mesh = useRef(null);
  const controls = useRef(null);
  const geometry = useRef(null);
  let current = true;
  // implement another hook
  const aspectRatio = (0.8 * window.innerWidth) / window.innerHeight;
  //setup functions

  const rendererSetup = () => {
    renderer.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.current.setClearColor(0xd3d3d3);
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(0.8 * window.innerWidth, window.innerHeight);
  };

  const sceneSetup = () => {
    scene.current = new THREE.Scene();
  };

  const cameraSetup = () => {
    camera.current = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 4500);
    camera.current.position.set(900, 600, 300);
  };

  const controlsSetup = () => {
    controls.current = new TrackballControls(
      camera.current,
      renderer.current.domElement
    );
    controls.current.keys = [65, 83, 68];
  };

  const lightsSetup = () => {
    const light = new THREE.AmbientLight(0xffffff, 0.2);
    const light3 = new THREE.PointLight(0xffffff, 0.8);
    scene.current.add(light);
    camera.current.add(light3);
    scene.current.add(camera.current);
  };

  const geometrySetup = () => {
    geometry.current = new THREE.BufferGeometry();
    geometry.current.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(drawValues.vertices), 3)
    );
    geometry.current.setIndex(drawValues.indices);
  };

  const materialSetup = () => {
    material.current = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      flatShading: true,
    });
  };

  const meshSetup = () => {
    mesh.current = new THREE.Mesh(geometry.current, material.current);
    mesh.current.position.set(0, 0, 0);
    scene.current.add(mesh.current);
  };

  const renderFunc = () => {
    if (current) {
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
      requestAnimationFrame(renderFunc);
    }
    return;
  };
  //update functions
  const updateCameraOnItemChange = () => {
    camera.current.far =
      5 *
      Math.max(drawValues.camera.x, drawValues.camera.y, drawValues.camera.z);
    camera.current.position.set(
      drawValues.camera.x,
      drawValues.camera.y,
      drawValues.camera.z
    );
    camera.current.updateProjectionMatrix();
  };

  const updateGeometry = () => {
    const newValues = new Float32Array(drawValues.vertices);
    for (let i = 1, j = 0; j < 8; i += 3, j++) {
      geometry.current.attributes.position.setXYZ(
        j,
        newValues[i - 1],
        newValues[i],
        newValues[i + 1]
      );
    }
    geometry.current.attributes.position.needsUpdate = true;
    geometry.current.computeBoundingBox();
    geometry.current.computeBoundingSphere();
  };
  const resetControls = () => {
    controls.current.reset();
  };
  // setup;

  useEffect(() => {
    //environment
    rendererSetup();
    cameraSetup();
    sceneSetup();
    lightsSetup();
    controlsSetup();

    //box
    geometrySetup();
    materialSetup();
    meshSetup();

    requestAnimationFrame(renderFunc);
  }, []);

  useEffect(() => {
    updateCameraOnItemChange();
    updateGeometry();
    resetControls();
  }, [drawValues]);

  return <canvas ref={canvasRef}></canvas>;
};
export default Canvas;
