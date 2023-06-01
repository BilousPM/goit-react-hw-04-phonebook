import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFormSubmit = data => {
    const preCheck = this.state.contacts.some(
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

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onSelectedContacts = () => {
    const { contacts } = this.state;
    const normalisedFilter = this.state.filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const selectedContacts = this.onSelectedContacts();

    return (
      <div className={css.phonebook}>
        <h1 className={css.phonebook_title}>Phonebook</h1>
        <Form onSubmit={this.handleFormSubmit} />

        <h2 className={css.phonebook_title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={selectedContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
