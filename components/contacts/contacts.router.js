const contactsRouter = require('express').Router();
const userExtractor = require('../../utils/auth_middleware');
const contactsController = require('./contacts.controller');

contactsRouter.route('/allContacts')
  .get(userExtractor, async (request, response) => {
    const result = await contactsController.getAllContacts();
    response.json({ result });
  });

contactsRouter.route('/')
  .get(userExtractor, async (request, response) => {
    const result = await contactsController.getUserContacts(request);
    response.json({ result });
  })
  .post(userExtractor, async (request, response) => {
    const result = await contactsController.saveContact(request);
    response.status(201).json({ result });
  });

contactsRouter.route('/favourites')
  .get(userExtractor, async (request, response) => {
    const result = await contactsController.getFavouriteContacts(request);
    response.json({ result });
  });

contactsRouter.route('/graphData')
  .post(userExtractor, async (request, response) => {
    const result = await contactsController.getContactsGraphData(request);
    response.json({ result });
  });

contactsRouter.route('/:contactId')
  .get(userExtractor, async (request, response) => {
    const result = await contactsController.getContactById(request);
    response.json({ result });
  })
  .delete(userExtractor, async (request, response) => {
    await contactsController.removeUserContact(request);
    response.status(204).json({ result: 'deleted' });
  })
  .put(userExtractor, async (request, response) => {
    const result = await contactsController.updateContact(request);
    response.status(200).json({ result });
  });

module.exports = contactsRouter;
