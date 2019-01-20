// function expandir(classe, mes) {
//     var icone = $("#" + mes).children();
//
//     if (icone.hasClass("ion-plus")) {
//         icone.removeClass('ion-plus').addClass('ion-minus');
//         $('.' + classe).toggle(300);
//         diminuirMes(classe, icone);
//     } else {
//         icone.removeClass('ion-minus').addClass('ion-plus');
//         $('.' + classe).toggle(300);
//     }
// }

// function diminuirMes(classe, icone) {
//     var vazio = $("." + classe + " ion-item").children();
//     var aut = $('.' + classe).css("display");
//     if (vazio.length == "0") {
//         $('.' + classe).children().css("opacity", "1");
//         $("p#" + classe).css({"display": "block", "font-size": "13px"});
//         if (aut == "inline-block") {
//             setTimeout(function () {
//                 icone.removeClass('ion-minus').addClass('ion-plus');
//                 $('.' + classe).children().css({"opacity": "0", "transition": "visibility 0s, opacity 0.5s linear"});
//                 setTimeout(function () {
//                     $('.' + classe).css("display", "none");
//                 }, 200);
//             }, 3000);
//         }
//     }
// }

function listarEventosCalendario(idMes, mesClick) {
    window.location.href="#/page1/page21";

    setTimeout(function () {
        $("#page21 .title").append(mesClick);
    }, 100);

    carregando(1)

    var json = servidor + "/Secult/calendario/listarCalendario";
    var onSuccess = function (result) {
        dados = result.calendario;
        var mesAtual = false;

        for (i in dados) {

            var id = dados[i].id;
            var titulo = dados[i].titulo;
            var descricao = dados[i].descricao;
            var dataEvento = dados[i].data_evento;
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

            var mes = dataEvento.slice(5, 7);
            var dia = dataEvento.slice(8, 10);

            if (mes == idMes) {
                $("#mesAcontecimento").append("<div class=\"list card manual-card-fullwidth \" style='padding-top: 0px;box-shadow: 0 0 0; border-width: 1px 0px 1px 0px; border-style: groove;'>\n" +
                        "            <ul class=\"item item-icon-left item-icon-right positive\">\n" +
                        "                <i class=\"icon ion-android-calendar \"></i>\n" +
                        "                <p style=\"text-align: left; padding-left: 10px; font-weight: bold; font-size: large; color: #3f83f5;\">" + titulo + "</p>\n" +
                        "                <a href='https://api.whatsapp.com/send?text=Título: " + titulo + ", Descrição: " + descricao + "' class=\"icon ion-android-share\" style='text-decoration: none'></a>\n" +
                        "            </ul>\n" +
                        "            <div class=\" item item-image \" style='border: none;'>\n" +
                        "                <img id='" + id + "' src='" + urlImagem + "' onError='this.onerror=null;this.src=\"" + urlImagem + "\"' style=\"display: block; width: 100%; height: auto; margin-left: auto; margin-right: auto;\">\n" +
                        "                <div class=\"item item-icon-left\" href=\"#\" style='text-align: left;'> <i class=\"icon ion-location assertive\"></i>" + nomeEvento + "<span class=\"item-note\"> " + dt_eventoTratada + " </span> </div>\n" +
                        "            </div>\n" +
                        "            <div id='" + id + "' style=\"text-align:left; text-indent: 10px;\" class=\"show-list-numbers-and-dots padding \">\n" +
                        "                <p class='desc" + id + "' style=\"margin-top:0px;color:#000000; display: block\" >" + descExibida + "<span id='mostraDesc'>...<span id='descMin" + id + "' style='color: #787878;' onclick='lerMais(\"desc" + id + "\")'> mais</span></span></p>\n" +
                        "                <p class='desc" + id + "' style=\"margin-top:0px;color:#000000; display: none\" >" + descMax + "<span id='mostraDesc'><span id='descMax" + id + "' style='color: #787878;' onclick='lerMais(\"desc" + id + "\")'> menos</span></span></p>\n" +
                        "            </div>\n" +
                        "        </div>");
            };

            $("img#" + id).attr("src", urlImagem);
            var vazio = $("#mesAcontecimento").children();
        }
        if(vazio.length == 1){
            $("#acontecimentoEmpty").css("display", "block");
        };
        carregando(2)
    };
    $.getJSON(json, onSuccess).fail(
    );
}
