import { Injectable } from "@nestjs/common";
import { CategoryType, Note } from "../models/Note";
import { EditDto } from "../models/EditDto";


@Injectable()
export class NotesService {
    private notes: Note[];

    constructor() {
        this.notes = [
            new Note(1, "test text content1", "Random Thought", new Date("2021-03-02")),
            new Note(2, "test text content2", "Task", new Date("2022-06-16")),
            new Note(3, "I’m gonna have a dentist appointment on the 3/12/2021, I moved it from 15/5/2021", "Task", new Date("2023-08-15")),
            new Note(4, "test text content4", "Random Thought", new Date("2022-01-25")),
            new Note(5, "test text content5", "Task", new Date("2021-03-26")),
            new Note(6, "test text content6", "Idea", new Date("2023-05-09"))
        ];
    }

    get() {
        return this.notes;
    }

    getOne(id: number) {
        for (const iterator of this.notes) {
            if (iterator.getId() == id) {
                return iterator;
            }
        }
        return null;
    }

    createNote(category: CategoryType, textContent: string) {
        this.notes.push(new Note(Math.max(...this.notes.map(x => x.getId())) + 1, textContent, category, new Date()));
    }

    delete(id: number) {
        this.notes = this.notes.filter(
            (note) => note.id !== id
        );
    }

    edit(id: number, body: EditDto) {
        for (const iterator of this.notes) {
            if (iterator.getId() == id) {
                iterator.setCategory(body.category);
                iterator.setTextContent(body.textContent);
                iterator.setIsArchived(body.isArchived);
                return "ok";
            }
        }

        return null;
    }

    getSummary() {
        let response = {
            "Idea": {
                active: 0,
                archived: 0
            },
            "Task": {
                active: 0,
                archived: 0
            },
            "Random Thought": {
                active: 0,
                archived: 0
            }
        }

        for (const iterator of this.notes) {
            response[iterator.getCategory()][iterator.isArchived?"archived":"active"]+=1;
        }

        return response;
     
    }

}