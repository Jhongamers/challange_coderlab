import { useEffect, useState } from "react"
import { CardProducts } from "../../components/CardProducts"
import type { IProducts } from "../../types/IProducts"
import { getProducts } from "../../services/api";
import { useSearchParams } from "react-router-dom";

export const ProductsPage = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Pega a página da URL ou define como 1
    const currentPage = Number(searchParams.get('page')) || 1;
    const queryName = searchParams.get('name') || "";

const fetchProducts = async () => {
    const response = await getProducts(queryName, currentPage);
    // Verifique se o retorno tem a estrutura { data: [...] }
    if (response && response.data) {
        setProducts(response.data); 
        setTotalPages(response.meta?.lastPage || 1);
    }
};
    useEffect(() => {
        fetchProducts();
    }, [queryName, currentPage]);

    const handlePageChange = (newPage: number) => {
        // Atualiza a URL mantendo a busca e mudando a página
        setSearchParams({ name: queryName, page: newPage.toString() });
        window.scrollTo(0, 0); // Sobe pro topo ao mudar de página
    }

    return (
        <main className="p-6 bg-slate-50 min-h-screen">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-2xl font-bold mb-6">
                    {queryName ? `Resultados para: "${queryName}"` : "Meus Produtos"}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <CardProducts key={product.id} product={product} />
                    ))}
                </div>

                {/* --- PAGINAÇÃO --- */}
                <div className="flex justify-center mt-10 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-4 py-2 rounded-md border ${
                                currentPage === pageNumber
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    )
}