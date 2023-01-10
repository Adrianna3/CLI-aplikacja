const fs = require("node:fs").promises;
const path = require("node:path");

const contactsPath = path.resolve("db");

//C:\Users\lenovo\Desktop\node\hw1-node.js\db

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    // console.log(JSON.parse(contacts));
      // console.table(JSON.parse(contacts));
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const requestedContact = contacts.find(({ id }) => id === contactId);
    console.table(requestedContact);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter(({ id }) => id === contactId);
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.table(contact);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const lastId = Math.max(...contacts.map((c) => parseInt(c.id, 10))) + 1;
    const newContact = { id: lastId.toString(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.table(newContact);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };

// (async () => {
//     console.log(await listContacts());

//     console.log(await getContactById("5"));

//     await removeContact("4");

//     await addContact("Ada", "aa333a@wp.pl", "5555533333");

//     console.log(await listContacts());
// })();
