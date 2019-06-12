import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MultiSelect from '../lib/MultiSelect/MultiSelect';

describe('<MultiSelect />', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const multiSelectProps = {
    list: [
      {
        label: 'First option',
        name: 'first-option',
        id: 'first-option-1',
        checked: false
      },
      {
        label: 'Second option',
        name: 'second-option',
        id: 'second-option-2',
        checked: false
      },
      {
        label: 'Third option',
        name: 'third-option',
        id: 'third-option-3',
        checked: false
      }
    ],
    onSelectionApplied: selection => {
      console.log('Selected : ', selection);
    },
    onOptionChanged: optionState => {
      console.log('optionState : ', optionState);
    },
    dropdownButtonText: 'Selected',
    resetButtonText: 'Reset',
    applyButtonText: 'Apply'
  };

  test('should match snapshot - dropdown closed', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    expect(wrapper.getDOMNode()).toMatchSnapshot();
  });

  test('should match snapshot - dropdown opened', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);
    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    expect(wrapper.getDOMNode()).toMatchSnapshot();
  });

  test('should open dropdown when button is clicked', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    expect(wrapper.find('button.multiselect-button-dropdown')).toBeDefined();
    expect(wrapper.find('.multiselect-section-wrapper').get(0)).toBeUndefined();

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    expect(wrapper.find('.multiselect-section-wrapper')).toBeDefined();
  });

  test('should select the first item clicking on its input checkbox', () => {
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    const firstOptionCheckbox = firstOptionLabel.querySelector('input.multiselect-list-item-checkbox');

    act(() => {
      firstOptionCheckbox.dispatchEvent(new MouseEvent('click'));
    });

    expect(firstOptionCheckbox.checked).toBeTruthy();
  });

  test('should select the first item clicking on its label', () => {
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    const firstOptionCheckbox = firstOptionLabel.querySelector('input.multiselect-list-item-checkbox');

    act(() => {
      firstOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    expect(firstOptionCheckbox.checked).toBeTruthy();
  });

  test('should unselect the first item', () => {
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    const firstOptionCheckbox = firstOptionLabel.querySelector('input.multiselect-list-item-checkbox');

    act(() => {
      firstOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    expect(firstOptionCheckbox.checked).toBeTruthy();

    act(() => {
      firstOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    expect(firstOptionCheckbox.checked).toBeFalsy();
  });

  test('should apply selections', () => {
    const spyApply = jest.spyOn(multiSelectProps, 'onSelectionApplied');
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    act(() => {
      firstOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    const applyButton = container.querySelector('button.multiselect-apply-button');
    act(() => {
      applyButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyApply).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': false,
      'third-option-3': false
    });
  });

  test('should badge have the right quantity', () => {
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    act(() => {
      firstOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    const badge = container.querySelector('span.multiselect-badge');
    expect(badge.textContent).toBe('1');

    const lastOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[2];
    act(() => {
      lastOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    expect(badge.textContent).toBe('2');
  });

  test('should select all items', () => {
    const spyOptionChanged = jest.spyOn(multiSelectProps, 'onOptionChanged');
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const buttonSelectAll = container.querySelector('button.multiselect-button-select-all');
    act(() => {
      buttonSelectAll.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': true,
      'third-option-3': true
    });
  });

  test('should reset selection', () => {
    const spyOptionChanged = jest.spyOn(multiSelectProps, 'onOptionChanged');
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const buttonSelectAll = container.querySelector('button.multiselect-button-select-all');
    act(() => {
      buttonSelectAll.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': true,
      'third-option-3': true
    });

    act(() => {
      buttonSelectAll.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': false,
      'second-option-2': false,
      'third-option-3': false
    });
  });

  test('should trigger option changed', () => {
    const spyOptionChanged = jest.spyOn(multiSelectProps, 'onOptionChanged');
    act(() => {
      ReactDOM.render(<MultiSelect {...multiSelectProps} />, container);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    act(() => {
      firstOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': false,
      'third-option-3': false
    });

    const lastOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[2];
    act(() => {
      lastOptionLabel.dispatchEvent(new KeyboardEvent('click'));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': false,
      'third-option-3': true
    });
  });
});
