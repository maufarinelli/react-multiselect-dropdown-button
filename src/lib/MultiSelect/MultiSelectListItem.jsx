import React from 'react';
import PropTypes from 'prop-types';
// import { Check } from 'styled-icons/fa-solid/Check';
import styled from 'styled-components';

// TODO (hover background-color) coming from theme? Refactor when decision has been made
const MultiSelectListItemOption = styled('option')`
  padding: 0.625rem 0; /* 10px if base font-size is 16px */
  margin: 1px;
  line-height: 1;
  cursor: pointer;

  :focus {
    outline: 1px solid #5e9ed6;
  }

  :hover {
    background-color: #f0f0f0;
  }

  &.selected {
    display: flex;
    justify-content: space-between;

    &:after {
      content: '';
      display: block;
      width: 3px;
      height: 6px;
      border: solid #000;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
`;

// const MultiSelectCheckbox = styled('input')`
//   visibility: hidden;
// `;

// const MultiSelectLisItemLabel = styled('label')`
//   display: flex;
//   justify-content: space-between;
//   padding: 0.625rem 0; /* 10px if base font-size is 16px */
//   margin: 1px;
//   line-height: 1;
//   cursor: pointer;

//   :focus {
//     outline: 1px solid #5e9ed6;
//   }
// `;

// const MultiSelectCheckIcon = styled(Check)`
//   visibility: ${props => (props.checked ? 'visible' : 'hidden')};
//   height: 1rem;
// `;

const MultiSelectListItem = React.forwardRef((props, ref) => {
  const { label, id, selected } = props;

  return (
    <>
      <MultiSelectListItemOption
        {...(selected ? { className: 'multiselect-list-item selected' } : { className: 'multiselect-list-item' })}
        value={id}
        ref={ref}
      >
        {label}
      </MultiSelectListItemOption>
    </>
  );
});

MultiSelectListItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};

export default MultiSelectListItem;
