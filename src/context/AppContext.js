import React, { useState } from 'react';

export const AppContext = React.createContext();

export const Provider = (props) => {

    const [selectedRoute, setSelectedRoute] = useState();
    const [selectedDirection, setSelectedDirection] = useState();
    const [selectedStop, setSelectedStop] = useState();

    return (
        <AppContext.Provider value={{
            selectedRoute, 
            setSelectedRoute,
            selectedDirection, 
            setSelectedDirection,
            selectedStop, 
            setSelectedStop
        }}>
            { props.children }
        </AppContext.Provider>
    )
}