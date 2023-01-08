import React, { Component } from 'react';
import { CheckedItems } from '../types';
import MultiSelect from './lib/MultiSelect/MultiSelect';

class App extends Component {
  render() {
    const multiSelectProps = {
      list: [
        {
          label: 'First option',
          name: 'first-option',
          id: 'first-option-1',
          checked: true,
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
      onSelectionApplied: (selectionList: CheckedItems) => {
        console.log('Selected : ', selectionList);
      },
      dropdownButtonText: 'Selected',
      resetButtonText: 'Reset',
      applyButtonText: 'Apply',
    };

    const props2 = {
      ...multiSelectProps,
      list: [
        {
          label: 'First option',
          id: 'first-option-10',
          checked: true,
        },
        {
          label: 'Second option',
          id: 'second-option-12',
          checked: false,
        },
        {
          label: 'Third option',
          id: 'third-option-13',
          checked: false,
        },
        {
          label: 'Forth option',
          id: 'forth-option-14',
          checked: true,
        },
        {
          label: 'Fifth option',
          id: 'fifth-option-15',
          checked: false,
        },
        {
          label: 'Sixth option',
          id: 'sixth-option-16',
          checked: false,
        },
        {
          label: 'Seventh option',
          id: 'seventh-option-17',
          checked: true,
        },
        {
          label: 'Eighth option',
          id: 'Eighth-option-18',
          checked: false,
        },
        {
          label: 'Nineth option',
          id: 'nineth-option-19',
          checked: false,
        },
      ],
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
        }}
      >
        <MultiSelect {...multiSelectProps} closeDropdownOnApply />

        <MultiSelect
          list={[
            {
              label: 'First option',
              id: 'first-option',
              checked: true,
            },
            {
              label: 'Second option',
              id: 'second-option',
              checked: false,
            },
            {
              label: 'Third option',
              id: 'third-option',
              checked: false,
            },
          ]}
          isRightAligned
          dropdownButtonText="Options selected"
          onOptionChanged={(optionState) => console.log('optionState : ', optionState)}
        />

        <MultiSelect {...props2} />
      </div>
    );
  }
}

export default App;
