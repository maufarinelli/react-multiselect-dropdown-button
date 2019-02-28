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

  test('should select the first item to filter', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstFilterLabel = wrapper.find('.multiselect-list-item-label').first();
    const firstFilterCheckbox = firstFilterLabel.find('.multiselect-list-item-checkbox').first();
    const firstFilterCheckboxId = firstFilterCheckbox.prop('id');
    //const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxId];

    // firstFilterLabel.prop('onClick')({
    //   target: {
    //     tagName: 'LABEL',
    //     children: [{ name: firstFilterCheckboxId, checked: firstFilterState }]
    //   }
    // });
    firstFilterLabel.simulate('click');

    expect(wrapper.state().checkedItems[firstFilterCheckboxId]).toBeTruthy();
  });

  // test('should unselect the first item to filter', () => {
  //   const wrapper = mount(<MultiSelect {...multiSelectProps} />);

  //   wrapper.find('.multiselect-button-dropdown').simulate('click');

  //   const firstFilterLabel = wrapper.find('.multiselect-list-item-label').first();
  //   const firstFilterCheckbox = firstFilterLabel.find('.multiselect-list-item-checkbox');
  //   const firstFilterCheckboxName = firstFilterCheckbox.prop('name');

  //   firstFilterLabel.prop('onKeyPress')({
  //     target: {
  //       tagName: 'LABEL',
  //       children: [{ name: firstFilterCheckboxName, checked: wrapper.state().checkedItems[firstFilterCheckboxName] }]
  //     }
  //   });

  //   expect(wrapper.state().checkedItems[firstFilterCheckboxName]).toBeTruthy();

  //   firstFilterLabel.prop('onKeyPress')({
  //     target: {
  //       tagName: 'LABEL',
  //       children: [{ name: firstFilterCheckboxName, checked: wrapper.state().checkedItems[firstFilterCheckboxName] }]
  //     }
  //   });

  //   expect(wrapper.state().checkedItems[firstFilterCheckboxName]).toBeFalsy();
  // });

  test('should reset filter selection', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('button.multiselect-button-dropdown').simulate('click');

    const firstFilterLabel = wrapper.find('.multiselect-list-item-label').first();
    const firstFilterCheckboxId = firstFilterLabel
      .find('.multiselect-list-item-checkbox')
      .first()
      .prop('id');
    // const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxId];

    // firstFilterLabel.prop('onKeyPress')({
    //   target: {
    //     tagName: 'LABEL',
    //     children: [{ id: firstFilterCheckboxId, checked: firstFilterState }]
    //   }
    // });
    firstFilterLabel.simulate('click');

    const lastFilterLabel = wrapper.find('.multiselect-list-item-label').last();
    const lastFilterCheckboxId = lastFilterLabel
      .find('.multiselect-list-item-checkbox')
      .last()
      .prop('id');
    // const lastFilterState = wrapper.state().checkedItems[lastFilterCheckboxId];

    // lastFilterLabel.prop('onKeyPress')({
    //   target: {
    //     tagName: 'LABEL',
    //     children: [{ id: lastFilterCheckboxId, checked: lastFilterState }]
    //   }
    // });
    lastFilterLabel.simulate('click');

    expect(wrapper.state().checkedItems[firstFilterCheckboxId]).toBeTruthy();
    expect(wrapper.state().checkedItems[lastFilterCheckboxId]).toBeTruthy();

    wrapper.find('button.multiselect-reset-button').simulate('click');

    expect(wrapper.state().checkedItems[firstFilterCheckboxId]).toBeFalsy();
    expect(wrapper.state().checkedItems[lastFilterCheckboxId]).toBeFalsy();
  });

  test('should apply filters', () => {
    const spyApply = jest.spyOn(multiSelectProps, 'onSelectionApplied');
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('.multiselect-button-dropdown').simulate('click');

    const firstFilterLabel = wrapper.find('.multiselect-list-item-label').first();
    const firstFilterCheckboxName = firstFilterLabel.find('.multiselect-list-item-checkbox').prop('name');
    const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxName];

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: firstFilterState }]
      }
    });

    wrapper.find('.multiselect-apply-button').simulate('click');
    expect(spyApply).toHaveBeenCalledWith({ filter1: true, filter2: false, filter3: false });
  });

  test('should badge have the right quantity', () => {
    const wrapper = mount(<MultiSelect {...multiSelectProps} />);

    wrapper.find('.multiselect-button-dropdown').simulate('click');

    const firstFilterLabel = wrapper.find('.multiselect-list-item-label').first();
    const firstFilterCheckboxName = firstFilterLabel.find('.multiselect-list-item-checkbox').prop('name');
    const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxName];

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: firstFilterState }]
      }
    });

    const badge = wrapper.find('.multiselect-badge');
    expect(badge.text()).toBe('1');

    const lastFilterLabel = wrapper.find('.multiselect-list-item-label').last();
    const lastFilterCheckboxName = lastFilterLabel.find('.multiselect-list-item-checkbox').prop('name');
    const lastFilterState = wrapper.state().checkedItems[lastFilterCheckboxName];

    lastFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: lastFilterCheckboxName, checked: lastFilterState }]
      }
    });

    expect(badge.text()).toBe('2');
  });
});
