import "../styles/Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }, idx) => (
        <tr key={idx}>
          <td>{country}</td>
          <td>{numeral(cases).format("0,0")}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
