// prettier-ignore
const InitialDrawValues = {
  // prettier-ignore
  vertices: [
    //front
    //0
    0, 0, 0,
    //1
    100, 0, 0,
    //2
    100, 200, 0,
    //3
    0, 200, 0,
    //back
    //4
    0, 0, 150,
    //5
    0, 200, 150,
    //6
    100, 200, 150,
    //7
    100, 0, 150,
  ],
  // prettier-ignore
indices: [
    //front
    0, 1, 2,
    2, 3, 0,
    //bottom
    1, 0, 4,
    4, 7, 1,
    //top
    3, 2, 6,
    6, 5, 3,
    //left-side
    4, 0, 3,
    3, 5, 4,
    //right-side
    1, 7, 6,
    6, 2, 1,
  ],
};
export default InitialDrawValues;
// indices: [
//     //front
//     0, 1, 2,
//     2, 3, 0,
//     //bottom
//     1, 0, 4,
//     4, 7, 1,
//     //top
//     3, 2, 6,
//     6, 5, 3,
//     //left-side
//     4, 0, 3,
//     3, 5, 4,
//     //right-side
//     1, 7, 6,
//     6, 2, 1,
//   ],
