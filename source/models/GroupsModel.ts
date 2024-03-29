import { merge } from "./merge";
import { PupilsModel } from "./PupilsModel";
import { RoomSchema, AddSchema } from "./interface";

interface UpdateSchema { id?: string; room?: number; pupils?: PupilsModel[]; }

export class GroupsModel {
    protected groupsBase: Map<string, RoomSchema>;
    constructor() {
        this.groupsBase = new Map();
    }

    public async update(key: string, obj: UpdateSchema) {
        if (!this.groupsBase.has(key)) {
            throw new Error("We dont have id");
        }
        const prevObject = this.groupsBase.get(key);

        const updatedGroup = merge(prevObject, obj);

        return updatedGroup;

    }

    public async add(room: number) {

        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        // let group = Object.create(Object.prototype, {
        //     id: {
        //         enumerable: true,
        //         value: id,
        //     },
        //     pupils: {
        //         enumerable: true,
        //         Value: Array<PupilsModel>{},
        //         writable: true,
        //     },
        //     room: {
        //         enumerable: true,
        //         value: room,
        //         writable: true,
        //     },
        // });
        const pupils: [] = [];

        let group: RoomSchema = {
            id,
            pupils,
            room
        };
        this.groupsBase.set(id, group);
        return group.id;
    }

    public async addPupil(groupId: string, pupil: AddSchema) {
        if (!this.groupsBase.has(groupId)) {
            throw new Error("ID not found in base");
        }

        if(!this.groupsBase)
        {
            throw new Error('error');
        }
        if(this.groupsBase.get(groupId))
        {
            throw new Error('error');
        }
        
        return this.groupsBase.get(groupId).pupils.push(pupil);
    }

    public async read(id: string) {
        if (!this.groupsBase.has(id)) {
            throw new Error("Input id is required");
        }
        return (this.groupsBase.get(id));
    }

    public async removePupil(groupId: string, pupilId: string) {
        if (!this.groupsBase.has(groupId)) {
            throw new Error("Input can\"t be found");
        }

        for (let i = 0; i < this.groupsBase.get(groupId).pupils.length; i++) {
            if (this.groupsBase.get(groupId).pupils[i].id === pupilId) {
                const base = this.groupsBase.get(groupId).pupils;
                const target = this.groupsBase.get(groupId).pupils.indexOf(this.groupsBase.get(groupId).pupils[i]);
                return (base.splice(target, 1));
            }
        }
    }

    public async readAll() {
        const values = this.groupsBase.values();

        return [Array.from(values)];
    }
}
