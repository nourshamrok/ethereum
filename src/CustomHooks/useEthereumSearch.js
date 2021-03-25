import { useState, useEffect } from "react";
import axios from "axios";
import { isAddress} from 'web3-utils';


export default function useEthereumSearch(address, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState(null);
  const [hasMore, setHasMore] = useState(false);



  useEffect(() => {

    if (!isAddress(address)){
      setMessage("not valid address");
      return
    }
    setLoading(true);
    setMessage(null);

    axios({
      method: "GET",
      url: "https://api.etherscan.io/api",
      params: {
        module: "account",
        action: "txlist",
        address: address ,
        startblock: 0,
        endblock: "99999999",
        page: pageNumber,
        offset: 10,
        sort: "asc",
        apikey: "QBQI7KVWMV13JH1B13F8297AG8NCCFH72Y",
      },
    }).then((res) => {
      console.log(res.data.result);
      setLoading(false);
      setHasMore(res.data.result.length > 0);
      setTransactions((prevTransactions) => {
        const data =
          typeof res.data.result == "object" &&
          res.data.result.map((t) => {
            const { timeStamp, to, from, value, confirmations, hash } = t;
            return { timeStamp, to, from, value, confirmations, hash };
          });

        return [...prevTransactions, ...data];
      });
    });
  }, [address, pageNumber]);

  useEffect(() => {
    setTransactions([]);
  },[address]);

  return { transactions, loading, message, hasMore };
}
