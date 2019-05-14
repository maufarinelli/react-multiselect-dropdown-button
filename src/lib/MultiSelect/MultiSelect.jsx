import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MultiSelectWrapper, MultiSelectListWrapper, MultiSelectList } from './MultiSelect.styles';
import MultiSelectDropdown from './MultiSelectDropdown';
import MultiSelectListButtons from './MultiSelectListButtons';
import MultiSelectListItem from './MultiSelectListItem';
import MultiSelectFooter from './MultiSelectFooter';

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
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    list.reduce((acc, listItem) => {
      acc[listItem.id] = listItem.checked;
      return acc;
    }, {})
  );
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

  useEffect(() => {
    if (isDropdownOpened) {
      listItems[0].focus();
    }
  }, [isDropdownOpened]);

  const toggleDropdown = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  const selectAll = () => {
    setCheckedItems(
      Object.keys(checkedItems).reduce((acc, listItemId) => {
        acc[listItemId] = true;
        return acc;
      }, {})
    );
  };

  const resetSelections = () => {
    setCheckedItems(
      Object.keys(checkedItems).reduce((acc, listItemName) => {
        acc[listItemName] = false;
        return acc;
      }, {})
    );
  };

  const handleInputChange = event => {
    const tag = event.target.tagName;
    const target = tag === 'LABEL' ? event.target.children[0] : event.target;
    // If user used the keyboard to select the label, we need to programatically check the checkbox child.
    // Also needed to work with screen readers
    if (tag === 'LABEL') {
      target.checked = !target.checked;
      // preventing just after toggle checked property in order to prevent the space scroll behavior on a list
      event.preventDefault();
    }
    const { id, checked } = target;

    setCheckedItems({ ...checkedItems, [id]: checked });

    onOptionChanged && onOptionChanged({ [id]: checked });
  };

  const handleApplyClick = () => {
    onSelectionApplied(checkedItems);
  };

  const checkedItemsQuantity = Object.keys(checkedItems).filter(itemName => checkedItems[itemName]).length;

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
