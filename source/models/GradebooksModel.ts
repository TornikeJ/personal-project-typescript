import { GroupsModel } from "./GroupsModel";
import { LMSModel } from "./LMSModel";
import { PupilsModel } from "./PupilsModel";
import { TeachersModel } from "./TeachersModel";
export class GradebooksModel {
    protected database: Map<string, object>;
    constructor(groups: GroupsModel, teachers: TeachersModel, lms: LMSModel) {
        this.database = new Map();

        this.database.set("groups", groups);
        this.database.set("teachers", teachers);
        this.database.set("lms", lms);
        this.database.set("gradebooks", new Map());

        // this.schema = {
        //     pupilId: "pupilId",
        //     teacherId: "teacherId",
        //     subjectId: "history.id",
        //     lesson: 1,
        //     mark: 9
        // };
    }

    public async add(level: number, groupId: string) {
        const id = String(Math.floor(Math.random() * new Date().getTime()));
        const gradebook = Object.create(Object.prototype, {
            groupId: {
                enumerable: true,
                value: groupId,
                writable: true,
            },
            id: {
                enumerable: true,
                value: id,
            },
            level: {
                enumerable: true,
                value: level,
                writable: true,
            },
            records: {
                value: [],
            },
        });
        const gradebooks = this.database.get("gradebooks");

        gradebooks.set(id, gradebook);
        return id;
    }

    public async clear() {
        const gradebooks = this.database.get("gradebooks");
        return (gradebooks.clear());
    }

    public async addRecord(gradebookId: string, record: object) {

        const gradebooks = this.database.get("gradebooks");
        const currentGradebook = gradebooks.get(gradebookId);

        return currentGradebook.records.push(record);

    }

    public async read(gradebookId: string, pupilId: string) {
        if (typeof gradebookId !== "string") {
            throw new Error("gradebookId should be a string");
        }
        if (typeof pupilId !== "string") {
            throw new Error("pupilId should be a string");
        }

        const groupsInstanse = this.database.get("groups");
        const groups = await groupsInstanse.readAll();
        let pupil: AddSchema;
        groups.forEach((group: roomSchema) => {
            const currentGroup = group;
            const pupils = currentGroup.pupils;

            console.log(currentGroup);

            // pupil = this._findPupil(pupils, pupilId);
        });
        const gradebooks = this.database.get("gradebooks");
        const currentGradebook = gradebooks.get(gradebookId);
        const recordsDateBase = currentGradebook.records;

        const updatedRecords = [];

        for (const record of recordsDateBase) {
            const { teacherId, subjectId, lesson, mark } = record;
            const teachers = this.database.get("teachers");
            const lms = this.database.get("lms");
            const { name: { first, last } } = await teachers.read(teacherId);
            const { title } = await lms.read(subjectId);

            updatedRecords.push({
                lesson,
                mark,
                subject: title,
                teacher: `${first} ${last}`,
            });
        }

        return {
            // name: `${pupil.name.first} ${pupil.name.last}`,
            records: updatedRecords,
        };
    }

    public async readAll(gradebookId: string) {
        return ([...this.database.get("gradebooks").values()]);
    }

    private _findPupil(pupils: [], pupilId: string) {
        return pupils.find((pupil) => {
            return pupil.id === pupilId;
        });
    }

    private _findTeacher(teachers: TeachersModel[], teacherId: string) {
        return teachers.find((teacher) => teacher.id === teacherId);
    }
}
