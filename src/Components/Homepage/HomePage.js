import React, { useEffect, useState } from 'react';
import data from '../Data/data.json';

import Paper from '../Paper/Paper';

const HomePage = () => {
  const [city, setCity] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const optionArr = [];
    for (let key in data) {
      optionArr.push({
        value: data[key].edition_code,
        label: key
      });
    }
    setOptions(optionArr);
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  return (
    <>
      <Paper selectedCity={city} />
    </>
  )
}

export default HomePage;
