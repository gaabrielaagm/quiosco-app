import { useState, useEffect, createContext } from "react"
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import axios from "axios"

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedidoFinal, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter() 

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
        setCategoriaActual(data[0])
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        const nuevoTotal = pedidoFinal.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedidoFinal])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    // Forma propia
    // parametros y llamada de la funcion -> handleAgregarPedido(cantidad)
    /* 
    const handleAgregarPedido = (cantidad) => {
        const existe = pedidoFinal.some(productoState => productoState.id === producto.id) 
        if (existe) {
           pedidoFinal = pedidoFinal.map(productoState => {
                if (productoState.id === producto.id) productoState.cantidad = cantidad
                return productoState
            })

            setPedido(pedidoFinal)
        } else {
            const { categoriaId, imagen, ...infoProducto } = producto
            setPedido([
                ...pedidoFinal,
                { ...infoProducto, cantidad }
            ])
        }
    }
    */

    /* 
        Forma del instructor:
        parametros y llamada de la funcion -> handleAgregarPedido({...producto, cantidad})
    */
    const handleAgregarPedido = ({ categoriaId, ...productoPedido }) => {
        const existe = pedidoFinal.some(productoState => productoState.id === producto.id) 
        if (existe) {
            toastNotify('Producto Modificado')
            const pedidoActualizado = pedidoFinal.map(productoState => 
                (productoState.id === productoPedido.id) ? productoPedido : productoState
            )
            setPedido(pedidoActualizado)
        } else {
            toastNotify('Producto Agregado')
            setPedido([
                ...pedidoFinal,
                productoPedido
            ])
        }

        setModal(false)
    }

    const toastNotify = (mensaje) => {
        toast.success(mensaje, {
            position: 'top-center',
            autoClose: 1500,
            closeOnClick: true
        })
    }

    const handleEditarCantidades = id => {
        const productoEditar = pedidoFinal.filter(producto => producto.id === id)
        setProducto(productoEditar[0])
        setModal(true)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedidoFinal.filter(producto => producto.id !== id)

        setPedido(pedidoActualizado)
    } 

    const mandarOrden = async e => {
        e.preventDefault()

        try {
            const { data } = await axios.post('api/ordenes', {
                pedidoFinal, 
                nombre, 
                total,
                fecha: Date.now().toString()
            })

            resetearApp()
            router.push('/')
            setTimeout(() => {
                toastNotify('Pedido Realizado')
            }, 200)
        } catch (error) {
            console.error(error)
        } finally { }
    }

    const resetearApp = () => {
        setCategoriaActual(categorias[0])
        setProducto({})
        setPedido([])
        setNombre('')
        setTotal(0)
    }
    
    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual, 
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido, 
                pedidoFinal,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                mandarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext