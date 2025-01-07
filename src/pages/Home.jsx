import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        const categories = response.data;
        setCategories(categories);

        const categoryRequests = categories.map((category) =>
          axios.get(`https://fakestoreapi.com/products/category/${category}`)
        );

        Promise.all(categoryRequests).then((responses) => {
          const images = responses.map((res) =>
            res.data.length > 0 ? res.data[0].image : ""
          );
          setCategoryImages(images);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
   
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex + 1 >= categoryImages.length ? 0 : prevIndex + 1
      );
    }, 10000); 

    return () => clearInterval(interval); 
  }, [categoryImages]);

  return (
    <div className="bg-white mt-2 px-4 md:px-16 lg:px-28">
    <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-18">
      <div className="w-full md:w-3/12">
         <div className="bg-green-600 text-white text-xs font-bold px-2 py-2.5">CATEGORIES</div>
         <ul className="space-y-4 bg-gray-100 p-3 border ">
            {categories.map((category, index) => (
            <li key={index} className="flex items-center text-sm font-medium">
              <div className="w-2 h-2 border border-green-500 rounded-full mr-2"></div>
              {category}
            </li>
           ))}
        </ul>
       </div>
        <div className="w-full md:w-9/12 mt-8 md:mt-0 h-96 relative">
        {categoryImages.length > 0 && (
          <img
            src={categoryImages[currentHeroIndex]}
            alt="Hero"
          className="h-full w-full"/>
        )}
        <div className="absolute top-16 left-8 ">
          <h2>WELCOME TO RasStore</h2>
          <p>MILLIONS+ PRODUCTS</p>
          <button>SHOP NOW</button>
        </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
