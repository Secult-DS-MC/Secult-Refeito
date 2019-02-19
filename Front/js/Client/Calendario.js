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
    window.location.href = "#/page1/page21";
    carregando(1);
    setTimeout(function () {
        $("#page21 .title").append(mesClick);
    }, 100);

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
            var mes = dataEvento.slice(5, 7);
            var dia = dataEvento.slice(8, 10);

            if (mes == idMes) {
                $("#mesAcontecimento").append("<div class=\"col col-50 manual-card-fullwidth\" style='box-shadow: 0px 0px 6px 0px #565555; display: inline-block'>\n" +
                    "            <div class=\" item item-image \" style='border: none;'>\n" +
                    "                <img id='" + id + "' src='" + urlImagem + "' onError='this.onerror=null;this.src=\"" + urlImagem + "\"' style=\"display: block; width: 100%; height: 190px; margin-left: auto; margin-right: auto;\">\n" +
                    "                <div style='padding: 5%'><h2 style=\"text-align: left;\">" + titulo + "</h2></div>\n" +
                    "                <div style=\"display: flex; zoom: 0.8;\"> " +
                    "                   <span style='opacity: 1!important; max-width: 35px;' class=\"tab-item\"><i style='opacity: 0.7' class=\"icon ion-location\"></i></span>" +
                    "                   <p style='opacity: 1!important; padding-top: 6px;' class=\"tab-item\">" + nomeEvento + "</p>" +
                    "                   <span style='opacity: 1!important; padding-top: 6px;' class=\"tab-item item-note\">Dia " + dia + " </span> </div>\n" +
                    "            </div>\n" +
                    "        </div>");
            }
            ;

            $("img#" + id).attr("src", urlImagem);

        }
        var vazio = $("#mesAcontecimento").children();
        if (vazio.length == 1) {
            $("#acontecimentoEmpty").css("display", "block");
        }
        ;
        carregando(2);
    };
    $.getJSON(json, onSuccess).fail(
    );
}