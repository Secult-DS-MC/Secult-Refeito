servidor = localStorage.getItem("servidor");

function listarEventoEvento() {
    carregando(1);
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
                var dt_eventoTratada = formatarData(dataEvento);

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
                    "            <li class=\"item item-thumbnail-left item-icon-right\" style='padding-right: 45px; border: none;'><img src='" + imagem + "'>\n" +
                    "                <h2 class='positive' style='font-weight: bolder; padding-right: 5px;'>" + titulo + "\n" +
                    "                   <p class='desc"+id+"' style=\"white-space:normal; margin-top: 5px; font-weight: normal; display: block; font-size: 0.8rem;\" >" + descExibida + "<span id='mostraDesc'>...<span id='descMin" + id + "' style='color: #787878;' onclick='lerMais(\"desc"+id+"\")'> mais</span></span></p>\n" +
                    "                   <p class='desc"+id+"' style=\"white-space:normal; margin-top: 5px; font-weight: normal; display: none; font-size: 0.8rem;\" >" + descMax + "<span id='mostraDesc'><span id='descMax" + id + "' style='color: #787878;' onclick='lerMais(\"desc"+id+"\")'> menos</span></span></p>\n" +
                    "                </h2>\n" +
                    "                <div class=\"tabs-icon-top icon positive\"><div class=\"tab-item\" style='position: relative; top: 25px; height: 20px;'>" + horaEvento + "</div><i style='position: absolute; right: 0px!important;' class=\"icon ion-android-time\"></i></div>\n" +
                    "            </li>\n" +
                    "        </a>\n" +
                    "        <li class=\"item\" style=\"color: gray; padding: 0; margin: 0; zoom: 0.80; border: none;\">\n" +
                    "            <div style=\"display: flex;\">\n" +
                    "                <a style='max-width: none;' class=\"tab-item\"><i class=\"icon ion-ios-location\"></i><span class=\"tab-title\">" + nomeLocalidade + "</span></a>\n" +
                    "                <a style='max-width: none;' class=\"tab-item\"><i class=\"icon ion-android-calendar\"></i><span class=\"tab-title\">" + dt_eventoTratada + "</span></a>\n" +
                    "                <a style='max-width: none;' class=\"tab-item\"><i class=\"icon ion-android-locate\"></i><span class=\"tab-title\">" + localCidade + "</span></a>\n" +
                    "                <a style='max-width: none;' class=\"tab-item\" href='https://api.whatsapp.com/send?text=Título: " + titulo + ", Descrição: " + descricao + "'><i class=\"icon ion-android-share\"></i><span class=\"tab-title\">Compartilhar</span></a>\n" +
                    "            </div>\n" +
                    "        </li>\n" +
                    "        <div class=\"spacer\" style=\"height: 10px;\"></div>");

            }
        }
        carregando(2);
    };
    $.getJSON(json, onSuccess).done(
    ).fail();
}

function limparEListarEventoAdm() {
    $("#inicioListaEventoHoje").empty();
}
