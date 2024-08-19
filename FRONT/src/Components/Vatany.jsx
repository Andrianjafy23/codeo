import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJs } from '@fortawesome/free-brands-svg-icons';

function Vatany({ searchQuery, selectedTopic }) {
  const [activeEditor, setActiveEditor] = useState('html');
  const [codeData, setCodeData] = useState([]);

  useEffect(() => {
    fetchCodeData();
  }, []);

  const fetchCodeData = async () => {
    try {
      const response = await axios.get('http://localhost:8085/don');
      setCodeData(response.data);
    } catch (error) {
      console.error('error!', error);
    }
  };

  const handleEditorChange = (editor) => {
    setActiveEditor(editor);
  };

  const handleCodeChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCodeData = [...codeData];
    updatedCodeData[index][name] = value;
    setCodeData(updatedCodeData);
  };

  const generateLineNumbers = (code) => {
    return code.split('\n').map((_, index) => index + 1).join('\n');
  };

  const filteredData = codeData.filter(item => 
    item.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.soutitre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.expliquer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="Vatany">
      <div className='tab'>
        <ul>
          {filteredData.map((item, index) => (
            <li key={index} className='pub'>
              <center><h3>{item.titre}</h3></center>
              <p className='flow1'>{item.soutitre}</p>
              <p className='flow'>{item.expliquer}</p>
              <div className="icon-bar">
                <FontAwesomeIcon
                  icon={faHtml5}
                  size="2x"
                  onClick={() => handleEditorChange('html')}
                  className={activeEditor === 'html' ? 'active' : ''}
                />
                <FontAwesomeIcon
                  icon={faCss3Alt}
                  size="2x"
                  onClick={() => handleEditorChange('css')}
                  className={activeEditor === 'css' ? 'active' : ''}
                />
                <FontAwesomeIcon
                  icon={faJs}
                  size="2x"
                  onClick={() => handleEditorChange('js')}
                  className={activeEditor === 'js' ? 'active' : ''}
                />
              </div>
              <div className="editeur">
                {activeEditor === 'html' && (
                  <div className="editor-container">
                    <div className="line-numbers">
                      {generateLineNumbers(item.html)}
                    </div>
                    <textarea
                      name="html"
                      value={item.html}
                      onChange={(e) => handleCodeChange(e, index)}
                      placeholder="HTML code"
                    />
                  </div>
                )}
                {activeEditor === 'css' && (
                  <div className="editor-container">
                    <div className="line-numbers">
                      {generateLineNumbers(item.css)}
                    </div>
                    <textarea
                      name="css"
                      value={item.css}
                      onChange={(e) => handleCodeChange(e, index)}
                      placeholder="CSS code"
                    />
                  </div>
                )}
                {activeEditor === 'js' && (
                  <div className="editor-container">
                    <div className="line-numbers">
                      {generateLineNumbers(item.js)}
                    </div>
                    <textarea
                      name="js"
                      value={item.js}
                      onChange={(e) => handleCodeChange(e, index)}
                      placeholder="JavaScript code"
                    />
                  </div>
                )}
              </div>
              <h2>Résultat:</h2>
              <iframe
                srcDoc={`
                  <html>
                    <body>${item.html}</body>
                    <style>${item.css}</style>
                    <script>${item.js}</script>
                  </html>
                `}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Vatany;
