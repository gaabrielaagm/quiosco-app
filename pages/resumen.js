import Layout from '../layout/Layout'
import ResumenProducto from '../components/ResumenProducto'
import useQuiosco from '../hooks/useQuiosco'

export default function Resumen () {
    const { pedidoFinal } = useQuiosco()

    return (
        <Layout pagina='Resumen'>
            {/* <h1 className="text-4xl font-black">Resumen</h1> */}
            <h3 className="text-2xl mt-20 mb-10">Revisa tu Pedido</h3>

            {!pedidoFinal || pedidoFinal.length === 0 ? (
                <p className="text-center text-2xl">No hay productos en tu Pedido</p>
            ) : (
                pedidoFinal.map(producto => (
                    <ResumenProducto 
                        key={producto.id} 
                        producto={producto}
                    />
                ))
            )}
        </Layout>
    )
}