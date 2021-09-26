const contactsDataAccessLayer = require('./contacts.dal');

const getAllContacts = async () => await contactsDataAccessLayer.getAllContacts();

const getUserContacts = async (request) => await contactsDataAccessLayer.getUserContacts(request.user._id);

const saveContact = async (request) => {
  const { name, number } = request.body;
  const contactToSave = { name, number, savedBy: request.user._id };
  const savedContact = await contactsDataAccessLayer.saveContact(contactToSave);
  return savedContact;
};

const removeUserContact = async (request) => {
  const { contactId } = request.params;
  await contactsDataAccessLayer.removeUserContact(request.user._id, contactId);
};

module.exports = {
  saveContact,
  getAllContacts,
  getUserContacts,
  removeUserContact,
};
