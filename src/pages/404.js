import * as React from "react";
import { Link } from "gatsby";

// markup
const NotFoundPage = () => {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to="/">Go home</Link>.
    </>
  );
};

export default NotFoundPage;
