import styled from "@emotion/styled";
import { Link } from "gatsby";

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.link};
  &:visited {
    color: ${(props) => props.theme.visitedLink};
  }
`;
const ExternalLink = StyledLink.withComponent("a");
export { ExternalLink };
export default StyledLink;
