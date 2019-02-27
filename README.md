React MultiSelect Button Dropdown
- Easy use with keyboard navigation (Tab, selection with Space, Arrows Up, Down, Home and End for the list) following A11y guide of https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
- Provide a callback function to give selected items applied
- Can be used multilanguage, as it receives text by props

// TODO:
- fix tests

A11y notes
- In order to keep it fully accessible, make sure:
  - label does describe its associated input element: https://achecker.ca/checker/suggestion.php?id=189
  - the labels of each checkbox describes the purpose or function of it. https://achecker.ca/checker/suggestion.php?id=219
