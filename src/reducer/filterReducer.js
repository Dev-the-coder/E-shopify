const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":

            let price_arr = action.payload.map((curElem) => curElem.price);
            // console.log(Math.max(...price_arr));
            let maxprice = Math.max(...price_arr);

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxprice, price: maxprice }
            };


        case "GET_SORT_VALUE":
            let userSortValue = document.getElementById("sort");
            let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
            // console.log(sort_value);
            return {
                ...state,
                sorting_value: sort_value,
            };

        case "SORTING_PRODUCTS":
            let newSortData;

            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];

            const sortingProducts = (a, b) => {
                if (sorting_value === "lowest") {
                    return a.price - b.price;
                }

                if (sorting_value === "highest") {
                    return b.price - a.price;
                }

                if (sorting_value === "a-z") {
                    return a.title.localeCompare(b.title);
                }

                if (sorting_value === "z-a") {
                    return b.title.localeCompare(a.title);
                }
            };

            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filter_products: newSortData,
            };

        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            }

        case "FILTER_PRODUCTS":
            let { all_products } = state;
            let tempFilterData = all_products;
            const { text, category, brand, price } = state.filters;

            if (text) {
                tempFilterData = tempFilterData.filter((curElm) => {
                    return curElm.title.toLowerCase().includes(text);
                })
            }

            if (category !== "all") {
                tempFilterData = tempFilterData.filter((curElm) => {
                    return curElm.category === category;
                })
            }

            if (brand !== "all") {
                tempFilterData = tempFilterData.filter((curElm) => {
                    return curElm.brand === brand;
                })
            }
            if (price === 0) {
                tempFilterData = tempFilterData.filter((curElm) => {
                    return curElm.price === price;
                });
            }
            else {
                tempFilterData = tempFilterData.filter((curElm) => {
                    return curElm.price <= price;
                })
            }

            return {
                ...state,
                filter_products: tempFilterData,
            }

        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "all",
                    brand: "all",
                    maxprice: state.filters.maxprice,
                    price: state.filters.maxprice, minprice: 0,
                }
            }

        default:
            return state;
    }
};

export default filterReducer;