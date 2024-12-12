import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import style from '../categories/categories.module.css'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";


export default function categories() {
    const [categories,setCategories]=useState({});
    async function getCategories()
    {
      try {
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);
        setCategories(data.categories || []);
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
    }
    useEffect(() => {
      getCategories();
    }, []);
    console.log(categories);

  return (
    <>
    <div className="container mt-5">
       {categories?.length?
       (
        <>
        <div >
        
          <h2 className={`${style.title} text-center`}>
            Gorgeous Collections
          </h2>
          </div>
          <Swiper 
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}           pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
         slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[Autoplay, FreeMode, Pagination]}
        className={`mySwiper`}
          >
            {categories?.map((category)=>
            (
              
              <SwiperSlide  key={category._id} className="text-center">
                <Link to ={`/categorydetails/${category._id}`}>
                <img  className={`${style.swiper}`} src={category.image.secure_url} alt="this is category"/>
                </Link>
                
              </SwiperSlide>
            ))}
          </Swiper>
        
        {/* <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div> */}
       </>
       ):(<Loader/>)
       
       }
       </div> 
    </>
  );
}