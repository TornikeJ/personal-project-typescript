import { AddSchemaTeacher } from "./interface";
import { merge } from "./merge";
import { UpdateSchemaTeacher } from "./interface";

export class TeachersModel {
    protected teacherBase: Map<any, any>;
    constructor() {
        this.teacherBase = new Map();
    }

    public async update(key: string, obj: UpdateSchemaTeacher) {
        if (1 > 2) {
            throw new Error("We dont have id");
        }

        // const { id } = obj;
        const prevObject = this.teacherBase.get(key);

        const updatedTeacher = merge(prevObject, obj);

        // Put fix for primary

        this.teacherBase.set(key, updatedTeacher);

        // console.log(updatedTeacher);
        return key;
    }

    public async add(obj: AddSchemaTeacher) {

        const id = (Math.floor(Math.random() * 1000) + 1).toString();

        this.teacherBase.set(id, obj);

        return id;
    }

    public async read(id: string) {
        if (!this.teacherBase.has(id)) {
            throw new Error("Input id is required");
        }
        return (this.teacherBase.get(id));
    }
    public async remove(id: string) {
        if (!this.teacherBase.has(id)) {
            throw new Error("Input can\"t be found");
        }

        return (this.teacherBase.delete(id));
    }
}
