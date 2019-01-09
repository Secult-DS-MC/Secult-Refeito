function expandir(classe, mes) {
    var icone = $("#" + mes).children();

    if (icone.hasClass("ion-plus")) {
        icone.removeClass('ion-plus').addClass('ion-minus');
        $('.' + classe).toggle(300);
        diminuirMes(classe, icone);
    } else {
        icone.removeClass('ion-minus').addClass('ion-plus');
        $('.' + classe).toggle(300);
    }
}

function diminuirMes(classe, icone) {
    var vazio = $("." + classe + " ion-item").children();
    var aut = $('.' + classe).css("display");
    if (vazio.length == "0") {
        $('.' + classe).children().css("opacity", "1");
        $("p#" + classe).css({"display": "block", "font-size": "13px"});
        if (aut == "inline-block") {
            setTimeout(function () {
                icone.removeClass('ion-minus').addClass('ion-plus');
                $('.' + classe).children().css({"opacity": "0", "transition": "visibility 0s, opacity 0.5s linear"});
                setTimeout(function () {
                    $('.' + classe).css("display", "none");
                }, 200);
            }, 3000);
        }
    }
}

function listarEventosCalendario() {

    carregando(1)

    var json = servidor + "/Secult/calendario/listarCalendario";
    var onSuccess = function (result) {
        dados = result.calendario;
        var mesAtual = false;

        for (i in dados) {

            var id = dados[i].id;
            var dataEvento = dados[i].data_evento;
            var titulo = dados[i].titulo;
            var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&A";

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

            $("." + classMes).append("<ion-item class=\"list\">\n" +
                "    <a class=\"item item-thumbnail-left\" href=\"#\">\n" +
                "      <img src='" + urlImagem + "'>\n" +
                "      <h2>" + titulo + "</h2>\n" +
                "      <p>Dia " + dia + "</p>\n" +
                "    </a>\n" +
                "</ion-item>");

            $("img#" + id).attr("src", urlImagem);

            // data = new Date();
            // if (mes != 10 && mes != 11 && mes != 12) {
            //     mesAt = "0" + (data.getMonth() + 1);
            //     if (mes === mesAt) {
            //         mesAtual = true
            //     }
            // } else {
            //     mesAtual = false;
            //     mesAt = data.getMonth() + 1;
            //     if (mes === mesAt) {
            //         mesAtual = false
            //     }
            // }
        }
        // if (mesAtual) {
        //     expandirEsseMes(classMes.slice(0, 3))
        // }

        carregando(2)
    };
    $.getJSON(json, onSuccess).fail(
    );
}

function expandirEsseMes(id) {
    $("#" + id).click();
}
