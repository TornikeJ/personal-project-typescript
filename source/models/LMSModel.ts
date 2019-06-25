import { SubjectsModel } from "./SubjectsModel";

export class LMSModel {
    protected mp: Map<any, any>;
    constructor() {
        this.mp = new Map();
    }

    public async add(obj: SubjectsModel) {
        return this.mp.set(obj.id, obj);
    }

    public async remove(obj: SubjectsModel) {
        if (!obj.id) {
            throw new Error("Input can\"t be found");
        }

        return (this.mp.delete(obj.id));
    }

    public async verify(obj: SubjectsModel) {
        if (this.mp.has(obj.id)) {
            return (true);
        }
        return false;
    }

    public async read(id: string) {
        return (this.mp.get(id));
    }
    public async readAll() {
        const values = this.mp.values();

        return [Array.from(values)];
    }

}