import styled, { css } from 'styled-components';
import ListboxKeyEvents from '../react-listbox-key-events/ListboxKeyEvents';

export const MultiSelectWrapper = styled('div')`
  position: relative;
`;

export const MultiSelectListWrapper = styled('div')`
  position: absolute;
  right: ${props => (props.isRightAligned ? '0' : 'auto')};
  min-width: 170px;
  padding: 1.25rem; /* 20px if base font-size is 16px */
  border: 1px #000 solid;
`;

const buttonHeight = '4.125rem'; /* 66px if base font-size is 16px */
const selectAllButtonHeight = '3.125rem'; /* 50px if base font-size is 16px */
const paddingList = '2.625rem'; /* 42px if base font-size is 16px */
const footerHeight = '3.75rem'; /* 60px if base font-size is 16px */

export const MultiSelectList = styled(ListboxKeyEvents)`
  max-height: ${props => `calc(100vh - ${buttonHeight} - ${paddingList} - ${selectAllButtonHeight} - ${props.hasFooter ? footerHeight : '0px'})`};
  margin: 0;
  overflow: auto;
  padding-left: 0;
  list-style: none;
`;

export const buttonCSS = css`
  display: block;
  height: 40px;
  padding: 0 0.625rem;
  font-family: inherit;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 0;
  cursor: pointer;
`;

export const MultiSelectAllButton = styled('button')`
  ${buttonCSS}
  margin-bottom: 10px;
`;
