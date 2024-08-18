import React, { useState } from 'react';
import './style.css';
import { VscChevronDown } from "react-icons/vsc";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { IoIosOptions } from "react-icons/io";

function Right({ onSelect }) {
  const [option, setOption] = useState(false);
  const [showHTML, setShowHTML] = useState(false);
  const [showCSS, setShowCSS] = useState(false);
  const [showJS, setShowJS] = useState(false);

  const toggleOption = () => setOption(!option);
  const toggleHTML = () => setShowHTML(!showHTML);
  const toggleCSS = () => setShowCSS(!showCSS);
  const toggleJS = () => setShowJS(!showJS);

  const handleSelect = (category, topic) => {
    onSelect(category, topic);
  };

  return (
    <div className='hi'>
      <IoIosOptions className='option' onClick={toggleOption} />
      {option && (
        <div className="coucou">
          <h3 onClick={toggleHTML}>
            <VscChevronDown /> HTML
          </h3>
          {showHTML && (
            <ul className='html'>
              <li className='x' onClick={() => handleSelect('HTML', 'Introduction')}>
                <VscDebugBreakpointData className='c' /> Introduction
              </li>
              <li className='x' onClick={() => handleSelect('HTML', 'Structure de base')}>
                <VscDebugBreakpointData className='c' /> Structure de base
              </li>
              <li className='x' onClick={() => handleSelect('HTML', 'Éléments de texte')}>
                <VscDebugBreakpointData className='c' /> Éléments de texte
              </li>
              <li className='x' onClick={() => handleSelect('HTML', 'Liens et ancrages')}>
                <VscDebugBreakpointData className='c' /> Liens et ancrages
              </li>
              <li className='x' onClick={() => handleSelect('HTML', 'Images et médias')}>
                <VscDebugBreakpointData className='c' /> Images et médias
              </li>
            </ul>
          )}
          <h3 onClick={toggleCSS}>
            <VscChevronDown /> CSS
          </h3>
          {showCSS && (
            <ul className='css'>
              <li className='x' onClick={() => handleSelect('CSS', 'Introduction')}>
                <VscDebugBreakpointData className='c' /> Introduction
              </li>
              <li className='x' onClick={() => handleSelect('CSS', 'Syntaxe et Sélecteurs')}>
                <VscDebugBreakpointData className='c' /> Syntaxe et Sélecteurs
              </li>
              <li className='x' onClick={() => handleSelect('CSS', 'Propriétés de texte')}>
                <VscDebugBreakpointData className='c' /> Propriétés de texte
              </li>
              <li className='x' onClick={() => handleSelect('CSS', 'Modèle de boîte')}>
                <VscDebugBreakpointData className='c' /> Modèle de boîte
              </li>
              <li className='x' onClick={() => handleSelect('CSS', 'Flexbox')}>
                <VscDebugBreakpointData className='c' /> Flexbox
              </li>
            </ul>
          )}
          <h3 onClick={toggleJS}>
            <VscChevronDown /> JavaScript
          </h3>
          {showJS && (
            <ul className='js'>
              <li className='x' onClick={() => handleSelect('JavaScript', 'Introduction au JavaScript')}>
                <VscDebugBreakpointData className='c' /> Introduction au JavaScript
              </li>
              <li className='x' onClick={() => handleSelect('JavaScript', 'Syntaxe de Base et Opérateurs')}>
                <VscDebugBreakpointData className='c' /> Syntaxe de Base et Opérateurs
              </li>
              <li className='x' onClick={() => handleSelect('JavaScript', 'Structures de Contrôle')}>
                <VscDebugBreakpointData className='c' /> Structures de Contrôle
              </li>
              <li className='x' onClick={() => handleSelect('JavaScript', 'Fonctions')}>
                <VscDebugBreakpointData className='c' /> Fonctions
              </li>
              <li className='x' onClick={() => handleSelect('JavaScript', 'Objets et Tableaux')}>
                <VscDebugBreakpointData className='c' /> Objets et Tableaux
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Right;
