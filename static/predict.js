
$("#image-selector").change(function () {
   let reader = new FileReader();
    reader.onload = function () {
       let  dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
});

$("#model-selector").change(function () {
    loadModel($("#model-selector").val());
});

let model;
async function loadModel(name) {
    $(".progress-bar").show();
    model = undefined;
    model = await tf.loadGraphModel(`http://127.0.0.1:81/tfjs_files/${name}/model.json`);
    $(".progress-bar").hide();
}

$("#predict-button").click(async function () {
    y=tf.tidy(() => {
    let image = $("#selected-image").get(0);
    let x = tf.browser.fromPixels(image)
    let img=tf.image.resizeBilinear(x,[224, 224])
    .toFloat()
    .expandDims(0);

    let warmupResult =  model.predict(tf.zeros(img.shape));
    warmupResult.dataSync();
    warmupResult.dispose();

    let predictions =  model.predict(img);
    let target =Array.from(predictions.dataSync())
    let className=target[0] > 0 ? 'Covid-19' : 'Normal';
    if(className =="Covid-19"){
        document.getElementById("prediction-list").style.color = "red";
    }
    else{
        document.getElementById("prediction-list").style.color = "green";
    }
      $("#prediction-list").append(`${className}`);
  });
  
});



