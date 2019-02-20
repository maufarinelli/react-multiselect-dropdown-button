import React from 'react';
import { mount } from 'enzyme';
import MultiSelect from './MultiSelect';

describe('<MultiSelect />', () => {
  const props = {
    title: 'Filter',
    resetButtonText: 'Reset filters',
    closeButtonAriaLabel: 'Close button',
    applyButtonText: 'Apply',
    list: [
      {
        label: 'Filter 1',
        name: 'filter1',
        id: 'filter1'
      },
      {
        label: 'Filter 2',
        name: 'filter2',
        id: 'filter2'
      },
      {
        label: 'Filter 3',
        name: 'filter3',
        id: 'filter3'
      }
    ],
    onFiltersApplied: filters => filters
  };

  test('should match snapshot - dropdown closed', () => {
    const wrapper = mount(<MultiSelect {...props} />)
      .find('.sls-filter')
      .getDOMNode();

    expect(wrapper).toMatchSnapshot();
  });

  test('should match snapshot - dropdown opened', () => {
    const wrapper = mount(<MultiSelect {...props} />);
    wrapper.find('.sls-filter-button').simulate('click');

    expect(wrapper.find('.sls-filter').getDOMNode()).toMatchSnapshot();
  });

  test('should open dropdown when button is clicked', () => {
    const wrapper = mount(<Filter {...props} />);

    expect(wrapper.find('.sls-filter-button').get(0)).toBeDefined();
    expect(wrapper.find('.sls-filter-section').get(0)).toBeUndefined();

    wrapper.find('.sls-filter-button').simulate('click');

    expect(wrapper.find('.sls-filter-button').get(0)).toBeUndefined();
    expect(wrapper.find('.sls-filter-section').get(0)).toBeDefined();
  });

  test('should close dropdown when close-button is clicked', () => {
    const wrapper = mount(<Filter {...props} />);

    wrapper.find('.sls-filter-button').simulate('click');

    expect(wrapper.find('.sls-filter-button').get(0)).toBeUndefined();
    expect(wrapper.find('.sls-filter-section').get(0)).toBeDefined();

    wrapper.find('.sls-close-button').simulate('click');

    expect(wrapper.find('.sls-filter-button').get(0)).toBeDefined();
    expect(wrapper.find('.sls-filter-section').get(0)).toBeUndefined();
  });

  test('should select the first item to filter', () => {
    const wrapper = mount(<Filter {...props} />);

    wrapper.find('.sls-filter-button').simulate('click');

    const firstFilterLabel = wrapper.find('.sls-filter-list-item-label').first();
    const firstFilterCheckbox = firstFilterLabel.find('.sls-filter-list-item-checkbox');
    const firstFilterCheckboxName = firstFilterCheckbox.prop('name');
    const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxName];

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: firstFilterState }]
      }
    });

    expect(wrapper.state().checkedItems[firstFilterCheckboxName]).toBeTruthy();
  });

  test('should unselect the first item to filter', () => {
    const wrapper = mount(<Filter {...props} />);

    wrapper.find('.sls-filter-button').simulate('click');

    const firstFilterLabel = wrapper.find('.sls-filter-list-item-label').first();
    const firstFilterCheckbox = firstFilterLabel.find('.sls-filter-list-item-checkbox');
    const firstFilterCheckboxName = firstFilterCheckbox.prop('name');

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: wrapper.state().checkedItems[firstFilterCheckboxName] }]
      }
    });

    expect(wrapper.state().checkedItems[firstFilterCheckboxName]).toBeTruthy();

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: wrapper.state().checkedItems[firstFilterCheckboxName] }]
      }
    });

    expect(wrapper.state().checkedItems[firstFilterCheckboxName]).toBeFalsy();
  });

  test('should reset filter selection', () => {
    const wrapper = mount(<Filter {...props} />);

    wrapper.find('.sls-filter-button').simulate('click');

    const firstFilterLabel = wrapper.find('.sls-filter-list-item-label').first();
    const firstFilterCheckboxName = firstFilterLabel.find('.sls-filter-list-item-checkbox').prop('name');
    const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxName];

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: firstFilterState }]
      }
    });

    const lastFilterLabel = wrapper.find('.sls-filter-list-item-label').last();
    const lastFilterCheckboxName = lastFilterLabel.find('.sls-filter-list-item-checkbox').prop('name');
    const lastFilterState = wrapper.state().checkedItems[lastFilterCheckboxName];

    lastFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: lastFilterCheckboxName, checked: lastFilterState }]
      }
    });

    expect(wrapper.state().checkedItems[firstFilterCheckboxName]).toBeTruthy();
    expect(wrapper.state().checkedItems[lastFilterCheckboxName]).toBeTruthy();

    wrapper.find('.sls-filter-reset').simulate('click');

    expect(wrapper.state().checkedItems[firstFilterCheckboxName]).toBeFalsy();
    expect(wrapper.state().checkedItems[lastFilterCheckboxName]).toBeFalsy();
  });

  test('should apply filters', () => {
    const spyApply = jest.spyOn(props, 'onFiltersApplied');
    const wrapper = mount(<Filter {...props} />);

    wrapper.find('.sls-filter-button').simulate('click');

    const firstFilterLabel = wrapper.find('.sls-filter-list-item-label').first();
    const firstFilterCheckboxName = firstFilterLabel.find('.sls-filter-list-item-checkbox').prop('name');
    const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxName];

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: firstFilterState }]
      }
    });

    wrapper.find('.sls-filter-apply-button.sls-button').simulate('click');
    expect(spyApply).toHaveBeenCalledWith({ filter1: true, filter2: false, filter3: false });
  });

  test('should badge have the right quantity', () => {
    const wrapper = mount(<Filter {...props} />);

    wrapper.find('.sls-filter-button').simulate('click');

    const firstFilterLabel = wrapper.find('.sls-filter-list-item-label').first();
    const firstFilterCheckboxName = firstFilterLabel.find('.sls-filter-list-item-checkbox').prop('name');
    const firstFilterState = wrapper.state().checkedItems[firstFilterCheckboxName];

    firstFilterLabel.prop('onKeyPress')({
      target: {
        tagName: 'LABEL',
        children: [{ name: firstFilterCheckboxName, checked: firstFilterState }]
      }
    });

    const badge = wrapper.find('.sls-filter-badge');
    expect(badge.text()).toBe('1');

    const lastFilterLabel = wrapper.find('.sls-filter-list-item-label').last();
    const lastFilterCheckboxName = lastFilterLabel.find('.sls-filter-list-item-checkbox').prop('name');
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
