import React, { useEffect, useRef } from 'react';
import { MultiSelectWrapper, MultiSelectListWrapper, MultiSelectList } from './MultiSelect.styles';
import MultiSelectDropdown from './MultiSelectDropdown';
import MultiSelectListButtons from './MultiSelectListButtons';
import MultiSelectListItem from './MultiSelectListItem';
import MultiSelectFooter from './MultiSelectFooter';
import useMultiSelect from './useMultiSelect';
import { MultiSelectProps } from '../../../types';

const MultiSelect: React.FC<MultiSelectProps> = ({
  list,
  dropdownButtonText,
  isRightAligned,
  selectAllButtonText,
  onOptionChanged,
  onSelectionApplied,
  resetButtonText,
  applyButtonText,
}) => {
  const { isDropdownOpened, checkedItems, toggleDropdown, selectAll, resetSelections, handleInputChange } =
    useMultiSelect({ list });
  const listItems: React.MutableRefObject<Array<HTMLLabelElement | undefined>> = useRef([]);
  const keyEvents = {
    up: () => {
      const activeElementIndex = listItems.current.findIndex((item) => {
        return item === document.activeElement;
      });
      listItems.current[activeElementIndex - 1]?.focus();
    },
    down: () => {
      const activeElementIndex = listItems.current.findIndex((item) => {
        return item === document.activeElement;
      });
      listItems.current[activeElementIndex + 1]?.focus();
    },
    home: () => {
      listItems.current[0]?.focus();
    },
    end: () => {
      listItems.current[listItems.current.length - 1]?.focus();
    },
  };
  const checkedItemsQuantity = Object.keys(checkedItems).filter((itemName) => checkedItems[itemName]).length;

  useEffect(() => {
    if (isDropdownOpened) {
      listItems.current[0]?.focus();
    }
  }, [isDropdownOpened]);

  useEffect(() => {
    onOptionChanged && onOptionChanged(checkedItems);
  }, [onOptionChanged, checkedItems]);

  const handleApplyClick = () => {
    if (onSelectionApplied) {
      onSelectionApplied(checkedItems);
    }
  };

  return (
    <MultiSelectWrapper className="multiselect-button-dropdown-wrapper">
      <MultiSelectDropdown
        text={dropdownButtonText}
        quantity={checkedItemsQuantity}
        toggleDropdown={toggleDropdown}
        isOpened={isDropdownOpened}
      />
      {isDropdownOpened && (
        <MultiSelectListWrapper {...(isRightAligned ? { isRightAligned } : {})} className="multiselect-section-wrapper">
          <MultiSelectListButtons
            selectAll={selectAll}
            selectAllButtonText={selectAllButtonText}
            resetSelections={resetSelections}
            resetButtonText={resetButtonText}
          />
          <MultiSelectList
            role="listbox"
            tag="ul"
            hasFooter={!!onSelectionApplied}
            className="multiselect-list"
            keyEvents={{ ...keyEvents }}
          >
            {list.map((listItem, index) => {
              const { label, id, name } = listItem;
              const checked = checkedItems[id];
              const key = `${id}-${index}`;

              return (
                <MultiSelectListItem
                  label={label}
                  key={key}
                  id={id}
                  name={name}
                  handleInputChange={handleInputChange}
                  checked={checked}
                  ref={(el: HTMLLabelElement) => {
                    listItems.current[index] = el;
                    return el;
                  }}
                />
              );
            })}
          </MultiSelectList>
          {onSelectionApplied && (
            <MultiSelectFooter applyButtonText={applyButtonText} handleApplyClick={handleApplyClick} />
          )}
        </MultiSelectListWrapper>
      )}
    </MultiSelectWrapper>
  );
};

export default MultiSelect;
