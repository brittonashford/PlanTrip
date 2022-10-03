import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../context/AppContext';

const Stops = () => {

    const [stops, setStops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { selectedRoute, selectedDirection, setSelectedStop } = useContext(AppContext);

    useEffect(
        () => {
            async function getStops(selectedRoute, selectedDirection) {
                try{
                    const response = await axios.get(
                        `https://svc.metrotransit.org/nextripv2/stops/${selectedRoute}/${selectedDirection}`
                        );
                        
                    const stopList = await response.data;
                    console.log(stopList)
    
                    if (response) {
                        setStops(stopList);
                    }
                } catch (error) {
                    console.log("An error occurred.", error);
                } finally {
                    setIsLoading(false);
                }     
                console.log(`Stops.js useEffect hit.`);    
            }
    
            if(selectedRoute && selectedDirection){
                console.log('getStops');
                getStops(selectedRoute, selectedDirection);
            };
        },[selectedRoute, selectedDirection]);

    const handleChange = (e) => {
        console.log(e.target.value);
        setSelectedStop(e.target.value);
    }

    return(
        <>
        {isLoading ? (
            <h2>Loading...</h2>
        )
        :
        (
            <select name="stop" class="form-select" id="stop-select" onChange={handleChange}>
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