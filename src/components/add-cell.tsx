import './add-cell.css';
import React from 'react';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  prevCellId: string,
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button onClick={() => insertCellAfter(prevCellId, 'code')} className='button is-rounded is-primary is-small'>
          <span className='icon is-small'>
            <i className='fas fa-plus'/>
          </span>
          <span>Code</span>
        </button>
        <button onClick={() => insertCellAfter(prevCellId, 'text')} className='button is-rounded is-primary is-small'>
        <span className='icon is-small'>
            <i className='fas fa-plus'/>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;