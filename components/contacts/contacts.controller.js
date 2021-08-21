const contactsDataAccessLayer = require('./contacts.dal');

const getAllContacts = async () => {
    const allContacts = await contactsDataAccessLayer.getAllContacts();
    return allContacts;
}

const saveContact = async (request) => {
    const { name, number } =  request.body;
    const contactToSave = { name, number, savedBy: request.user._id };
    const savedContact = await contactsDataAccessLayer.saveContact(contactToSave);
    return savedContact;
}

module.exports = {
    saveContact,
    getAllContacts
}
