const contactsDataAccessLayer = require('./contacts.dal');

const getAllContacts = () => contactsDataAccessLayer.getAllContacts();

const getUserContacts = (request) => contactsDataAccessLayer.getUserContacts(request.user._id);

const saveContact = async (request) => {
  const { name, number } = request.body;
  const contactToSave = { name, number, savedBy: request.user._id };
  const savedContact = await contactsDataAccessLayer.saveContact(contactToSave);
  return savedContact;
};

const getContactById = async (request) => {
  const id = request.params.contactId;
  const contact = await contactsDataAccessLayer.getContactById(id);
  return contact;
};

const removeUserContact = async (request) => {
  const { contactId } = request.params;
  await contactsDataAccessLayer.removeUserContact(request.user._id, contactId);
};

const updateContact = async (request) => {
  const contactData = request.body;
  const updatedContact = await contactsDataAccessLayer.updateContact(contactData);
  return updatedContact;
};

module.exports = {
  saveContact,
  getAllContacts,
  getUserContacts,
  getContactById,
  updateContact,
  removeUserContact,
};
