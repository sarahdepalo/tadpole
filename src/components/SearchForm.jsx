import {useState} from 'react';

const SearchForm = ({fetchDailyWeather, savedLocationButton}) => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    parseInt(event.target.value)
    setInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput('');
    fetchDailyWeather(input);
    savedLocationButton(false)
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        placeholder="Search for weather by zipcode..."
        name="zipcode"
        value={input}
        onChange={(event) => handleChange(event)}
        className="zipcodeInput"
        maxlength="5"
        minlength="5"
      />
    </form>
  );
};

export default SearchForm;
