import { Badge, Package } from "lucide-react" // Ícones que combinam mais com produtos
import { Button } from "../ui/button"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useNavigate } from "react-router-dom";




// Simulando um objeto de produto para o estilo
interface CardProductsProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    category?: {
      name: string;
    };
  };
}


export const CardProducts = ({ product }: CardProductsProps) => {
    const navigate = useNavigate()
  return (
    <Card className="w-full max-w-sm border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-blue-400">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {/* Categoria em destaque no topo */}
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              Categoria {product.category?.name || "Sem Categoria"}
            </Badge>
            <CardTitle className="text-xl font-bold text-slate-800">
              {product.name}
            </CardTitle>
          </div>
          
          {/* Preço com destaque visual sem precisar de imagem */}
          <div className="text-right">
            <span className="text-lg font-bold text-green-600 block">
              {Number(product.price || 0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
          </div>
        </div>
        
        <CardDescription className="line-clamp-3 pt-2 text-slate-600">
          {product.description || "Sem descrição disponível para este produto."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-4 border-t bg-slate-50/50 pt-4">
        {/* Info de Estoque com barra de progresso simples (opcional) */}
        <div className="flex w-full items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Package size={18} className="text-blue-500" />
            <span>Estoque: <strong>{product.stock}</strong></span>
          </div>
          
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            product.stock <= 10 
              ? "bg-red-100 text-red-600" 
              : "bg-green-100 text-green-700"
          }`}>
            {product.stock <= 10 ? "CRÍTICO" : "EM DIA"}
          </span>
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="font-semibold" onClick={() => navigate(`/product/${product.id}`)}>
            Detalhes
          </Button>
          <Button size="sm" className="bg-slate-800 hover:bg-slate-700 font-semibold text-white" onClick={() => navigate(`/product/edit/${product.id}`)}>
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}