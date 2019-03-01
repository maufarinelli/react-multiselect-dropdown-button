import React, { Component } from 'react';
import MultiSelect from './MultiSelect/MultiSelect';

class App extends Component {
  render() {
    const multiSelectProps = {
      list: [
        {
          label: 'First option',
          name: 'first-option',
          id: 'first-option-1',
          checked: true
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

    const props2 = {...multiSelectProps, list: [
      {
        label: 'First option',
        id: 'first-option-1',
        checked: true
      },
      {
        label: 'Second option',
        id: 'second-option-2',
        checked: false
      },
      {
        label: 'Third option',
        id: 'third-option-3',
        checked: false
      },
      {
        label: 'Forth option',
        id: 'forth-option-4',
        checked: true
      },
      {
        label: 'Fifth option',
        id: 'fifth-option-5',
        checked: false
      },
      {
        label: 'Sixth option',
        id: 'sixth-option-6',
        checked: false
      },
      {
        label: 'Seventh option',
        id: 'seventh-option-7',
        checked: true
      },
      {
        label: 'Eighth option',
        id: 'Eighth-option-8',
        checked: false
      },
      {
        label: 'Nineth option',
        id: 'nineth-option-9',
        checked: false
      }
    ],};

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <MultiSelect {...multiSelectProps} />

        <MultiSelect
          list={[
            {
              label: 'First option',
              id: 'first-option',
              checked: true
            },
            {
              label: 'Second option',
              id: 'second-option',
              checked: false
            },
            {
              label: 'Third option',
              id: 'third-option',
              checked: false
            }
          ]}
          isRightAligned
          dropdownButtonText="Selected"
        />

        <MultiSelect {...props2} />
      </div>
    );
  }
}

export default App;
