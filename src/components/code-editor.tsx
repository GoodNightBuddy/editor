import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import { useRef } from 'react'
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css'

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
      monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
      editorRef.current = monacoEditor;
    })
  }

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }); //.replace(/\n$/, ''); for delete new line

    editorRef.current.setValue(formatted);
  }

  return (
    <div className='editor-wrapper'>
      <button onClick={onFormatClick} className="button button-format is-primary is-small">Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  )
};

export default CodeEditor;