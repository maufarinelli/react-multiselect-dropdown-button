import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'styled-icons/fa-solid/Check';
import styled from 'styled-components';

// TODO (hover background-color) coming from theme? Refactor when decision has been made
const MultiSelectListItemLi = styled('li')`
  :hover {
    background-color: #f0f0f0;
  }
`;

const MultiSelectCheckbox = styled('input')`
  visibility: hidden;
`;

const MultiSelectLisItemLabel = styled('label')`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0; /* 10px if base font-size is 16px */
  margin: 1px;
  line-height: 1;
  cursor: pointer;

  :focus {
    outline: 1px solid #5e9ed6;
  }
`;

const MultiSelectCheckIcon = styled(Check)`
  visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  height: 1rem;
`;

const MultiSelectListItem = React.forwardRef((props, ref) => {
  const { label, name, id, handleInputChange, checked } = props;

  return (
    <MultiSelectListItemLi className="multiselect-list-item" role="option">
      <MultiSelectLisItemLabel
        role="checkbox"
        aria-checked={checked}
        tabIndex="0"
        htmlFor={id}
        onKeyPress={handleInputChange}
        ref={ref}
        className="multiselect-list-item-label"
      >
        {label}
        <MultiSelectCheckbox
          className="multiselect-list-item-checkbox"
          type="checkbox"
          name={name}
          id={id}
          onChange={handleInputChange}
          checked={checked}
        />
        <MultiSelectCheckIcon checked={checked} />
      </MultiSelectLisItemLabel>
    </MultiSelectListItemLi>
  );
});

MultiSelectListItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default MultiSelectListItem;
