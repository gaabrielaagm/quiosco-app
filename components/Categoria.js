import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Categoria = ({categoria}) => {
    const { id, nombre, icono } = categoria
    const { categoriaActual, handleClickCategoria } = useQuiosco()


    return (
        <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : '' }
                            flex items-center hover:cursor-pointer gap-4 w-full border p-5 hover:bg-amber-400`}
             onClick={() => handleClickCategoria(id)}
        >
            <Image 
                width={70} 
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
                alt="Imagen icono" 
            />
            <button
                type='button'
                className="text-2xl font-bold hover:cursor-pointer"
            >
                {nombre}
            </button>
        </div>
    )
}

export default Categoria