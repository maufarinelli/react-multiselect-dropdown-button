import React from 'react';
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

interface MultiSelectFooterProps {
  handleApplyClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  applyButtonText?: string;
}

const MultiSelectFooter: React.FC<MultiSelectFooterProps> = ({ applyButtonText = 'Apply', handleApplyClick }) => (
  <MultiSelectListFooter>
    <MultiSelectApplyButton
      className="multiselect-apply-button"
      {...(handleApplyClick && { onClick: handleApplyClick })}
    >
      {applyButtonText}
    </MultiSelectApplyButton>
  </MultiSelectListFooter>
);

export default MultiSelectFooter;
