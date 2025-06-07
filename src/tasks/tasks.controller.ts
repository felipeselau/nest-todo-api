import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "@prisma/client";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Get(":id")
  async findById(
    @Param("id") id: string
  ): Promise<Task | null> {
    const task = await this.tasksService.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  async findByTitle(title: string): Promise<Task[] |Task | null> {
    return await this.tasksService.searchByTitle(title);
  }

  @Get("completed/:completed")
  async findByCompleted(
    @Param("completed") completed: boolean
  ): Promise<Task[]> {
    return await this.tasksService.findByCompleted(completed);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: CreateTaskDto
  ): Promise<Task> {
    const task = await this.tasksService.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return await this.tasksService.update(id, updateTaskDto); 
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string
  ): Promise<Task> {
    const task = await this.tasksService.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return await this.tasksService.remove(id);  
  }


}