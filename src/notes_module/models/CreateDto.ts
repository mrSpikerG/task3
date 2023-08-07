import { CategoryType } from "./Note"

export class CreateDto{
    textContent: string;
    category: CategoryType;
}