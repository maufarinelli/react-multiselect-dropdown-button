import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttonCSS } from './MultiSelect.styles';

const MultiSelectListFooter = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 1.25rem; /* 20px if base font-size is 16px */
  border-top: 1px #ccc solid;
`;

const MultiSelectApplyButton = styled('button')`
  ${buttonCSS}
`;

const MultiSelectFooter = ({ applyButtonText = 'Apply', handleApplyClick }) => (
  <MultiSelectListFooter>
    <MultiSelectApplyButton className="multiselect-apply-button" onClick={handleApplyClick}>
      {applyButtonText}
    </MultiSelectApplyButton>
  </MultiSelectListFooter>
);

MultiSelectFooter.propTypes = {
  applyButtonText: PropTypes.string,
  handleApplyClick: PropTypes.func
};

export default MultiSelectFooter;
