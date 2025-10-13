// Populate students marks

const classes = await ClassModel.find({});
for (let clas of classes) {
  let students = clas.students;
  for (let student of students) {
    let subjects = student.academics.terms[0].subjects;
    subjects.forEach((sub) => {
      sub.total =
        sub.tests[0].score +
        sub.tests[1].score +
        sub.tests[2].score +
        sub.examination.score;
      console.log(sub.name, sub.total);
    });
  }

  clas.students = students;
  await ClassModel.updateOne(
    { name: clas.name },
    { $set: { students: students } }
  );
}


