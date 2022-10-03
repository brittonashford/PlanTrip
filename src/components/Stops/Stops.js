import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../context/AppContext';

const Stops = () => {

    const [stops, setStops] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const { selectedRoute, selectedDirection, setSelectedStop } = useContext(AppContext);

    useEffect(
        () => {
            async function getStops(selectedRoute, selectedDirection) {
                try{
                    const response = await axios.get(
                        `https://svc.metrotransit.org/nextripv2/stops/${selectedRoute}/${selectedDirection}`
                        );
                        
                    const stopList = await response.data;
    
                    if (response) {
                        setStops(stopList);
                    }
                } catch (error) {
                    console.log("An error occurred.", error);
                } 
                // finally {
                //     setIsLoading(false);
                // }       
            }
    
            if(selectedRoute && selectedDirection){
                getStops(selectedRoute, selectedDirection);
            };
        },[selectedRoute, selectedDirection]);

    const handleChange = (e) => {
        setSelectedStop(e.target.value);
    }

    return(
        <>
        {stops.length > 0 && (
            <select name="stop" className="form-select" id="stop-select" onChange={handleChange}>
                <option value="">Select stop</option>
                {stops.map((stop) => (
                    <option key={stop.place_code} value={stop.place_code}>
                        {stop.description}
                    </option>
                ))}
            </select>
        )}
        </>
    )
}

export default Stops;