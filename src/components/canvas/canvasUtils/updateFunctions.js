import { geometrySetup } from "./setupFunctions";

const resetControls = (controls) => {
  controls.current.reset();
};

const updateCameraOnItemChange = (camera, drawValues) => {
  camera.current.far = drawValues.camera.far;
  camera.current.position.set(
    drawValues.camera.x,
    drawValues.camera.y,
    drawValues.camera.z
  );

  camera.current.updateProjectionMatrix();
};

const updateGeometry = (geometry, drawValues) => {
  geometry.current.dispose();
  geometrySetup(geometry, drawValues);
};

export { resetControls, updateCameraOnItemChange, updateGeometry };
