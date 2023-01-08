declare module 'react-multiselect-button-dropdown' {
  import { Component } from 'react';

  type List = {
    label: string;
    name?: string;
    id: string | number;
    checked: boolean;
  };

  interface CheckedItems {
    [key: string]: boolean;
  }

  interface MultiSelectProps {
    list: List[];
    dropdownButtonText: string;
    isRightAligned?: boolean;
    onOptionChanged?: (optionState: CheckedItems) => void;
    onSelectionApplied?: (selectionList: CheckedItems) => void;
    selectAllButtonText?: string;
    resetButtonText?: string;
    applyButtonText?: string;
  }

  export default class MultiSelect extends Component<MultiSelectProps, {}> {}
}
