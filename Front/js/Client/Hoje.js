function listarEventoHoje() {
    var tres = 2;
    var res;
    var json = servidor + "/Secult/evento/listarEventoPequeno";

    var onSuccess = function (result) {

        dados = result.eventos;

        if (dados[0]) {

            for (var i in dados) {

                var id = dados[i].id;
                var imagem = servidor + "/Secult/evento/find/"+id;

                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento

                var dataCadastro = dados[i].data_cadastro;
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].id_localidade;
                var localCidade = dados[i].localCidade;

            //<a href='#/page21' class='linkSemDecoracao' onclick='preencherEventoNoticiaInfo(\""+descricao+'","'+ titulo+"\")'>

                $("#listaEventoHoje").append("<a href='#/page21'  class='linkSemDecoracao' onclick='preencherEventoInfo(\""+descricao+'","'+ imagem +'","'+ titulo+"\")'><li class=\"item item-thumbnail-left item-icon-right balanced\">\n" +
                    "        <img src='" + imagem + "'>\n" +
                    "        <h2 class='positive' style='font-weight: bolder' >" + titulo + "\n" +
                    "          <p style=\"white-space:normal; margin-top: 5px; font-weight: normal\">" + descricao.substring(0, 47) + "...</p>\n" +
                    "          <i class=\"icon ion-android-share\"></i>\n" +
                    "        </h2>\n" +
                    "      </li>\n" +
                    "      <li class=\"item item-icon-left \">\n" +
                    "        <i class=\"icon ion-location assertive\"></i> "+localCidade +"\n" +
                    "        <span class=\"item-note\">" + horaEvento + "</span>\n" +
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
function preencherEventoInfo(d,img,t) {

    $("#titloNoticia").empty();
    $("#descricaoNoticia").empty();
    setTimeout(function () {
        $("#imagemNoticiaInfo").attr("src", img);
        $("#titloNoticia").append(""+t);
        $("#descricaoNoticia").append(""+d);

    },10)
}