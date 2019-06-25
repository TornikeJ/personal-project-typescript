import {
  GradebooksModel,
  GroupsModel,
  LMSModel,
  PupilsModel,
  SubjectsModel,
  TeachersModel,
} from "./models";

const history = new SubjectsModel({
  lessons: 24,
  title: "History",
});

// const math = new SubjectsModel({
//   title: "math",
//   lessons: 24
// });

// const literature = new SubjectsModel({
//     title: "Literature",
//     lessons: 23
//   });

console.log(history.id);
// console.log(literature); EXTRA

const lms = new LMSModel();

(async () => {
  await lms.remove(history);
  await lms.add(history);
  console.log(await lms.verify(history));
  console.log(await lms.readAll());
})();

// Create new Teacher from Teacher"s data

const data = {
  dateOfBirth: "string", // format date
  description: "string",
  emails: [
    {
      email: "string",
      primary: true,
    },
  ],
  image: "image",
  name: {
    first: "Jon",
    last: "Doe",
  },
  phones: [
    {
      phone: "string",
      primary: true,
    },
  ],
  sex: "male", // male or female
  subjects: [
    {
      subject: "string",
    },
  ],

};

// // will return Teacher"s id

// // will return Teachers data including teacher"s id

(async () => {
  const teachers = new TeachersModel();
  const teacherId = await teachers.add(data);
  console.log(await teachers.read(teacherId));
  console.log(await teachers.update(teacherId,
    {
      emails: [
        {
          email: "5",
          primary: true,
        },
        {
          email: "6",
          primary: true,
        },
      ],
      name: {
        first: "john",
      },
      phones: [
        {
          phone: "5",
        },
      ],
      sex: "female",
    },
  ));
  console.log(await teachers.read(teacherId));
  //     // await teachers.remove(teacherId);

  const pupilData = {
    dateOfBirth: "string", // format date
    description: "string",
    image: "string",
    name: {
      first: "string",
      last: "string",
    },
    phones: [
      {
        phone: "string",
        primary: true,
      },
    ],
    sex: "string", // male OR female
  };

  const pupils = new PupilsModel();

  // // Create a new pupil

  // // will return Pupils data including pupil"s id

  const room = 236;
  const groups = new GroupsModel();

  const pupil = await pupils.add(pupilData);
  console.log(await pupil.id);
  //   console.log(await pupils.read(await pupil.id));
  //   console.log(await pupils.update(pupil.id,
  //     {
  //       "name": {
  //         "first":"john"
  //       },
  //       "sex":"female",
  //       "phones":[
  //         {
  //           "phone": "5",
  //         }
  //       ]
  //     }
  //     ));
  //     // await teachers.remove(pupil.id);

  // Create a new group
  const groupId = await groups.add(room);

  // Remove this pupil from this group

  // Add this pupil to this group
  await groups.addPupil(groupId, pupil);

  // await groups.removePupil(groupId, pupil.id);

  // Update room for this group
  await groups.update(groupId, {
    room: 237,
  });

  // Read information about group
  // console.log(await groups.read(groupId));

  // It will return array of groups
  console.log(await groups.readAll());

  if (!pupil.id) {
    throw new Error("Pupil id hasn't been found");
  }
  const pupilId: string = pupil.id;
  // const teacherId = teacherId;
  const gradebooks = new GradebooksModel(groups, teachers, lms);

  // Create a new gradebook
  const level = 1;
  const gradebookId = await gradebooks.add(level, groupId);

  // // Destroy all data inside this gradebook
  // // gradebooks.clear();

  const record = {
    lesson: 1,
    mark: 9,
    pupilId,
    subjectId: history.id,
    teacherId,
  };

  await gradebooks.addRecord(gradebookId, record);

  // // Read information about oliver results
  const oliver = await gradebooks.read(gradebookId, pupilId);

  console.log(oliver);

  // // Read information about all students in this gradebook
  // const students = gradebooks.readAll(gradebookId); // It will return the array of objects

})();
