function descricaoCompleta(descricao) {
    var descMin = descricao.slice(0, 129);
    var descMax = descricao;
    var descExibida;
    retorno = new Array();

    if (descricao.length >= 130) {
        descExibida = descMin;

        retorno[0] = descExibida;
        retorno[1] = false;
    } else {
        descExibida = descMax;

        retorno[0] = descExibida;
        retorno[1] = true;
        return retorno;
    }
}

function preencherDadosLocalidade(id) {
    $("#nomeEvento").empty();
    $("#nomeLocalidade").empty();
    $("#descLocalidade").empty();

    var json = servidor + "/Secult/localidade/listarLocalidadeComEvento/" + id + "";

    var onSuccess = function (result) {

        dados = result.localidades;
        var retorno;
        for (var i in dados) {

            var idLocal = dados[i].id;
            var nomeEvento = dados[i].nomeEvento;
            var nome = dados[i].nome;
            var descricao = dados[i].descricao;

            $("#nomeLocalidade").empty();
            $("#descLocalidade").empty();

            retorno = descricaoCompleta(descricao);

            $("#nomeLocalidade").append(nome);
            $("#descLocalidade").append("<p class='descLocal' style=\"text-align: center; display: block\">" + retorno[0] + "<span id='mostraDesc'>...<span id='descMin" + idLocal + "' onclick='lerMaisLocalidade()'> mais</span></span></p>\n" +
                "                <p class='descLocal' style=\"text-align: center; display: none\" >" + retorno[0] + "<span id='mostraDesc'>...<span id='descMax" + idLocal + "' onclick='lerMaisLocalidade()'> menos</span></span></p>\n");

            $("#nomeEvento").append("<ion-item style='border: none' class=\"item-icon-right item assertive\">" + nomeEvento + "\n" +
                "        <i class=\"icon ion-android-alert\"></i>\n" +
                "      </ion-item>");

            if (retorno[1]) {
                $("#descMin" + idLocal).remove();
                $("#descMax" + idLocal).remove();
            }
        }
        setTimeout(function () {
            if ($("#nomeEvento ion-item").length == 0) {
                carregarNomeEdescEvento(id);
                $("#nomeEvento").append("<p style='font-size: 15px; color: red; text-align: center'>Não há nenhum evento previsto para esse mês!</p>");
            }
        }, 300);
    }
    $.getJSON(json, onSuccess).fail();
}

function lerMaisLocalidade() {
    $(".descLocal").slideToggle();
}

function carregarNomeEdescEvento(id) {
    var json = servidor + "/Secult/localidade/listarLocalidade/" + id + "";

    var onSuccess = function (result) {
        var retorno;
        var dados = result.localidades;

        var idLocal = dados[0].id;
        var nome = dados[0].nome;
        var descricao = dados[0].descricao;

        retorno = descricaoCompleta(descricao);

        $("#nomeLocalidade").append(nome);
        $("#descLocalidade").append("<p class='descLocal' style=\"text-align: center; display: block\">" + retorno[0] + "<span id='mostraDesc'>...<span id='descMin" + idLocal + "' onclick='lerMaisLocalidade()'> mais</span></span></p>\n" +
            "<p class='descLocal' style=\"text-align: center; display: none\" >" + retorno[0] + "<span id='mostraDesc'>...<span id='descMax" + idLocal + "' onclick='lerMaisLocalidade()'> menos</span></span></p>\n");
    }
    $.getJSON(json, onSuccess).fail();
}

function selectLocalidade(input) {
    $("#" + input).empty();
    setTimeout(function () {
        var json = servidor + "/Secult/localidade/carregarLocalidade";
        var onSuccess = function (result) {
            dados = result.localidades;

            for (var i in dados) {

                var idLocal = dados[i].id;
                var local = dados[i].nome;

                $("#" + input).append("<option value=" + idLocal + ">" + local + "</option>")
            }
            $("#" + input + " option[value=1]").prop("selected", true).change();

            if (input == "idLocalidade"){
                preencherDadosLocalidade(idLocal);
            }
        }
        $.getJSON(json, onSuccess).fail();
    }, 1000)
}