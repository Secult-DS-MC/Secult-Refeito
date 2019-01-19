function listarArtes() {
    carregando(2);
    $("#listaEventoEvento").empty();
    var json = servidor + "/Secult/arte/listarArte";

    var onSuccess = function (result) {

        dados = result.artes;
        $("#cdtArte").append("<option value='0'>Selecione sua arte!</option>")
        if (dados[0]) {

            for (var i in dados) {
                if(dados[i].nome != 'null'){

                    var id = dados[i].id;
                    var nome = dados[i].nome;
                    $("#cdtArte").append("<option value='" + id + "'>" + nome + "</option>");
                }
            }
        }
    };
    $.getJSON(json, onSuccess).done(
        carregando(2)
    ).fail(

    );
}

function contarArtes() {
    setTimeout(function () {
        contarArtes()
        var quantidade = $("#artesSelecLista li").length;
        $("#numArte").text(quantidade + "/3");
    }, 10)
}


function inserirArteArtista(idArte,idArtista) {
    var json = servidor + "/Secult/arteArtista/inserirArteArtista/"+idArte +"&"+idArtista;
    var onSuccess = function (result) {
        if (result.status == "ok") {

        }
    };
    $.getJSON(json, onSuccess).done(
        carregando(2)
    ).fail(

    );
}