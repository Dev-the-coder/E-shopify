import React from 'react'
import { useFilterContext } from '../context/filter_context';
import styled from 'styled-components';
import { Button } from '../styles/Button'

const FilterSection = () => {

    const {
        filters: { text, category, brand, price, maxprice, minprice },
        updateFilterValue,
        clearFilters,
        all_products,
    } = useFilterContext();

    const getUniqueData = (data, property) => {
        let unique_category = data.map((curElm) => {
            return curElm[property];
        })
        return unique_category = ["all", ...new Set(unique_category)];
    }

    const categoryData = getUniqueData(all_products, 'category');
    const brandData = getUniqueData(all_products, "brand")
    // console.log(brandData)

    return (
        <Wrapper>

            {/* filter-search */}
            <div className='filter-search'>
                <form>
                    <input type="text" name="text" value={text}
                        placeholder='Search product' onChange={updateFilterValue} />
                </form>
            </div>

            {/* filter-catagory */}
            <div className="filter-category">
                <h3>Category</h3>
                <div>
                    {categoryData.map((curElem, index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                name="category"
                                value={curElem}
                                className={curElem === category ? "active" : ""}
                                onClick={updateFilterValue}>
                                {curElem}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* filter-brand */}
            <div className="filter-brand">
                <h3>Brand</h3>
                <form action="#">
                    <select
                        name="brand"
                        id="brand"
                        className="filter-brand--select"
                        onClick={updateFilterValue}>
                        {brandData.map((curElem, index) => {
                            return (
                                <option selected={brand === curElem ? true : false}
                                    key={index} value={curElem} name="brand">
                                    {curElem}
                                </option>
                            );
                        })}
                    </select>
                </form>
            </div>

            {/* price-filter */}
            <div className='filter_price'>
                <h3>Price</h3>
                <p>{price} $</p>
                <input type="range" name="price" min={minprice} max={maxprice}
                    value={price} onChange={updateFilterValue} />
            </div>

            {/* clear filter button */}
            <div className='filter-clear'>
                <Button onClick={clearFilters}> Clear Filters </Button>
            </div>

        </Wrapper>
    )
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-brand--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection

