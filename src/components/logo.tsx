import styled from 'styled-components';
import LogoImage from '../assets/images/logo.png';

const defaultProps = {
  width: 115,
  heigth: 35,
  src: LogoImage,
};

type LogoProps = {
  width?: number;
  heigth?: number;
  src?: string;
} & typeof defaultProps;

const StyledLogo = styled.img<LogoProps>`
  width: ${(props) => `${props.width / 10}rem`};
  height: ${(props) => `${props.heigth / 10}rem`};
`;

export default function Logo({ width, heigth, src }: LogoProps) {
  return (
    <StyledLogo width={width} heigth={heigth} src={src} />
  );
}

Logo.defaultProps = defaultProps;