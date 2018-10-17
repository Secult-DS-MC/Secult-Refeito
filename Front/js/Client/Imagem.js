function inserirImagemEvento(id_evento) {

    var json =  servidor + "/Secult/imagem/inserirImagemEvento/" + id_evento;

    var ImageURL = localStorage.getItem("imagemSalva");

    var block = ImageURL.split(";");

    var contentType = block[0].split(":")[1];

    var realData = block[1].split(",")[1];

    var blob = b64toBlob(realData, contentType);

    var formDataToUpload = new FormData();

    formDataToUpload.append("imagem", blob);
    formDataToUpload.append("id_evento", id_evento);

    $.ajax({
        url: json,
        data: formDataToUpload,
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",

        error: function (err) {
            console.log(err);

        },

        complete: function () {
        },
    })

}

function salvaImagemImput() {

    var bannerImage = document.getElementById("imputImg");

    var img = document.getElementById("imgThumbnail");

    bannerImage.addEventListener("change", function () {

        var file = this.files[0];
        if (file.type.indexOf("image") < 0) {
            alert("arquivo invalido");
            bannerImage.value = "";
            return;
        }
        var fReader = new FileReader();
        fReader.onload = function () {
            img.onload = function () {

                localStorage.setItem("imagemSalva", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });
}
