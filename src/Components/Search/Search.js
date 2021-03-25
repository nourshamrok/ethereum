
import { useState } from 'react';
import { isAddress} from 'web3-utils';


export default function Search({changeAddress}) {
    const [error,setError] = useState(null);

    function change(e) {
       
        if (isAddress(e.target.value)){
            setError(null);
        }else{
            setError("not valid address");
        }
        changeAddress(e.target.value);
      }


return (
    <>
    <div>enter valid address:</div>
    <input type="text" onChange={change}></input>
    <div>{error }</div>
    </>
    
)
}