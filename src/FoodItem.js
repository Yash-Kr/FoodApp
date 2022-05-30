import React from 'react'
import './fooditem.css'
import { Grid } from '@mui/material'

function FoodItem({name,price,image, del, edit, idx}) {

  return (
     <Grid container className='fooditem'>
        <Grid item xs={2} style={{textAlign:"center"}}> <img src={image} alt={`${name} img`} className="fooditem-img"></img> </Grid>
        <Grid item xs={5} style={{display:"table"}}> <span className="fooditem-name">{name}</span></Grid>
        <Grid item xs={3} style={{display:"table"}}> <span className="fooditem-price"> <span>Price : </span>&#8377;  {price}</span></Grid>
        <Grid item xs style={{display:"table",textAlign:"center"}}><span className="fooditem-edit" onClick={() =>edit(idx)}><i className="bi bi-pencil-fill"></i></span></Grid>
        <Grid item xs style={{display:"table",textAlign:"center"}}><span className="fooditem-delete" onClick={() =>del(idx)}><i className="bi bi-trash-fill"></i></span></Grid>
     </Grid>
  )
}

export default FoodItem