import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MultiSelectBadge from './MultiSelectBadge';

const MultiSelectButton = styled('button')`
  height: 100%;
  padding: 1.25rem; /* 20px if base font-size is 16px */
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
  border: 1px #000 solid;
  border-bottom: 0;
  box-shadow: 0 1px #000;

  :after {
    content: '';
    display: inline-block;
    margin-left: 10px;
    padding: 3px;
    border: solid black;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  &&.is-opened {
    :after {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
    }
  }
`;

const MultiSelectDropdown = ({ text, toggleDropdown, quantity, isOpened }) => (
  <MultiSelectButton
    className={isOpened ? 'multiselect-button-dropdown is-opened' : 'multiselect-button-dropdown'}
    onClick={toggleDropdown}
    aria-haspopup="true"
  >
    <MultiSelectBadge className="multiselect-badge" text={text} quantity={quantity} />
  </MultiSelectButton>
);

MultiSelectDropdown.propTypes = {
  toggleDropdown: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired
};

export default MultiSelectDropdown;
