import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(state => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);

    // Print func
    const printFunc = `
    var print = value => {
      const root = document.getElementById('root')

      if(value?.$$typeof && value?.props) {
        ReactDOM.render(value, root)
        return
      }
      if(typeof(value) === 'object') {
        value = JSON.stringify(value);
      }
      root.innerHTML = value;
    }
    `;

    const printFuncNoop = `var print = () => {}`
    const cumulativeCode = [];

    // If there is somewhat printed in previous cell, it is also printed in current cell. Therefore, showFunc is should be enabled only for current cell. For other cells it is disabled by substitution with noop func.

    for (let currCell of orderedCells) {
      if (currCell.type !== 'code') continue;
      if (currCell.id === cellId) {
        cumulativeCode.push(printFunc)
      } else {
        cumulativeCode.push(printFuncNoop)
      }
      cumulativeCode.push(currCell.content)

      if (currCell.id === cellId) {
        break;
      }
    }

    return cumulativeCode.join('\n');
  })

}