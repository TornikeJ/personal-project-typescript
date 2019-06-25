import { merge } from './merge'

export class PupilsModel {
    pupilBase: Map<any, any>;
    constructor() {
        this.pupilBase = new Map();
        
    }
    async update(key:string, obj:UpdateSchema){
        // validate(this.schema, obj, false);

        if (!this.pupilBase.has(key)) {
            throw new Error('We dont have id');
        }

        const prevObject = this.pupilBase.get(key);

        const updatedPupil = merge(prevObject,obj);

        // Put fix for primary

        this.pupilBase.set(key, updatedPupil);

        console.log(updatedPupil);

        return key;
    }

    async add(obj:AddSchema){
            const id = (Math.floor(Math.random() * 1000) + 1).toString();
            this.pupilBase.set(id, obj);
            obj.id = id;      
            return obj;
    };

    async read(id:string) {
            if (!this.pupilBase.has(id)) {
                throw new Error('Input id is required');
            }
            return (this.pupilBase.get(id));
    };
    async remove(id:string) {
            if (!this.pupilBase.has(id)) {
                throw new Error('Input can\'t be found');
            }

            return (this.pupilBase.delete(id));
    };
}
