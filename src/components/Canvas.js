import * as React from "react";
import { useRef, useLayoutEffect, useEffect, useContext } from "react";
import { css, useTheme } from "@emotion/react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import DrawValuesContext from "./contexts/DrawValuesContext";

const Canvas = () => {
  const [drawValues] = useContext(DrawValuesContext);
  const theme = useTheme();
  const canvasRef = useRef(null);

  //scene variables

  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const material = useRef(null);
  const mesh = useRef(null);
  const controls = useRef(null);
  const geometry = useRef(null);

  const frameID = useRef(null);
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
        renderer.current.setClearColor(theme.scene);
        renderer.current.setPixelRatio(window.devicePixelRatio);
        renderer.current.setSize(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight,
          false
        );
      };

      const sceneSetup = () => {
        scene.current = new THREE.Scene();
      };

      const cameraSetup = () => {
        camera.current = new THREE.PerspectiveCamera(
          55,
          canvasRef.current.clientWidth / canvasRef.current.clientHeight,
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
          color: theme.box,
          flatShading: true,
        });
      };

      const meshSetup = () => {
        mesh.current = new THREE.Mesh(geometry.current, material.current);
        mesh.current.position.set(0, 0, 0);
        scene.current.add(mesh.current);
      };

      const renderFunc = () => {
        controls.current.update();
        renderer.current.render(scene.current, camera.current);
        frameID.current = requestAnimationFrame(renderFunc);
      };

      // on unmount

      const cleanUp = () => {
        cancelAnimationFrame(frameID.current);

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
    // updates based on drawValues.indices and drawValues.vertices
    // and theme are handled in the dedicated useEffects,
    // so they are not needed as dependencies here
  );

  //update

  //responsiveness

  useEffect(() => {
    const handleResize = () => {
      renderer.current.setSize(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );
      camera.current.aspect =
        canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.current.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Box update

  useEffect(() => {
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

  //theme update
  useEffect(() => {
    renderer.current.setClearColor(theme.scene);
    material.current.setValues({ color: theme.box });
  }, [theme.box, theme.scene]);

  return (
    <canvas
      ref={canvasRef}
      css={css`
        flex: 1 1 auto;
        min-width: 0;
        min-height: 100%;
        max-height: 100vh;
        background-color: lightgray;
        overflow: hidden;
      `}
    ></canvas>
  );
};
export default Canvas;
