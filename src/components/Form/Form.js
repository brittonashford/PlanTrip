import Routes from "../Routes/Routes";
import { AppContext } from "../../context/AppContext";
import { useContext } from 'react';


const Form = () => {

    const {selectedRoute, selectedDirection, selectedStop} = useContext(AppContext);

    return(
        <>
            <div className="form-container wrap">
                <h2>Real-time Departures</h2>
                <Routes />
            </div>            
        </>
    )
}

export default Form;