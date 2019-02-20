import React, { Component } from "react";
import MultiSelect from "./MultiSelect/MultiSelect";

class App extends Component {
  render() {
    const filterProps = {
      list: [
        {
          label: "Filter 1",
          name: "filter-1",
          id: "filter-1"
        },
        {
          label: "Filter 2",
          name: "filter-2",
          id: "filter-2"
        },
        {
          label: "Filter 3",
          name: "filter-3",
          id: "filter-3"
        }
      ],
      onSelectApplied: selection => {
        console.log("Selected : ", selection);
      },
      dropdownButtonText: "Selected",
      resetButtonText: "Reset",
      closeButtonAriaLabel: "Close button",
      applyButtonText: "Apply"
    };

    return (
      <div className="App">
        <MultiSelect {...filterProps} />
      </div>
    );
  }
}

export default App;
