import { PupilsModel } from "./PupilsModel";

export interface AddSchema {
    name: {
        first: string,
        last: string,
    };
    image: string;
    dateOfBirth: string;
    phones: Array<{
        phone: string,
        primary: boolean,
    }>;
    sex: string;
    description?: string;
    id?: string;
}

export interface AddSchemaTeacher extends AddSchema {
    emails: Array<{
        email: string,
        primary: boolean,
    }>;
    subjects: Array<{
        subject: string,
    }>;
}

export interface UpdateSchema {
    dateOfBirth?: string;
    description?: string;
    image?: string;
    name?: {
        first?: string,
        last?: string,
    };
    phones?: Array<{
        phone?: string,
        primary?: boolean,
    }>;
    sex?: string;
}

export interface UpdateSchemaTeacher extends UpdateSchema {
    emails?: Array<{
        email?: string,
        primary?: boolean,
    }>;
    subjects?: Array<{
        subject?: string,
    }>;
}

export interface RoomSchema { id: string; room: number; pupils: AddSchema[]; }
