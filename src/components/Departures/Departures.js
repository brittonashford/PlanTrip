import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Departures = () => {
  const [departures, setDepartures] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  const [stopName, setStopName] = useState();
  const [stopNumber, setStopNumber] = useState();
  const { selectedRoute, selectedDirection, selectedStop } = useContext(AppContext);


  useEffect(() => {
    async function getDepartures(selectedRoute, selectedDirection, selectedStop) {
      try {
        const response = await axios.get(
          `https://svc.metrotransit.org/nextripv2/${selectedRoute}/${selectedDirection}/${selectedStop}`
        );

        const departureList = await response.data.departures;

        if (response.status === 200) {
            setDepartures(departureList);
            setStopNumber(response.data.stops[0].stop_id)
            setStopName(response.data.stops[0].description)
        }

      } catch (error) {
        console.log("An error occurred.", error);
      } 
    //   finally {
    //     setIsLoading(false);
    //   }
    }

    getDepartures(selectedRoute, selectedDirection, selectedStop);
}, [selectedRoute, selectedDirection, selectedStop]);
    

  return (
  <>
    {departures.length > 0 ?
        (
        <div className="departure-container">
            <div id="stop-description">
                { stopName && <h3 className="stop-name LR-tbl-pad">{stopName}</h3> }
                { stopNumber && <span className="stop-number LR-tbl-pad"><strong>Stop#: </strong>{stopNumber}</span>}
            </div>
            <div id="stop-depatures">
                <table id="departures-table">
                    <caption id="departures-table-caption">
                        Departures Table
                    </caption>
                    <thead id="departure-tbl-header">
                        <tr>
                            <th className="route">Route</th>
                            <th className="destination">Destination</th>
                            <th className="departs text-right">Departs</th>
                        </tr>
                    </thead> 
                    <tbody> 
                    {departures.map((departure) => (
                        <tr key={departure.departure_time} className="departure">
                            <td className="route-number ">{departure.route_id}</td>
                            <td className="route-name">{departure.description}</td>
                            <td className="depart-time ">{departure.departure_text}</td>
                        </tr>
                    ))}
                    </tbody>
                </table> 
            </div>
        </div>
        )
        :
        (
            <h2>No departures available at this time.</h2>
        )
    }
  </>
  )
}

export default Departures;