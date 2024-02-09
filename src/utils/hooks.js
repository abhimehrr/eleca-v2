export const useGenerateImage = (e) => {
  var file = e.target.files[0];

  var reader = new FileReader();
  reader.readAsDataURL(file);

  return reader.onload = (e) => {
    var img = document.createElement("img");
    img.src = e.target.result;

    return img.onload = (e) => {
      var canvas = document.createElement("canvas");

      var Width = 720;
      canvas.width = Width;
      canvas.height = e.target.height * (Width / e.target.width);

      var context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      var imgUrl = context.canvas.toDataURL();
      var newFile = urlToImage(imgUrl);

      return { dataURL: imgUrl, file: newFile, fileName: newFile.name };
    };
};
};

// Get Image File from URL
export const urlToImage = (url) => {
  var [type, data] = url.split(",");
  type = type.match(/:(.*?);/)[1];

  var dataStr = atob(data);
  var n = dataStr.length;
  var dataArr = new Uint8Array(n);

  while (n--) {
    dataArr[n] = dataStr.charCodeAt(n);
  }

  var file = new File([dataArr], Date.now() + ".png", { type });
  return file;
};
