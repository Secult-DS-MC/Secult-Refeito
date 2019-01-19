function listarArtes() {
    carregando(2);
    $("#listaEventoEvento").empty();
    var json = servidor + "/Secult/arte/listarArte";

    var onSuccess = function (result) {

        dados = result.artes;
        $("#cdtArte").append("<option value='0'>Selecione sua arte!<span id='numArte'></span></option>")
        if (dados[0]) {

            for (var i in dados) {
                var id = dados[i].id;
                var nome = dados[i].nome;
                $("#cdtArte").append("<option value='" + id + "'>" + nome + "</option>");

            }
        }
    };
    $.getJSON(json, onSuccess).done(
        carregando(2)
    ).fail(

    );
}

function contarArtes() {
    var quantidade = $("#artesSelecLista li").length;
    

}