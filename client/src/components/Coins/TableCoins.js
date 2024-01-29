import React from "react";
import CoinRow from "./CoinRow";
import styles from './Coins.module.css';

const titles = ["#", "Mercado", "Precio", "Cambio de precio", "Volumen 24h"];

const TableCoins = ({ coins, search }) => {
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!coins) return <div>no coins</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={`table table-dark mt-4 table-hover ${styles.tableCoin}`}>
        <thead>
          <tr>
            {titles.map((title, i) => (
              <td key={i}>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin, index) => (
            <CoinRow key={coin.id} coin={coin} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCoins;
