import { CreateDto } from "../models/CreateDto";
import { EditDto } from "../models/EditDto";

export function validateCreateDto(body: CreateDto) {
    if (body.textContent.length < 3 || body.textContent.length > 2000) {
        return "note content must be (3 < x < 2000) characters";
    }
    if (body.category == "Idea" || body.category == "Task" || body.category == "Random Thought") {
        return null;
    }
    return "category invalid value";
}

export function validateEditDto(body: EditDto) {
    if (body.textContent.length < 3 || body.textContent.length > 2000) {
        return "note content must be (3 < x < 2000) characters";
    }
    if (body.isArchived != "true" && body.isArchived != "false") {
        return "isArchived property invalid"
    }
    if (body.category == "Idea" || body.category == "Task" || body.category == "Random Thought") {
        return null;
    }
    return "category invalid value";
}