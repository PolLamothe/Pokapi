import React, { useState, useEffect,useRef, act } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import dao from "../dao/pokapiDAO.js"
import 'swiper/css'
import SetPresentation from './SetPresentation'
import {Flex, Spinner} from "@radix-ui/themes";
import {ChevronLeft, ChevronRight} from "lucide-react";

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

const Carousel = ({setCurrentSetId}) => {
    const [listSet, setListSet] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0);

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const [slicePerView,setSlicePerView] = useState(3)

    const [spaceBetween,setSpaceBetween] = useState(50)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const swiperRef = useRef(null);

    useEffect(() => {
        async function retrieveSetList() {
            let newListSet = await dao.fetchSets()
            newListSet = shuffle(newListSet)
            newListSet = newListSet.slice(0,20)
            setListSet(newListSet)
        }
        retrieveSetList()
    },[])

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
        if(slicePerView == 3){
            setCurrentSetId(listSet[(swiper.realIndex+1)%20].id)
        }else{
            setCurrentSetId(listSet[(swiper.realIndex)%20].id)
        }
    };

    var carouselStyle = {
        paddingTop : "2vh",
        paddingBottom : "2vh"
    }

    function calculateDisplayState(index,activeIndex){
        return index >= activeIndex-1 && index <= activeIndex + 2
    }

    function calculateDisplayStateSingle(index,activeIndex){
        return index == activeIndex
    }

    function calculateMiddleState(index,activeIndex){
        return index == activeIndex+1 || (activeIndex == 20-1 && index == 0)
    }

    function calculateMiddleStateSingle(index,activeIndex){
        return index == activeIndex
    }

    const [currentCalculateDisplayState,setCurrentCalculateDisplayState] = useState(()=>calculateDisplayState)

    const [currentCalculateMiddleState,setCurrentCalculateMiddleState] = useState(()=>calculateMiddleState)

    useEffect(()=>{
        if(slicePerView == 1){
            setCurrentCalculateDisplayState(()=>calculateDisplayStateSingle)
            setCurrentCalculateMiddleState(()=>calculateMiddleStateSingle)
        }else{
            setCurrentCalculateDisplayState(()=>calculateDisplayState)
            setCurrentCalculateMiddleState(()=>calculateMiddleState)
        }
    },[slicePerView])

    useEffect(()=>{
        if(windowSize <= 600){
            setSlicePerView(1)
            setSpaceBetween(50)
        }else if(windowSize < 1000){
            setSlicePerView(3)
            setSpaceBetween(-25)
        } else if (windowSize >= 1000 && windowSize < 1500) {
            setSlicePerView(3)
            setSpaceBetween(-40)
        } else {
            setSlicePerView(3)
            setSpaceBetween(-60)
        }
    },[windowSize])


    let loadImageStyle = {
        width: "10vw",
        animation: "spinning .9s ease infinite",
    }

    return (
        <div className="carousel-container" style={carouselStyle}>
            {listSet != null ? (
                <Swiper
                    spaceBetween={spaceBetween}
                    slidesPerView={slicePerView}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    allowTouchMove={false}
                    loop={true}
                    onSlideChange={handleSlideChange}
                    style={{"paddingTop" : "2vh","paddingBottom" : "2vh"}}
                >
                    {listSet.map((set,index) => (
                        <SwiperSlide key={set.id}>
                            <SetPresentation setId={set.id} 
                            displayState={currentCalculateDisplayState(index,activeIndex)} 
                            middleState={currentCalculateMiddleState(index,activeIndex)}/>
                        </SwiperSlide>
                    ))}
                </Swiper>  
            ) : (
                <Flex align="center" direction="column" py="9">
                    <img src="./masterball.png" style={loadImageStyle}/>
                </Flex>
            )}
            <div className="swiper-button-prev">
                <ChevronLeft size="80px" strokeWidth="1px"/>
            </div>
            <div className="swiper-button-next">
                <ChevronRight size="80px" strokeWidth="1px"/>
            </div>
        </div>
    )
}

export default Carousel