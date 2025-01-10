import React from "react";
import styled, { CSSProperties } from "styled-components";

type Props = {
  children: React.ReactNode;
  size: string;
  color?: string;
  weight?: number;
  sx?: CSSProperties;
};

function Label({ sx, children, size, color, weight }: Props) {
  return (
    <StyledLabel $size={size} color={color} weight={weight} style={sx}>
      {children}
    </StyledLabel>
  );
}

const StyledLabel = styled.label<{
  color?: string;
  $size: string;
  weight?: number;
}>`
  color: ${(p) => (p.color ? p.color : p.theme.font)};
  font-size: ${(p) => p.$size};
  font-weight: ${(p) => (p.weight ? p.weight : 400)};
`;

export default Label;
