import { CategoryType } from "./Note"

export class EditDto{
    textContent: string;
    category: CategoryType;
    isArchived;
}