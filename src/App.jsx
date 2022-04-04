import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBoxes from "./components/InfoBoxes";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 22.937787,
    lng: 77.613415,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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

          const sortedData = sortData(data);

          setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries); // Updating our countries array
        });
    };
    getCountriesData(); // Calling out function over here.
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    if (countryCode === "worldwide") {
      setMapCenter([22.937787, 77.613415]);
      setMapZoom(3);
    }

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
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
          <InfoBoxes
            active={casesType === "cases"}
            onClick={() => setCasesType("cases")}
            isRed
            title={"Cases"}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBoxes
            active={casesType === "recovered"}
            onClick={() => setCasesType("recovered")}
            title={"Recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBoxes
            active={casesType === "deaths"}
            onClick={() => setCasesType("deaths")}
            isRed
            title={"Deaths"}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>

      <Card className="app__right">
        <CardContent className="app__right__content">
          <div>
            <h3>Live cases by countries</h3>
            <Table countries={tableData} />
          </div>

          <div>
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
