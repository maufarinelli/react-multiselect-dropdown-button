import React, { Component } from 'react';
import MultiSelect from './lib/MultiSelect/MultiSelect';

class App extends Component {
  render() {
    const multiSelectProps = {
      list: [
        {
          label: 'First option',
          name: 'first-option',
          id: 'first-option-1',
          selected: true
        },
        {
          label: 'Second option',
          name: 'second-option',
          id: 'second-option-2',
          selected: false
        },
        {
          label: 'Third option',
          name: 'third-option',
          id: 'third-option-3',
          selected: false
        }
      ],
      onSelectionApplied: selection => {
        console.log('Selected : ', selection);
      },
      dropdownButtonText: 'Selected',
      resetButtonText: 'Reset',
      applyButtonText: 'Apply'
    };

    const props2 = {
      ...multiSelectProps,
      list: [
        {
          label: 'First option',
          id: 'first-option-10',
          selected: true
        },
        {
          label: 'Second option',
          id: 'second-option-12',
          selected: false
        },
        {
          label: 'Third option',
          id: 'third-option-13',
          selected: false
        },
        {
          label: 'Forth option',
          id: 'forth-option-14',
          selected: true
        },
        {
          label: 'Fifth option',
          id: 'fifth-option-15',
          selected: false
        },
        {
          label: 'Sixth option',
          id: 'sixth-option-16',
          selected: false
        },
        {
          label: 'Seventh option',
          id: 'seventh-option-17',
          selected: true
        },
        {
          label: 'Eighth option',
          id: 'Eighth-option-18',
          selected: false
        },
        {
          label: 'Nineth option',
          id: 'nineth-option-19',
          selected: false
        }
      ]
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <MultiSelect {...multiSelectProps} />

        <MultiSelect
          list={[
            {
              label: 'First option',
              id: 'first-option',
              selected: true
            },
            {
              label: 'Second option',
              id: 'second-option',
              selected: false
            },
            {
              label: 'Third option',
              id: 'third-option',
              selected: false
            }
          ]}
          isRightAligned
          dropdownButtonText="Options selected"
          onOptionChanged={optionState => console.log('optionState : ', optionState)}
        />

        <MultiSelect {...props2} />
      </div>
    );
  }
}

export default App;
