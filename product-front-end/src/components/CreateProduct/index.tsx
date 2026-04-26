
import { Button } from "../ui/button"
import { Field, FieldGroup, FieldLabel  } from "../ui/field"
import { Input } from "../ui/input"
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, Select, SelectItem } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Check, X } from "lucide-react"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {data, redirect, useLocation, useNavigate} from 'react-router-dom'
import { createProduct, getCategory } from "../../services/api"
import { toast } from "sonner"
import { useEffect, useState } from "react"




const createProductSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatório"),
    price: z.coerce.number().min(1, "Preço é obrigatório"),
    categoryId: z.coerce.number({ invalid_type_error: "Selecione uma categoria" }).min(1, "Selecione uma categoria"),
  stock: z.coerce.number()
            .min(1, "Quantidade mínima é 1")
            .max(100, "O estoque máximo permitido é 100")
});

type CreateProductSchema = z.infer<typeof createProductSchema>


export const ProductForm = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
    const {register, handleSubmit,control, setValue,formState: { errors }} = useForm<CreateProductSchema>({
        resolver: zodResolver(createProductSchema),
    })

   const  handleCreateProduct = async(data: CreateProductSchema) => {
try {
       await createProduct(data);
        toast.success('Produto salvo!');
            navigate('/');
        
    } catch (error: any) {
        if (error.response) {
            toast.error(`Erro do servidor: ${error.response.data.message || 'Erro desconhecido'}`);
        } else {
            toast.error("Erro de rede ou servidor offline");
        }
    }
}
useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await getCategory();
                setCategories(response.data);
            } catch (error) {
                console.error("Erro ao carregar categorias");
            }
        };
        loadCategories();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6">
            <Card className="w-full max-w-2xl">
                <CardHeader>

                    <CardTitle>Registrar Produto</CardTitle>
                    <CardDescription>Adicione um novo produto com detalhes claros para facilitar a gestão.</CardDescription>

                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit(handleCreateProduct)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Field>

                                    <FieldLabel htmlFor="name">Nome do produto</FieldLabel>
                                                                                            {errors.name && (
        <span className="text-xs text-red-500">{errors.name.message}</span>
    )}
                                    <Input id="name" type="text" placeholder="Notebook"  {...register('name')} />
                                </Field>
                            </div>
                            <div>
   <Field>
                                <FieldLabel htmlFor="categoryId">Categoria</FieldLabel>
                                <Controller
                                    name="categoryId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                            <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                                                <SelectValue placeholder="Selecionar categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.categoryId && <span className="text-xs text-red-500">{errors.categoryId.message}</span>}
                            </Field>
                        </div>
                            </div>
                   

                        <Field>
                            <FieldLabel htmlFor="description">Descrição</FieldLabel>
         {errors.description && (
        <span className="text-xs text-red-500">{errors.description.message}</span>
    )}
         
                            <Textarea id="description" placeholder="Descreva o produto brevemente..." {...register('description')} />
                        </Field>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="price">Preço</FieldLabel>
                                         {errors.price && (
        <span className="text-xs text-red-500">{errors.price.message}</span>
    )}
                                <Input id="price" type="number" placeholder="19.99" {...register('price')} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="amount">Quantidade</FieldLabel>
                                         {errors.stock && (
        <span className="text-xs text-red-500">{errors.stock.message}</span>
    )}
                                <Input id="amount" type="number" placeholder="100" max={100} {...register('stock')} />
                            </Field>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2" >
                            <Button type="button" variant="destructive" className="flex items-center gap-2" onClick={() => navigate('/')}>
                                <X size={16} />
                                Cancelar
                            </Button>
                            <Button type="submit" className="flex items-center gap-2">
                                <Check size={16} />
                                Salvar produto
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground">Dica: preencha todos os campos para melhor catalogação.</div>
                </CardFooter>
            </Card>
        </main>
    )
}