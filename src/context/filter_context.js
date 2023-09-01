import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/filterReducer";
import { useProductContext } from "./productcontext";
// import filterReducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: "lowest",
    filters: {
        text: "",
        category: "all",
        brand: "all",
        maxprice: 0,
        price: 0, minprice: 0,
    },
};

export const FilterContextProvider = ({ children }) => {
    const [users, setUsers] = useProductContext();
    useEffect(() => {
        // console.log(users);
    }, [users])


    const [state, dispatch] = useReducer(reducer, initialState);

    const sorting = () => {
        dispatch({ type: "GET_SORT_VALUE" });
    }

    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
    };

    //load products
    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: users });
    }, [users]);


    //sorting
    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" })
        dispatch({ type: "SORTING_PRODUCTS" });
    }, [users, state.sorting_value, state.filters])

    //clearfilters
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" })
    }


    return (
        <FilterContext.Provider
            value={{ ...state, sorting, updateFilterValue, clearFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};