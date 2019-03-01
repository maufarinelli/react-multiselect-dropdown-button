import React from 'react';
import PropTypes from 'prop-types';
import { MultiSelectWrapper, MultiSelectListWrapper, MultiSelectList, MultiSelectAllButton } from './MultiSelect.styles';
import MultiSelectDropdown from './MultiSelectDropdown';
import MultiSelectListItem from './MultiSelectListItem';
import MultiSelectFooter from './MultiSelectFooter';

class MultiSelect extends React.PureComponent {
  state = {
    isDropdownOpened: false,
    checkedItems: {}
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

    this.setState({
      checkedItems: list.reduce((acc, listItem) => {
        acc[listItem.id] = listItem.checked;
        return acc;
      }, {})
    });
  }

  toggleDropdown = () => {
    const { isDropdownOpened } = this.state;

    this.setState({ isDropdownOpened: !isDropdownOpened }, () => {
      if (this.state.isDropdownOpened) {
        this.listItems[0].focus();
      }
    });
  };

  handleInputChange = event => {
    const tag = event.target.tagName;
    const target = tag === 'LABEL' ? event.target.children[0] : event.target;
    // If user used the keyboard to select the label, we need to programatically check the checkbox child.
    // Also needed to work with screen readers
    if (tag === 'LABEL') {
      target.checked = !target.checked;
    }
    const { id, checked } = target;

    this.setState(prevState => ({
      checkedItems: { ...prevState.checkedItems, [id]: checked }
    }));
  };

  resetSelections = () => {
    this.setState(prevState => ({
      checkedItems: Object.keys(prevState.checkedItems).reduce((acc, listItemName) => {
        acc[listItemName] = false;
        return acc;
      }, {})
    }));
  };

  handleApplyClick = () => {
    const { onSelectionApplied } = this.props;
    const { checkedItems } = this.state;

    onSelectionApplied(checkedItems);
  };

  selectAll = () => {
    this.setState(prevState => ({
      checkedItems: Object.keys(prevState.checkedItems).reduce((acc, listItemId) => {
        acc[listItemId] = true;
        return acc;
      }, {})
    }));
  }

  render() {
    const { isDropdownOpened, checkedItems } = this.state;
    const {
      list,
      dropdownButtonText,
      isRightAligned,
      onSelectionApplied,
      selectAllButtonText,
      resetButtonText,
      applyButtonText
    } = this.props;
    const { handleInputChange, handleApplyClick, selectAll } = this;
    const checkedItemsQuantity = Object.keys(checkedItems).filter(itemName => checkedItems[itemName]).length;

    return (
      <MultiSelectWrapper className="multiselect-button-dropdown-wrapper">
        <MultiSelectDropdown
          className="multiselect-button-dropdown"
          text={dropdownButtonText}
          quantity={checkedItemsQuantity}
          toggleDropdown={this.toggleDropdown}
          isOpened={isDropdownOpened}
        />
        {isDropdownOpened && (
          <MultiSelectListWrapper
            {...(isRightAligned ? { isRightAligned } : {})}
            className="multiselect-section-wrapper"
          >
            <MultiSelectAllButton onClick={selectAll}>{selectAllButtonText}</MultiSelectAllButton>
            <MultiSelectList role="listbox" hasFooter={!!onSelectionApplied} className="multiselect-list" keyEvents={{ ...this.keyEvents }}>
              {list.map((listItem, index) => {
                const { label, id, name } = listItem;
                const checked = checkedItems[id];
                const key = `${id}-${index}`;

                return (
                  <MultiSelectListItem
                    className="multiselect-list-item"
                    label={label}
                    key={key}
                    id={id}
                    name={name}
                    handleInputChange={handleInputChange}
                    checked={checked}
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
      checked: PropTypes.bool.isRequired
    })
  ).isRequired,
  dropdownButtonText: PropTypes.string.isRequired,
  isRightAligned: PropTypes.bool,
  selectAllButtonText: PropTypes.string,
  onSelectionApplied: PropTypes.func,
  resetButtonText: PropTypes.string,
  applyButtonText: PropTypes.string
};

MultiSelect.defaultProps = {
  selectAllButtonText: 'Select All'
}

export default MultiSelect;
