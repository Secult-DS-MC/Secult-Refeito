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

            $("#nomeLocalidade").empty();
            $("#descLocalidade").empty();

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

            if ($("#idLocalidade").val() == idLocal) {
                $("#nomeLocalidade").append(nome);
                $("#descLocalidade").append("<p class='descLocal' style=\"text-align: center; display: block\">" + descExibida + "<span id='mostraDesc'>...<span id='descMin" + idLocal + "' onclick='lerMaisLocalidade()'> mais</span></span></p>\n" +
                    "                <p class='descLocal' style=\"text-align: center; display: none\" >" + descMax + "<span id='mostraDesc'>...<span id='descMax" + idLocal + "' onclick='lerMaisLocalidade()'> menos</span></span></p>\n");

                $("#nomeEvento").append("<ion-item style='border: none' class=\"item-icon-right item assertive\">" + nomeEvento + "\n" +
                    "        <i class=\"icon ion-android-alert\"></i>\n" +
                    "      </ion-item>");

                if (descCompleta) {
                    $("#descMin" + idLocal).remove();
                    $("#descMax" + idLocal).remove();
                }
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

function lerMaisLocalidade() {
    $(".descLocal").slideToggle();

    //$('ion-view').scrollTop();

    //animate({scrollTop: 0}, 1000, 'linear');
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