import { IsInt, isInt, IsNotEmpty, IsNumber, isNumber, IsString, Max, MaxLength, Min } from 'class-validator'
export class CreateProductDto {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    description: string;

    @Min(1)
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    categoryId: number;

    @Min(0)
    @Max(100)
    @IsInt()
    @IsNotEmpty()
    stock: number;

}
