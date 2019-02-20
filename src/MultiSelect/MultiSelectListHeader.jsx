import React from "react";
import PropTypes from "prop-types";
import { UndoAlt } from "styled-icons/fa-solid/UndoAlt";
import { Times } from "styled-icons/fa-solid/Times";
import styled from "styled-components";

// TODO (border-color???) coming from theme? Refactor when decision has been made
const MultiSelectSectionHeader = styled("div")`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px #d1d1d1 solid;
`;

// TODO (color?) coming from theme? Refactor when decision has been made
const MultiSelectResetButton = styled("button")`
  padding: 0.625rem 0; /* 10px if base font-size is 16px */
  margin: 0 0.625rem; /* 10px if base font-size is 16px */
  color: #0b5fff;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const MultiSelectResetIcon = styled(UndoAlt)`
  width: 0.75rem; /* 10px if base font-size is 16px */
  margin: 0 0.625rem; /* 10px if base font-size is 16px */
  padding: 0.625rem 0; /* 10px if base font-size is 16px */
  vertical-align: middle;
  transform: scaleX(-1);
`;

const MultiSelectCloseButton = styled("button")`
  width: 1.625rem; /* 26px if base font-size is 16px */
  margin: 0 0.625rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const MultiSelectListHeader = ({
  resetFilters,
  resetButtonText,
  closeButtonAriaLabel,
  toggleFilterDropdown
}) => (
  <MultiSelectSectionHeader>
    <MultiSelectResetButton onClick={resetFilters}>
      <MultiSelectResetIcon /> {resetButtonText}
    </MultiSelectResetButton>
    <MultiSelectCloseButton
      onClick={toggleFilterDropdown}
      aria-label={closeButtonAriaLabel}
    >
      <Times />
    </MultiSelectCloseButton>
  </MultiSelectSectionHeader>
);

MultiSelectListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  resetFilters: PropTypes.func.isRequired,
  resetButtonText: PropTypes.string.isRequired,
  closeButtonAriaLabel: PropTypes.string.isRequired,
  toggleFilterDropdown: PropTypes.func.isRequired
};

export default MultiSelectListHeader;
