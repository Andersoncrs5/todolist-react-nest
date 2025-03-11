import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post()
  @ApiBody({ type: UpdateTodolistDto })
  async create(@Body() createTodolistDto: CreateTodolistDto) {
    return await this.todolistService.createAsync(createTodolistDto);
  }

  @Get()
  async findAll() {
    return await this.todolistService.findAllAsync();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todolistService.findOneAsync(+id);
  }

  @Put('/update/:id')
  @ApiBody({ type: UpdateTodolistDto })
  async update(@Param('id') id: string, @Body() updateTodolistDto: UpdateTodolistDto) {
    return await this.todolistService.updateAsync(+id, updateTodolistDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.todolistService.removeAsync(+id);
  }

  @Get('/changeStatusTaskAsync/:id')
  async changeStatusTask(@Param('id') id: string) {
    return await this.todolistService.changeStatusTaskAsync(+id);
  }

  
}
