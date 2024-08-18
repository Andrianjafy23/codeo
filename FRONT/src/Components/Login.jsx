import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    pwd: ''
  });

  const [p, setP] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [text, setText] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const t = "Apprenez et testez le web en toute simplicité.Développez vos \n compétences en HTML, CSS, et JavaScript sur une plateforme interactive et intuitive.";

  useEffect(() => {
    let i = 0;
    const n = setInterval(() => {
      setText(t.slice(0, i + 1));
      i++;
      if (i >= t.length) {
        i = 0;
      }
    }, 100);

    return () => clearInterval(n);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isLogin ? 'http://localhost:8084/form/login' : 'http://localhost:8084/form';
    const payload = isLogin
      ? { email: values.email, pwd: values.pwd }
      : { name: values.name || 'default_name', email: values.email, pwd: values.pwd };

    axios.post(url, payload)
      .then(res => {
        setSuccess(res.data.message);
        setError('');

        if (isLogin) {
          setTimeout(() => navigate('/codeo'), 1000);
        } else {
          setTimeout(() => setIsLogin(true), 1000);
        }
      })
      .catch(err => {
        setError(err.response ? err.response.data.message : 'Erreur lors de la soumission du formulaire');
        setSuccess('');
      });
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setError('');
    setSuccess('');
  };

  const handleSignupClick = () => {
    setIsLogin(false);
    setError('');
    setSuccess('');
  };

  return (
    <div style={{ backgroundImage: 'url(/devweb.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }} className='connecter'>
      <div className='soratra'>
        <h2 className='animé' style={{ whiteSpace: 'pre-line' }}>{text}</h2>
      </div>
      <div className='ka'>
        <div className='b'>
          <button onClick={handleSignupClick} className={!isLogin ? 'active' : ''}><HowToRegIcon />Inscription</button>
          <button onClick={handleLoginClick} className={isLogin ? 'active' : ''}><LoginIcon />Connexion</button>
        </div>
        {isLogin ? (
          <form className='con' onSubmit={handleSubmit}>
            <div className='alahatra'>
              <FontAwesomeIcon icon={faEnvelope} className='icone' />
              <input
                type="email"
                placeholder="Email"
                onChange={e => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>
            <div className='alahatra'>
              <FontAwesomeIcon icon={faLock} className='icone' />
              <input
                type={p ? 'text' : 'password'}
                placeholder="Mot de passe"
                onChange={e => setValues({ ...values, pwd: e.target.value })}
                required
              />
            </div>
            <div className='miseho'>
              <input
                type="checkbox"
                className='afficher'
                checked={p}
                onChange={() => setP(!p)}
              />
              <label> Afficher</label>
            </div>
            <button className='a' type='submit'>Se connecter</button>
            {error && <p className='error'>{error}</p>}
            {success && <p className='success'>{success}</p>}
          </form>
        ) : (
          <form className='inscri' onSubmit={handleSubmit}>
            <div className='alahatra'>
              <FontAwesomeIcon icon={faUser} className='icone' />
              <input
                type="text"
                placeholder="Nom"
                onChange={e => setValues({ ...values, name: e.target.value })}
                required
              />
            </div>
            <div className='alahatra'>
              <FontAwesomeIcon icon={faEnvelope} className='icone' />
              <input
                type="email"
                placeholder="Email"
                onChange={e => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>
            <div className='alahatra'>
              <FontAwesomeIcon icon={faLock} className='icone' />
              <input
                type={p ? 'text' : 'password'}
                placeholder="Mot de passe"
                onChange={e => setValues({ ...values, pwd: e.target.value })}
                required
              />
            </div>
            <div className='miseho'>
              <input
                type="checkbox"
                className='afficher'
                checked={p}
                onChange={() => setP(!p)}
              />
              <label> Afficher</label>
            </div>
            <button className='a' type='submit'>S'inscrire</button>
            {error && <p className='error'>{error}</p>}
            {success && <p className='success'>{success}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
