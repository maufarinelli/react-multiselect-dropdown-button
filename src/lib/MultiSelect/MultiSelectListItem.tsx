import React from 'react';
import styled from 'styled-components';

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
  white-space: nowrap;
  cursor: pointer;

  :focus {
    outline: 1px solid #5e9ed6;
  }

  &.is-checked {
    :after {
      content: '';
      display: block;
      width: 5px;
      height: 10px;
      margin-right: 3px;
      border: solid #000;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
`;

interface MultiSelectListItemProps {
  label: string;
  id: string | number;
  handleInputChange: (event: React.KeyboardEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  name?: string;
}

const MultiSelectListItem = React.forwardRef<HTMLLabelElement, MultiSelectListItemProps>((props, ref) => {
  const { label, name, id, handleInputChange, checked } = props;

  return (
    <MultiSelectListItemLi className="multiselect-list-item" role="option">
      <MultiSelectLisItemLabel
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        htmlFor={id?.toString()}
        onKeyPress={handleInputChange}
        ref={ref}
        className={checked ? 'multiselect-list-item-label is-checked' : 'multiselect-list-item-label'}
      >
        {label}
        <MultiSelectCheckbox
          className="multiselect-list-item-checkbox"
          type="checkbox"
          name={name}
          id={id?.toString()}
          onChange={handleInputChange}
          checked={checked}
        />
      </MultiSelectLisItemLabel>
    </MultiSelectListItemLi>
  );
});

export default MultiSelectListItem;
