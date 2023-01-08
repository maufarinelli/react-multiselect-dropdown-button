export interface List {
  label: string;
  name?: string;
  id: string | number;
  checked: boolean;
}

export interface CheckedItems {
  [key: string]: boolean;
}

export interface MultiSelectProps {
  list: List[];
  dropdownButtonText: string;
  isRightAligned?: boolean;
  onOptionChanged?: (optionState: CheckedItems) => void;
  onSelectionApplied?: (selectionList: CheckedItems) => void;
  selectAllButtonText?: string;
  resetButtonText?: string;
  applyButtonText?: string;
  closeDropdownOnApply?: boolean;
}
