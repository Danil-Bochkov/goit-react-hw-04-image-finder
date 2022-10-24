import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleNameChange = e => {
    setInput(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (input.trim() === '') {
      return;
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BiSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handleNameChange}
          value={input}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
