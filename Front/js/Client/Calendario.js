function expandir(classe, mes) {
    var icone = $("#" + mes).children();
    $('.' + classe).toggle(300);
    if (icone.hasClass("ion-plus")) {
        icone.removeClass('ion-plus').addClass('ion-minus')
    } else {
        icone.removeClass('ion-minus').addClass('ion-plus')
    }
}

function calendario(dataEvento, titulo, imagem) {

    var mes = dataEvento.slice(5, 7);
    var dia = dataEvento.slice(8, 10);

    if (mes == 01) {

        $(".janeiroEvent").empty().append("<ion-item style=\"padding: 0px!important;\">\n" +
            "                <a style=\"border-style: none!important;\" href='#' class=\"item item-avatar item-icon-right animated fadeIn\">\n" +
            "                    <img src='"+imagem+"'>\n" +
            "                    <h2 style=\"display: inline-block\">"+titulo+"</h2>\n" +
            "                    <span class=\"item-note\">Dia " +dia+ "</span>\n" +
            "                </a>\n" +
            "            </ion-item>");
    } else if (mes == 02) {
        $(".fevEvent").empty().append();
    } else if (mes == 03) {
        $(".marEvent").empty().append();
    } else if (mes == 04) {
        $(".abrEvent").empty().append();
    } else if (mes == 05) {
        $(".maiEvent").empty().append();
    } else if (mes == 06) {
        $(".junEvent").empty().append();
    } else if (mes == 07) {
        $(".julEvent").empty().append();
    } else if (mes == '08') {
        $(".agoEvent").empty().append();
    } else if (mes == '09') {
        $(".setEvent").empty().append();
    } else if (mes == 10) {
        $(".outEvent").empty().append();
    } else if (mes == 11) {
        $(".novEvent").empty().append();
    } else if (mes == 12) {
        $(".dezEvent").empty().append();
    }
}
