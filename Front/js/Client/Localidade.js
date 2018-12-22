function preencherDadosLocalidade() {
    $("#nomeEvento").empty();
    $("#nomeLocalidade").empty();
    $("#descLocalidade").empty();

    var json = servidor + "/Secult/localidade/listarLocalidadeComEvento";

    var onSuccess = function (result) {

        dados = result.localidades;

        for (var i in dados) {

            var idLocal = dados[i].id;
            var nomeEvento = dados[i].nomeEvento;
            var nome = dados[i].nome;
            var descricao = dados[i].descricao;

            if ($("#idLocalidade").val() == idLocal) {
                $("#nomeLocalidade").empty();
                $("#descLocalidade").empty();
                $("#nomeLocalidade").append(nome);
                $("#descLocalidade").append(descricao);


                $("#nomeEvento").append("<ion-item style='border: none' class=\"item-icon-right item assertive\">" + nomeEvento + "\n" +
                    "        <i class=\"icon ion-android-alert\"></i>\n" +
                    "      </ion-item>");
            }
        }

        setTimeout(function () {
            if ($("#nomeEvento ion-item").length == 0) {
                carregarNomeEdescEvento($("#idLocalidade").val());
                $("#nomeEvento").append("<p style='font-size: 15px; color: red; text-align: center'>Não há nenhum evento previsto para esse mês!</p>");
            }
        }, 500);
    }
    $.getJSON(json, onSuccess).fail();
}

function carregarNomeEdescEvento(id) {
    var json = servidor + "/Secult/localidade/listarLocalidade";

    var onSuccess = function (result) {

        var dados = result.localidades;

        for (var i in dados) {

            var idLocal = dados[i].id;
            var local = dados[i].nome;
            var descricao = dados[i].descricao;

            if (id == idLocal) {
                $("#nomeLocalidade").append(local);
                $("#descLocalidade").append(descricao);
            }
        }
    }
    $.getJSON(json, onSuccess).fail();
}

function selectLocalidade() {
    setTimeout(function () {

        var json = servidor + "/Secult/localidade/carregarLocalidade";

        var onSuccess = function (result) {

            dados = result.localidades;

            for (var i in dados) {

                var idLocal = dados[i].id;
                var local = dados[i].nome;

                $("#idLocalidade").append("<option value=" + idLocal + ">" + local + "</option>")
            }
            $("#idLocalidade option[value=1]").prop("selected", true).change()
        }
        $.getJSON(json, onSuccess).fail();
    }, 1000)
}

function selectLocalidadeCadastro() {
    setTimeout(function () {

        var json = servidor + "/Secult/localidade/carregarLocalidade";

        var onSuccess = function (result) {

            dados = result.localidades;

            for (var i in dados) {

                var idLocal = dados[i].id;
                var local = dados[i].nome;

                $("#localidadeAdm").append("<option value=" + idLocal + ">" + local + "</option>")
            }
            $("#localidadeAdm option[value=1]").prop("selected", true).change()
        }
        $.getJSON(json, onSuccess).fail();
    }, 1000)
}

function selectLocalidadeUp() {
    setTimeout(function () {

        var json = servidor + "/Secult/localidade/carregarLocalidade";

        var onSuccess = function (result) {

            dados = result.localidades;

            for (var i in dados) {

                var idLocal = dados[i].id;
                var local = dados[i].nome;

                $("#localidadeUp").append("<option value=" + idLocal + ">" + local + "</option>")
            }
            $("#localidadeUp option[value=1]").prop("selected", true).change()
        }
        $.getJSON(json, onSuccess).fail();
    }, 1000)
}