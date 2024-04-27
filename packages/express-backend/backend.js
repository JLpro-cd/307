import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import User from '../../models/User.js';

const URI = 'mongodb://john:fortnite@127.0.0.1:27017/users';
mongoose.connect(URI)
  .then(() => console.log("Successful connection"))
  .catch(err => console.error("Failed to connect", err));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
  
app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send('User not available');
      }
      res.send(user);
    })
    .catch(err => res.status(500).send(err.message));
});


app.get("/users", (req, res) => {
  const query = {};
  if (req.query.name) {
    query.name = req.query.name;
  }
  if (req.query.job) {
    query.job = req.query.job;
  }
  User.find(query)
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});



app.post("/users", (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(() => res.status(201).send(user))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(204).send();
    })
    .catch(err => res.status(500).send(err.message));
});


  app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });