import { PupilsModel } from "./PupilsModel";

interface AddSchema {
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

interface AddSchemaTeacher extends AddSchema {
    emails: Array<{
        email: string,
        primary: boolean,
    }>;
    subjects: Array<{
        subject: string,
    }>;
}

interface UpdateSchema {
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

interface UpdateSchemaTeacher extends UpdateSchema {
    emails?: Array<{
        email?: string,
        primary?: boolean,
    }>;
    subjects?: Array<{
        subject?: string,
    }>;
}

interface RoomSchema { id: string; room: number; pupils: AddSchema[]; }
