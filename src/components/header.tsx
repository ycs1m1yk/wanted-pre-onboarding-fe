import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./logo";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 8rem;
  padding: 0 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderGray};

  color: ${({ theme }) => theme.palette.borderGray};
  background-color: ${({ theme }) => theme.palette.wetAsphalt};
  line-height: 1.5;
`;

const HeaderContents = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  margin: 0 auto;
  justify-self: center;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  height: inherit;
  margin-left: 4rem;
  gap: 4rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  font-weight: 600;
  font-size: 1.8rem;
  white-space: nowrap;
  :hover {
    color: ${({ theme }) => theme.palette.pomegranate};
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <HeaderContents>
        <Link to="/">
          <Logo />
        </Link>
        <StyledNav>
          <StyledLink to="/signin">Sign in</StyledLink>
          <StyledLink to="/signup">Sign up</StyledLink>
        </StyledNav>
      </HeaderContents>
    </StyledHeader>
  );
}
