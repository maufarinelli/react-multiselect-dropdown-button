import React from 'react';
import PropTypes from 'prop-types';
import { MultiSelectAllButton, MultiSelectResetButton, MultiSelectListButtonsWrapper } from './MultiSelect.styles';

const MultiSelectListButtons = ({ selectAll, selectAllButtonText, resetSelections, resetButtonText }) => (
  <MultiSelectListButtonsWrapper>
    <MultiSelectAllButton className="multiselect-button-select-all" onClick={selectAll}>
      {selectAllButtonText}
    </MultiSelectAllButton>
    <MultiSelectResetButton className="multiselect-reset-button" onClick={resetSelections}>
      {resetButtonText}
    </MultiSelectResetButton>
  </MultiSelectListButtonsWrapper>
);

MultiSelectListButtons.propTypes = {
  selectAll: PropTypes.func.isRequired,
  resetSelections: PropTypes.func.isRequired,
  selectAllButtonText: PropTypes.string,
  resetButtonText: PropTypes.string
};

MultiSelectListButtons.defaultProps = {
  selectAllButtonText: 'Select All',
  resetButtonText: 'Reset'
};

export default MultiSelectListButtons;
