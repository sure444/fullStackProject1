import axios from "axios";
import { useEffect, useState } from "react";
import ShowAll from "./showAll.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Home.css';

const Home = () => {
    const [data,setData] = useState([])
    const [pdata,setpData] = useState([])
    const [item,setItem] = useState()
    const [stalker,setStalker] = useState(false)

    useEffect(
        ()=>{
            /* get all item */
            axios.get('http://localhost:3001/grocery/getAll')
            .then((res)=>{
                setData(res.data.filter((item)=>item.isPurchased === false));
                setpData(res.data.filter((item)=>item.isPurchased === true));
                setStalker(false)
            })
            .catch((err)=>console.log('error'));
        },[stalker]
    )

    /* add item */
    const addItem = (e) => {
        setItem(e.target.value)
    }
    
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            axios.post('http://localhost:3001/grocery/add',{
            groceryItem:item,
            isPurchased:false
            }).then((result)=>{
            console.log(result);
            setStalker(true);
            }).catch((error)=>console.log('err'))
        }
    }

       /* update item status */
    const handleUpdate = (id) => {
        axios.put(`http://localhost:3001/grocery/updatePurchaseStatus/${id}`,{
            isPurchased:true
        })
        .then((result)=>{
            console.log(result);
            setStalker(true);
        }).catch((error)=>console.log(error))
        
    }


    /* delete item */
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/grocery/deletGroceryItem/${id}`)
        .then((result)=>{
            console.log(result);
            setStalker(true);
        }).catch((error)=>console.log(error))
    }
    return (
        <div id={'containerbox'}>
            <div id={'navigationbar'}>
                <h4>Monthly Grocery Planning App</h4>
            </div>
            <div id={'body'}>
                <ShowAll data={data} pdata={pdata} addItem={addItem} handleKeyPress={handleKeyPress} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
            </div>
        </div>
    );
}
 

export default Home;