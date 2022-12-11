import React, { useEffect, useRef } from 'react';
import './preview.css'

interface PreviewProps {
  code: string
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
          window.addEventListener('message', e => {            
            try {
              const func = new Function (e.data);
              func();
            } catch (error) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + error + '</div>';
              console.error(error);
            }
          })
        </script>
      </div>
    </body>
  </html>
  `

const Preview: React.FC<PreviewProps> = ({ code }) => {
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
    </div>
  );
};

export default Preview;