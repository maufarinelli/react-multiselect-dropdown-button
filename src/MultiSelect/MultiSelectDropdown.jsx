import React from 'react';
import PropTypes from 'prop-types';
import { AngleDown } from 'styled-icons/fa-solid/AngleDown';
import { AngleUp } from 'styled-icons/fa-solid/AngleUp';
import styled, { css } from 'styled-components';
import MultiSelectBadge from './MultiSelectBadge';

// TODO: margins and padding in rem? Refactor when decision has been made, if needed
const MultiSelectButton = styled('button')`
  height: 100%;
  padding: 0.937rem 1.875rem; /* 15px 30px if base font-size is 16px */
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
  border: 1px #000 solid;
`;

const angleStyle = css`
  width: 0.8rem;
  margin: 0 0.625rem; /* 10px if base font-size is 16px */
  vertical-align: middle;
`;

const StyledAngleDown = styled(AngleDown)`
  ${angleStyle}
`;

const StyledAngleUp = styled(AngleUp)`
  ${angleStyle}
`;

const MultiSelectDropdown = ({ text, toggleFilterDropdown, quantity, isOpened }) => (
  <MultiSelectButton className="multiselect-button-dropdown" onClick={toggleFilterDropdown}>
    <MultiSelectBadge className="multiselect-badge" text={text} quantity={quantity} />
    {isOpened ? <StyledAngleUp /> : <StyledAngleDown />}
  </MultiSelectButton>
);

MultiSelectDropdown.propTypes = {
  toggleFilterDropdown: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired
};

export default MultiSelectDropdown;
