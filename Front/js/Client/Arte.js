function listarArtes() {
    $("#cdtArte").empty();
    var json = servidor + "/Secult/arte/listarArte";

    var onSuccess = function (result) {

        dados = result.artes;
        $("#cdtArte").append("<option value='0'>Selecione sua arte!</option>")
        if (dados[0]) {

            for (var i in dados) {
                if (dados[i].nome != 'null') {

                    var id = dados[i].id;
                    var nome = dados[i].nome;
                    $("#cdtArte").append("<option value='" + id + "'>" + nome + "</option>");
                }
            }
        }
    };
    $.getJSON(json, onSuccess).done(
    ).fail(

    );
}

function listarArtesArtista(id) {
    var arte1 = "";
    var arte2 = "";
    var arte3 = "";
    $.getJSON(servidor + "/Secult/arteArtista/listarArtesArtista/" + id, function (result) {
        var artes = result.artes;
        arte1 = artes[0].nome;
        arte2 = artes[1].nome;
        arte3 = artes[2].nome;
        if(arte1 != "null")$("#arte1"+id).text(arte1);
        if(arte2 != "null")$("#arte2"+id).text(arte2);
        if(arte3 != "null")$("#arte3"+id).text(arte3);
    })
}

function preencherArtesArtistaUpdate(id){
    $.getJSON(servidor + "/Secult/arteArtista/listarArtesArtista/" + id, function (result) {
        var artes = result.artes
        for(var i in artes){
            var id = artes[i].id;
            var nome = artes[i].nome;
            $("#artesSelecLista").append("<li id='" + id + "' style='color: #262626!important;'>" + nome + " <i style=\"float:right\" class=\"assertive icon ion-close\" onclick=\"$(this).parent().remove(), validacaoEtapa2(),contarArtes()\"></i></li>\n")
        }
    })
}

function addArteLista(el) {
    var nome = $("#cdtArte option:selected").text();
    var id = $("#cdtArte option:selected").val();
    var listaSelecionados = $("#artesSelecLista li");
    var existe = false;
    for (var i = 0; i < listaSelecionados.length; i++) {
        if (listaSelecionados[i].id == id || id == "0" || listaSelecionados.length == 3) {
            existe = true;
        }
    }
    if (existe == false) {
       if(el == "cdt") $("#artesSelecLista").append("<li id='" + id + "'>" + nome + " <i style=\"float:right\" class=\"assertive icon ion-close\" onclick=\"$(this).parent().remove(), validacaoEtapa2(),contarArtes()\"></i></li>\n")
       if(el == "up") $("#artesSelecLista").append("<li style='color: #262626!important' id='" + id + "'>" + nome + " <i style=\"float:right\" class=\"assertive icon ion-close\" onclick=\"$(this).parent().remove(), validacaoEtapa2(),contarArtes()\"></i></li>\n")

    }
    $("#cdtArte").val(0);
}

function contarArtes() {
    setTimeout(function () {
        contarArtes()
        var quantidade = $("#artesSelecLista li").length;
        $("#numArte").text(quantidade + "/3");
    }, 10)
}


function inserirArteArtista(idArte, idArtista) {
    var json = servidor + "/Secult/arteArtista/inserirArteArtista/" + idArte + "&" + idArtista;
    var onSuccess = function (result) {
        if (result.status == "ok") {

        }
    };
    $.getJSON(json, onSuccess).done(
        carregando(2)
    ).fail(

    );
}