import React, { useState, useEffect,useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import dao from "../dao/pokapiDAO.js"
import 'swiper/css'
import SetPresentation from './SetPresentation'

function shuffle(array){
    let copy = [...array]
    let result = []
    while(result.length < array.length){
        const index = parseInt(Math.random()*copy.length-1)
        result.push(copy[index])
        copy.splice(index,1)
    }
    return result
}

const Carousel = () => {
    const [listSet, setListSet] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0);

    const swiperRef = useRef(null);

    useEffect(() => {
        async function retrieveSetList() {
            let newListSet = (await dao.fetchSets()).data
            newListSet = shuffle(newListSet)
            newListSet = newListSet.slice(0,20)
            console.log(newListSet)
            setListSet(newListSet)
        }
        retrieveSetList()
    },[])

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
        console.log(swiper.realIndex)
    };

    return (
        <div className="carousel-container" style={carouselStyle}>
            {listSet != null && (
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    allowTouchMove={false}
                    loop={true}
                    onSlideChange={handleSlideChange}
                >
                    {listSet.map((set,index) => (
                        <SwiperSlide key={set.id}>
                            <SetPresentation setId={set.id} displayState={index >= activeIndex-1 && index <= activeIndex + 2} middleState={index == activeIndex+1 || (activeIndex == 19 && index == 0)}/>
                        </SwiperSlide>
                    ))}
                </Swiper>  
            )}
            <div className="swiper-button-prev">❮</div>
            <div className="swiper-button-next">❯</div>
        </div>
    )
}

const carouselStyle = {
    paddingTop : "5vh",
    paddingBottom : "5vh"
}

export default Carousel