import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Directions = () => {

    const [directions, setDirections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { selectedRoute, selectedDirection, setSelectedDirection } = useContext(AppContext);

    console.log(`Directions.js-- route: ${selectedRoute} direction: ${selectedDirection}`);

    useEffect(
        () => {
            async function getDirections(selectedRoute) {
                try{
                    const response = await axios.get(
                        `https://svc.metrotransit.org/nextripv2/directions/${selectedRoute}`
                        );
                    const directionList = await response.data;
                    console.log(directionList)
    
                    if (response) {
                        setDirections(directionList);
                    }
                } catch (error) {
                    console.log("An error occurred.", error);
                } finally {
                    setIsLoading(false);
                }     
                console.log('Directions.js useEffect hit. selectedRoute: ', selectedRoute);    
            }
    
            if(selectedRoute){
                getDirections(selectedRoute);
            };
        },[selectedRoute]);

    const handleChange = (e) => {
        console.log(e.target.value);
        setSelectedDirection(e.target.value);
    }

    return (
        <div>
        {isLoading ? (
            <h2>Loading...</h2>
        ) 
        :
        directions.length > 0 && (
            <select name="direction" class="form-select" id="direction-select" onChange={handleChange}>
                <option value="">Select direction</option>
                {directions.map((direction) => (
                    <option key={direction.direction_id} value={direction.direction_id}>
                        {direction.direction_name}
                    </option>
                ))}
            </select>
        )}
        </div>
    )
}

export default Directions;