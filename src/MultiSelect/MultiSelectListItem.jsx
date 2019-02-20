import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'styled-icons/fa-solid/Check';
import styled from 'styled-components';

// TODO (hover background-color) coming from theme? Refactor when decision has been made
const MultiSelectListItemLi = styled('li', 'multiselect-list-item')`
  padding: 0.625rem 0; /* 10px if base font-size is 16px */

  :hover {
    background-color: #f0f0f0;
  }
`;

const MultiSelectCheckbox = styled('input', 'multiselect-list-item-checkbox')`
  visibility: hidden;
`;

const MultiSelectLisItemLabel = styled('label', 'multiselect-list-item-label')`
  display: flex;
  justify-content: space-between;
  line-height: 1;
  cursor: pointer;
`;

const MultiSelectCheckIcon = styled(Check, 'multiselect-list-item-check-icon')`
  visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  height: 1rem;
`;

const MultiSelectListItem = ({ label, name, id, handleInputChange, checked }) => (
  <MultiSelectListItemLi>
    <MultiSelectLisItemLabel
      role="checkbox"
      aria-checked={checked}
      tabIndex="0"
      htmlFor={id}
      onKeyPress={handleInputChange}
    >
      {label}
      <MultiSelectCheckbox type="checkbox" name={name} id={id} onChange={handleInputChange} checked={checked} />
      <MultiSelectCheckIcon checked={checked} />
    </MultiSelectLisItemLabel>
  </MultiSelectListItemLi>
);

MultiSelectListItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default MultiSelectListItem;
