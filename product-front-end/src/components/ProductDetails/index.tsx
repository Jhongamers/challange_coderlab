import { ArrowLeft, Edit, Package, Tag, Trash2, Calendar, Badge } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProducts, getOneProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number | undefined;
}

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL
  const [product, setProduct]  = useState<IProduct | null>(null);
  
  const getOneProductDetails = async () => {
    const response = await getOneProduct(id);
      console.log(response.data)
    setProduct(response.data);
  }

  const deleteProduct = async () => {
      await deleteProducts(Number(id));
    toast.success('Produto deletado com sucesso');
    navigate('/');
  }

    useEffect(() => {
    getOneProductDetails();
  },[id])

  if (!product) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-slate-500 animate-pulse">Carregando detalhes do produto...</p>
        </div>
    );
  }


  return (
    <main className="p-6 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-5xl">
        {/* Cabeçalho com Botão Voltar */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 hover:bg-slate-200"
          >
            <ArrowLeft size={20} />
            Voltar para a lista
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteProduct()}>
              <Trash2 size={18} />
              Excluir
            </Button>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/product/edit/${id}`)}>
              <Edit size={18} />
              Editar Produto
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Coluna Principal (2/3) */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    ID #{id}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Tag size={12} />
                    Categoria {product.categoryId}
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-extrabold text-slate-900">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Descrição do Produto
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Histórico ou Informações Adicionais */}
            <div className="grid grid-cols-2 gap-4">
               <Card className="p-4 flex items-center gap-4 border-none shadow-sm">
                  <div className="p-3 bg-slate-100 rounded-full text-slate-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Cadastrado em</p>
                    <p className="font-medium text-slate-800">{product.createdAt}</p>
                  </div>
               </Card>
               {/* Outro card de info aqui se quiser */}
            </div>
          </div>

          {/* Sidebar de Ações/Financeiro (1/3) */}
          <div className="space-y-6">
            <Card className="border-none shadow-md bg-white overflow-hidden">
              <div className="p-6 bg-slate-900 text-white text-center">
                <p className="text-slate-400 text-sm mb-1">Preço de Venda</p>
                <h2 className="text-3xl font-bold">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h2>
              </div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-500 font-medium">Status do Estoque</span>
                    <span className={`text-xs font-bold ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 10 ? 'ESTÁVEL' : 'ALERTA'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="text-slate-400" size={24} />
                    <span className="text-2xl font-bold text-slate-800">
                      {product.stock} <span className="text-sm font-normal text-slate-500">unidades</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 text-center uppercase tracking-widest font-bold">
                    Resumo do Sistema
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </main>
  );
};