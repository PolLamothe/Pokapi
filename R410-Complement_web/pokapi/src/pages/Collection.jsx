import config from "../config.js";
import {useEffect, useState} from "react";
import {Box, Checkbox, CheckboxGroup, Flex, Grid, ScrollArea, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Accordion from '@radix-ui/react-accordion';
import {AccordionContent, AccordionTrigger} from "@radix-ui/react-accordion";
import {ChevronDownIcon, Scroll} from "lucide-react";
import card from "./Card.jsx";


function ImageCard({card}) {
    return <Flex justify="center">
        <img className="rt-r-px-2 rt-r-py-2" alt={card.name} src={card.images.small} style={{ maxWidth: "261px" , maxHeight: "358px" }} />
    </Flex>
}

function Collection() {


    const [userCards, setUserCards] = useState([])
    const [userCardsAll, setUserCardsAll] = useState([])
    const [types, setTypes] = useState([])
    const [rarities, setRarities] = useState([])
    const [sets, setSets] = useState([])

    const [selectedType, setSelectedType] = useState([])
    const [selectedRarities, setSelectedRarities] = useState([])
    const [selectedSet, setSelectedSet] = useState([])


    const fetchCardsUser = async () => {
        let cards = await fetch(config.url + "/my-cards", {
            method: "GET",
            headers : {
                "Authentification-Token": localStorage.getItem("token")
            }
        })
        let dataUserCards = await cards.json()
        setUserCardsAll(dataUserCards)
        setUserCards(dataUserCards)
    }

    useEffect(()=>{
        fetchCardsUser()
    },[setUserCards])

    useEffect(() => {
        const fetchAllTypes = async () => {
            let allTypes = await fetch(config.url + "/types", {
                method: "GET"
            })
            let dataTypes = await allTypes.json()
            setTypes(dataTypes)
        }
        fetchAllTypes()
    }, [setTypes])

    useEffect(() => {
        const fetchRarities = async () => {
            let allRarities = await fetch(config.url + "/rarities", {
                method: "GET"
            })
            let dataRarities = await allRarities.json()
            setRarities(dataRarities)
        }
        fetchRarities()
    }, [setRarities])

    useEffect(() => {
        const fetchSets = async () => {
            let allSets = await fetch(config.url + "/sets", {
                method: "GET"
            })
            let dataSets = await allSets.json()
            setSets(dataSets)
        }
        fetchSets()
    }, [setSets])

    const handleSearch = async (e) => {
        const recherche = e.target.value
        let res = []
        if (recherche.trim() === "") {
            await fetchCardsUser()
        } else {
            if (userCards.length > 0) {
                res = userCards.filter((user) => user.name.toLowerCase().includes(recherche))
            }
            setUserCards(res)
        }
    }


    const onChecked = (nom, e) => {
        let filterCards = [...userCardsAll]
        if (nom === "Type") {
            if (e.length === 0) {
                setSelectedType([])
                if (selectedRarities.length > 0 || selectedSet.length > 0) {
                    if (selectedRarities.length > 0) {
                        filterCards = filterCards.filter(card =>
                            selectedRarities.some(rarity => card.rarity === rarity)
                        )
                    }
                    if (selectedSet.length > 0) {
                        filterCards = filterCards.filter(card =>
                            selectedSet.some(set => card.set.id === set)
                        )
                    }
                } else {
                    filterCards = userCardsAll
                }

            } else {
                setSelectedType(e)
                filterCards = filterCards.filter(card =>
                    e.some(type => card.types.includes(type))
                )
            }
        }
        if (nom === "Rarities") {
            if (e.length === 0) {
                setSelectedRarities([])
                if (selectedType.length > 0 || selectedSet.length > 0) {
                    if (selectedType.length > 0) {
                        filterCards = filterCards.filter(card =>
                            selectedType.some(type => card.types.includes(type))
                        )
                    }
                    if (selectedSet.length > 0) {
                        filterCards = filterCards.filter(card =>
                            selectedSet.some(set => card.set.id === set)
                        )
                    }
                } else {
                    filterCards = userCardsAll
                }
            } else {
                setSelectedRarities(e)
                filterCards = filterCards.filter(card =>
                    e.some(rarity => card.rarity === rarity)
                )
            }
        }
        if (nom === "Set") {
            if (e.length === 0) {
                setSelectedSet([])
                if (selectedRarities.length > 0 || selectedType.length > 0) {
                    if (selectedRarities.length > 0) {
                        filterCards = filterCards.filter(card =>
                            selectedRarities.some(rarity => card.rarity === rarity)
                        )
                    }
                    if (selectedType.length > 0) {
                        filterCards = filterCards.filter(card =>
                            selectedType.some(type => card.types.includes(type))
                        )
                    }
                } else {
                    filterCards = userCardsAll
                }
            } else {
                setSelectedSet(e)
                filterCards = filterCards.filter(card =>
                    e.some(set => card.set.id === set)
                )
            }
        }

        setUserCards(filterCards)

    }



    return (
        <Grid columns="3" style={{gridTemplateColumns:'25% 75%'}}>
            <Flex id="searchBar" px="5" py="5" justify="center" style={{gridColumn: 'span 3'}} >
                <TextField.Root radius="full" placeholder="Rechercher un Pokemon ..." size="3" style={{width:'80vh'}} onChange={handleSearch} >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>

            <Flex justify="center">
                <Accordion.Root type="multiple" className="AccordionRoot">

                    <Accordion.Item value="Type" className="AccordionItem">
                        <AccordionTrigger className="AccordionTrigger">Type <ChevronDownIcon className="AccordionChevron" aria-hidden /> </AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            <CheckboxGroup.Root name="type" value={selectedType} onValueChange={(values) => onChecked("Type", values)}>
                                {types && types.data ? (
                                    types.data.map((type) => (
                                        <CheckboxGroup.Item key={type} value={type}>{type}</CheckboxGroup.Item>
                                    ))
                                ) : (
                                    <p>Aucun Type trouvée.</p>
                                )}
                            </CheckboxGroup.Root>
                        </AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item value="Rareté" className="AccordionItem">
                        <AccordionTrigger className="AccordionTrigger">Rareté <ChevronDownIcon className="AccordionChevron" aria-hidden /> </AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            <ScrollArea className="raritiesScroll" style={{height: '250px'}}>
                                <CheckboxGroup.Root name="rarities" value={selectedRarities} onValueChange={(values) => onChecked("Rarities", values)}>
                                    {rarities && rarities.data ? (
                                        rarities.data.map((rarity) => (
                                        <CheckboxGroup.Item key={rarity} value={rarity}>{rarity}</CheckboxGroup.Item>
                                        ))
                                    ): (
                                        <p>Aucune Rareté trouvé !</p>
                                    )}
                                </CheckboxGroup.Root>
                            </ScrollArea>
                        </AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item value="Set" className="AccordionItem">
                        <AccordionTrigger className="AccordionTrigger">Set <ChevronDownIcon className="AccordionChevron" aria-hidden /> </AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            <ScrollArea className="raritiesScroll" style={{height: '250px'}}>
                                <CheckboxGroup.Root name="sets" value={selectedSet} onValueChange={(values)=> onChecked("Set", values)}>
                                    {sets && sets.data ? (
                                        sets.data.map(set => (
                                        <CheckboxGroup.Item key={set.id} value={set.id}>{set.name}</CheckboxGroup.Item>
                                        ))
                                    ) : (
                                        <p>Aucun Sets trouvée !</p>
                                    )}
                                </CheckboxGroup.Root>
                            </ScrollArea>
                        </AccordionContent>
                    </Accordion.Item>

                </Accordion.Root>
            </Flex>
            <Grid className="cardsUser" columns="repeat(auto-fit, minmax(261px, 1fr))" style={{maxWidth: '1500px', height: "fit-content"}}>
                {userCards && userCards.length > 0 ? (
                    userCards.map(card => (
                    <ImageCard key={card.name} card={card}/>
                    ))
                ) : (
                    <Flex justify="center" py="9">Aucune Carte Trouvé !</Flex>
                )}
            </Grid>
        </Grid>
    )
}

export default Collection;