import React from 'react';
import PropTypes from 'prop-types';
import { AngleDown } from 'styled-icons/fa-solid/AngleDown';
import { AngleUp } from 'styled-icons/fa-solid/AngleUp';
import styled, { css } from 'styled-components';
import MultiSelectBadge from './MultiSelectBadge';

// TODO: margins and padding in rem? Refactor when decision has been made, if needed
const MultiSelectButton = styled('button')`
  height: 100%;
  padding: 1.25rem; /* 20px if base font-size is 16px */
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
  border: 1px #000 solid;

  &&.is-opened {
    border-bottom: 0;
  }
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

const MultiSelectDropdown = ({ text, toggleDropdown, quantity, isOpened }) => (
  <MultiSelectButton
    className={isOpened ? 'multiselect-button-dropdown is-opened' : 'multiselect-button-dropdown'}
    onClick={toggleDropdown}
    aria-haspopup="true"
  >
    <MultiSelectBadge className="multiselect-badge" text={text} quantity={quantity} />
    {isOpened ? <StyledAngleUp /> : <StyledAngleDown />}
  </MultiSelectButton>
);

MultiSelectDropdown.propTypes = {
  toggleDropdown: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired
};

export default MultiSelectDropdown;
