import PropTypes from 'prop-types';
import { SearchFormStyled } from './SearchForm.styled';
import { SearchFormInput } from './SearchFormInput/SearchFormInput';
import { SearchFormButton } from './SearchFormButton/SearchFormButton';
import { useState } from 'react';

export const SearchForm = ({onSubmit}) => {
  const [inputText, setInputText] = useState('');

  const handleTextChange = event => {
    setInputText(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputText.trim() === '') {
      return;
    }

    onSubmit(inputText);
    setInputText('');
  };

    return (
      <SearchFormStyled onSubmit={handleSubmit}>
        <SearchFormButton />
        <SearchFormInput
          value={inputText}
          onChange={handleTextChange}
        />
      </SearchFormStyled>
    );
  }

SearchForm.propType = {
  inputText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
