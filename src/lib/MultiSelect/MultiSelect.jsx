import React from 'react';
import PropTypes from 'prop-types';
import {
  MultiSelectWrapper,
  MultiSelectListWrapper,
  MultiSelectList,
  MultiSelectAllButton
} from './MultiSelect.styles';
import MultiSelectDropdown from './MultiSelectDropdown';
import MultiSelectListItem from './MultiSelectListItem';
import MultiSelectFooter from './MultiSelectFooter';

class MultiSelect extends React.PureComponent {
  state = {
    isDropdownOpened: false,
    selectedItems: {}
  };

  constructor(props) {
    super(props);
    this.listItems = [];

    this.keyEvents = {
      up: () => {
        const activeElementIndex = this.listItems.findIndex(item => {
          return item === document.activeElement;
        });
        this.listItems[activeElementIndex - 1] && this.listItems[activeElementIndex - 1].focus();
      },
      down: () => {
        const activeElementIndex = this.listItems.findIndex(item => {
          return item === document.activeElement;
        });
        this.listItems[activeElementIndex + 1] && this.listItems[activeElementIndex + 1].focus();
      },
      home: () => {
        this.listItems[0].focus();
      },
      end: () => {
        this.listItems[this.listItems.length - 1].focus();
      }
    };
  }

  componentDidMount() {
    const { list } = this.props;

    this.setState(
      {
        selectedItems: list.reduce((acc, listItem) => {
          acc[listItem.id] = listItem.selected;
          return acc;
        }, {})
      },
      () => {
        debugger;
        console.log(this.state);
      }
    );
  }

  toggleDropdown = () => {
    const { isDropdownOpened } = this.state;

    this.setState({ isDropdownOpened: !isDropdownOpened }, () => {
      if (this.state.isDropdownOpened) {
        // this.listItems[0].focus();
      }
    });
  };

  handleSelectChange = event => {
    const tag = event.target.tagName;
    const target = tag === 'LABEL' ? event.target.children[0] : event.target;
    // If user used the keyboard to select the label, we need to programatically check the checkbox child.
    // Also needed to work with screen readers
    if (tag === 'LABEL') {
      target.checked = !target.checked;
      // preventing just after toggle checked property in order to prevent the space scroll behavior on a list
      event.preventDefault();
    }
    const { id, checked } = target;

    this.setState(
      prevState => ({
        selectedItems: { ...prevState.selectedItems, [id]: checked }
      }),
      () => {
        this.props.onOptionChanged && this.props.onOptionChanged({ [id]: checked });
      }
    );
  };

  resetSelections = () => {
    this.setState(prevState => ({
      selectedItems: Object.keys(prevState.selectedItems).reduce((acc, listItemName) => {
        acc[listItemName] = false;
        return acc;
      }, {})
    }));
  };

  handleApplyClick = () => {
    const { onSelectionApplied } = this.props;
    const { selectedItems } = this.state;

    onSelectionApplied(selectedItems);
  };

  selectAll = () => {
    this.setState(prevState => ({
      selectedItems: Object.keys(prevState.selectedItems).reduce((acc, listItemId) => {
        acc[listItemId] = true;
        return acc;
      }, {})
    }));
  };

  render() {
    const { isDropdownOpened, selectedItems } = this.state;
    const {
      list,
      dropdownButtonText,
      isRightAligned,
      onSelectionApplied,
      selectAllButtonText,
      resetButtonText,
      applyButtonText
    } = this.props;
    const { handleSelectChange, handleApplyClick, selectAll } = this;
    const selectedItemsValues = Object.keys(selectedItems).filter(itemName => selectedItems[itemName]);
    const selectedItemsQuantity = selectedItemsValues.length;

    return (
      <MultiSelectWrapper className="multiselect-button-dropdown-wrapper">
        <MultiSelectDropdown
          className="multiselect-button-dropdown"
          text={dropdownButtonText}
          quantity={selectedItemsQuantity}
          toggleDropdown={this.toggleDropdown}
          isOpened={isDropdownOpened}
        />
        {isDropdownOpened && (
          <MultiSelectListWrapper
            {...(isRightAligned ? { isRightAligned } : {})}
            className="multiselect-section-wrapper"
          >
            <MultiSelectAllButton className="multiselect-button-select-all" onClick={selectAll}>
              {selectAllButtonText}
            </MultiSelectAllButton>
            <MultiSelectList
              multiple={true}
              hasFooter={!!onSelectionApplied}
              className="multiselect-list"
              keyEvents={{ ...this.keyEvents }}
              value={selectedItemsValues}
              onChange={handleSelectChange}
            >
              {list.map((listItem, index) => {
                const { label, id } = listItem;
                const selected = selectedItems[id];
                const key = `${id}-${index}`;

                return (
                  <MultiSelectListItem
                    className="multiselect-list-item"
                    label={label}
                    key={key}
                    id={id}
                    selected={selected}
                    ref={el => {
                      this.listItems[index] = el;
                      return el;
                    }}
                  />
                );
              })}
            </MultiSelectList>
            {onSelectionApplied && (
              <MultiSelectFooter
                resetSelections={this.resetSelections}
                resetButtonText={resetButtonText}
                applyButtonText={applyButtonText}
                handleApplyClick={handleApplyClick}
              />
            )}
          </MultiSelectListWrapper>
        )}
      </MultiSelectWrapper>
    );
  }
}

MultiSelect.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      selected: PropTypes.bool.isRequired
    })
  ).isRequired,
  dropdownButtonText: PropTypes.string.isRequired,
  isRightAligned: PropTypes.bool,
  selectAllButtonText: PropTypes.string,
  onOptionChanged: PropTypes.func,
  onSelectionApplied: PropTypes.func,
  resetButtonText: PropTypes.string,
  applyButtonText: PropTypes.string
};

MultiSelect.defaultProps = {
  selectAllButtonText: 'Select All'
};

export default MultiSelect;
