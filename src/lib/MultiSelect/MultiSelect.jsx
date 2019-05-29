import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MultiSelectWrapper, MultiSelectListWrapper, MultiSelectList } from './MultiSelect.styles';
import MultiSelectDropdown from './MultiSelectDropdown';
import MultiSelectListButtons from './MultiSelectListButtons';
import MultiSelectListItem from './MultiSelectListItem';
import MultiSelectFooter from './MultiSelectFooter';
import useMultiSelect from './useMultiSelect';

const MultiSelect = ({
  list,
  dropdownButtonText,
  isRightAligned,
  selectAllButtonText,
  onOptionChanged,
  onSelectionApplied,
  resetButtonText,
  applyButtonText
}) => {
  const {
    isDropdownOpened,
    checkedItems,
    toggleDropdown,
    selectAll,
    resetSelections,
    handleInputChange
  } = useMultiSelect({ list });
  const listItems = [];
  const keyEvents = {
    up: () => {
      const activeElementIndex = listItems.findIndex(item => {
        return item === document.activeElement;
      });
      listItems[activeElementIndex - 1] && listItems[activeElementIndex - 1].focus();
    },
    down: () => {
      const activeElementIndex = listItems.findIndex(item => {
        return item === document.activeElement;
      });
      listItems[activeElementIndex + 1] && listItems[activeElementIndex + 1].focus();
    },
    home: () => {
      listItems[0].focus();
    },
    end: () => {
      listItems[listItems.length - 1].focus();
    }
  };
  const checkedItemsQuantity = Object.keys(checkedItems).filter(itemName => checkedItems[itemName]).length;

  useEffect(() => {
    if (isDropdownOpened) {
      listItems[0].focus();
    }
  }, [isDropdownOpened]);

  useEffect(() => {
    onOptionChanged && onOptionChanged(checkedItems);
  }, [checkedItems]);

  const handleApplyClick = () => {
    onSelectionApplied(checkedItems);
  };

  return (
    <MultiSelectWrapper className="multiselect-button-dropdown-wrapper">
      <MultiSelectDropdown
        className="multiselect-button-dropdown"
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
                  className="multiselect-list-item"
                  label={label}
                  key={key}
                  id={id}
                  name={name}
                  handleInputChange={handleInputChange}
                  checked={checked}
                  ref={el => {
                    listItems[index] = el;
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

MultiSelect.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      checked: PropTypes.bool.isRequired
    })
  ).isRequired,
  dropdownButtonText: PropTypes.string.isRequired,
  isRightAligned: PropTypes.bool,
  selectAllButtonText: PropTypes.string,
  onOptionChanged: PropTypes.func,
  onSelectionApplied: PropTypes.func,
  resetButtonText: PropTypes.string,
  applyButtonText: PropTypes.string
};

export default MultiSelect;
