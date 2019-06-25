export class SubjectsModel {
    private title: string;
    private lessons: number;
    private description: string;
    readonly id: string;
    constructor({ title, lessons, description = "" }: { title: string, lessons: number, description?: string }) {
        this.title = title;
        this.lessons = lessons;
        this.description = description;
        this.id = (Math.floor(Math.random() * 1000) + 1).toString();
    }
}
