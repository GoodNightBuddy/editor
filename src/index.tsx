import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import TextEditor from './components/text-editor';
// import CodeCell from './components/code-cell';

const App = () => {

  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));
