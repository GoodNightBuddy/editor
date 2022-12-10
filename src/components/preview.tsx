import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string
}

const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <title>React Opp</title>
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

const Preview: React.FC<PreviewProps> = ({code}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*')

  }, [code])

  return (
    <iframe title='pview' sandbox="allow-scripts" srcDoc={html} ref={iframe}></iframe>
  );
};

export default Preview;