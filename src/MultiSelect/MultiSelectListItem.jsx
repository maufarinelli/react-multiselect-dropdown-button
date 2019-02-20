import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'styled-icons/fa-solid/Check';
import styled from 'styled-components';

// TODO (hover background-color) coming from theme? Refactor when decision has been made
const StyledFilterListItem = styled('li', 'filter-list-item')`
  padding: 0.625rem 0; /* 10px if base font-size is 16px */

  :hover {
    background-color: #f0f0f0;
  }
`;

const StyledFilterCheckbox = styled('input', 'filter-list-item-checkbox')`
  visibility: hidden;
`;

const StyledLisItemLabel = styled('label', 'filter-list-item-label')`
  display: flex;
  justify-content: space-between;
  line-height: 1;
  cursor: pointer;
`;

const StyledCheckIcon = styled(Check, 'filter-list-item-check-icon')`
  display: ${props => (props.checked ? 'block' : 'none')};
  height: 1rem;
`;

const FilterListItem = ({ label, name, id, handleInputChange, checked }) => (
  <StyledFilterListItem key={id}>
    <StyledLisItemLabel role="checkbox" aria-checked={checked} tabIndex="0" htmlFor={id} onKeyPress={handleInputChange}>
      {label}
      <StyledFilterCheckbox type="checkbox" name={name} id={id} onChange={handleInputChange} checked={checked} />
      <StyledCheckIcon checked={checked} />
    </StyledLisItemLabel>
  </StyledFilterListItem>
);

FilterListItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default FilterListItem;
