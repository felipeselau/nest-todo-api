import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, Request } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "@prisma/client";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: any
  ): Promise<Task> {
    return await this.tasksService.create(createTaskDto, req.user.userId);
  }

  @Get()
  async findAll(@Request() req): Promise<Task[]> {
    console.log("User ID:", req.user.userId);
    return await this.tasksService.findAll(req.user.userId);
  }

  @Get("search")
  async search(
    @Query("title") title: string,
    @Request() req: any
  ): Promise<Task[] | null> {
    if (!title) {
      throw new NotFoundException("Title query parameter is required.");
    }
    const tasks = await this.tasksService.searchByTitle(title, req.user.userId);

    if (!tasks || (Array.isArray(tasks) && tasks.length === 0)) {
      throw new NotFoundException(`No tasks found with title containing "${title}".`);
    }
    return Array.isArray(tasks) ? tasks : [tasks];
  }

  @Get(":id")
  async findById(
    @Param("id") id: string,
    @Request() req: any
  ): Promise<Task | null> {
    const task = await this.tasksService.findById(id, req.user.userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  @Get("status/:completed")
  async findByCompleted(
    @Param("completed") completed: string,
    @Request() req: any
  ): Promise<Task[]> {
    const isCompleted = completed.toLowerCase() === "true";
    return await this.tasksService.findByCompleted(isCompleted, req.user.userId);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any
  ): Promise<Task> {
    const task = await this.tasksService.findById(id, req.user.userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return await this.tasksService.update(id, updateTaskDto, req.user.userId); 
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @Request() req: any
  ): Promise<Task> {
    const task = await this.tasksService.findById(id, req.user.userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return await this.tasksService.remove(id, req.user.userId);  
  }


}