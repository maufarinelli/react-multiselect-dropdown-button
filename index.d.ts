declare module 'react-multiselect-button-dropdown' {
  import {Component} from 'react'

  type List = {
    label: string
    name?: string
    id: string | number
    checked: boolean
  }
  
  interface Props {
    list: List[]
    dropdownButtonText?: string
    isRightAligned?: boolean
    onOptionChanged?: (optionState: any) => void
    onSelectionApplied?: (list: List) => void
    selectAllButtonText?: string
    resetButtonText?: string
    applyButtonText?: string
  }

  export default class ReactMultiSelectCheckboxes extends Component<
    Props,
    {}
  > {}
}
