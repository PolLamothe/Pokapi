import React, {useEffect, useState, useRef, use} from "react";
import {Button, CheckboxGroup, Flex, Grid, ScrollArea, Spinner, TextField, Switch, AspectRatio} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Accordion from '@radix-ui/react-accordion';
import {AccordionContent, AccordionTrigger} from "@radix-ui/react-accordion";
import {ChevronDownIcon, Fish, Scroll, X} from "lucide-react";
import {useNavigate} from "react-router";
import pokapiDAO from "../dao/pokapiDAO.js";


export function ImageCard({card, exception = false, posssesed, searched, onSearchedAdd}) {
    const [hoverState,setHoverState] = useState(false)
    const navigate = useNavigate()

    const addStyle = {
        width: "4vw",
        height: "fit-content",
        position: "absolute",
        zIndex: "2"
    }

    const heartStyle = {
        width: "2vw",
        height: "fit-content",
        position: "absolute",
        zIndex: "2",
        top: "1vh",
        left: "1vh",
        filter: "grayscale(10%)"
    }

    async function addInSearched() {
        await pokapiDAO.addInSearched(exception ? card.id : card.card.id)
        onSearchedAdd()
    }

    return (
        <Flex className="hoverEffect" justify="center"
        onClick={posssesed ? ()=>{navigate(`/card/${exception ? card.id : card.card.id}`)} : ()=>{navigate(`/set/${exception ? card.set.id : card.card.set.id}`)}}
        >
            <figure onMouseOver={()=>{setHoverState(true)}} onMouseLeave={()=>{setHoverState(false)}}>
                {!posssesed && hoverState && !searched &&  (
                    <img src="/cross.png" style={addStyle} onClick={addInSearched}/>
                )}
                {!posssesed && searched && (
                    <img src="/heart.png" style={heartStyle}/>
                )}
                <img className="img"
                     alt={exception ? card.name : card.card.name}
                     src={exception ? card.images.small : card.card.images.small}
                     style={posssesed ? {} : {opacity: "0.5"}}/>
            </figure>
        </Flex>
    )
}

