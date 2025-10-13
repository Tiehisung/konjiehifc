export const downloadFile = (url: string | URL | Request, filename: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Downloaded");
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
