import { Prisma } from "@prisma/client";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto implements Prisma.TaskCreateInput {
  @IsString({message: "O título da tarefa deve ser uma string."})
  @IsNotEmpty({message: "O título não pode ser vazio."})
  title: string;

  @IsString({message: "A descrição da tarefa deve ser uma string."})
  description?: string;

  @IsBoolean({message: "O status da tarefa deve ser um booleano."})
  isDone: boolean;
}