import React, { useEffect, useRef } from 'react';
import './preview.css'

interface PreviewProps {
  code: string,
  err: string
}

const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>html {background-color: white;}</style>
    </head>
    <body>
      <div id="root">
        <script>
          const handleError = err => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + err + '</div>';
            console.error(err);
          }

          window.addEventListener('error', event => handleError(event.error))

          window.addEventListener('message', e => {            
            try {
              const func = new Function (e.data);
              func();
            } catch (err) {
              handleError(err)
            }
          })
        </script>
      </div>
    </body>
  </html>
  `

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code])

  return (
    <div className='preview-wrapper'>
      <iframe title='pview'
        sandbox="allow-scripts"
        srcDoc={html}
        ref={iframe}
      >
      </iframe>
      {err && <div className='preview-error'>${err}</div>}
    </div>
  );
};

export default Preview;