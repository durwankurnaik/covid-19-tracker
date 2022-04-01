import { Card, CardContent, FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBoxes from "./components/InfoBoxes";
import Map from "./components/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries") // Getting the data from server.
        .then((response) => response.json()) // Parsing the data into JSON format
        .then((data) => {
          // Processing the data
          const countries = data.map((country) => ({
            name: country.country, // India, Nepal, Bhutan
            value: country.countryInfo.iso2, // IN, NP, BT
          }));

          setCountries(countries); // Updating our countries array
        });
    };
    getCountriesData(); // Calling out function over here.
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, idx) => (
                <MenuItem key={idx} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Info Boxes */}
        <div className="app__stats">
          <InfoBoxes title={"Cases"} cases={25000} total={1200000} />
          <InfoBoxes title={"Recovered"} cases={13000} total={900000} />
          <InfoBoxes title={"Deaths"} cases={9000} total={500000} />
        </div>

        <div>
          <Map />
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by countries</h3>
          <h3>Graph details</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
