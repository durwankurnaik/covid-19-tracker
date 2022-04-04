import "../styles/Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map(({ country, cases }, idx) => (
            <tr key={idx}>
              <td>{country}</td>
              <td>{numeral(cases).format("0,0")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
