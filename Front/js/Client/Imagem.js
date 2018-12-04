function inserirImagem(id_coluna,sigla) {

    var json = servidor + "/Secult/imagem/inserirImagem/"+id_coluna+"&"+ sigla;

    var ImageURL = localStorage.getItem("imagemSalva");
    if(ImageURL ==null) {
        ImageURL = localStorage.getItem("semfoto");

    }

    var block = ImageURL.split(";");

    var contentType = block[0].split(":")[1];

    var realData = block[1].split(",")[1];

    var blob = b64toBlob(realData, contentType);

    var formDataToUpload = new FormData();

    formDataToUpload.append("imagem", blob);
    formDataToUpload.append("id_coluna", id_coluna);
    formDataToUpload.append("sigla", sigla);

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

    var bannerImage = document.getElementById("inputImagem");

    var img = document.getElementById("imgThumbnail");
    localStorage.setItem("semfoto", toBase64String(img));
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

function getPrimeiraImagem(cpf, id_input) {
    var id = null;
    var json = servidor + "/Secult/imagem/listarImagens/" + cpf + "&C";
    var onSuccess = function (result) {
        id = result.imagens[0].id;
        var imagem = servidor + "/Secult/imagem/find/" + id
        $("#" + id_input).attr('src', imagem)
    }
    $.getJSON(json, onSuccess).fail();
}

function getFotoPerfilCadart1() {

    var id = null;
    var json = servidor + "/Secult/imagem/listarImagens/3&C";
    var onSuccess = function (result) {
        id = result.imagens[0].id
        var imagem = servidor + "/Secult/imagem/find/" + id
        $("#imgThumbnail").attr('src', imagem)
    }
    $.getJSON(json, onSuccess).fail();
}

function testee(id) {
    $.getJSON('http://localhost:8080/Secult/imagem/listarImagens/3&C', function (data) {
        return data.imagens[0].id
    });
}