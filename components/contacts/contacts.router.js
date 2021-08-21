const contactsRouter = require('express').Router();
const mongoose = require('mongoose');
const userExtractor = require('../../utils/auth_middleware');
const contactsController = require('./contacts.controller');

contactsRouter.route('/')
.get(userExtractor, async (request, response) => {
  const result = await contactsController.getAllContacts();
  response.json({result});
})
.post(userExtractor, async (request, response) => {
  const result = await contactsController.saveContact(request);
  response.status(201).json({result});
});

// contactsRouter.get('/info', (req, res, next) => {
//   Person.find({})
//     .count()
//     .then((count) => {
//       const date = new Date().toString();
//       res.send(`<p>Phonebook has info of ${count} people</p> <p>${date}</p>`);
//     })
//     .catch((error) => next(error));
// });

// contactsRouter.get('/:id', (req, res, next) => {
//   const id = mongoose.Types.ObjectId(req.params.id);
//   Person.findOne({ _id: id })
//     .then((person) => {
//       if (person) {
//         res.json(person);
//       } else {
//         next({ name: 'NotFound' });
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// contactsRouter.put('/:id', (req, res, next) => {
//   Person.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
//     .then((updatedPerson) => {
//       res.status(200).json(updatedPerson);
//     })
//     .catch((error) => next(error));
// });

// contactsRouter.delete('/:id', (req, res, next) => {
//   Person.findByIdAndRemove(req.params.id)
//     .then((result) => {
//       if (result) {
//         res.status(204).json({ resp: 'No Content' });
//       } else {
//         next({ name: 'NotFound' });
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = contactsRouter;
