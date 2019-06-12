import { renderHook, act } from 'react-hooks-testing-library';
import useMultiSelect from '../lib/MultiSelect/useMultiSelect';

describe('useMultiSelect', () => {
  const list = [
    {
      label: 'First option',
      name: 'first-option',
      id: 'first-option-1',
      checked: false
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
  ];

  test('toggleDropdown', () => {
    const { result } = renderHook(() => useMultiSelect({ list }));
    act(() => result.current.toggleDropdown());
    expect(result.current.isDropdownOpened).toBeTruthy();

    act(() => result.current.toggleDropdown());
    expect(result.current.isDropdownOpened).toBeFalsy();
  });

  test('select all items', async () => {
    const { result } = renderHook(() => useMultiSelect({ list }));

    act(() => result.current.selectAll());

    expect(result.current.checkedItems['first-option-1']).toBeTruthy();
    expect(result.current.checkedItems['second-option-2']).toBeTruthy();
    expect(result.current.checkedItems['third-option-3']).toBeTruthy();
  });

  test('reset all items', async () => {
    const { result } = renderHook(() => useMultiSelect({ list }));

    act(() => result.current.selectAll());
    expect(result.current.checkedItems['first-option-1']).toBeTruthy();
    expect(result.current.checkedItems['second-option-2']).toBeTruthy();
    expect(result.current.checkedItems['third-option-3']).toBeTruthy();

    act(() => result.current.resetSelections());
    expect(result.current.checkedItems['first-option-1']).toBeFalsy();
    expect(result.current.checkedItems['second-option-2']).toBeFalsy();
    expect(result.current.checkedItems['third-option-3']).toBeFalsy();
  });

  test('handleInputChange input checked', () => {
    const { result } = renderHook(() => useMultiSelect({ list }));
    const event = {
      target: {
        tagName: 'INPUT',
        id: 'second-option-2',
        checked: true
      }
    };

    act(() => result.current.handleInputChange(event));
    expect(result.current.checkedItems['first-option-1']).toBeFalsy();
    expect(result.current.checkedItems['second-option-2']).toBeTruthy();
    expect(result.current.checkedItems['third-option-3']).toBeFalsy();
  });

  test('handleInputChange label containing input checked', () => {
    const { result } = renderHook(() => useMultiSelect({ list }));
    const event = {
      target: {
        tagName: 'LABEL',
        children: [
          {
            id: 'second-option-2',
            checked: false
          }
        ]
      },
      preventDefault: () => {}
    };

    act(() => result.current.handleInputChange(event));
    expect(result.current.checkedItems['first-option-1']).toBeFalsy();
    expect(result.current.checkedItems['second-option-2']).toBeTruthy();
    expect(result.current.checkedItems['third-option-3']).toBeFalsy();
  });
});
