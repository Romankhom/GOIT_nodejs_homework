const Contacts = require('./contacts');

const argv = require('yargs').argv;


function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const getList = async () => {
        const list = await Contacts.getListContacts();
        console.table(list);
      };
      getList();
      break;

    case 'get':
      const getContact = async () => {
        const get = await Contacts.getContactById(id);
        console.table(get);
      };
      getContact();
      break;

    case 'add':
      const addContact = async () => {
        const add = await Contacts.addContact(name, email, phone);
        const list = await Contacts.getListContacts();
        console.table(add);
        console.table(list);
      };
      addContact();
      break;

    case 'remove':
      const removeContact = async () => {
        const remove = await Contacts.removeContactById(id);
        const list = await Contacts.getListContacts();
        console.table(remove);
        console.table(list);
      };
      removeContact();
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