function SetSection({set, cards, searchState}) {
    const navigateToCardPage = useNavigate()

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const [logoStyle, setLogoStyle] = useState({
        width: "20vw",
        maxHeight: "15vh",
        objectFit: "contain",
        cursor: "pointer",
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    var wrapperStyle = {
        maxWidth: "1500px",
        justifyContent: "center"
    }

    var cardWrapperStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        marginLeft: "50%",
        transform: "translateX(-50%)",
        justifyContent: "center"
    }

    useEffect(() => {
        let copy = {...logoStyle}
        if (windowSize < 600) {
            copy["width"] = "50vw"
        } else {
            copy["width"] = "20vw"
        }
        setLogoStyle(copy)
    }, [windowSize])


    return (
        <div style={wrapperStyle}>
            <Flex justify="center">
                <img src={set.images.logo} style={logoStyle} onClick={() => {
                    navigateToCardPage(`/set/${set.id}`)
                }}/>
            </Flex>
            <div style={cardWrapperStyle}>
                {cards.map(card =>
                    <ImageCard
                    key={card.card.id}
                    card={card} 
                    posssesed={!searchState}
                    searched={searchState}
                    />
                )
                }
            </div>
        </div>)
}

function Collection() {

    const [userCards, setUserCards] = useState([])
    const [userCardsAll, setUserCardsAll] = useState([])
    const [types, setTypes] = useState([])
    const [rarities, setRarities] = useState([])
    const [raritiesAll, setRaritiesAll] = useState([])
    const [sets, setSets] = useState([])
    const [setsAll, setSetsAll] = useState([])
    const [searched, setSearched] = useState(null)
    const [searchedState, setSearchedState] = useState(false)

    const [cardInSets, setCardInSets] = useState(null)

    const [selectedType, setSelectedType] = useState([])
    const [selectedRarities, setSelectedRarities] = useState([])
    const [selectedSet, setSelectedSet] = useState([])

    const [loadingExpired, setLoadingExpired] = useState(false)
    const [separedSet,setSeparedSet] = useState(localStorage.getItem("separedSet") != null ? JSON.parse(localStorage.getItem("separedSet")) : false)


    const [windowSize, setWindowSize] = useState(window.innerWidth)
    let gridtemplate = null

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(() => {
        pokapiDAO.fetchMyCards().then(usrCards => {
            setUserCardsAll(usrCards)
            setUserCards(usrCards)
        })

        pokapiDAO.fetchTypes().then(AllTypes => {
            setTypes(AllTypes)
        })

        pokapiDAO.fetchRarities().then(AllRarities => {
            setRarities(AllRarities)
            setRaritiesAll(AllRarities)
        })

        pokapiDAO.fetchSets().then(AllSets => {
            let dataSets = AllSets.map(s => s.name)
            setSets(dataSets)
            setSetsAll(dataSets)
        })

        pokapiDAO.fetchSearched().then(async searched => {
            setSearched((await pokapiDAO.fetchCards(searched)).map(
                card => {
                    return {card: card, quantity: 1}
                }
            ))
        })

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingExpired(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])


    useEffect(() => {
        var temp = {}
        userCards.forEach(card => {
            if (temp[card.card.set.id] == undefined) {
                temp[card.card.set.id] = {}
                temp[card.card.set.id]["set"] = card.card.set
                temp[card.card.set.id]["cards"] = [card]
            } else {
                temp[card.card.set.id]["cards"].push(card)
            }
        })
        setCardInSets(temp)
    }, [userCards])

    useEffect(() => {
        if (searchedState) {
            setUserCards(searched)
        } else {
            setUserCards(userCardsAll)
        }
    }, [searchedState])

    useEffect(()=>{
        localStorage.setItem("separedSet",separedSet.toString())
    },[separedSet])

    const handleSearch = async (e) => {
        const recherche = e.target.value
        let res = []
        let uc = [...userCardsAll]
        if (recherche.trim() === "") {
            setUserCards(userCardsAll)
        } else {
            res = uc.filter((user) => user.card.name.toLowerCase().includes(recherche))
            setUserCards(res)
        }
    }

    const handleSearchRarities = async (e) => {
        const recherche = e.target.value
        let res = []
        let rar = [...raritiesAll]
        if (recherche.trim() === "") {
            setRarities(raritiesAll)
        } else {
            res = rar.filter((rarity) => rarity.toLowerCase().includes(recherche))
            setRarities(res)
        }

    }

    const handleSearchSets = async (e) => {
        const recherche = e.target.value
        let res = []
        let set = [...setsAll]
        if (recherche.trim() === "") {
            setSets(setsAll)
        } else {
            res = set.filter((s) => s.toLowerCase().includes(recherche))
            setSets(res)
        }

    }


    const onChecked = (nom, e) => {
        let filterCards = [...userCardsAll]
        const selectOne = {
            Type: {value: selectedType, setter: setSelectedType},
            Rarity: {value: selectedRarities, setter: setSelectedRarities},
            Set: {value: selectedSet, setter: setSelectedSet},
        }
        const selectOthers = Object.entries(selectOne).filter(([key]) => key !== nom)
        const recupRarityFilter = (a, b) => {
            if (selectOthers[a][b].value.length > 0) {
                filterCards = filterCards.filter(card =>
                    selectOthers[a][b].value.some(rarity => card.card.rarity === rarity)
                )
            }
        }
        const recupSetFilter = (a, b) => {
            if (selectOthers[a][b].value.length > 0) {
                filterCards = filterCards.filter(card =>
                    selectOthers[a][b].value.some(set => card.card.set.name === set)
                )
            }
        }
        const recupTypeFilter = (a, b) => {
            if (selectOthers[a][b].value.length > 0) {
                filterCards = filterCards.filter(card => {
                    return card.card.types !== null && selectOthers[a][b].value.some(type => card.card.types.includes(type))
                })
            }
        }

        if (selectOthers[0][1].value.length > 0 || selectOthers[1][1].value.length > 0) {
            if (nom === "Type") {
                recupRarityFilter(0, 1)
                recupSetFilter(1, 1)
            } else if (nom === "Set") {
                recupTypeFilter(0, 1)
                recupRarityFilter(1, 1)
            } else if (nom === "Rarity") {
                recupTypeFilter(0, 1)
                recupSetFilter(1, 1)
            }
        }
        if (e.length === 0) {
            selectOne[nom].setter([])
            if (selectOthers[0][1].value.length === 0 && selectOthers[1][1].value.length === 0) {
                filterCards = userCardsAll
            }
        } else {
            selectOne[nom].setter(e)
            if (nom === "Type") {
                filterCards = filterCards.filter(card => {
                    return card.card.types !== null && e.some(type => card.card.types.includes(type))
                })
            } else if (nom === "Rarity") {
                filterCards = filterCards.filter(card =>
                    e.some(rarity => card.card.rarity === rarity)
                )
            } else if (nom === "Set") {
                filterCards = filterCards.filter(card =>
                    e.some(set => card.card.set.name === set)
                )
            }

        }
        setUserCards(filterCards)
    }

    {
        windowSize > 1100 ? (
            gridtemplate = '25% 75%'
        ) : windowSize > 600 && windowSize < 800 ? (
            gridtemplate = "100%"
        ) : windowSize < 600 ? (
            gridtemplate = "100%"
        ) : (
            gridtemplate = '30% 70%'
        )
    }

    var contentWrapperStyleSepared = {
        display: "flex",
        flexDirection: "column",
        gap: "5vh"
    }

    var contentWrapperStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: "1500px",
        justifyContent: "center"
    }

    let loadImageStyle = {
        width: "10vw",
        animation: "spinning .9s ease infinite",
    }

    return (
        <Grid className="principalGrid" columns="3" style={{gridTemplateColumns: `${gridtemplate}`}} py="5" px="5">
            <Flex id="searchBar" px="5" py="5" justify="center">
                <TextField.Root radius="full" placeholder="Search a Pokemon ..." size="3" style={{width: '80vh'}}
                                onChange={handleSearch}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16"/>
                    </TextField.Slot>
                </TextField.Root>
            </Flex>

            <Flex className="filters" justify="center">
                <Accordion.Root type="multiple" className="AccordionRoot">

                    <AccordionTab name="Type" onchecked={onChecked} filter={types} selectedFilter={selectedType}
                                  searchBar={false} ondelete={onChecked}/>

                    <AccordionTab name="Rarity" onchecked={onChecked} filter={rarities}
                                  selectedFilter={selectedRarities} handleSearch={handleSearchRarities} searchBar={true}
                                  ondelete={onChecked}/>

                    <AccordionTab name="Set" onchecked={onChecked} filter={sets} selectedFilter={selectedSet}
                                  handleSearch={handleSearchSets} searchBar={true} ondelete={onChecked}/>

                    <Accordion.Item value="Display" className="AccordionItem">
                        <AccordionTrigger className="AccordionTrigger">Display
                            <ChevronDownIcon className="AccordionChevron" aria-hidden/>
                        </AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1vw",
                                justifyContent: "space-between",
                                width: "100%"
                            }}>
                                <b>Séparer les sets</b>
                                <Switch style={{cursor : "pointer"}} onCheckedChange={setSeparedSet} checked={separedSet}/>
                            </div>

                            <div style={{display:"flex",alignItems:"center",gap:"1vw",marginTop : "2vh",justifyContent : "space-between",width : "100%"}}>
                                <b style={{width : "max-content"}}>Afficher les cartes recherchées</b>
                                <Switch style={{cursor : "pointer"}} onCheckedChange={setSearchedState} checked={searchedState}/>
                            </div>
                        </AccordionContent>
                    </Accordion.Item>

                </Accordion.Root>
            </Flex>
            <div id="contentWrapper" style={separedSet ? contentWrapperStyleSepared : contentWrapperStyle}>
                {userCards && userCardsAll.length > 0 ? (
                    separedSet ?
                        (Object.keys(cardInSets).map(setId => {
                            return <SetSection
                                set={cardInSets[setId]["set"]}
                                cards={cardInSets[setId]["cards"]}
                                searchState={searchedState}
                            />
                        })) :
                        (userCards.map(card => (
                            <ImageCard
                                key={card.card.id} 
                                card={card}
                                posssesed={!searchedState}
                                searched={searchedState}
                            />
                        )))
                ) : !loadingExpired ? (
                    <Flex align="center" direction="column" py="9">
                        <img src="./masterball.png" style={loadImageStyle}/>
                    </Flex>
                ) : (
                    <Flex justify="center" py="9">
                        No Cards founds !
                    </Flex>
                )}
            </div>
        </Grid>
    )
}

