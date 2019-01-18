servidor = localStorage.getItem("servidor");

function listarEventoEvento() {
    carregando(2);
    $("#listaEventoEvento").empty();
    var json = servidor + "/Secult/evento/listarEvento";

    var onSuccess = function (result) {

        dados = result.eventos;

        if (dados[0]) {

            for (var i in dados) {
                var id = dados[i].id;
                var imagem = servidor + "/Secult/imagem/findETC/" + id + "&A"

                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var nomeLocalidade = dados[i].nomeLocalidade;
                var localCidade = dados[i].localCidade;

                var descMin = descricao.slice(0, 60);
                var descMax = descricao.slice(0, 191);
                var descExibida;
                var descCompleta = false
                if (descricao.length >= 61) {
                    descExibida = descMin;
                } else {
                    descCompleta = true;
                    descExibida = descMax;
                }


                $("#listaEventoEvento").append("<a class='linkSemDecoracao'>\n" +
                    "            <li class=\"item item-thumbnail-left item-icon-right\" style='padding-right: 45px; border-bottom: none;'><img src='" + imagem + "'>\n" +
                    "                <h2 class='positive' style='font-weight: bolder; padding-right: 5px;'>" + titulo + "\n" +
                    "                   <p class='desc"+id+"' style=\"white-space:normal; margin-top: 5px; font-weight: normal; display: block; font-size: 0.8rem;\" >" + descExibida + "<span id='mostraDesc'>...<span id='descMin" + id + "' style='color: #787878;' onclick='lerMais(\"desc"+id+"\")'> mais</span></span></p>\n" +
                    "                   <p class='desc"+id+"' style=\"white-space:normal; margin-top: 5px; font-weight: normal; display: none; font-size: 0.8rem;\" >" + descMax + "<span id='mostraDesc'><span id='descMax" + id + "' style='color: #787878;' onclick='lerMais(\"desc"+id+"\")'> menos</span></span></p>\n" +
                    "                </h2>\n" +
                    "                <div class=\"tabs-icon-top icon positive\"><div class=\"tab-item\" style='position: relative; top: 25px; height: 20px;'>" + horaEvento + "</div><i style='position: absolute; right: 0px!important;' class=\"icon ion-android-time\"></i></div>\n" +
                    "            </li>\n" +
                    "        </a>\n" +
                    "        <li class=\"item\" style=\"color:gray; padding: 0; margin: 0; zoom: 0.80;\">\n" +
                    "            <div style=\"display: flex;\">\n" +
                    "                <a style='max-width: none;' class=\"tab-item assertive\"><i class=\"icon ion-location\"></i><span class=\"tab-title\">" + nomeLocalidade + "</span></a>\n" +
                    "                <a style='max-width: none;' class=\"tab-item dark\"><i class=\"icon ion-android-locate\"></i><span class=\"tab-title\">" + localCidade + "</span></a>\n" +
                    "                <a style='max-width: none;' class=\"tab-item balanced\" href='https://api.whatsapp.com/send?text=Título: " + titulo + ", Descrição: " + descricao + "'><i class=\"icon ion-android-share\"></i><span class=\"tab-title\">Compartilhar</span></a>\n" +
                    "            </div>\n" +
                    "        </li>\n" +
                    "        <div class=\"spacer\" style=\"height: 10px;\"></div>");

                // $("#listaEventoEvento").append("<a ui-sref='informacoesNoticias' class='linkSemDecoracao' onclick='abrirPage(this),preencherEventoInfo(\""+descricao+'","'+ imagem +'","'+ titulo+"\")'>" +
                //     "      <li class=\"item item-thumbnail-left item-icon-right balanced\" style='border-bottom: none;'>\n" +
                //     "        <img src='" + imagem + "'>\n" +
                //     "        <h2 class='positive' style='font-weight: bolder' >" + titulo + "\n" +
                //     "          <p style=\"white-space:normal; margin-top: 5px; font-weight: normal\">" + descricao.substring(0, 47) + "...</p>\n" +
                //     "          <i class=\"icon ion-android-share\" href='https://api.whatsapp.com/send?text=Título: "+titulo+", Descrição: "+descricao+"'></i>\n" +
                //     "        </h2>\n" +
                //     "      </li>\n" +
                //     "      <li class=\"item item-icon-left \" style='border-top: none;'>\n" +
                //     "        <i class=\"icon ion-location assertive\"></i> "+nomeLocalidade +"\n" +
                //     "        <span class=\"item-note\">Na " + localCidade + " as "+horaEvento+"</span>\n" +
                //     "      </li><div class=\"spacer\" style=\"height: 5px;\"></div></a>");


            }
        }
    };
    $.getJSON(json, onSuccess).done(
        carregando(2)
    ).fail(

    );
}

// function preencherEventoInfo(d, img, t) {
//
//     $("#tituloAcon").empty();
//     $("#descricaoAcon").empty();
//     setTimeout(function () {
//         $("#imagemAcon").attr("src", img);
//         $("#tituloAcon").append(t);
//         $("#descricaoAcon").append(d);
//     }, 100)
// }

function limparEListarEventoAdm() {
    $("#inicioListaEventoHoje").empty();
    listarEventoAdm();
}

//////////////////FOTO EVENTO///////////////////
//////////////////FOTO EVENTO///////////////////

function inserirFotoEvento(id, sigla) {
    var json = servidor + "/Secult/imagem/inserirImagem/" + id + "&" + sigla;

    var ImageURL = localStorage.getItem("fotoCadastroEvento");
    if (localStorage.getItem("fotoCadastroEvento") == null) {
        ImageURL = ""
    }

    var block = ImageURL.split(";");

    var contentType = block[0].split(":")[1];

    var realData = block[1].split(",")[1];

    var blob = b64toBlob(realData, contentType);

    var formDataToUpload = new FormData();

    formDataToUpload.append("imagem", blob);
    formDataToUpload.append("id_coluna", id);
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
            //window.location = "#/page18";
            //location.reload();
        },
    })

}

function saveFotoEventoLS() {

    //document.getElementById("tableBannerEvento").style.display = "none";
    var bannerImage = document.getElementById("inputImagemEvento");

    var img = document.getElementById("tableBannerEvento");

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

                localStorage.setItem("fotoCadastroEvento", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });

}

function saveFotoEventoLSCdt() {

    //document.getElementById("tableBannerEvento").style.display = "none";
    var bannerImage = document.getElementById("inputImagem");

    var img = document.getElementById("tableBannerEventoCdt");
    localStorage.setItem("fotoCadastroEvento", toBase64String(img));
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

                localStorage.setItem("fotoCadastroEvento", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });

}
