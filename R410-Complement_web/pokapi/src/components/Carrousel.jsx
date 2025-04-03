import React, { useState, useEffect,useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import dao from "../dao/pokapiDAO.js"
import 'swiper/css'
import SetPresentation from './SetPresentation'

const Carousel = () => {
    const [listSet, setListSet] = useState(null)
    const [loadedSet, setLoadedSet] = useState([])
    const [middleBoosterIndex, setMiddleBoosterindex] = useState(null)

    const swiperRef = useRef(null);
    const thumbsRef = useRef(null);

    useEffect(() => {
        async function retrieveSetList() {
            let newListSet = (await dao.fetchSets()).data
            let newLoadedSet = []
            for (let i = 0; i < 5; i++) {
                const index = parseInt(Math.random() * newListSet.length - 1)
                newLoadedSet.push(newListSet[index])
                newListSet.splice(index, 1)
            }
            setListSet(newListSet)
            setLoadedSet(newLoadedSet)
            setMiddleBoosterindex(2)
        }
        retrieveSetList()
    }, [setListSet, setLoadedSet, setMiddleBoosterindex])

    return (
        <div className="carousel-container">
            <div className="navigation-buttons">
                <button onClick={() => swiperRef.current?.swiper.slidePrev()}>
                Précédent
                </button>
                <button onClick={() => swiperRef.current?.swiper.slideNext()}>
                Suivant
                </button>
            </div>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                modules={[Navigation]}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
            >
                {loadedSet.map((setId) => (
                    <SwiperSlide key={setId}>
                        <SetPresentation setId={setId} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="swiper-button-prev">❮</div>
            <div className="swiper-button-next">❯</div>
        </div>
    )
}

export default Carousel