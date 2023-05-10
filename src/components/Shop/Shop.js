import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import "./Shop.css";

const Shop = ({ items, isLoading }) => {
    const [shuffledItems, setShuffledItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Shuffle items array
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        setShuffledItems(shuffled);
        console.log(shuffledItems)
    }, [items]);

    const categories = [...new Set(items.map((item) => item.category))];

    return (
        <div className="shopWrapper">
            <div className="categoryWrapper">
                <div className="categoryLine"></div>
                <div className="categoryContent">
                    <h3 className="categoryText">Categories:</h3>
                    <select
                        className="categories"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="categoryLine"></div>
            </div>

            <div className='shopContainer'>
                {isLoading ?
                    Array(20).fill().map((_, index) => (
                        <div key={index}>
                            <Link to={`/shop/${index}`}>
                                <div className="shopImgDiv">
                                    <Skeleton width={200} height={400} />
                                    <div className="titlePrice">
                                        <Skeleton width={120} height={20} />
                                        <Skeleton width={80} height={20} />
                                    </div>
                                    <Skeleton width={150} height={40} />
                                </div>
                            </Link>
                        </div>
                    ))
                    : (shuffledItems.filter(item => selectedCategory === '' || item.category === selectedCategory).map(item => (
                        <div key={item.id}>
                            <Link to={`/shop/${item.id}`}>
                                <div className="shopImgDiv">
                                    <div className="img">
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div className="titlePrice">
                                        <h3>{item.title}</h3>
                                        <p>${item.price}</p>
                                    </div>
                                    <button type="button" className="Btn">View Details</button>
                                </div>
                            </Link>
                        </div>
                    )))}
            </div>
        </div>
    )
}

export default Shop;
