import { Search, Plus, Package, Bell } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('name') || '');
  const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
            e.preventDefault();

            if(search.trim()){
setSearchParams({ name: search });
    
      if (window.location.pathname !== '/') {
        navigate(`/?name=${search}`);
      }
            }else{
                navigate(`/`);
            }
    }

    useEffect(() => {
  if (search === "") {
    setSearchParams({}); // Limpa o ?name= da URL se o campo ficar vazio
  }
}, [search]);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Lado Esquerdo: Logo/Nome */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Package className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Stock<span className="text-blue-600">Master</span>
          </span>
        </div>

        {/* Centro: Barra de Pesquisa */}
      <form 
  onSubmit={handleSearch} // Adicionado aqui
  className="relative w-full max-w-md mx-4"
>
        <div className="relative w-full max-w-md mx-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <Input 
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar produtos pelo nome..."
            className="w-full pl-10 bg-slate-100 border-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
          />
        </div>
    </form>
        {/* Lado Direito: Ações */}
        <div className="flex items-center gap-3">

          <Button 
            onClick={() => navigate('/product/create')}
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={18} />
            Novo Produto
          </Button>
          

        </div>

      </div>
    </header>
  );
};