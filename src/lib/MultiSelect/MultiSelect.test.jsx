import React from 'react';
import { mount } from 'enzyme';
import MultiSelect from './MultiSelect';

describe('<MultiSelect />', () => {
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

    expect(wrapper).toMatchSnapshot();
  });

  test('should match snapshot - dropdown opened', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);
    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });

  test('should open dropdown when button is clicked', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    expect(wrapper.find('button.multiselect-button-dropdown')).toBeDefined();
    expect(wrapper.find('.multiselect-section-wrapper').get(0)).toBeUndefined();

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    expect(wrapper.find('.multiselect-section-wrapper')).toBeDefined();
  });

  test('should select the first item', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstOptionLabel = wrapper.find('label.multiselect-list-item-label').first();
    const firstOptionCheckbox = firstOptionLabel.find('input.multiselect-list-item-checkbox');
    const firstOptionCheckboxId = firstOptionCheckbox.prop('id');
    const firstOptionState = wrapper.state().checkedItems[firstOptionCheckboxId];

    firstOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: firstOptionCheckboxId, checked: firstOptionState }]
      },
      preventDefault: () => {}
    });

    expect(wrapper.state().checkedItems[firstOptionCheckboxId]).toBeTruthy();
  });

  test('should unselect the first item', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstOptionLabel = wrapper.find('label.multiselect-list-item-label').first();
    const firstOptionCheckbox = firstOptionLabel.find('input.multiselect-list-item-checkbox');
    const firstOptionCheckboxId = firstOptionCheckbox.prop('id');

    firstOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: firstOptionCheckboxId, checked: wrapper.state().checkedItems[firstOptionCheckboxId] }]
      },
      preventDefault: () => {}
    });

    expect(wrapper.state().checkedItems[firstOptionCheckboxId]).toBeTruthy();

    firstOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: firstOptionCheckboxId, checked: wrapper.state().checkedItems[firstOptionCheckboxId] }]
      },
      preventDefault: () => {}
    });

    expect(wrapper.state().checkedItems[firstOptionCheckboxId]).toBeFalsy();
  });

  test('should reset selection', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstOptionLabel = wrapper.find('label.multiselect-list-item-label').first();
    const firstOptionCheckboxId = firstOptionLabel.find('input.multiselect-list-item-checkbox').prop('id');
    const firstOptionState = wrapper.state().checkedItems[firstOptionCheckboxId];

    firstOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: firstOptionCheckboxId, checked: firstOptionState }]
      },
      preventDefault: () => {}
    });

    const lastOptionLabel = wrapper.find('label.multiselect-list-item-label').last();
    const lastOptionCheckboxId = lastOptionLabel.find('input.multiselect-list-item-checkbox').prop('id');
    const lastOptionState = wrapper.state().checkedItems[lastOptionCheckboxId];

    lastOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: lastOptionCheckboxId, checked: lastOptionState }]
      },
      preventDefault: () => {}
    });

    expect(wrapper.state().checkedItems[firstOptionCheckboxId]).toBeTruthy();
    expect(wrapper.state().checkedItems[lastOptionCheckboxId]).toBeTruthy();

    wrapper.find('button.multiselect-reset-button').simulate('click');

    expect(wrapper.state().checkedItems[firstOptionCheckboxId]).toBeFalsy();
    expect(wrapper.state().checkedItems[lastOptionCheckboxId]).toBeFalsy();
  });

  test('should apply selections', () => {
    const spyApply = jest.spyOn(multiSelectProps, 'onSelectionApplied');
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstOptionLabel = wrapper.find('label.multiselect-list-item-label').first();
    const firstOptionCheckboxId = firstOptionLabel.find('input.multiselect-list-item-checkbox').prop('id');
    const firstOptionState = wrapper.state().checkedItems[firstOptionCheckboxId];

    firstOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: firstOptionCheckboxId, checked: firstOptionState }]
      },
      preventDefault: () => {}
    });

    wrapper.find('button.multiselect-apply-button').simulate('click');
    expect(spyApply).toHaveBeenCalledWith({
      'first-option-1': true,
      'second-option-2': false,
      'third-option-3': false
    });
  });

  test('should badge have the right quantity', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstOptionLabel = wrapper.find('label.multiselect-list-item-label').first();
    const firstOptionCheckboxId = firstOptionLabel.find('input.multiselect-list-item-checkbox').prop('id');
    const firstOptionState = wrapper.state().checkedItems[firstOptionCheckboxId];

    firstOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: firstOptionCheckboxId, checked: firstOptionState }]
      },
      preventDefault: () => {}
    });

    const badge = wrapper.find('span.multiselect-badge');
    expect(badge.text()).toBe('1');

    const lastOptionLabel = wrapper.find('label.multiselect-list-item-label').last();
    const lastOptionCheckboxId = lastOptionLabel.find('input.multiselect-list-item-checkbox').prop('id');
    const lastOptionState = wrapper.state().checkedItems[lastOptionCheckboxId];

    lastOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: lastOptionCheckboxId, checked: lastOptionState }]
      },
      preventDefault: () => {}
    });

    expect(badge.text()).toBe('2');
  });

  test('should select all items', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const buttonSelectAll = wrapper.find('button.multiselect-button-select-all');
    buttonSelectAll.simulate('click');

    const checkedItemsState = wrapper.state().checkedItems;

    for (const item in checkedItemsState) {
      expect(item).toBeTruthy();
    }
  });

  test('should trigger option changed', () => {
    const spyOptionChanged = jest.spyOn(multiSelectProps, 'onOptionChanged');
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstOptionLabel = wrapper.find('label.multiselect-list-item-label').first();
    const firstOptionCheckboxId = firstOptionLabel.find('input.multiselect-list-item-checkbox').prop('id');
    const firstOptionState = wrapper.state().checkedItems[firstOptionCheckboxId];

    firstOptionLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ id: firstOptionCheckboxId, checked: firstOptionState }]
      },
      preventDefault: () => {}
    });
    expect(spyOptionChanged).toHaveBeenCalledWith({
      'first-option-1': true
    });
  });
});
