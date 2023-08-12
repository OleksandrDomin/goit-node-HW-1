
const fs = require("node:fs/promises");
const path = require('node:path');
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, 'db/contacts.json');


// TODO: задокументировать каждую функцию
 async function listContacts() {
  // ...твой код. Возвращает массив контактов.
   const allContacts = await fs.readFile(contactsPath, "utf8");
   return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const allContacts = await listContacts();
  const contactByID = allContacts.find((contact) => contact.id === contactId);
  return contactByID || null;
}
  



async function addContact(name, email, phone) {
  // ...твой код. Возвращает объект добавленного контакта.
  const allContacts = await listContacts();

  const newContact = {
    name, email, phone,
    id: crypto.randomUUID()
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact
}

async function removeContact(contactId) {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null
  };
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;

}

async function updeteByID(contactId, data) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null
  };
  allContacts[index] = { ...data, id: contactId };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updeteByID,
};