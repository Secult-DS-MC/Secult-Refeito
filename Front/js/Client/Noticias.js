
function listarEventoNoticias() {
carregando(1)
    var json = servidor + "/Secult/evento/listarEventoGrande";
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
                var nomeLocalidade = dados[i].nomeEvento;




                    $("#listaEventoNoticas").append("  <div class=\"list card manual-card-fullwidth \" style='padding-top: 0px'>\n" +
                        "            <ul class=\"item item-icon-left item-icon-right positive\">\n" +
                        "                <i class=\"icon ion-android-calendar \"></i>\n" +
                        "                <p style=\"text-align: center; font-weight: bold; font-size: large; color: #3f83f5;\">"+titulo+"</p>\n" +
                        "                <i class=\"icon ion-android-share-alt\" style='display: none'></i>\n" +
                        "            </ul>\n" +
                        "            <div class=\" item item-image \">\n" +
                        "                <img src='"+imagem+"'n" +
                        "                     style=\"display: block; width: 100%; height: auto; margin-left: auto; margin-right: auto;\">\n" +
                        "<div class=\"item item-icon-left\" href=\"#\" style='text-align: left;'> <i class=\"icon ion-location\"></i>"+nomeLocalidade+"<span class=\"item-note\"> "+dataEvento+" </span> </div>\n" +
                        "</div>\n" +
                        "            <div id='"+id+"' style=\"text-align:left; text-indent: 10px;\" class=\"show-list-numbers-and-dots padding \">\n" +
                        "                <p style=\"margin-top:0px;color:#000000;\" >"+descricao.substring(0, 130)+"...<span style='color: #787878;' onclick='lerMais(\""+id+'","'+ descricao+"\")'> mais</span></p>\n" +
                        "            </div>\n" +
                        "            <div class=\" item item-image\" style='display: none'>\n" +
                        "                <img src=\"img/semfoto.png\"\n" +
                        "                     style=\"display: block; width: 100%; height: 60px; margin-left: auto; margin-right: auto;\">\n" +
                        "            </div>\n" +
                        "        </div>");

                if (visibilidade != "" & titulo != "" & dataEvento != "" & descricao != "" & horaEvento != "" & tipo != "" & idLocalidade != "" & dataCadastro != "") {
                    $("#alert" + id).hide();
                } else {
                    $("#checked" + id).hide();
                }
            }
        }
        carregando(2)
    };
    $.getJSON(json, onSuccess).fail(
    );

}

function checarDataEvento(data) {
    if(data=="NaN"){
        return "Indefinida"
    }else{
        return data
    }
}

function lerMais(id, desc){
    $("#"+id).text("");
    $("#"+id).text(desc);
}


function preencherNoticiaInfo(d,imagem ,t) {
    $("#titloNoticia").empty();
    $("#descricaoNoticia").empty();
    setTimeout(function () {
        $("#imagemNoticiaInfo").attr('src', imagem);
        $("#titloNoticia").append(""+t);
        $("#descricaoNoticia").append(""+d);

    },10)
}

function abrirImpFile(id){
    $('#'+id).click()
}



