import * as React from "react";
import { useRef, useLayoutEffect, useEffect, useContext } from "react";
import { css, useTheme } from "@emotion/react";
import DrawValuesContext from "../contexts/DrawValuesContext";
import {
  rendererSetup,
  sceneSetup,
  cameraSetup,
  controlsSetup,
  lightsSetup,
  geometrySetup,
  materialSetup,
  meshSetup,
} from "./canvasUtils/setupFunctions";
import {
  resetControls,
  updateGeometry,
  updateCameraOnItemChange,
  updateColorsBasedOnTheme,
} from "./canvasUtils/updateFunctions";

const Canvas = () => {
  const [drawValues] = useContext(DrawValuesContext);
  const theme = useTheme();
  const canvasRef = useRef(null);

  // scene variables

  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const material = useRef(null);
  const mesh = useRef(null);
  const controls = useRef(null);
  const geometry = useRef(null);

  const frameID = useRef(null);

  // setup;

  useLayoutEffect(
    () => {
      // scene
      rendererSetup(renderer, canvasRef, theme.scene);
      sceneSetup(scene);
      cameraSetup(camera, canvasRef, scene);
      lightsSetup(scene, camera);
      controlsSetup(controls, camera, renderer);

      // figure
      geometrySetup(geometry, drawValues);
      materialSetup(material, theme);
      meshSetup(mesh, geometry, material, scene);
    },
    []
    // updates are handled in the dedicated useEffects,
    // so drawValues and theme are not needed as dependencies here
  );

  useLayoutEffect(() => {
    const renderFunc = () => {
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
      frameID.current = requestAnimationFrame(renderFunc);
    };

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

    // starting render loop
    requestAnimationFrame(renderFunc);

    // cleanup on unmount
    return cleanUp;
  }, []);

  // update

  // responsiveness

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

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Figure update

  useEffect(() => {
    resetControls(controls);
    updateGeometry(mesh, geometry, material, scene, drawValues);
    updateCameraOnItemChange(camera, drawValues);
  }, [drawValues]);

  // theme update
  useEffect(() => {
    updateColorsBasedOnTheme(renderer, material, theme);
  }, [theme]);

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
