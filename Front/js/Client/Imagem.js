function inserirImagemEvento(id_evento) {

    var json = servidor + "/Secult/imagem/inserirImagemEvento/" + id_evento;

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


function listarCadartVisivel() {
    var json = servidor + "/Secult/cadart/listarUsuarioByVisibilidade";
    var onSuccess = function (result) {
        $("#listaCadart").empty();
        dados = result.usuario;
        if (dados[0]) {
            for (var i in dados) {

                var nome = dados[i].nome;
                var arte = dados[i].nomeArte;
                var cpf = dados[i].cpf;
                var tel = dados[i].telefone;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var projetoAtual = dados[i].projetoAtual;
                var nomeArte = dados[i].nomeArte;
                var email = dados[i].email;
                var vindoDe = "";


                urlImagem = servidor + "/Secult/cadart/find/" + cpf;


                $("#listaCadart").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + urlImagem + "\",\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'  class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\">\n" +
                    "                <img src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p>" + arte + "</p>\n" +
                    "            </a>")
            }


            ;
        }

    }
    $.getJSON(json, onSuccess).fail();
}

function getFotoPerfilCadart(cpf, id_input) {
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