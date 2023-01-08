import React from 'react';
import { MultiSelectAllButton, MultiSelectResetButton, MultiSelectListButtonsWrapper } from './MultiSelect.styles';

interface MultiSelectListButtonsProps {
  selectAll: () => void;
  selectAllButtonText?: string;
  resetSelections: () => void;
  resetButtonText?: string;
}

const MultiSelectListButtons: React.FC<MultiSelectListButtonsProps> = ({
  selectAll,
  selectAllButtonText = 'Select All',
  resetSelections,
  resetButtonText = 'Reset',
}) => (
  <MultiSelectListButtonsWrapper>
    <MultiSelectAllButton className="multiselect-button-select-all" onClick={selectAll}>
      {selectAllButtonText}
    </MultiSelectAllButton>
    <MultiSelectResetButton className="multiselect-reset-button" onClick={resetSelections}>
      {resetButtonText}
    </MultiSelectResetButton>
  </MultiSelectListButtonsWrapper>
);

export default MultiSelectListButtons;
