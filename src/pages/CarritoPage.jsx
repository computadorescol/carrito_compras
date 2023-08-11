import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from  "react" ;
import axios from "axios";

export const CarritoPage = () => {

    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('TEST-29661ec8-ef11-447c-84d9-d571e8cb2cc1'); 

    const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } = useContext(CarritoContext)

    const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.price * item.cantidad, 0 ).toFixed(2)
    }

    const handleImpresion = () => {

        print()
    }
    const createPreference = async ()=>{
        try {   		
            const response = await axios.post ("http://localhost:8080/create_preference ",{
            title   :  "sortija white gold  ",
            price   : 9 ,                        
            description : " anillo de bodas ",
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

    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaCompras.map(item => (
                            <tr key={item.id}>
                                <th>{item.title}</th>
                                <td>{item.price}</td>
                                <td>
                                    <button 
                                    className="btn btn-ouline-primary" 
                                    onClick={ () => disminuirCantidad(item.id)}
                                    >-</button>
                                    <button className="btn btn-primary">{item.cantidad}</button>
                                    <button 
                                    className="btn btn-ouline-primary" 
                                    onClick={ () => aumentarCantidad(item.id)}
                                    >+</button>
                                </td>
                                <td><button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={()=>eliminarCompra(item.id)}
                                >Eliminar
                                </button>
                                </td>
                            </tr>
                        ))
                    }

                    <th><b>TOTAL: </b></th>
                    <td></td>
                    <td></td>
                    <td>${calcularTotal()}</td>

                </tbody>
            </table>

            <div className="d-grid gap-2">
                <button 
                className="btn btn-primary"
                disabled={listaCompras<1}
                onClick={handleBuy}
                >
                COMPRAR</button>
                {preferenceId && < Wallet initialization={{ preferenceId }} />}


            </div>
        </>
    )
}
