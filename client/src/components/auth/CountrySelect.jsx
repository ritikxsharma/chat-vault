import React from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
const CountrySelect = ({selectedCountry, onCountryChange}) => {
  
  const callingCodes = useSelector((state) => state.country.callingCodes)
  const countryNames = useSelector((state) => state.country.countryNames)
  const countryFlags = useSelector((state) => state.country.countryFlags)
  
  return (
    <>
        <Select
            options={
              callingCodes.map((code, index) => ({
                label: (
                  <div key={index}>
                    <img
                      src={countryFlags[index]}
                      className='flag-icon'
                      style={{width: '24px', height: 'auto'}}
                    />
                    {code}
                  </div>
                ),
                value: code,
              }))
            }
            value={{ label: selectedCountry, value: selectedCountry }}
            onChange={(selectedOption) => onCountryChange(selectedOption.value)}
            styles={{
              control: (provided, state) => ({
                ...provided,
                width: '100%',
                border: 'none',
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60px',
                fontSize: '14px',
                boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
              }),
              menu: (provided, state) => ({
                ...provided,
                border: '1px solid #000',
                borderRadius: 0,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f0f0f0' : '#fff',  
                color: state.isSelected ? '#fff' : '#333',
                fontSize: '12px',
                display: 'flex',
              }),
            }}
            
          />
    </>
  )
}

export default CountrySelect