import React from 'react';
import ReactDOM from 'react-dom/client';
import renderer, { create } from 'react-test-renderer';
import { act } from '@testing-library/react';
import MultiSelect from '../lib/MultiSelect/MultiSelect';
import { MultiSelectProps } from '../../types';

describe('<MultiSelect />', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
    }
  });

  const multiSelectProps: MultiSelectProps = {
    list: [
      {
        label: 'First option',
        name: 'first-option',
        id: 'first-option-1',
        checked: false,
      },
      {
        label: 'Second option',
        name: 'second-option',
        id: 'second-option-2',
        checked: false,
      },
      {
        label: 'Third option',
        name: 'third-option',
        id: 'third-option-3',
        checked: false,
      },
    ],
    onSelectionApplied: (selection) => {
      console.log('Selected : ', selection);
    },
    onOptionChanged: (optionState) => {
      console.log('optionState : ', optionState);
    },
    dropdownButtonText: 'Selected',
    resetButtonText: 'Reset',
    applyButtonText: 'Apply',
  };

  test('should match snapshot - dropdown closed', () => {
    const testRenderer = create(<MultiSelect {...multiSelectProps} />);

    expect(testRenderer.toJSON()).toMatchSnapshot('dropdown closed');
  });

  test('should match snapshot - dropdown opened', () => {
    const testRenderer = create(<MultiSelect {...multiSelectProps} />);
    const testInstance = testRenderer.root;

    renderer.act(() => {
      testInstance.findByProps({ className: 'multiselect-button-dropdown' }).props.onClick();
    });

    expect(testRenderer.toJSON()).toMatchSnapshot('dropdown opened');
  });

  test('should open dropdown when button is clicked', () => {
    const testRenderer = create(<MultiSelect {...multiSelectProps} />);
    const testInstance = testRenderer.root;
    const buttonDropdown = testInstance.findByProps({ className: 'multiselect-button-dropdown' });

    expect(buttonDropdown).toBeDefined();

    renderer.act(() => {
      buttonDropdown.props.onClick();
    });

    const listWrapper = testInstance.findByProps({ className: 'multiselect-section-wrapper' });

    expect(listWrapper).toBeDefined();
  });

  test('should select the first item clicking on its input checkbox', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    const firstOptionCheckbox: HTMLInputElement | null = firstOptionLabel.querySelector(
      'input.multiselect-list-item-checkbox'
    );

    if (!firstOptionCheckbox) {
      throw new Error('No checkbox found');
    }
    act(() => {
      firstOptionCheckbox.dispatchEvent(new MouseEvent('click'));
    });

    expect(firstOptionCheckbox.checked).toBeTruthy();
  });

  test('should select the first item clicking on its label', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    const firstOptionCheckbox: HTMLInputElement | null = firstOptionLabel.querySelector(
      'input.multiselect-list-item-checkbox'
    );
    console.log('firstOptionCheckbox : ', firstOptionCheckbox);

    act(() => {
      firstOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    if (!firstOptionCheckbox) {
      throw new Error('No checkbox found');
    }
    expect(firstOptionCheckbox.checked).toBeTruthy();
  });

  test('should unselect the first item', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    const firstOptionCheckbox: HTMLInputElement | null = firstOptionLabel.querySelector(
      'input.multiselect-list-item-checkbox'
    );

    act(() => {
      firstOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    if (!firstOptionCheckbox) {
      throw new Error('No checkbox found');
    }
    expect(firstOptionCheckbox.checked).toBeTruthy();

    act(() => {
      firstOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    expect(firstOptionCheckbox.checked).toBeFalsy();
  });

  test('should apply selections', () => {
    const spyApply = jest.spyOn(multiSelectProps, 'onSelectionApplied');
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    act(() => {
      firstOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    const applyButton = container.querySelector('button.multiselect-apply-button');
    if (!applyButton) {
      throw new Error('No applyButton found');
    }
    act(() => {
      applyButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyApply).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': false,
      'third-option-3': false,
    });
  });

  test('should badge have the right quantity', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    act(() => {
      firstOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    const badge = container.querySelector('span.multiselect-badge');
    if (!badge) {
      throw new Error('No badge found');
    }
    expect(badge.textContent).toBe('1');

    const lastOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[2];
    act(() => {
      lastOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    expect(badge.textContent).toBe('2');
  });

  test('should select all items', () => {
    const spyOptionChanged = jest.spyOn(multiSelectProps, 'onOptionChanged');
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const buttonSelectAll = container.querySelector('button.multiselect-button-select-all');
    if (!buttonSelectAll) {
      throw new Error('No buttonSelectAll found');
    }
    act(() => {
      buttonSelectAll.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': true,
      'third-option-3': true,
    });
  });

  test('should reset selection', () => {
    const spyOptionChanged = jest.spyOn(multiSelectProps, 'onOptionChanged');
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const buttonSelectAll = container.querySelector('button.multiselect-button-select-all');
    if (!buttonSelectAll) {
      throw new Error('No buttonSelectAll found');
    }
    act(() => {
      buttonSelectAll.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': true,
      'third-option-3': true,
    });

    act(() => {
      buttonSelectAll.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': false,
      'second-option-2': false,
      'third-option-3': false,
    });
  });

  test('should trigger option changed', () => {
    const spyOptionChanged = jest.spyOn(multiSelectProps, 'onOptionChanged');
    act(() => {
      ReactDOM.createRoot(container).render(<MultiSelect {...multiSelectProps} />);
    });

    const buttonDropdown = container.querySelector('button.multiselect-button-dropdown');
    if (!buttonDropdown) {
      throw new Error('No buttonDropdown found');
    }
    act(() => {
      buttonDropdown.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const firstOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[0];
    act(() => {
      firstOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': false,
      'third-option-3': false,
    });

    const lastOptionLabel = container.querySelectorAll('label.multiselect-list-item-label')[2];
    act(() => {
      lastOptionLabel.dispatchEvent(new MouseEvent('click'));
    });

    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': false,
      'third-option-3': true,
    });
  });
});
