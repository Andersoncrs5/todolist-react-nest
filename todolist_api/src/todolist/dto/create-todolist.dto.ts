import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

export class CreateTodolistDto {
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  @MaxLength(100, { message: 'O título não pode ter mais de 100 caracteres.' })
  @ApiProperty({ example: "" })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @MaxLength(500, { message: 'A descrição não pode ter mais de 500 caracteres.' })
  @ApiProperty({ example: "" })
  description: string;
}
