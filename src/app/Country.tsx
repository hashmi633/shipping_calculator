'use client'

import React, { useState } from "react";


interface Country {
  code: string,
  name: string
}

type dimension = {
  length: number,
  width: number,
  height: number
}

export const Country = () => {

  const countries: Country[] = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
  ];


  const [toCountry, setToCountry] = useState<string>('');
  const [fromCountry, setFromCountry] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [dimension, setDimension] = useState<dimension>({
    length: 0,
    width: 0,
    height: 0
  })

  const onChange = (e: any) => {
    setDimension({ ...dimension, [e.target.name]: [e.target.value] })
  }
  const onClickFind = async (fromCountry: string, toCountry: string, weight: number, length: number, width: number, height: number) => {
    try {
      const response = await fetch(`/api/rate?fromCountry=${fromCountry}&toCountry=${toCountry}&weight=${weight}&length=${length}&width=${width}&height=${height}`, {
        method: "GET"
      });
      const data = await response.json();
    } catch (error) {

      console.error('Error:', error);
    }
  };
  
  return (
    <main>
      Hello
      <div>
        <label>From Country</label>
        <select value={fromCountry} onChange={(e) => { setFromCountry(e.target.value) }}>
          <option value="">Select</option>
          {countries.map((country) => (
            <option>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To Country</label>
        <select value={toCountry} onChange={(e) => { setToCountry(e.target.value) }}>
          <option value="">Select</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Weight (Kg):</label>
        <input type="number" defaultValue='1' onChange={(e) => setWeight(e.target.value)} ></input >


      </div>
      <div>
        <h3>Parcel Dimensions (Optional)</h3>
        <div>
          Length
          <input value={dimension.length} name="length" onChange={onChange}></input>
        </div>
        <div>
          Width
          <input value={dimension.width} name="width" onChange={onChange}></input>
        </div>
        <div>
          Height
          <input value={dimension.height} name="height" onChange={onChange}></input>
        </div>
      </div>
      <button onClick={() => onClickFind(fromCountry, toCountry, parseFloat(weight), dimension.length, dimension.width, dimension.height)}>Show Shipping Option</button>


    </main>
  )
}