import SetPresentation from "../components/SetPresentation";
import dao from "../dao/pokapiDAO.js"
import React,{useState,useEffect} from "react"

function Home() {
    const [listSet,setListSet] = useState(null)

    const [loadedSet,setLoadedSet] = useState([])

    useEffect(()=>{
        async function retrieveSetList(){
            let newListSet = (await dao.fetchSets()).data
            let newLoadedSet = []
            for(let i = 0;i<3;i++){
                const index = parseInt(Math.random()*newListSet.length-1)
                newLoadedSet.push(newListSet[index])
                newListSet.splice(index,1)
            }
            setListSet(newListSet)
            setLoadedSet(newLoadedSet)
        }
        retrieveSetList()
    },[setListSet])

    return (
        <>
            <h3>Page d'accueil (voir les booster)</h3>
            <div style={setWrapperStyle}>
                {
                    loadedSet && loadedSet.map((set,index)=>
                        <SetPresentation setId={set.id}></SetPresentation>
                    )
                }    
            </div>
        </>
    )
}

const setWrapperStyle = {
    display : "flex",
    flexDirection : "row"
}

export default Home;