import { useContext } from "react"
import { Card } from "../components/Card"
import { ProductosContext } from "../context/ProductosContext"
import { CarritoContext } from "../context/CarritoContext"
import { useState } from  "react" ;
import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import '../styles/comprasPage.css';


export const ComprasPage = () => {

    const { productos } = useContext( ProductosContext )
    const [preferenceId, setPreferenceId] = useState(null);
      initMercadoPago('YOUR_PUBLIC_KEY'); 

      const createPreference = async ()=>{
        try {   		
        const response = await axios.post ("http://localhost:8080/create_preference ",{
        title   :  " tit ",
        price   : 35 ,                        //(nota: hay que poner los campos de carrito..)
        description : " primera descript ",
        quantity : 1,
             });

        const {id} = response.data;
        return id ;
        }  catch (error) {
            console.log(error);
               }
            };
                
      const handleBuy= async ()=> {
           const id = await createPreference();
           if (id) { 
             setPreferenceId(id) ;
             }
            } ;
    
    const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

    const handleAgregar = (compra) =>{
      agregarCompra(compra)
    }
    const handleQuitar = (id) =>{
      eliminarCompra(id)
    }
   

  return (
    <>
    {/*este h1 className  lo puse yo */}
  <h1 className="titulo-compras" >Las Compras:    </h1>
    <hr />

    {productos.map(producto => (
        <Card 
        key   ={producto.id}
        imagen={producto.image}
        titulo={producto.title}
        descripcion={producto.description}
        precio     ={producto.price}
        handleAgregar   ={() => handleAgregar(producto)}
        handleQuitar ={() => handleQuitar(producto.id)}
        >

        </Card>
    ))}
    
    </>
  )
}
