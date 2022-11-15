import React, { useState, useEffect } from 'react'
import { getData } from './api';

const Table=()=>{
const [rows, setrows]=useState([])

const [Pagination,setPagination]=useState([])
const makePagination = (offset, totalRegisters) => {
    console.log('offestepaginacion',offset);
    console.log('totalregister',totalRegisters);
    const pagination = Math.round(totalRegisters / offset);
        const List = Array(pagination)
        .fill()
          .map((u, index) => ({ offset: index * offset, num: index + 1 }));
    
//console.log('lista',pagination)
      setPagination(List)
 }

const getrows = async () => {
  const datosrows = await getData(10, 10, true)
  //setDatarows (datosrows);
 makePagination(datosrows["genre-offset"],datosrows["genre-count"] )
 setrows(datosrows.genres);

  
} 
const buttonPaginationCLick= async(offset)=>{
 let numbers=  document.querySelector("#opcion").value;     
 const data  = await getData(numbers, offset, false)

setrows(data.genres);
}

const opciones= async (e)=>{
   let value  = e.target.value;
const datosrows = await getData(value, value, true)
 makePagination(datosrows["genre-offset"],datosrows["genre-count"] )

setrows(datosrows.genres);
}
useEffect(()=>{
 

getrows(); 



},[]);


return ( 
    <div className="container">
    <div className='form-group'>
            <label from='opciones'>Registros por pagina </label> 
            <select className='form-control' id="opcion" onChange={opciones}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
     </div>


    <table className="table table-striped">
            <thead>
                    <tr> 
                        <th>id</th>
                        <th>name</th>
                        <th>disambiguation</th>
                    </tr>
             </thead>   
            <tbody>
{rows.map((response)=>         
<tr key={response.id}>
            <td>{response.id}</td>
            <td>{response.name}</td>
            <td>{response.disambiguation}</td>
         </tr>       
)}
    </tbody>   
                

 </table>
<div className='col-sm-3'>
<div className='row'>
<nav aria-label="Page navigation example">
<ul className="pagination">
{Pagination.map((el)=>
<li className="page-item" key={el.offset}>

<a onClick={() =>buttonPaginationCLick(el.offset)} className="page-link"  href="#" data-offset={el.offset}>{el.num}</a>
</li>
)}
  </ul>
 
</nav> 
</div> 
</div>

           
              </div>


)

} 

export  default Table ;