import { Link } from 'react-router-dom';
import './style.css';
import code1 from '../assets/code1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const zavtr = {
  logo : code1,
  codeo: 'CODEO',
  pref: 'préference',
  js: 'javascript',
  h: 'HTML',
  c: 'CSS',
  search: 'Chercher',
};

function Logika({ searchQuery, setSearchQuery }) {
  return (
    <div className="laza">
      <nav>
        <ul>
          <li>
          <Link to="/">
             <img src= {zavtr.logo} style={{width: '100px', height: '56px',}} alt="" />
          </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li><h1>{zavtr.codeo}</h1></li>
        </ul>
      </nav>
      <ul className="lo">
        <li className="la">
          <a href="#">Préference</a>
          <ul className="l">
            <li><a href="#">{zavtr.h}</a></li>
            <li><a href="#">{zavtr.c}</a></li>
            <li><a href="#">{zavtr.js}</a></li>
          </ul>
        </li>
      </ul>
      <div className='search'>
        <FontAwesomeIcon icon={faSearch} className="searchicon" />
        <input 
          type="search" 
          placeholder="Search..." 
          className="input" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> 
    </div>
  );
}

export default Logika;
