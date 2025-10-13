
// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const body = await request.json();
//   const { class_name, admission_number, modifiedData } = body;
//   const client = await MongoClient.connect(process.env.MDB_URI);
//   const db = client.db();
//   // Step 1: Find the Document
//   const query = { name: class_name };

//   // Step 2: Update the Array
//   const update = {
//     $set: {
//       "students.$[element]": { ...modifiedData },
//     },
//   };

//   const options = {
//     arrayFilters: [
//       { "element.admission_number": admission_number }, // Filter to match the specific object within the array
//     ],
//   };

//   try {
//     const updateStudent = await db
//       .collection("classes")
//       .updateOne(query, update, options);
//     if (!updateStudent.acknowledged) {
//       return NextResponse.json({
//         message: "Update failed! Retry later.",
//         status: false,
//       });
//     }
//     return NextResponse.json({ message: "Update successful.", status: true });
//   } catch (error) {
//     return NextResponse.json({ message: error.message, status: false });
//   } finally {
//     client.close();
//   }
// }
