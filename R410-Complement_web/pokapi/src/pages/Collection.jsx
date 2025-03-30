import config from "../config.js";
import {useEffect, useState} from "react";
import {Box, Flex, Grid, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Accordion from '@radix-ui/react-accordion';
import {AccordionContent, AccordionTrigger} from "@radix-ui/react-accordion";
import {ChevronDownIcon} from "lucide-react";


function ImageCard({card}) {
    return <Flex justify="center">
        <img className="rt-r-px-2 rt-r-py-2" alt={card.name} src={card.images.small}/>
    </Flex>
}

function Collection() {

    const [userCards, setUserCards] = useState([])


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

    console.log(userCards)

    return (
        <Grid columns="3" style={{gridTemplateColumns:'25% 75%'}}>
            <Flex id="searchBar" px="5" py="5" justify="center" style={{gridColumn: 'span 3'}} >
                <TextField.Root radius="full" placeholder="Search Pokemon ..." size="3" style={{width:'80vh'}} >
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
                            TEMP
                        </AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item value="Rareté" className="AccordionItem">
                        <AccordionTrigger className="AccordionTrigger">Rareté <ChevronDownIcon className="AccordionChevron" aria-hidden /> </AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            TEMP
                        </AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item value="Set" className="AccordionItem">
                        <AccordionTrigger className="AccordionTrigger">Set <ChevronDownIcon className="AccordionChevron" aria-hidden /> </AccordionTrigger>
                        <AccordionContent className="AccordionContent">
                            TEMP
                        </AccordionContent>
                    </Accordion.Item>

                </Accordion.Root>
            </Flex>
            <Grid className="cardsUser" columns="repeat(auto-fit, minmax(261px, 1fr))" style={{maxWidth: '1500px'}}>
                {userCards.map(card => (
                    <ImageCard key={card.name} card={card}/>
                ))}
            </Grid>
        </Grid>
    )
}

export default Collection;