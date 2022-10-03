import { AppContext } from "../../context/AppContext";
import { useContext } from 'react';
import Routes from "../Routes/Routes";
import Directions from "../Directions/Directions";
import Stops from "../Stops/Stops";
import Departures from "../Departures/Departures";

const Form = () => {

    const {selectedRoute, selectedDirection, selectedStop} = useContext(AppContext);

    return(
        <>
            <div className="form-container wrap">
                <h2 className="fade-in">Real-time Departures</h2>
                <Routes />
                { selectedRoute && <Directions /> }
                { selectedDirection && <Stops /> }
            </div>   
            { selectedStop && <Departures />}         
        </>
    )
}

export default Form;