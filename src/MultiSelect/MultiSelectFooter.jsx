import React from 'react';
import PropTypes from 'prop-types';
import { UndoAlt } from 'styled-icons/fa-solid/UndoAlt';
import { Send } from 'styled-icons/feather/Send';
import styled, { css } from 'styled-components';

// TODO (border-color???) coming from theme?
const MultiSelectListFooter = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-top: 1.25rem; /* 20px if base font-size is 16px */
  border-top: 1px #ccc solid;
`;

const buttonCSS = css`
  display: block;
  height: 40px;
  padding: 0 0.625rem;
  font-family: inherit;
  font-size: inherit;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 0;
  cursor: pointer;
`;

const iconCSS = css`
  width: 0.75rem; /* 12px if base font-size is 16px */
  margin-right: 0.625rem; /* 10px if base font-size is 16px */
  vertical-align: baseline;
`;

// TODO (color?) coming from theme?
const MultiSelectResetButton = styled('button')`
  ${buttonCSS}
`;

const MultiSelectResetIcon = styled(UndoAlt)`
  ${iconCSS}
  transform: scaleX(-1);
`;

const MultiSelectApplyButton = styled('button')`
  ${buttonCSS}
  margin-left: 0.625rem;
`;

const MultiSelectApplyIcon = styled(Send)`
  ${iconCSS}
`;

const MultiSelectFooter = ({ resetSelections, resetButtonText = 'Reset', applyButtonText = 'Apply', handleApplyClick }) => (
  <MultiSelectListFooter>
    <MultiSelectResetButton className="multiselect-reset-button" onClick={resetSelections}>
      <MultiSelectResetIcon />
      {resetButtonText}
    </MultiSelectResetButton>
    <MultiSelectApplyButton className="multiselect-apply-button" onClick={handleApplyClick}>
      <MultiSelectApplyIcon />
      {applyButtonText}
    </MultiSelectApplyButton>
  </MultiSelectListFooter>
);

MultiSelectFooter.propTypes = {
  resetSelections: PropTypes.func.isRequired,
  resetButtonText: PropTypes.string.isRequired,
  applyButtonText: PropTypes.string.isRequired,
  handleApplyClick: PropTypes.func.isRequired
};

export default MultiSelectFooter;
