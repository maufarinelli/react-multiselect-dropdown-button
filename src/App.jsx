import React, { Component } from 'react';
import MultiSelect from './MultiSelect/MultiSelect';

class App extends Component {
  render() {
    const multiSelectProps = {
      list: [
        {
          label: 'Filter 1 aSAsa asaS as',
          name: 'filter-1',
          id: 'filter-1',
          checked: true
        },
        {
          label: 'Filter 2',
          name: 'filter-2',
          id: 'filter-2',
          checked: false
        },
        {
          label: 'Filter 3',
          name: 'filter-3',
          id: 'filter-3',
          checked: false
        }
      ],
      onSelectionApplied: selection => {
        console.log('Selected : ', selection);
      },
      dropdownButtonText: 'Selected',
      resetButtonText: 'Reset',
      closeButtonAriaLabel: 'Close button',
      applyButtonText: 'Apply'
    };

    return (
      <div className="App">
        <MultiSelect {...multiSelectProps} />
      </div>
    );
  }
}

export default App;
