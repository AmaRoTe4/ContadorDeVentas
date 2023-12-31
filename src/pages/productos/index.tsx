import { Producto } from "../../types"
import Xmark_black from "../../svg/xmark_black";
import TablaProductos from "../../components/TablaProductos";
import New_black from "../../svg/new_black";
import { inicialStateProducto } from "../../const/productos";
import useProductos from "../../hooks/useProductos";
import { useState } from "react";
import { Layout } from "../../layout/Layout";

export default function Productos() {
    const [permitirDelete, setPermitirDelete] = useState<boolean>(true)
    const {
        prodAction,
        allProductos,
        renderForm,
        selectedToForm,
        HandlerProdutos,
        ActionProducto,
        updateEstadoProductoHook,
        deleteProductoForId,
        resetAllProducto,
        deleteAllProductosHook
    } = useProductos()

    return (
        <Layout>
            <nav className="w-full pt-3 pb-5 flex justify-between items-center">
                <span className="h-[25px] w-[25px]"></span>
                <h1 className="text-[35px] font-bold dark:text-gray-100">Productos</h1>
                <button type="button" onClick={() => selectedToForm()}>
                    <New_black className="h-[25px] w-[25px] dark:fill-gray-100" />
                </button>
            </nav>
            {!renderForm && <main className="min-h-[330px] max-h-[330px] border border-black overflow-y-scroll w-full flex flex-col items-center pb-2 sin_scroll_bar">
                <TablaProductos
                    deleteProductoForId={deleteProductoForId}
                    updateEstadoProductoHook={updateEstadoProductoHook}
                    setProductoUpdate={selectedToForm}
                    allProductos={allProductos}
                />
            </main>}
            <Formulario
                ActionProducto={ActionProducto}
                producto={prodAction}
                render={renderForm}
                HandlerProdutos={HandlerProdutos}
                EndToForm={selectedToForm}
            />
            {!renderForm && <footer className="pt-32 flex justify-end">
                <span className="w-full md:w-[250px] flex flex-col gap-3 py-3">
                    <button
                        onClick={() => setPermitirDelete(n => !n)}
                        type="button"
                        className={`${permitirDelete ? "bg-red-500" : "bg-green-500"} border border-black px-2 py-1 rounded-sm dark:text-gray-100`}
                    >
                        {permitirDelete ? "Habilitar borrado" : "Desabilitar borrado"}
                    </button>
                    <button
                        disabled={permitirDelete}
                        onClick={async () => await resetAllProducto()}
                        type="button"
                        className={`${permitirDelete && "opacity-80"} border border-black px-2 py-1 rounded-sm bg-yellow-500 dark:text-gray-100`}
                    >
                        Borrar todas las ventas <span className="font-bold">(reset)</span>
                    </button>
                    <button
                        disabled={permitirDelete}
                        onClick={async () => await deleteAllProductosHook()}
                        type="button"
                        className={`${permitirDelete && "opacity-80"} border border-black px-2 py-1 rounded-sm bg-yellow-500 dark:text-gray-100`}
                    >
                        Borrar todo
                    </button>
                </span>
            </footer>}
        </Layout>
    )
}

interface PropForm {
    producto: Producto
    EndToForm: (prod: Producto | undefined, state: boolean) => void
    render: boolean
    HandlerProdutos: (e: React.ChangeEvent<HTMLInputElement>) => void
    ActionProducto: (e: React.FormEvent<HTMLFormElement>) => void
}

const Formulario = ({ producto, EndToForm, render, HandlerProdutos, ActionProducto }: PropForm) => {
    if (!render) return <></>
    return (
        <section className="w-full flex flex-col justify-center items-center">
            <nav className="w-full pt-3 pb-2 flex items-center justify-between">
                <button type="button" onClick={() => EndToForm(inicialStateProducto, false)}>
                    <Xmark_black className="h-[25px] w-[25px] dark:fill-gray-100" />
                </button>
                <h2 className="text-[16px] font-bold dark:text-gray-100">Formulario para {producto.id !== "" ? "editar" : "crear"}</h2>
                <span className="h-[25px] w-[25px]">
                </span>
            </nav>
            <form className="w-full md:w-[300px] flex flex-col gap-2 py-3" onSubmit={(e) => ActionProducto(e)}>
                <div className="w-full flex flex-col">
                    <label className="dark:text-gray-100">Nombre</label>
                    <input
                        className="w-full border border-black px-2 py-1 rounded-sm dark:text-gray-100 dark:bg-gray-800"
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="nombre"
                        value={producto.nombre}
                        onChange={e => HandlerProdutos(e)}
                    />
                </div>
                <div className="w-full flex flex-col">
                    <label className="dark:text-gray-100">Precio</label>
                    <input
                        className="w-full border border-black px-2 py-1 rounded-sm dark:text-gray-100 dark:bg-gray-800"
                        type="number"
                        name="precio"
                        id="precio"
                        placeholder="precio"
                        value={producto.precio}
                        onChange={e => HandlerProdutos(e)}
                    />
                </div>
                <div className="w-full flex flex-col">
                    <label className="dark:text-gray-100">Costo</label>
                    <input
                        className="w-full border border-black px-2 py-1 rounded-sm dark:text-gray-100 dark:bg-gray-800"
                        type="number"
                        name="costo"
                        id="costo"
                        placeholder="costo"
                        value={producto.costo}
                        onChange={e => HandlerProdutos(e)}
                    />
                </div>
                <div className="w-full flex flex-col">
                    <label className="dark:text-gray-100">Vendidos</label>
                    <input
                        className="w-full border border-black px-2 py-1 rounded-sm dark:text-gray-100 dark:bg-gray-800"
                        type="number"
                        name="vendidos"
                        id="vendidos"
                        placeholder="vendidos"
                        value={producto.vendidos}
                        onChange={e => HandlerProdutos(e)}
                    />
                </div>
                <div className="w-full">
                    <button className="w-full border border-black px-2 py-1 rounded-sm bg-green-500 dark:text-black">
                        {producto.id !== "" ? "Editar" : "Crear"}
                    </button>
                </div>
            </form>
        </section>
    )
}