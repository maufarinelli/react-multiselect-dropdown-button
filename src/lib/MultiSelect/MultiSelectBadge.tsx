import React from 'react';
import styled from 'styled-components';

// TODO: theming for colors
const Badge = styled('span')`
  padding: 0.1875rem 0.5rem; /* 3px 8px if base font-size is 16px */
  margin-left: 0.3125rem;
  font-size: 0.85rem;
  font-weight: normal;
  line-height: 1;
  color: #fff;
  vertical-align: middle;
  background-color: #000;
  border-radius: 50%;
`;

interface MultiSelectBadgeProps {
  text: string;
  quantity: number;
}

const MultiSelectBadge: React.FC<MultiSelectBadgeProps> = ({ text, quantity }) => (
  <>
    {text} <Badge className="multiselect-badge">{quantity}</Badge>
  </>
);
export default MultiSelectBadge;
