import PropTypes from 'prop-types'
import css from './Filter.module.css'

const Filter = ({ value, onChange }) => {
  
  return (
  <label className={css.contact_lable}>
    Find contacts by name
      <input
        className={css.contact_input}
        onChange={onChange}
        value={value}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>
  )
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
