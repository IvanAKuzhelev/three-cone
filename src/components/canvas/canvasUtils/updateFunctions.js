import { geometrySetup, meshSetup } from "./setupFunctions";

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

const updateGeometry = (mesh, geometry, material, scene, drawValues) => {
  geometry.current.dispose();
  scene.current.remove(mesh.current);
  geometrySetup(geometry, drawValues);
  meshSetup(mesh, geometry, material, scene);
};

const updateColorsBasedOnTheme = (renderer, material, theme) => {
  renderer.current.setClearColor(theme.scene);
  material.current.setValues({ color: theme.figure });
};

export {
  resetControls,
  updateCameraOnItemChange,
  updateGeometry,
  updateColorsBasedOnTheme,
};
