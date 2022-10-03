import React, { useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const handleChange = (e) => {
    console.log(e.target.value);
  }

  return (
    <div>
      {routes.length > 0 && (
        <>
          <select name="route-select" class="form-select" id="route-select" onChange={handleChange}>
            <option value="">Select route</option>
          </select>
        </>
      )}
    </div>
  );
};

export default Routes;