const N = 240;
const H = 300;
const R = 100;
const CalculateDrawValues = (N, H, R) => {
  const vertices = [];
  const indices = [];
  vertices.push(0, 0, H);
  for (let i = 0; i < N; i++) {
    vertices.push(
      R * Math.cos((2 * Math.PI * i) / N),
      R * Math.sin((2 * Math.PI * i) / N),
      0
    );
  }
  for (let j = 1; j < N; j++) {
    indices.push(j, 0, j + 1);
  }
  indices.push(N, 0, 1);
  return {
    vertices: vertices,
    indices: indices,
    camera: {
      x: 900,
      y: 600,
      z: 300,
    },
  };
};

const InitialDrawValues = CalculateDrawValues(N, H, R);
export default InitialDrawValues;
