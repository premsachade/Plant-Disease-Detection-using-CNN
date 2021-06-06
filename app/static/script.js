let el = (x) => document.getElementById(x);
let upload_img = document
  .getElementById("inp_file")
  .addEventListener("change", fileChange, false);

function fileChange(e) {
  let file = e.target.files[0];
  if (file.type == "image/jpeg" || file.type == "image/png") {
    el("submit_btn").type = "submit";
    document.getElementById("inp_img").value = "";
    let reader = new FileReader();
    reader.onload = function (readerEvent) {
      let image = new Image();
      image.onload = function (imageEvent) {
        let max_size = 420;
        let w = image.width;
        let h = image.height;
        if (w > h) {
          if (w > max_size) {
            h *= max_size / w;
            w = max_size;
          }
        } else {
          if (h > max_size) {
            w *= max_size / h;
            h = max_size;
          }
        }
        let canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(image, 0, 0, w, h);
        if (file.type == "image/jpeg") {
          var dataURL = canvas.toDataURL("image/jpeg", 0.8);
          if (adjustImageFileSize(dataURL) > 1) {
            dataURL = canvas.toDataURL("image/jpeg", 0.5);
          }
        } else {
          var dataURL = canvas.toDataURL("image/png", 0.8);
          if (adjustImageFileSize(dataURL) > 1) {
            dataURL = canvas.toDataURL("image/png", 0.5);
          }
        }
        el("image-picked").src = dataURL;
        el("image-picked").className = "";
        data_bytes = dataURL.split(",");
        document.getElementById("inp_img").value = data_bytes[1];
        localStorage.setItem("imgData", data_bytes[1]);
        let dataImage = localStorage.getItem("imgData");
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("inp_file").value = "";
    alert("Please select image only in JPG or PNG format");
  }
}

function adjustImageFileSize(imageDataURL) {
  let file = dataURLtoBlob(imageDataURL);
  let size = file.size;
  let sizeKB = size / 1000;
  let sizeMB = size / 1000000;
  return sizeMB;
}

function dataURLtoBlob(dataURL) {
  let imageType = dataURL.split(",")[0];
  let binary = atob(dataURL.split(",")[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  if (imageType.indexOf("jpeg") >= 0) {
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  } else {
    return new Blob([new Uint8Array(array)], { type: "image/png" });
  }
}

$("form#analysis-form").submit(function (event) {
  document.getElementById("result_text").style.display = "block";
  event.preventDefault();

  let analyze_button = $("#submit_btn");
  let imagefile = $("#inp_file")[0].files;

  analyze_button.html("Analyzing..");
  analyze_button.prop("disabled", "true");

  let fd = new FormData();
  fd.append("file", imagefile[0]);
  let loc = window.location;

  $.ajax({
    method: "POST",
    async: true,
    url: loc.protocol + "//" + loc.hostname + ":" + loc.port + "/analyze",
    data: fd,
    processData: false,
    contentType: false,
  })
    .done(function (data) {
      $("#predicted_result").html(data.result);
    })
    .fail(function (e) {
      console.log(e);
    });

  analyze_button.prop("disabled", "");
  analyze_button.html("Upload & Analyze Image");
});
