
import React, { useEffect, useState } from 'react';
import { Button, Input, Space } from 'antd';
import 'antd/dist/reset.css';
import './styles.css';
import ListCard from './ListCard';


function Search() {

  //STATES
  const [searchTerm, setSearchTerm] = useState('');
  const [resultFromApi, setResultFromApi] = useState({});
  const [resultFromTrendingAPI, setResultFromTrendingAPI] = useState({});
  const [resultFromRandomPostAPI, setResultFromRandomPostAPI] = useState({});
  const [resultFromHotPostAPI, setResultFromHotPostAPI] = useState({});
  const [resultFromTopPostAPI, setResultFromTopPostAPI] = useState({});
  const [checked, setChecked] = useState(false);
  const [checkedRandom, setCheckedRandom] = useState(false);
  const [checkedHot, setCheckedHot] = useState(false);
  const [checkedTop, setCheckedTop] = useState(false);

  //FUNCTIONS TOGGLE
  const toggleChecked = () => {
    setChecked(!checked);
  };
  const toggleCheckedRandom = () => {
    setCheckedRandom(!checkedRandom);
  };
  const toggleCheckedHot = () => {
    setCheckedHot(!checkedHot);
  };
  const toggleCheckedTop = () => {
    setCheckedTop(!checkedTop);
  };

  //FUNCTIONS TO HANDLE INPUT AND SUBMIT
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
      const json = await response.json();
      console.log(json);
      setResultFromApi(json);
    }
    catch (error) {
      console.log(error);
    }
  };

  //USE EFFECTS
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/Home/new.json?limit=5&t=2022`);
        const json = await response.json();
        console.log(json);
        setResultFromTrendingAPI(json);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchTrending();
    console.log('called', resultFromTrendingAPI)
  }, [checked]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/Home/rising.json?limit=5&t=2022`);
        const json = await response.json();
        console.log(json);
        setResultFromRandomPostAPI(json);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchTrending();
    console.log('called', setResultFromRandomPostAPI)
  }, [checkedRandom]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/Home/hot.json?limit=5&t=2022`);
        const json = await response.json();
        console.log(json);
        setResultFromHotPostAPI(json);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchTrending();
    console.log('called', setResultFromHotPostAPI)
  }, [checkedHot]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/Home/top.json?limit=5&t=2022`);
        const json = await response.json();
        console.log(json);
        setResultFromTopPostAPI(json);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchTrending();
    console.log('called', setResultFromTopPostAPI)
  }, [checkedTop]);


  return (
    <div className="App">
      <header className="App-header">
        <form className="searchTab" onSubmit={handleSubmit}>
          <Space direction="horizontal" className='main-header'>
            <Input
              placeholder="Search for a subreddit"
              value={searchTerm}
              onChange={handleChange}
              size="large"
            />
            <Button type="primary" size='large' htmlType="submit">
              Search
            </Button>

            <Button type="primary" size="large" className={checked ? 'green-button' : 'red-button'} onClick={toggleChecked}>
              {!checked ? 'Show Trending' : 'Dont Show Trending'}
            </Button>

            <Button type="primary" size="large" className={checkedRandom ? 'green-button' : 'red-button'} onClick={toggleCheckedRandom}>
              {!checkedRandom ? 'Show Random' : 'Dont Show Random'}
            </Button>

            <Button type="primary" size="large" className={checkedHot ? 'green-button' : 'red-button'} onClick={toggleCheckedHot}>
              {!checkedHot ? 'Show Hot' : 'Dont Show Hot'}
            </Button>

            <Button type="primary" size="large" className={checkedTop ? 'green-button' : 'red-button'} onClick={toggleCheckedTop}>
              {!checkedTop ? 'Show Top' : 'Dont Show Top'}
            </Button>


          </Space>
        </form>

        {resultFromApi.data && !checked && !checkedRandom && !checkedHot && !checkedTop && (
          <ListCard resultFromApi={resultFromApi} />
        )}

        {checked && (
          <ListCard resultFromApi={resultFromTrendingAPI} />
        )}

        {checkedRandom && (
          <ListCard resultFromApi={resultFromRandomPostAPI} />
        )}

        {checkedHot && (
          <ListCard resultFromApi={resultFromHotPostAPI} />
        )}

        {checkedTop && (
          <ListCard resultFromApi={resultFromTopPostAPI} />
        )}



      </header>

    </div >
  );
}

export default Search;