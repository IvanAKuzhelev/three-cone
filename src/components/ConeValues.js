const N = 20;
const H = 300;
const R = 100;
const CalculateDrawValues = (N, H, R) => {
  const vertices = [];
  const indices = [];
  const normals = [];
  vertices.push(0, 0, 0);
  vertices.push(0, 0, H);
  for (let i = 0; i < N; i++) {
    vertices.push(
      R * Math.cos((2 * Math.PI * i) / N),
      R * Math.sin((2 * Math.PI * i) / N),
      0
    );
  }
  for (let j = 2; j < N + 1; j++) {
    indices.push(j + 1, 1, j);
    indices.push(j, 0, j + 1);
  }
  indices.push(N + 1, 0, 2);
  indices.push(2, 1, N + 1);

  normals.push(0, 0, -1);
  const bz = -(R ** 2 / H);
  for (let i = 4; i < vertices.length; i += 3) {
    const px = vertices[i - 1];
    const py = vertices[i];
    const pz = vertices[i + 1];
    const magnN = Math.sqrt(px ** 2 + py ** 2 + (pz - bz) ** 2);
    normals.push(px / magnN, py / magnN, (pz - bz) / magnN);
  }
  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
    camera: {
      x: 900,
      y: 600,
      z: 300,
    },
  };
};

const InitialDrawValues = CalculateDrawValues(N, H, R);
export default InitialDrawValues;
