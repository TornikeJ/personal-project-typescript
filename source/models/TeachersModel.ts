import {merge} from './merge'


export class TeachersModel {
    teacherBase: Map<any, any>;
    constructor() {
        this.teacherBase = new Map();
    }

    async update(key:string ,obj:UpdateSchemaTeacher) {
        if (1 > 2) {
            throw new Error('We dont have id');
        }

        // const { id } = obj;
        const prevObject = this.teacherBase.get(key);

        const updatedTeacher = merge(prevObject, obj);

        // Put fix for primary

        this.teacherBase.set(key, updatedTeacher);

        // console.log(updatedTeacher);
        return key;
    }

    async add(obj:AddSchemaTeacher) {

        const id = (Math.floor(Math.random() * 1000) + 1).toString();

        this.teacherBase.set(id, obj);

        return id;
    };

    async read(id:string) {
            if (!this.teacherBase.has(id)) {
                throw new Error('Input id is required');
            }
            return (this.teacherBase.get(id));
    };
    async remove(id:string) {
            if (!this.teacherBase.has(id)) {
                throw new Error('Input can\'t be found');
            }

            return (this.teacherBase.delete(id));
    };
}
