import {useEffect, useState} from "react";
import {Box, Checkbox, CheckboxGroup, Flex, Grid, ScrollArea, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Accordion from '@radix-ui/react-accordion';
import {AccordionContent, AccordionTrigger} from "@radix-ui/react-accordion";
import {ChevronDownIcon, Scroll} from "lucide-react";
import {useNavigate} from "react-router";
import pokapiDAO from "../dao/pokapiDAO.js";


function ImageCard({card, navigate}) {
    return (
        <Flex className="hoverEffect" justify="center">
            <figure>
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

    const [selectedType, setSelectedType] = useState([])
    const [selectedRarities, setSelectedRarities] = useState([])
    const [selectedSet, setSelectedSet] = useState([])

    const navigateToCardPage = useNavigate();



    useEffect(() => {
        pokapiDAO.fetchMyCards().then(usrCards => {
            setUserCardsAll(usrCards)
            setUserCards(usrCards)
        })

        pokapiDAO.fetchTypes().then(AllTypes => {
            setTypes(AllTypes.data)
        })

        pokapiDAO.fetchRarities().then(AllRarities => {
            setRarities(AllRarities.data)
            setRaritiesAll(AllRarities.data)
        })

        pokapiDAO.fetchSets().then(AllSets => {
            let dataSets = AllSets.data.map(s => s.name)
            setSets(dataSets)
            setSetsAll(dataSets)
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
        console.log(filterCards)

        if (nom === "Type") {
            if (selectedRarities.length > 0 || selectedSet.length > 0) {
                if (selectedRarities.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectedRarities.some(rarity => card.card.rarity === rarity)
                    )
                }
                if (selectedSet.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectedSet.some(set => card.card.set.name === set)
                    )
                }
            }
            if (e.length === 0) {
                setSelectedType([])
                if (selectedRarities.length === 0 && selectedSet.length === 0) {
                    filterCards = userCardsAll
                }

            } else {
                setSelectedType(e)
                filterCards = filterCards.filter(card =>
                    e.some(type => card.card.types.includes(type))
                )
            }
        }
        if (nom === "Rarity") {
            if (selectedType.length > 0 || selectedSet.length > 0) {
                if (selectedType.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectedType.some(type => card.card.types.includes(type))
                    )
                }
                if (selectedSet.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectedSet.some(set => card.card.set.name === set)
                    )
                }
            }
            if (e.length === 0) {
                setSelectedRarities([])
                 if (selectedType.length === 0 && selectedSet.length === 0) {
                    filterCards = userCardsAll
                }
            } else {
                setSelectedRarities(e)
                filterCards = filterCards.filter(card =>
                        e.some(rarity => card.card.rarity === rarity)
                )
            }
        }
        if (nom === "Set") {
            if (selectedRarities.length > 0 || selectedType.length > 0) {
                if (selectedRarities.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectedRarities.some(rarity => card.card.rarity === rarity)
                    )
                }
                if (selectedType.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectedType.some(type => card.card.types.includes(type))
                    )
                }
            }
            if (e.length === 0) {
                setSelectedSet([])
                 if (selectedRarities.length === 0 && selectedType.length === 0) {
                    filterCards = userCardsAll
                }
            } else {
                setSelectedSet(e)
                filterCards = filterCards.filter(card =>
                    e.some(set => card.card.set.name === set)
                )
            }
        }

        setUserCards(filterCards)

    }

    return (
        <Grid columns="3" style={{gridTemplateColumns:'25% 75%'}}>
            <Flex id="searchBar" px="5" py="5" justify="center" style={{gridColumn: 'span 3'}} >
                <TextField.Root radius="full" placeholder="Search a Pokemon ..." size="3" style={{width:'80vh'}} onChange={handleSearch} >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>

            <Flex justify="center">
                <Accordion.Root type="multiple" className="AccordionRoot">

                    <AccordionTab name="Type" onchecked={onChecked} filter={types} selectedFilter={selectedType} searchBar={false}/>

                    <AccordionTab name="Rarity" onchecked={onChecked} filter={rarities} selectedFilter={selectedRarities} handleSearch={handleSearchRarities} searchBar={true}/>

                    <AccordionTab name="Set" onchecked={onChecked} filter={sets} selectedFilter={selectedSet} handleSearch={handleSearchSets} searchBar={true}/>

                </Accordion.Root>
            </Flex>
            <Grid className="cardsUser" columns="repeat(auto-fit, minmax(245px, 1fr))" style={{maxWidth: '1500px', height: "fit-content"}} gap="4">
                {userCards && userCards.length > 0 ? (
                    userCards.map(card => (
                    <ImageCard key={card.card.name} card={card} navigate={() => {navigateToCardPage(`/card/${card.card.id}`)}}/>
                    ))
                ) : (
                    <Flex justify="center" py="9">No Cards found !</Flex>
                )}
            </Grid>
        </Grid>
    )
}

function AccordionTab ({name, onchecked, filter, selectedFilter, handleSearch, searchBar}) {
    return <Accordion.Item value={name} className="AccordionItem">
        <AccordionTrigger className="AccordionTrigger">{name}<ChevronDownIcon className="AccordionChevron" aria-hidden /> </AccordionTrigger>
        <AccordionContent className="AccordionContent">
            {searchBar &&
                <TextField.Root radius="full" placeholder={`Search a ${name} ...`} size="2" onChange={handleSearch}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            }

            <ScrollArea className={`${name}Scroll`} style={{height: '260px'}}>
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