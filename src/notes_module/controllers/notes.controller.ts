import { BadRequestException, Body, Controller, Get, Delete, Patch, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateDto } from '../models/CreateDto';
import { EditDto } from '../models/EditDto';
import { validateCreateDto, validateEditDto } from '../helpers/ValidateHelper';

@Controller("notes")
export class NotesController {
    constructor(private readonly noteService: NotesService) { }

    @Get()
    getAll(): string {
        return JSON.stringify(this.noteService.get());
    }

    @Get("/stats")
    getStats(): string {
        return JSON.stringify(this.noteService.getSummary());
    }

    @Get("/:id")
    getOne(@Param('id', ParseIntPipe) id: number): string {
        if (id < 1) {
            throw new BadRequestException("id must be >=1");
        }

        let resp = this.noteService.getOne(id);
        if (resp == null) {
            throw new BadRequestException(`note with id ${id} not found`);
        }
        return JSON.stringify(resp);
    }

    @Post()
    create(@Body() body: CreateDto) {
        let validate = validateCreateDto(body);
        if(validate!=null){
            throw new BadRequestException(validate);
        }

        this.noteService.createNote(body.category, body.textContent);
    }

    @Delete("/:id")
    delete(@Param('id', ParseIntPipe) id: number) {
        if (id < 1) {
            throw new BadRequestException("id must be >=1");
        }
        this.noteService.delete(id);
    }

    @Patch("/:id")
    edit(@Param('id', ParseIntPipe) id: number, @Body() body: EditDto) {
        if (id < 1) {
            throw new BadRequestException("id must be >=1");
        }

        let validate = validateEditDto(body);
        if(validate!=null){
            throw new BadRequestException(validate);
        }

        let resp = this.noteService.edit(id,body);
        if (resp == null) {
            throw new BadRequestException(`note with id ${id} not found`);
        }
    }
   
}
