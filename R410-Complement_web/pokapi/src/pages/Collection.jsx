import {useEffect, useState} from "react";
import {Button, CheckboxGroup, Flex, Grid, ScrollArea, Spinner, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Accordion from '@radix-ui/react-accordion';
import {AccordionContent, AccordionTrigger} from "@radix-ui/react-accordion";
import {ChevronDownIcon, Scroll, X} from "lucide-react";
import {useNavigate} from "react-router";
import pokapiDAO from "../dao/pokapiDAO.js";


function ImageCard({card, navigate,favoriteState,heartStyle}) {
    return (
        <Flex className="hoverEffect" justify="center">
            <figure>
                {favoriteState && <img src="public/heart.png" style={heartStyle}/>}
                <img className="img" alt={card.card.name} src={card.card.images.small} onClick={navigate} />
            </figure>
        </Flex>
    )
}

function Collection() {

    const [userCards, setUserCards] = useState([])
    const [userCardsAll, setUserCardsAll] = useState([])
    const [types, setTypes] = useState([])
    const [rarities, setRarities] = useState([])
    const [raritiesAll, setRaritiesAll] = useState([])
    const [sets, setSets] = useState([])
    const [setsAll, setSetsAll] = useState([])

    const [searched,setSearched] = useState(null)

    const [selectedType, setSelectedType] = useState([])
    const [selectedRarities, setSelectedRarities] = useState([])
    const [selectedSet, setSelectedSet] = useState([])

    const [loadingExpired, setLoadingExpired] = useState(false)

    const navigateToCardPage = useNavigate();

    const [windowSize, setWindowSize] = useState(window.innerWidth)
    let gridtemplate = null
    let columnImage = null

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

    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingExpired(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(()=>{
        pokapiDAO.fetchSearched().then(AllSearched => {
            setSearched(AllSearched)
        })
    },[])


    const handleSearch = async (e) => {
        const recherche = e.target.value
        let res = []
        let uc = [...userCardsAll]
        if (recherche.trim() === "") {
            setUserCards(userCardsAll)
        } else {
            res = uc.filter((user) =>  user.card.name.toLowerCase().includes(recherche))
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
            Type: {value: selectedType, setter: setSelectedType },
            Rarity: {value: selectedRarities, setter: setSelectedRarities },
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
                recupRarityFilter(0,1)
                recupSetFilter(1,1)
            } else if (nom === "Set") {
                recupTypeFilter(0,1)
                recupRarityFilter(1,1)
            } else if (nom === "Rarity") {
                recupTypeFilter(0,1)
                recupSetFilter(1,1)
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


    { windowSize > 1100 ? (
        gridtemplate = '25% 75%',
        columnImage = "repeat(auto-fit, minmax(245px, 1fr))"
    ) : windowSize > 600 && windowSize < 800 ? (
        gridtemplate = "100%",
        columnImage = "repeat(auto-fit, minmax(245px, 1fr))"
    ) : windowSize < 600 ? (
        gridtemplate = "100%",
        columnImage = "repeat(auto-fit, minmax(150px, 1fr))"
    ) : (
        gridtemplate = '30% 70%',
        columnImage = "repeat(auto-fit, minmax(245px, 1fr))"
    )
    }

    var heartStyle = {
        height : "fit-content",
        width : "2vw",
        position : "absolute",
        top : "0px",
        left : "0px",
        zIndex : "2",
        maxWidth : "30px"
    }
    if(windowSize < 1000 && windowSize > 600){
        heartStyle["width"] = "5vw"
    }else if(windowSize <= 600){
        heartStyle["width"] = "10vw"
    }

    return (
        <Grid className="principalGrid" columns="3" style={{gridTemplateColumns: `${gridtemplate}`}} py="5" px="5">
            <Flex id="searchBar" px="5" py="5" justify="center">
                <TextField.Root radius="full" placeholder="Search a Pokemon ..." size="3" style={{width:'80vh'}} onChange={handleSearch} >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>

            <Flex className="filters" justify="center">
                <Accordion.Root type="multiple" className="AccordionRoot">

                    <AccordionTab name="Type" onchecked={onChecked} filter={types} selectedFilter={selectedType} searchBar={false} ondelete={onChecked}/>

                    <AccordionTab name="Rarity" onchecked={onChecked} filter={rarities} selectedFilter={selectedRarities} handleSearch={handleSearchRarities} searchBar={true} ondelete={onChecked}/>

                    <AccordionTab name="Set" onchecked={onChecked} filter={sets} selectedFilter={selectedSet} handleSearch={handleSearchSets} searchBar={true} ondelete={onChecked}/>

                </Accordion.Root>
            </Flex>
            <Grid className="cardsUser" columns={columnImage} style={{maxWidth: '1500px', height: "fit-content", marginLeft: "15px"}} gap="4">
                {userCards && searched && userCards.length > 0 ? (
                    userCards.map(card => (
                    <ImageCard key={card.card.name} card={card} navigate={() => {navigateToCardPage(`/card/${card.card.id}`)}} favoriteState={searched.filter(card2 => card2.id == card.card.id).length > 0} heartStyle={heartStyle}/>
                    ))
                ) : !loadingExpired ? (
                    <Flex align="center" direction="column" py="9">
                        <Spinner size="2"/>
                        Loading
                    </Flex>
                ) : (
                    <Flex justify="center" py="9">
                        No Cards founds !
                    </Flex>
                )}
            </Grid>
        </Grid>
    )
}

function AccordionTab ({name, onchecked, filter, selectedFilter, handleSearch, searchBar, ondelete}) {
    return <Accordion.Item value={name} className="AccordionItem">
        <AccordionTrigger className="AccordionTrigger">{name}<ChevronDownIcon className="AccordionChevron" aria-hidden /> </AccordionTrigger>
        <AccordionContent className="AccordionContent">
            <Button variant="ghost" style={{marginBottom: "5px"}} onClick={()=> ondelete(name, [])}>
                <X size="20"/>
                Remove all filters
            </Button>
            {searchBar &&
                <TextField.Root radius="full" placeholder={`Search a ${name} ...`} size="2" onChange={handleSearch} mb="2">
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            }

            <ScrollArea id={`${name}Scroll`} className="scrollArea" style={{maxHeight: '260px'}}>
                <CheckboxGroup.Root name={name} value={selectedFilter} onValueChange={(values) => onchecked(name, values)}>

                    {filter && filter.length > 0 ? (
                        filter.map((fil) => (
                            <CheckboxGroup.Item key={fil} value={fil}>{fil}</CheckboxGroup.Item>
                        ))
                    ): (
                        <p>No {name} found !</p>
                    )}
                </CheckboxGroup.Root>
            </ScrollArea>
        </AccordionContent>
    </Accordion.Item>
}

export default Collection;