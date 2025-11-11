import { useState, useEffect } from 'react';
import Carousel from '../component/Carousel';
import heroImages from '../data/homeCarousel';


function Home() {

    return (
        <div>
            <Carousel images={heroImages} autoPlayInterval={5000}></Carousel>
        </div>
    )
}

export default Home;