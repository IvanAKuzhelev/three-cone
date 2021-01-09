import { css } from "@emotion/react";
import * as React from "react";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

const Canvas = () => {
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

    const controls = new TrackballControls(camera, renderer.domElement);

    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;

    controls.keys = [65, 83, 68];
    const geometry = new THREE.CubeGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xa9a9a9 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    camera.position.set(0, 20, 100);
    // controls.update();

    function render() {
      // mesh.rotation.x += 0.01;
      // mesh.rotation.y += 0.03;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};
export default Canvas;