function AccordionTab({name, onchecked, filter, selectedFilter, handleSearch, searchBar, ondelete}) {
    return <Accordion.Item value={name} className="AccordionItem">
        <AccordionTrigger className="AccordionTrigger">{name}<ChevronDownIcon className="AccordionChevron" aria-hidden/>
        </AccordionTrigger>
        <AccordionContent className="AccordionContent">
            <Button variant="ghost" style={{marginBottom: "5px"}} onClick={() => ondelete(name, [])}>
                <X size="20"/>
                Remove all filters
            </Button>
            {searchBar &&
                <TextField.Root radius="full" placeholder={`Search a ${name} ...`} size="2" onChange={handleSearch}
                                mb="2">
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16"/>
                    </TextField.Slot>
                </TextField.Root>
            }

            <ScrollArea id={`${name}Scroll`} className="scrollArea" style={{maxHeight: '260px'}}>
                <CheckboxGroup.Root name={name} value={selectedFilter}
                                    onValueChange={(values) => onchecked(name, values)}>

                    {filter && filter.length > 0 ? (
                        filter.map((fil) => (
                            <CheckboxGroup.Item key={fil} value={fil}>{fil}</CheckboxGroup.Item>
                        ))
                    ) : (
                        <p>No {name} found !</p>
                    )}
                </CheckboxGroup.Root>
            </ScrollArea>
        </AccordionContent>
    </Accordion.Item>
}

export default Collection;