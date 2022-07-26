import { useEffect } from "react";
import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers";

export default function Total () {
    const { nombre, setNombre, pedidoFinal, mandarOrden, total } = useQuiosco()

    const comprobarPedido = () => {
        return !pedidoFinal || pedidoFinal?.length === 0 || nombre === '' || nombre.length <= 2
    }

    return (
        <Layout pagina='Confirmar Pedido'>
            <p className="text-2xl my-10">Confirma tu Pedido</p>
            <form onSubmit={mandarOrden}>
                <div>
                    <label 
                        className="block uppercase text-slate-800 text-xl"
                        htmlFor="nombre"                        
                    >
                            Nombre:
                    </label>
                    <input 
                        id="nombre"
                        type="text"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar: {''} 
                        <span className="font-bold">
                            {formatearDinero(total)}
                        </span>
                    </p>
                </div>

                <div className="mt-5">
                    <input 
                        type="submit"
                        value="Confirmar pedido" 
                        className={`${comprobarPedido() ? 'bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-800'}
                                    hover:cursor-pointer w-full lg:w-auto px-5 py-2 rounded 
                                    uppercase font-bold text-white text-center`}
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}