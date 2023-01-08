import { useState } from 'react';
import { CheckedItems, List } from '../../../types';

interface UseMultiSelectProps {
  list: List[];
}

interface UseMultiSelectState {
  isDropdownOpened: boolean;
  checkedItems: CheckedItems;
  toggleDropdown: () => void;
  selectAll: () => void;
  resetSelections: () => void;
  handleInputChange: (event: React.KeyboardEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

const useMultiSelect = ({ list }: UseMultiSelectProps): UseMultiSelectState => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const [checkedItems, setCheckedItems] = useState(
    list.reduce((acc: CheckedItems, listItem) => {
      acc[listItem.id] = listItem.checked;
      return acc;
    }, {})
  );

  const toggleDropdown = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  const selectAll = () => {
    setCheckedItems(
      Object.keys(checkedItems).reduce((acc: CheckedItems, listItemId) => {
        acc[listItemId] = true;
        return acc;
      }, {})
    );
  };

  const resetSelections = () => {
    setCheckedItems(
      Object.keys(checkedItems).reduce((acc: CheckedItems, listItemName) => {
        acc[listItemName] = false;
        return acc;
      }, {})
    );
  };

  const handleInputChange = (event: React.KeyboardEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target as HTMLElement;
    const tag = eventTarget.tagName;
    const target = (tag === 'LABEL' ? eventTarget.children[0] : event.target) as HTMLInputElement;
    // If user used the keyboard to select the label, we need to programatically check the checkbox child.
    // Also needed to work with screen readers
    if (tag === 'LABEL') {
      target.checked = !target.checked;
      // preventing just after toggle checked property in order to prevent the space scroll behavior on a list
      event.preventDefault();
    }
    const { id, checked } = target;

    setCheckedItems({ ...checkedItems, [id]: checked });
  };

  return {
    isDropdownOpened,
    checkedItems,
    toggleDropdown,
    selectAll,
    resetSelections,
    handleInputChange,
  };
};

export default useMultiSelect;
