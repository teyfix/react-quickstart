import { ComponentType as CT } from 'react';
import styled, { StyledComponent as SC } from 'styled-components';
import basicStyles, { BasicProps } from './basicStyles';

const Container: SC<CT<BasicProps>, BasicProps> = styled.div`
  margin: auto;
  max-width: 1180px;

  ${(props: BasicProps) => basicStyles(props)}
`;

export default Container;
