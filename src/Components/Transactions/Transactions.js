
import { useState, useRef, useCallback ,useEffect} from "react";
import useEthereumSearch from "../../CustomHooks/useEthereumSearch";



function Transactions({address}) {
  const [pageNumber, setPageNumber] = useState(1);

  const { transactions, loading, message, hasMore } = useEthereumSearch(
    address,
    pageNumber
  );

  const observer = useRef();
  const lastTransctionElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });

    if (node) observer.current.observe(node);
  },[loading,hasMore]);


  useEffect(() => {
      setPageNumber(1);
  },[address])

  return (
<>
      {transactions.length > 0 &&
        transactions.map((t, index) => {
          return (
            <div
              key={t.hash}
              ref={
                transactions.length === index + 1
                  ? lastTransctionElementRef
                  : null
              }
            >
              <div>timestamp: {t.timeStamp}</div>
              <div>from: {t.from}</div>
              <div>to: {t.to}</div>
              <div>hash: {t.hash}</div>
              <div>value: {t.value}</div>
              <div>confirmations: {t.confirmations}</div>
              <br></br>
            </div>
          );
        })}
      <div>{loading && "Loading..."}</div>
      <div>{message}</div>
    </>
  );
}

export default Transactions;
