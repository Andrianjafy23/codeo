import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données 'DONNER'
const dbDonner = mysql.createConnection({
  host: process.env.DB_DONNER_HOST,
  user: process.env.DB_DONNER_USER,
  password: process.env.DB_DONNER_PASSWORD,
  database: process.env.DB_DONNER_NAME
});

dbDonner.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données DONNER:', err);
    return;
  }
  console.log('Connecté à la base de données DONNER.');
});

// Connexion à la base de données 'FORM'
const dbForm = mysql.createConnection({
  host: process.env.DB_FORM_HOST,
  user: process.env.DB_FORM_USER,
  password: process.env.DB_FORM_PASSWORD,
  database: process.env.DB_FORM_NAME
});

dbForm.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données FORM:', err);
    return;
  }
  console.log('Connecté à la base de données FORM.');
});

// Routes pour la base de données DONNER
app.get('/don', (req, res) => {
  const sql = 'SELECT * FROM don';
  dbDonner.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de l\'exécution de la requête', error: err });
    return res.json(result);
  });
});

app.post('/don', (req, res) => {
  const { titre = 'default_titre', soutitre, expliquer, html, css, js } = req.body;
  const sql = 'INSERT INTO don (titre, soutitre, expliquer, html, css, js) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [titre, soutitre, expliquer, html, css, js];
  dbDonner.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de l\'insertion du code', error: err });
    return res.json({ message: 'Données envoyées au serveur', result });
  });
});

app.put('/don/:id', (req, res) => {
  const { id } = req.params;
  const { titre, soutitre, expliquer, html, css, js } = req.body;
  const sql = 'UPDATE don SET titre = ?, soutitre = ?, expliquer = ?, html = ?, css = ?, js = ? WHERE id = ?';
  const values = [titre, soutitre, expliquer, html, css, js, id];
  dbDonner.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour du code', error: err });
    return res.json({ message: 'Modification réussie', result });
  });
});

app.delete('/don/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM don WHERE id = ?';
  dbDonner.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la suppression du code', error: err });
    return res.json({ message: 'Suppression réussie', result });
  });
});

// Routes pour la base de données FORM
app.post('/form', (req, res) => {
  const { name = 'default_name', email, pwd } = req.body;
  const sql = 'INSERT INTO form (name, email, pwd) VALUES (?, ?, ?)';
  const values = [name, email, pwd];
  dbForm.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de l\'insertion du formulaire', error: err });
    return res.json({ message: 'Formulaire envoyé avec succès', result });
  });
});

app.post('/form/login', (req, res) => {
  const { email, pwd } = req.body;
  const sql = 'SELECT * FROM form WHERE email = ? AND pwd = ?';
  dbForm.query(sql, [email, pwd], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la vérification des identifiants', error: err });

    if (result.length > 0) {
      return res.json({ message: 'Connexion réussie. Accès accordé', redirectUrl: '/dashboard' });
    } else {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  });
});

// Démarrer le serveur sur le port spécifié
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
