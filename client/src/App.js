import './App.css';
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './redux/store/store';
import Authentication from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import { countryCodes } from './api/authAPI';
import { setCountryData } from './redux/actions/countryActions';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCountryData = async() => {
      try{
        const data = await countryCodes()
        const callingCodes = data.map((country) => (country.idd.root + country.idd.suffixes)).filter((code) => !isNaN(code));
        const countryNames = data.filter((country) => callingCodes.includes(country.idd.root + country.idd.suffixes)).map((country) => country.name.official);
        const countryFlags = data.filter((country) => callingCodes.includes(country.idd.root + country.idd.suffixes)).map((country) => country.flags.svg);
        dispatch(setCountryData({callingCodes, countryNames, countryFlags}))
      }catch(error){
        console.log('Error fetchuinf country data');
      }
    }

    fetchCountryData()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Authentication></Authentication>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
