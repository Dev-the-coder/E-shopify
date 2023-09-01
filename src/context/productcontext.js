import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const AppContext = createContext();


const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get('https://dummyjson.com/products')
            .then((res) => {
                setUsers(res.data.products)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <AppContext.Provider value={[users, setUsers]}>
            {children}
        </AppContext.Provider >
    );
};

// custom hooks
const useProductContext = () => {
    return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };