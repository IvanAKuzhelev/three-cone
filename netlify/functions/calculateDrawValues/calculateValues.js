/**
 * @param {number} N number of triangles
 * @param {number} H height of the cone
 * @param {number} R radius of the base
 */
const calculateValues = (N, H, R) => {
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

  for (let j = 2; j <= N; j++) {
    indices.push(j + 1, 1, j);
    indices.push(j, 0, j + 1);
  }
  indices.push(N + 1, 0, 2);
  indices.push(2, 1, N + 1);

  normals.push(0, 0, 1);
  const bz = -(R ** 2 / H);
  for (let i = 3; i < vertices.length; i += 3) {
    const px = vertices[i];
    const py = vertices[i + 1];
    const pz = vertices[i + 2];
    const magnN = Math.sqrt(px ** 2 + py ** 2 + (pz - bz) ** 2);
    normals.push(px / magnN, py / magnN, (pz - bz) / magnN);
  }

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
    camera: {
      x: -5 * R,
      y: -7 * R,
      z: 0.85 * H,
      far: 900 * Math.max(H, R),
    },
  };
};

export { calculateValues };
