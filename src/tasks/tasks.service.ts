import { Injectable } from "@nestjs/common";
import { Task } from "@prisma/client";
import { CreateTaskDto } from "./dto/create-task.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto): Promise<Task> {
    return await this.prisma.task.create({
      data,
    })
  }

  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async findById(id: string): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async searchByTitle(title: string): Promise<Task[] | Task | null>{
    if (!title) {
      return null;
    }
    return await this.prisma.task.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive', // Case-insensitive search
        },
      },
    });
  }

  async findByCompleted(completed: boolean): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { completed },
    });
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    return await this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Task> {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}