'use client'

import React, { useState } from "react";

type dimension = {
  length: number,
  width: number,
  height: number
}


export const Country = () => {

  const countries: string[] = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'Netherlands', 'France'];

  const [toCountry, setToCountry] = useState<string>('');
  const [fromCountry, setFromCountry] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [dimension, setDimension] = useState<dimension>({
    length: 0,
    width: 0,
    height: 0
  })
  const [shippingOptions, setShippingOptions] = useState<[]>([])

  const onChange = (e: any) => {
    setDimension({ ...dimension, [e.target.name]: e.target.value })
  }
  const onClickFind = async (fromCountry: string, toCountry: string, weight: number, length: number, width: number, height: number) => {
    console.log(weight);
    try {
      const response = await fetch(`/api/rate?fromCountry=${fromCountry}&toCountry=${toCountry}&weight=${weight}&length=${length}&width=${width}&height=${height}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setShippingOptions(data.results); // Assuming you want to store the results in state

    } catch (error) {
      return console.error('Error:', error);
    }
  };

  return (
    <main>

      <div>
        <label>From Country</label>
        <select className="p-3 mb-5 bg-slate-400" value={fromCountry} onChange={(e) => { setFromCountry(e.target.value) }}>
          <option value="">Select Here</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To Country</label>
        <select className="p-3 mb-5 bg-slate-400" value={toCountry} onChange={(e) => { setToCountry(e.target.value) }}>
          <option value="">Select Here</option>
          {countries.map((country) => (
            <option >{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Weight (Kg):</label>
        <input className="p-3 mb-5 bg-slate-400" type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} ></input >


      </div>
      <div>
        <h3>Parcel Dimensions</h3>
        <div>
          Length
          <input className="p-3 mb-5 bg-slate-400" type="number" value={dimension.length} name="length" onChange={onChange}></input>
        </div>
        <div>
          Width
          <input className="p-3 mb-5 bg-slate-400" type="number" value={dimension.width} name="width" onChange={onChange}></input>
        </div>
        <div>
          Height
          <input className="p-3 mb-5 bg-slate-400" type="number" value={dimension.height} name="height" onChange={onChange}></input>
        </div>
      </div>
      <button className="p-3 mb-5 bg-blue-400 ml-2" onClick={() => onClickFind(fromCountry, toCountry, weight, dimension.length, dimension.width, dimension.height)}>
        Show Shipping Option
      </button>
      <div>
        {shippingOptions.map((option, index) => (
          <div key={index}>{`${index + 1}. ${option}`}</div>
        ))}
      </div>

    </main>
  )
}