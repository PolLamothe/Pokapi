import config from "../config.js";
import {useEffect, useState} from "react";
import {Box, CheckboxGroup, Flex, Grid, ScrollArea, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Accordion from '@radix-ui/react-accordion';
import {AccordionContent, AccordionTrigger} from "@radix-ui/react-accordion";
import {ChevronDownIcon, Scroll} from "lucide-react";


function ImageCard({card}) {
    return <Flex justify="center">
        <img className="rt-r-px-2 rt-r-py-2" alt={card.name} src={card.images.small} style={{ maxWidth: "261px" , maxHeight: "358px" }} />
    </Flex>
}

function Collection() {

    const [userCards, setUserCards] = useState([])
    const [types, setTypes] = useState([])
    const [rarities, setRarities] = useState([])
    const [sets, setSets] = useState([])


    useEffect(()=>{
        const fetchCardsUser = async () => {
            let cards = await fetch(config.url + "/my-cards", {
                method: "GET",
                headers : {
                    "Authentification-Token": localStorage.getItem("token")
                }
            })
            let dataUserCards = await cards.json()
            setUserCards(dataUserCards)
        }
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


    return (
        <Grid columns="3" style={{gridTemplateColumns:'25% 75%'}}>
            <Flex id="searchBar" px="5" py="5" justify="center" style={{gridColumn: 'span 3'}} >
                <TextField.Root radius="full" placeholder="Rechercher un Pokemon ..." size="3" style={{width:'80vh'}} >
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
                            <CheckboxGroup.Root defaultValue='All' name="type">
                                <CheckboxGroup.Item value="All">All</CheckboxGroup.Item>
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
                                <CheckboxGroup.Root defaultValue='All' name="rarities">
                                    <CheckboxGroup.Item value="All">All</CheckboxGroup.Item>
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
                                <CheckboxGroup.Root defaultValue='All' name="sets">
                                    <CheckboxGroup.Item value="All">All</CheckboxGroup.Item>
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
                {userCards.map(card => (
                    <ImageCard key={card.name} card={card}/>
                ))}
            </Grid>
        </Grid>
    )
}

export default Collection;