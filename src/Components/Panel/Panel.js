import "./Panel.scss";
import { useState } from "react";
import Search from '../Search/Search';
import Transactions from '../Transactions/Transactions'

function Panel() {
  const [address, setAddress] = useState(null);


  function changeAddress(address) {
    setAddress(address);
  }

  return (
    <div className="top">
        <Search changeAddress={changeAddress}/>
       {address && <Transactions address={address}/> }
    </div>
  );
}

export default Panel;
