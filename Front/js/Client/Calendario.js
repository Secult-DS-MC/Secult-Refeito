function expandir(classe, mes) {
    var icone = $("#" + mes).children();
    $('.' + classe).toggle(300);
    if (icone.hasClass("ion-plus")) {
        icone.removeClass('ion-plus').addClass('ion-minus')
    } else {
        icone.removeClass('ion-minus').addClass('ion-plus')
    }
}

function listarEventosCalendario() {

    carregando(1)

    var json = servidor + "/Secult/calendario/listarCalendario";
    var onSuccess = function (result) {
        dados = result.calendario;

        for (i in dados) {

            var id = dados[i].id;
            var dataEvento = dados[i].data_evento;
            var titulo = dados[i].titulo;
            var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&N";

            var mes = dataEvento.slice(5, 7);
            var dia = dataEvento.slice(8, 10);

            var classMes;
            if (mes == 01) {
                classMes = 'janeiroEvent';
            } else if (mes == 02) {
                classMes = 'fevEvent';
            } else if (mes == 03) {
                classMes = 'marEvent';
            } else if (mes == 04) {
                classMes = 'abrEvent';
            } else if (mes == 05) {
                classMes = 'maiEvent';
            } else if (mes == 06) {
                classMes = 'junEvent';
            } else if (mes == 07) {
                classMes = 'julEvent';
            } else if (mes == '08') {
                classMes = 'agoEvent';
            } else if (mes == '09') {
                classMes = 'setEvent';
            } else if (mes == 10) {
                classMes = 'outEvent';
            } else if (mes == 11) {
                classMes = 'novEvent';
            } else if (mes == 12) {
                classMes = 'dezEvent';
            }

            $("." + classMes).append("<ion-item style=\"padding: 0px!important;\">\n" +
                "                <a style=\"border-style: none!important;\" href='#' class=\"item item-avatar item-icon-right animated fadeIn\">\n" +
                "                    <img id='"+id+"' src='" + urlImagem + "'>\n" +
                "                    <h2 style=\"display: inline-block\">" + titulo + "</h2>\n" +
                "                    <span class=\"item-note\">Dia " + dia + "</span>\n" +
                "                </a>\n" +
                "            </ion-item>");

            $("img#" + id).attr("src", urlImagem)
        }
        carregando(2)
    };
    $.getJSON(json, onSuccess).fail(
    );
}
