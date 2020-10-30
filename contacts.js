const fs = require('fs').promises;
const path = require('path');

class Contacts {
  constructor() {
    this.contactsPath = path.resolve(__dirname, 'db', 'contacts.json');
  }
  getListContacts = async () => {
    // console.log(this.contactsPath);
    const contactsData = await fs.readFile(this.contactsPath, {
      encoding: 'utf-8',
    });
    return JSON.parse(contactsData);
  };

  getContactById = async id => {
    const contactsData = await this.getListContacts();
    return contactsData.find(contact => contact.id === id);
  };

  removeContactById = async id => {
    const contactsData = await this.getListContacts();
    const result = contactsData.filter(contact => contact.id !== id);
    await fs.writeFile(this.contactsPath, JSON.stringify(result));
  };

  addContact = async (name, email, phone) => {
    const contactsData = await this.getListContacts();
    const id = contactsData.length ? [...contactsData].pop().id + 1 : 1;
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    contactsData.push(newContact);
    const contactsDataAsJSON = JSON.stringify(contactsData);
    await fs.writeFile(this.contactsPath, contactsDataAsJSON);
    return newContact;
  };
}

module.exports = new Contacts();
