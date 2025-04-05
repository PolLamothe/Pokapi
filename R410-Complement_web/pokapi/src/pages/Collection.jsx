import {useEffect, useState} from "react";
import {Box, Button, Checkbox, CheckboxGroup, Flex, Grid, ScrollArea, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Accordion from '@radix-ui/react-accordion';
import {AccordionContent, AccordionTrigger} from "@radix-ui/react-accordion";
import {ChevronDownIcon, Scroll, X} from "lucide-react";
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
        const selectOne = {
            Type: {nom: "types", value: selectedType, setter: setSelectedType },
            Rarity: {nom: "rarity", value: selectedRarities, setter: setSelectedRarities },
            Set: {nom: "set", value: selectedSet, setter: setSelectedSet},
        }
        const selectOthers = Object.entries(selectOne).filter(([key]) => key !== nom)

        if (selectOthers[0][1].value.length > 0 || selectOthers[1][1].value.length > 0) {
            if (nom === "Type") {
                if (selectOthers[0][1].value.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectOthers[0][1].value.some(rarity => card.card[selectOthers[0][1].nom] === rarity)
                    )
                }
                if (selectOthers[1][1].value.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectOthers[1][1].value.some(set => card.card[selectOthers[1][1].nom].name === set)
                    )
                }
            } else if (nom === "Set") {
                if (selectOthers[0][1].value.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectOthers[0][1].value.some(type => card.card[selectOthers[0][1].nom].includes(type))
                    )
                }
                if (selectOthers[1][1].value.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectOthers[1][1].value.some(rarity => card.card[selectOthers[1][1].nom] === rarity)
                    )
                }
            } else if (nom === "Rarity") {
                if (selectOthers[0][1].value.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectOthers[0][1].value.some(type => card.card[selectOthers[0][1].nom].includes(type))
                    )
                }
                if (selectOthers[1][1].value.length > 0) {
                    filterCards = filterCards.filter(card =>
                        selectOthers[1][1].value.some(set => card.card[selectOthers[1][1].nom].name === set)
                    )
                }
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
                filterCards = filterCards.filter(card =>
                    e.some(type => card.card.types.includes(type))
                )
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


    return (
        <Grid columns="3" style={{gridTemplateColumns:'25% 75%'}} py="5" px="5">
            <Flex id="searchBar" px="5" py="5" justify="center" style={{gridColumn: 'span 3'}} >
                <TextField.Root radius="full" placeholder="Search a Pokemon ..." size="3" style={{width:'80vh'}} onChange={handleSearch} >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>

            <Flex justify="center">
                <Accordion.Root type="multiple" className="AccordionRoot">

                    <AccordionTab name="Type" onchecked={onChecked} filter={types} selectedFilter={selectedType} searchBar={false} ondelete={onChecked}/>

                    <AccordionTab name="Rarity" onchecked={onChecked} filter={rarities} selectedFilter={selectedRarities} handleSearch={handleSearchRarities} searchBar={true} ondelete={onChecked}/>

                    <AccordionTab name="Set" onchecked={onChecked} filter={sets} selectedFilter={selectedSet} handleSearch={handleSearchSets} searchBar={true} ondelete={onChecked}/>

                </Accordion.Root>
            </Flex>
            <Grid className="cardsUser" columns="repeat(auto-fit, minmax(245px, 1fr))" style={{maxWidth: '1500px', height: "fit-content", marginLeft: "10px"}} gap="4">
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

            <ScrollArea className={`${name}Scroll`} style={{maxHeight: '260px'}}>
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