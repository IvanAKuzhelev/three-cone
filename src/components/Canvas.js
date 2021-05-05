import * as React from "react";
import { useRef, useLayoutEffect, useEffect, useContext } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import DrawValuesContext from "./DrawValuesContext";
import useWindowSize from "./useWindowSize";

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

  const [winWidth, winHeight] = useWindowSize();
  const aspectRatio = (0.8 * winWidth) / winHeight;

  const live = useRef(null);

  // setup;

  useLayoutEffect(
    () => {
      //setup

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
        camera.current = new THREE.PerspectiveCamera(
          55,
          (0.8 * window.innerWidth) / window.innerHeight,
          0.1,
          4500
        );
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
        if (live.current) {
          controls.current.update();
          renderer.current.render(scene.current, camera.current);
          requestAnimationFrame(renderFunc);
        }
        return;
      };

      // on unmount

      const cleanUp = () => {
        live.current = false;

        controls.current.dispose();

        scene.current.remove(mesh.current);
        mesh.current.material.dispose();
        mesh.current.geometry.dispose();

        material.current.dispose();
        geometry.current.dispose();

        renderer.current.dispose();
      };

      //"scene"
      rendererSetup();
      cameraSetup();
      sceneSetup();
      lightsSetup();
      controlsSetup();
      live.current = true;

      //box
      geometrySetup();
      materialSetup();
      meshSetup();

      //rendering

      requestAnimationFrame(renderFunc);

      return cleanUp;
    },
    []
    // update based on drawValues.indices and drawValues.vertices
    // is handled in a different useEffect,
    // so they are not needed as dependencies here
  );

  //update

  useEffect(() => {
    //responsiveness

    const handleResize = () => {
      renderer.current.setSize(0.8 * winWidth, winHeight);
      camera.current.aspect = aspectRatio;
      camera.current.updateProjectionMatrix();
    };

    handleResize();
  }, [winWidth, winHeight]);

  useEffect(() => {
    //Box update

    const resetControls = () => {
      controls.current.reset();
    };

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

    resetControls();
    updateCameraOnItemChange();
    updateGeometry();
  }, [drawValues]);

  return <canvas ref={canvasRef}></canvas>;
};
export default Canvas;
