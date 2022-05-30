import './App.css';
import { Grid} from '@mui/material';
import { useRef, useState } from 'react';
import FoodItem from './FoodItem';
import React from 'react';
import { Button, SwipeableDrawer } from '@mui/material';
import { TextField } from '@mui/material';

function App() {

  const [foods, setFoods] = useState([
  ])

  const [images, setImages] = useState([]);

  const fetchImage = async (name) => {
    let data = await fetch(`https://api.unsplash.com/search/photos?client_id=T27PCJOUntyrKUsOyvp6oFAZyoMy-iALZqRqCJDiifA&query=${name}`);
    data = await data?.json();
    data = await data?.results[0]?.urls?.thumb;
    return data;
  }

  const [open, setOpen] = useState(false);
  const [final, setFinal] = useState(false);
  const [edit, setEdit] = useState(false);


  const nameRef = useRef();
  const priceRef = useRef();



  const addFoodItem = async () => {
     const lower = nameRef.current.value.toLowerCase();
     const newImg = await fetchImage(lower);
     setImages([...images, newImg])
     let newData = {
       name: nameRef.current.value,
       price : priceRef.current.value
     }
     setFoods([...foods, newData])
     setOpen(false)
  }

  const deleteFoodItem = (index) => {
    setFoods(foods.filter((item, idx) => idx!==index))
    setImages(images.filter((item, idx) => idx!==index))
  }
  
  const [indexToEdit, setIndexToEdit] = useState(-1);

  const openEdit = (index) => {
       setIndexToEdit(index);
       setEdit(true);  
  }

  const editFoodItem = async () => {
      setFoods( foods.map((item,index) => index === indexToEdit ? { name:nameRef.current.value, price:priceRef.current.value} : item));
      const lower = nameRef.current.value.toLowerCase();
      const newImg = await fetchImage(lower);
      setImages( images.map((item,index) => index === indexToEdit ? newImg : item) );
      closeForm();
  }



  const closeForm = () => {
      if(edit){
        setEdit(false);
        setIndexToEdit(-1);
      }
      else{
        setOpen(false)
      }
  }

  return (
    <div className="App">
      <Grid container justifyContent="center" className="mainscreen">
        <h1>{`${final ? "Final" : ""} Food List`}</h1>
        {final ? <></> :
        <Grid item xs={12} lg={12} md={12} xl={12} className="mainscreen-items">
            {
              foods.map((food,index) => <div key={index}><FoodItem name={food.name} price={food.price} image={images[index]} del={deleteFoodItem} edit={openEdit} idx={index}></FoodItem></div>)
            }
        </Grid>
        }
        <hr></hr>
        { final ? <div className='finalcontainer'>
           <div>{JSON.stringify(foods)}</div>
          </div> : <></>}
        { final ? <></> : <div className='addfood' onClick={() => setOpen(true)}><i className="bi bi-plus-circle-fill"></i> Add Food Item</div>}
        <div className='finalfood' onClick={() => setFinal(!final)}>{`${final ? "Close" : "Final Food List"}`} &nbsp; {!final ? <i className="bi bi-arrow-up-right-square-fill"></i> : <i className="bi bi-x-circle-fill"></i>}</div>
      </Grid>
        <SwipeableDrawer anchor={"bottom"} open={open || edit} onClose={()=> setOpen(false)} onOpen={()=> setOpen(true)} id='drawer'>
            <div className='form'>
                <h1>{edit ? "Edit Food" : "Add Food"} <span style={{float:"right",marginTop:"-2px"}} onClick={closeForm}><i className="bi bi-x-circle-fill close-btn"></i></span></h1>
                <TextField id="outlined-basic" label="Food Name" variant="outlined" required fullWidth style={{margin:"10px 0"}}  inputRef={nameRef} defaultValue={indexToEdit === -1 ? "" : foods[indexToEdit].name}/>
                <TextField id="outlined-basic" label="Food Price" variant="outlined" required fullWidth style={{margin:"10px 0"}} inputRef={priceRef} defaultValue={indexToEdit === -1 ? "" : foods[indexToEdit].price}/>
                <Button variant="outlined" fullWidth className='addbtn'  onClick={() => edit ? editFoodItem() : addFoodItem()}>{edit ? "Update" : "Add Food"} Item</Button>
            </div>
        </SwipeableDrawer>
       
    </div>
  );
}

export default App;
