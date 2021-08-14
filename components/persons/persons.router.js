const personsRouter = require('express').Router();
const mongoose = require('mongoose');
const Person = require('./person.model');

personsRouter.get('/', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.status(200);
      res.json(persons);
    })
    .catch((error) => next(error));
});

personsRouter.get('/info', (req, res, next) => {
  Person.find({})
    .count()
    .then((count) => {
      const date = new Date().toString();
      res.send(`<p>Phonebook has info of ${count} people</p> <p>${date}</p>`);
    })
    .catch((error) => next(error));
});

personsRouter.get('/:id', (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Person.findOne({ _id: id })
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        next({ name: 'NotFound' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

personsRouter.put('/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then((updatedPerson) => {
      res.status(200).json(updatedPerson);
    })
    .catch((error) => next(error));
});

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).json({ resp: 'No Content' });
      } else {
        next({ name: 'NotFound' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

personsRouter.post('/', (req, res, next) => {
  const person = new Person({ name: req.body.name, number: Number(req.body.number) });
  person
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) =>{
      next(error);
    });
});

module.exports = personsRouter;
