export function generateLocalPaths({ files, setLocalPaths, max = 35000000 }) {
  setLocalPaths([]);
  for (let file of files) {
    if (file.size < max) {
      const reader = new FileReader();
      reader.onload = function (loadEvt) {
        setLocalPaths((p) => [
          ...p,
          {
            name: file.name.split(".")[0],
            type: file.type.split("/")[0],
            path: loadEvt.target.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  }
}
export function generatePathObjects(files) {
  let filePathObjects = [];
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function (loadEvt) {
      filePathObjects.push({
        name: file.name.split(".")[0],
        type: file.type.split("/")[0],
        path: loadEvt.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  return filePathObjects;
}

/**
 *
 * @param {*} file the chosen file for generation
 * @returns
 */
export function generateSingleFilePath({ file, setLocalFile }) {
  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    setLocalFile({
      type: file.type,
      path: loadEvent.target.result,
      size: file.size,
      name: file.name.split(".")[0],
    });
  };
  reader.readAsDataURL(file);
}

// export async function uploadFilesCld({ files, filetype, preset }) {
//   //handle upload to cloudinary      filetype[image,audio,video]          //isoskode cloudinary [dgp4vzn3m]
//   let uploaded = [];
//   for (let file of files) {
//     const imageFormdata = new FormData();
//     imageFormdata.append("upload_preset", preset);
//     imageFormdata.append("file", file);
//     const resp = await fetch(
//       `  https://api.cloudinary.com/v1_1/dgp4vzn3m/${
//         filetype || "auto"
//       }/upload`,
//       { method: "POST", body: imageFormdata }
//     );
//     const data = await resp.json();
//     uploaded.push(data);
//   }

//   return uploaded;
// }
