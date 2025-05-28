import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	UseGuards,
	Request
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '@app/guards/jwt.auth.guards';
import { RoleGuards } from '@app/guards/role.guards';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/constants/role.constants';

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@UseGuards(JwtAuthGuard, RoleGuards)
	@Roles(Role.User)
	@Post()
	create(@Body() createTodoDto: CreateTodoDto, @Request() req: any): Promise<any> {
		const userId = req.user.id;
		return this.todoService.create(createTodoDto, userId);
	}

	@UseGuards(JwtAuthGuard, RoleGuards)
	@Roles(Role.User)
	@Get()
	findAll(@Request() req: any): Promise<any> {
		const userId = req.user.id;
		return this.todoService.findAll(userId);
	}

	@UseGuards(JwtAuthGuard, RoleGuards)
	@Roles(Role.User)
	@Patch(':id')
	update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
		return this.todoService.update(id, updateTodoDto);
	}

	@UseGuards(JwtAuthGuard, RoleGuards)
	@Roles(Role.User)
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.todoService.remove(id);
	}

	@UseGuards(JwtAuthGuard, RoleGuards)
	@Roles(Role.Admin)
	@Get('admin/data')
	getAdminData() {
		return this.todoService.getAdminData();
	}
}
