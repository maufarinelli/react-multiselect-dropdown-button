import React from 'react';
import PropTypes from 'prop-types';
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

const MultiSelectBadge = ({ text, quantity }) => (
  <>
    {text} <Badge>{quantity}</Badge>
  </>
);

MultiSelectBadge.propTypes = {
  text: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export default MultiSelectBadge;
