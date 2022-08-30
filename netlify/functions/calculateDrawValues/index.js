import { calculateValues } from "./calculateValues";

const handler = async (event, context) => {
  const { N, H, R } = JSON.parse(event.body);
  const drawValues = calculateValues(N, H, R);
  return {
    statusCode: 200,
    body: JSON.stringify(drawValues),
  };
};
export { handler };
