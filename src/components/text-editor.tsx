import React, { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css'

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState('# Header')


  useEffect(() => {
    const listner = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return
      }

      setEditing(false);
    }
    document.addEventListener('click', listner, { capture: true });

    return () => document.removeEventListener('click', listner, { capture: true });
  })

  if (editing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor value={value} onChange={str => setValue(str || '')}/>
      </div>
    )
  }

  return (
    <div onClick={() => setEditing(true)} className='text-editor card'>
      <div className="card-content">
      <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;