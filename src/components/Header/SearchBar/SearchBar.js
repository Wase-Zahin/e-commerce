import "./SearchBar.css";
import React from 'react'
import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from "react-router-dom";

export default function SearchBar({ items, isLoading }) {
    const [isSearchBoxActive, setIsSearchBoxActive] = useState(false);
    const [products, setProducts] = useState([]); // search product results
    const [searchQuery, setSearchQuery] = useState(''); // storing the input of the search
    const searchBoxRef = useRef(null);
    const searchResultsRef = useRef(null);

    useEffect(() => {
        // set the products of search results to the fetched items when the loading has finished
        if (!isLoading) {
            setProducts(items)
        }
    }, [isLoading, isSearchBoxActive])

    const handleSearch = () => {
        setIsSearchBoxActive(!isSearchBoxActive);
    }

    const getButtonWidth = () => {
        return (
            searchBoxRef.current.getBoundingClientRect().width
        );
    };

    const getSearchBoxResultsStyles = () => {
        return isSearchBoxActive ? { width: getButtonWidth() } : {};
    }

    // these 2 functions are used to filter the products for the search
    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        setIsSearchBoxActive(true)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setIsSearchBoxActive(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchBoxRef]);


    const filteredResults = products.filter(product => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    })

    return (
        <div className='search' ref={searchBoxRef}>
            <input
                className='search-box'
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="searchIconWrapper">
                <AiOutlineSearch className="searchIcon" />
            </div>
            {isSearchBoxActive &&
                <div className='search-results' style={getSearchBoxResultsStyles()} ref={searchResultsRef}>
                    {
                        (filteredResults.map(product => {
                            return (
                                <Link to={`/shop/${product.id}`} key={product.id}>
                                    <p
                                        onClick={handleSearch}>
                                        {product.title}
                                    </p>
                                </Link>
                            )
                        }
                        ))
                    }
                </div>
            }
        </div>
    )
}
