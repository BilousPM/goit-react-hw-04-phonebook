import React, { Component } from "react";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'


class Form extends Component {
  
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({[name]: value})
    };
  
  handleContactSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state)
    this.resetForm();
  };

  resetForm = () => {
      this.setState({ name: "", number: "" });
  }

  render() {
    return (
    <form className={css.contact_form } onSubmit={this.handleContactSubmit} >
        <label className={css.form_label}>
          Name : 
          <input
            className={css.form_input}
            onChange={this.handleChange}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.form_label}>
          Number : 
          <input
            className={css.form_input}
            onChange={this.handleChange}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
          <button className={css.btn_submit} type='submit'>Add contact</button>
        </form>
  )}
};

export default Form;
 
Form.prorTypes = {
  onSubmit: PropTypes.func.isRequired,
}