import React, { useState, useEffect } from "react";
import data from '../Data/data.json';


const Paper = () => {
  const [citySelect, setCitySelect] = useState('');
  const [paperDate, setPaperDate] = useState(new Date());
  const [paperNumber, setPaperNumber] = useState(1);
  const [my, setMy] = useState('');
  const [paperTarget, setPaperTarget] = useState('');
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

    const history = localStorage.getItem('citySelect');
    if (history !== null && history !== "") {
      setCitySelect(history);
      loadNews(history, paperNumber);
    }
  }, []);

  const handlePrev = () => {
    if (paperNumber > 1) {
      const newPaperNumber = paperNumber - 1;
      setPaperNumber(newPaperNumber);
      loadNews(citySelect, newPaperNumber);
    }
  }


  const handleNext = () => {
    const newPaperNumber = paperNumber + 1;
    setPaperNumber(newPaperNumber);
    loadNews(citySelect, newPaperNumber);
  }

  const loadNews = (city, page) => {
    localStorage.setItem('citySelect', city);
    const formattedPage = page < 10 ? `0${page}` : page;
    const currentDate = paperDate.toISOString().split('T')[0].replace(/[-]/g, '/');
    const url = `${process.env.REACT_APP_BASE_URL}/${currentDate}${my}/${city}/${formattedPage}/hdimage.jpg`;
    setPaperTarget(url);
  }

  const handleMyCity = () => {
    const newMyValue = my === '' ? '/my' : '';
    setMy(newMyValue);
    setPaperNumber(1);
    loadNews(citySelect, 1);
  }

  const handleChange = (value) => {
    setCitySelect(value);
    loadNews(value, paperNumber);
  }

  useEffect(() => {
    loadNews(citySelect, paperNumber);
  }, [citySelect, paperNumber, my]);


  return (
    <>
      <select id="citySelect" value={citySelect} onChange={(e) => handleChange(e.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <input id="paperDate" type="date" value={paperDate.toISOString().substring(0, 10)} onChange={(e) => setPaperDate(new Date(e.target.value))} />
      <button id="prev" onClick={handlePrev} style={{ marginRight: '10px' }}>Prev</button>
      <button id="next" onClick={handleNext} style={{ marginRight: '10px' }}>Next</button>
      <button id="mycity" onClick={handleMyCity} style={{ justifyContent: 'flex-end' }}>
        {my === '' ? 'Toggle to My City' : 'Toggle to Main Paper'}
      </button>
      <div className="paper">
        <img id="paperTarget" src={paperTarget} alt="" />
      </div>
    </>
  );
}

export default Paper;
