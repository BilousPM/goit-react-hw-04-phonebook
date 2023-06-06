import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Form from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = data => {
    const preCheck = contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === data.name.toLowerCase() || number === data.number
    );

    if (preCheck) {
      alert(`Sorry, contact ${data.name} is already exists`);
      return;
    }
    const contact = {
      id: nanoid(5),
      ...data,
    };

    setContacts([contact, ...contacts]);

    // this.setState(({ contacts }) => ({
    //   contacts: [contact, ...contacts],
    // }));
  };

  const onSelectedContacts = () => {
    // const { contacts } = this.state;
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const selectedContacts = onSelectedContacts();

  return (
    <div className={css.phonebook}>
      <h1 className={css.phonebook_title}>Phonebook</h1>
      <Form onSubmit={handleFormSubmit} />

      <h2 className={css.phonebook_title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={selectedContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
