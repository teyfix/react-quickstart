import styled, { StyledComponent as SC } from 'styled-components';
import basicStyles, { BasicProps } from './basicStyles';

const Button: SC<'button', BasicProps> = styled.button`
  border: unset;
  cursor: pointer;
  padding: 0.4rem 0.8rem;

  ${(props: BasicProps) => {
    props.bgColor = props.bgColor || 'blueJeans';
    props.color = props.color || 'lightGray';

    return basicStyles(props);
  }};
`;

export default Button;
