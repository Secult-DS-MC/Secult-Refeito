servidor = localStorage.getItem("servidor");

function listarEventoEvento() {
    var tres = 2;
    var res;

    $("#listaEventoEvento").empty();
    var json = servidor + "/Secult/evento/listarEvento";

    var onSuccess = function (result) {

        dados = result.eventos;

        if (dados[0]) {

            for (var i in dados) {
                var id = dados[i].id;
                var imagem = servidor + "/Secult/imagem/findETC/"+id+"&A"

                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var nomeLocalidade = dados[i].nomeLocalidade;
                var localCidade = dados[i].localCidade;


                $("#listaEventoEvento").append("<a ui-sref='informacoesNoticias' class='linkSemDecoracao' onclick='abrirPage(this),preencherEventoInfo(\""+descricao+'","'+ imagem +'","'+ titulo+"\")'><li class=\"item item-thumbnail-left item-icon-right balanced\">\n" +
                    "        <img src='" + imagem + "'>\n" +
                    "        <h2 class='positive' style='font-weight: bolder' >" + titulo + "\n" +
                    "          <p style=\"white-space:normal; margin-top: 5px; font-weight: normal\">" + descricao.substring(0, 47) + "...</p>\n" +
                    "          <i class=\"icon ion-android-share\"></i>\n" +
                    "        </h2>\n" +
                    "      </li>\n" +
                    "      <li class=\"item item-icon-left \">\n" +
                    "        <i class=\"icon ion-location assertive\"></i> "+nomeLocalidade +"\n" +
                    "        <span class=\"item-note\">Na " + localCidade + " as "+horaEvento+"</span>\n" +
                    "      </li><div class=\"spacer\" style=\"height: 5px;\"></div></a>");


                if (i == tres) {
                    tres = tres + 3;
                    $("#listaEventoHoje").append("    <span style='display: none'><div class=\"spacer\" style=\"height: 4px;\"></div>\n" +
                        "    <div>\n" +
                        "      <img src=\"img/sEbQCcVzT22AyiWd4w0I_WhatsAppImage2018-07-31at13.51.371.jpeg\" style=\"display:block;width:100%;height:50px;\">\n" +
                        "    </div>\n" +
                        "    <div class=\"spacer\" style=\"height: 5px;\"></div></span>\n");
                }
            }
        }
    };
    $.getJSON(json, onSuccess).fail(

    );
}

function abrirPage(el) {
    $(el).attr("ui-sref","informacoesNoticias")

}

function preencherEventoInfo(d,img,t) {

    $("#titloNoticia").empty();
    $("#descricaoNoticia").empty();
    setTimeout(function () {
        $("#imagemNoticiaInfo").attr("src", img);
        $("#titloNoticia").append(""+t);
        $("#descricaoNoticia").append(""+d);

    },100)
}

function limparEListarEventoAdm() {

    $("#inicioListaEventoHoje").empty();
    listarEventoAdm();


}

//////////////////FOTO EVENTO///////////////////
//////////////////FOTO EVENTO///////////////////

function inserirFotoEvento(id, sigla) {
    var json =  servidor + "/Secult/imagem/inserirImagem/" + id+"&"+sigla;

    var ImageURL = localStorage.getItem("fotoCadastroEvento");

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
    var bannerImage = document.getElementById("inputImagemEventoCdt");

    var img = document.getElementById("tableBannerEventoCdt");

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
