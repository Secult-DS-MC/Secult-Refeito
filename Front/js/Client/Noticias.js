servidor = localStorage.getItem("servidor");

function listarEventoNoticias() {
    carregando(1)

    $("#listaEventoNoticias").empty();

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
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id+"&A";
                console.log(urlImagem)

                dataEvento = dataEvento.replace(/\D/g, "");
                var ano = dataEvento.slice(0, 4);
                var mes = dataEvento.slice(4, 6);
                var dia = dataEvento.slice(6, 8);
                var barra = "/";
                dt_eventoTratada = dia + barra + mes + barra + ano;
                var descMin = descricao.slice(0,129);
                var descMax = descricao;
                var descExibida;
                var descCompleta =false
                if(descricao.length >= 130){
                    descExibida=descMin;
                }else{
                    descCompleta=true;
                    descExibida=descMax;
                }

                $("#listaEventoNoticas").append("  " +
                    "        <div class=\"list card manual-card-fullwidth \" style='padding-top: 0px;box-shadow: 0 0 0; border-width: 1px 0px 1px 0px; border-style: groove;'>\n" +
                    "            <ul class=\"item item-icon-left item-icon-right positive\">\n" +
                    "                <i class=\"icon ion-android-calendar \"></i>\n" +
                    "                <p style=\"text-align: left; padding-left: 10px; font-weight: bold; font-size: large; color: #3f83f5;\">" + titulo + "</p>\n" +
                    "                <a href='https://api.whatsapp.com/send?text=Título: "+titulo+", Descrição: "+descricao+"' class=\"icon ion-android-share\" style='text-decoration: none'></a>\n" +
                    "            </ul>\n" +
                    "            <div class=\" item item-image \" style='border: none;'>\n" +
                    "                <img id='" + id + "' src='"+urlImagem+"' onError='this.onerror=null;this.src=\""+urlImagem+"\"' style=\"display: block; width: 100%; height: auto; margin-left: auto; margin-right: auto;\">\n" +
                    "                <div class=\"item item-icon-left\" href=\"#\" style='text-align: left;'> <i class=\"icon ion-location assertive\"></i>" + nomeEvento + "<span class=\"item-note\"> " + dt_eventoTratada + " </span> </div>\n" +
                    "            </div>\n" +
                    "            <div id='" + id + "' style=\"text-align:left; text-indent: 10px;\" class=\"show-list-numbers-and-dots padding \">\n" +
                    "                <p class='desc' style=\"margin-top:0px;color:#000000; display: block\" >" +descExibida + "<span id='mostraDesc'>...<span id='descMin"+id+"' style='color: #787878;' onclick='lerMais()'> mais</span></span></p>\n" +
                    "                <p class='desc' style=\"margin-top:0px;color:#000000; display: none\" >" +descMax + "<span id='mostraDesc'>...<span id='descMax"+id+"' style='color: #787878;' onclick='lerMais()'> menos</span></span></p>\n" +
                    "            </div>\n" +
                    "        </div>");

                $("img#" + id).attr("src", urlImagem)
                if(descCompleta){
                    $("#descMin" + id).remove();
                    $("#descMax" + id).remove();
                }

            }
        }
        carregando(2)
    };
    $.getJSON(json, onSuccess).fail(
    );

}

function checarDataEvento(data) {
    if (data == "NaN") {
        return "Indefinida"
    } else {
        return data
    }
}

function lerMais() {
    $(".desc").slideToggle();
    $('ion-content, body').animate({scrollTop:0}, 'slow');
}


function preencherNoticiaInfo(d, imagem, t) {
    $("#titloNoticia").empty();
    $("#descricaoNoticia").empty();
    setTimeout(function () {
        $("#imagemNoticiaInfo").attr('src', imagem);
        $("#titloNoticia").append("" + t);
        $("#descricaoNoticia").append("" + d);

    }, 10)
}

function abrirImpFile(id) {
    $('#' + id).click()
}



