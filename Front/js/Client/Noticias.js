servidor = localStorage.getItem("servidor");

function listarPublicidade() {

    $("#listaPublicidade").empty();

    var json = servidor + "/Secult/noticia/listarPublicidade";
    var onSuccess = function (result) {
        dados = result.publicidade;

        if (dados[0]) {
            for (var i in dados) {

                var id = dados[i].id;
                var origem = dados[i].origem;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&A";

                //$("#listaPublicidade").append("<ion-slide-page id='"+id+"' style=\"background:url("+ urlImagem +") no-repeat center;background-size:cover;\"></ion-slide-page>");
                //$("#listaPublicidade").append("<ion-slide-page style=\"background-repeat:no-repeat; background-position: center; background-size:cover;\"><img src='"+urlImagem+"' style=\"background-size:cover;width:calc(100% + 20px)\"></ion-slide-page>");
            }
        }
    }
    $.getJSON(json, onSuccess).fail();
}

function formatarData(dataEvento) {
    dataEvento = dataEvento.replace(/\D/g, "");
    var ano = dataEvento.slice(0, 4);
    var mes = dataEvento.slice(4, 6);
    var dia = dataEvento.slice(6, 8);
    var barra = "/";

    dt_eventoTratada = dia + barra + mes + barra + ano;

    return dt_eventoTratada;
}

function listarEventoNoticias() {
    $("#listaEventoNoticias").empty();

    carregando(1);
    var json = servidor + "/Secult/noticia/listarNoticia";
    var onSuccess = function (result) {
        dados = result.eventos;

        if (dados[0]) {

            for (var i in dados) {

                var id = dados[i].id;
                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento

                var dataCadastro = dados[i].data_cadastro;
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].id_localidade;
                var nomeEvento = dados[i].nomeEvento;
                var origem = dados[i].nome_origem;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&A";

                var dt_eventoTratada = formatarData(dataEvento);

                var descMin = descricao.slice(0, 129);
                var descMax = descricao;
                var descExibida;
                var descCompleta = false
                if (descricao.length >= 130) {
                    descExibida = descMin;
                } else {
                    descCompleta = true;
                    descExibida = descMax;
                }

                if (origem != "PUBLICIDADE") {
                    $("#listaEventoNoticas").append("<div class=\"list card manual-card-fullwidth \">\n" +
                        "            <ul class=\"item item-icon-left item-icon-right positive\">\n" +
                        "                <i class=\"icon ion-android-calendar \"></i>\n" +
                        "                <p style=\"text-align: left; padding-left: 10px; font-weight: bold; font-size: large; color: #3f83f5;\">" + titulo + "</p>\n" +
                        "                <a href='https://api.whatsapp.com/send?text=Título: " + titulo + ", Descrição: " + descricao + "' class=\"icon ion-android-share\" style='text-decoration: none'></a>\n" +
                        "            </ul>\n" +
                        "            <div class=\" item item-image \" style='border: none;'>\n" +
                        "                <img id='" + id + "' src='" + urlImagem + "' onError='this.onerror=null;this.src=\"" + urlImagem + "\"' style=\"display: block; width: 100%; height: auto; margin-left: auto; margin-right: auto;\">\n" +
                        "                <div class=\"item item-icon-left\" href=\"#\" style='text-align: left;'> <i class=\"icon ion-location\" style='opacity: 0.7'></i>" + nomeEvento + "<span class=\"item-note\"> " + dt_eventoTratada + " </span> </div>\n" +
                        "            </div>\n" +
                        "            <div id='" + id + "' style=\"text-align:left;    padding: 0px 20px;\" class=\"show-list-numbers-and-dots padding \">\n" +
                        "                <p class='desc" + id + "' style=\"display: block\" ><span style='font-weight: 600; color: #262626;'>Descrição </span> " + descExibida + "<span id='mostraDesc'>...<span id='descMin" + id + "' style='color: #787878;' onclick='lerMais(\"desc" + id + "\")'> mais</span></span></p>\n" +
                        "                <p class='desc" + id + "' style=\"display: none\" ><span style='font-weight: 600; color: #262626;'>Descrição </span> " + descMax + "<span id='mostraDesc'><span id='descMax" + id + "' style='color: #787878;' onclick='lerMais(\"desc" + id + "\")'> menos</span></span></p>\n" +
                        "            </div>\n" +
                        "        </div>");

                    $("img#" + id).attr("src", urlImagem)
                    if (descCompleta) {
                        $("#descMin" + id).remove();
                        $("#descMax" + id).remove();
                    }
                }
                // } else if (origem == "PUBLICIDADE") {
                //     $("#slidePublicidade").append("<ion-slide>" +
                //         "<img style=\"width: calc(100% + 20px); height: 100px\" src='" + urlImagem + "' onError='this.onerror=null;this.src=\"" + urlImagem + "\"'>" +
                //         "</ion-slide>\n");
                // }
            }
        }
        carregando(2);
    };
    $.getJSON(json, onSuccess).fail(
    );
}

function lerMais(id) {
    $("." + id).toggle();
}

function checarDataEvento(data) {
    if (data == "NaN") {
        return "Indefinida"
    } else {
        return data
    }
}

function preencherNoticiaInfo(d, imagem, t) {
    $("#tituloAcon").empty();
    $("#descricaoAcon").empty();
    setTimeout(function () {
        $("#imagemNoticiaInfo").attr('src', imagem);
        $("#tituloAcon").append("" + t);
        $("#descricaoAcon").append("" + d);
    }, 10)
}

function abrirImpFile(id) {
    $('#' + id).click()
}



