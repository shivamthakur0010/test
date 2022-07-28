import React from 'react'
import A from './A';
import B from './B';
import Loader from './Loader';

const App = (props) => {
    console.log(props);
   
    if (props.loading ===undefined) {
        return <Loader/>
    }
    return(
        <>
        {/* {(props.loading) && <A/>}
        {!(props.loading) && <B/>} */}
        {(props.loading)? <A/> : <B/>}
        </>
    )


}

export default App;