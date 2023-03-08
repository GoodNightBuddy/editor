import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css'
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(state => state.bundles[cell.id])

  // Make code from previous cells be able for next cells. But not the contrary. For each cell it's own code compiles with code of previous cells. But not with code of next cells
  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(() => {
    // For first app load, 2 cells showing by default, but code apllies for it after delay in timer. Hence Preview component firstly loads without code, therefore without inner component with white color, and we see a blink until code is bundling. WE must load this empty component without delay. Hence we disable eslint in dependecies arr 
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {
            !bundle || bundle.loading
              ? <div className='progress-cover'>
                <progress className='progress is-small is-primary' max={100}>
                  Loading
                </progress>
              </div>

              : <Preview code={bundle.code} err={bundle.err} />
          }
        </div>

      </div>
    </Resizable>
  )
};

export default CodeCell;
