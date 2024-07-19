import React, { createContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
    const [user, setUser] = useState('hello');

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
