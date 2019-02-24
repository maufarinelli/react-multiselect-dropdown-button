import React, { Component } from 'react';
import MultiSelect from './MultiSelect/MultiSelect';

class App extends Component {
  render() {
    const multiSelectProps = {
      list: [
        {
          label: 'First option',
          name: 'first-option',
          id: 'first-option',
          checked: true
        },
        {
          label: 'Second option',
          name: 'second-option',
          id: 'second-option',
          checked: false
        },
        {
          label: 'Third option',
          name: 'third-option',
          id: 'third-option',
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

    return (
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <MultiSelect {...multiSelectProps} />

        <MultiSelect list={[
        {
          label: 'First option',
          name: 'first-option',
          id: 'first-option',
          checked: true
        },
        {
          label: 'Second option',
          name: 'second-option',
          id: 'second-option',
          checked: false
        },
        {
          label: 'Third option',
          name: 'third-option',
          id: 'third-option',
          checked: false
        }
        ]} isRightAligned dropdownButtonText="Selected" />
      </div>
    );
  }
}

export default App;
