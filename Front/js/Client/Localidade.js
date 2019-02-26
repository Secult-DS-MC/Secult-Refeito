function addSearch(id1, id2) {
    var nomeIcon = $("#buttonIcon").attr('class').split(' ')[3];
    if (nomeIcon == 'ion-search') {
        setTimeout(function () {
            $('#buttonIcon').removeClass('ion-search');
            $('#buttonIcon').addClass('ion-arrow-return-left');
        }, 50);
        id1.toggle(100);
        id2.toggle(100);
    } else {
        setTimeout(function () {
            $('#buttonIcon').removeClass('ion-arrow-return-left');
            $('#buttonIcon').addClass('ion-search');
        }, 50)
        id1.toggle(100);
        id2.toggle(100);
    }
}

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

            if (input == "idLocalidade") {
                preencherDadosLocalidade(idLocal);
            }
        }
        $.getJSON(json, onSuccess).fail();
    }, 1000)
}

function listarLocalidades() {
    carregando(1);
    $("#listaLocalidades").empty();
    var json = servidor + "/Secult/localidade/carregarLocalidade";
    var onSuccess = function (result) {

        dados = result.localidades;
        if (dados[0]) {
            for (var i in dados) {
                localStorage.setItem("localidades", JSON.stringify(dados));
                var id = dados[i].id;
                var nome = dados[i].nome;
                var descricao = dados[i].descricao;

                $("#listaLocalidades").append("<a href='#page34' id='" + id + "' onclick='preencherLocalidadeAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")' class=\"item item-icon-left\">\n" +
                    "                <i class=\"icon ion-location\"></i>" + nome + "</a>")

            }
        }
    }
    $.getJSON(json, onSuccess).done(carregando(2)).fail();
}

function buscarLocalidade(nome) {
    var dados = JSON.parse(localStorage.getItem('localidades'));
    $("#listaLocalidades").empty();
    if (nome != "") {

        for (var i = 0; i < dados.length; i++) {
            if (dados[i].nome.toLowerCase().indexOf(nome.toLowerCase()) > -1) {
                var id = dados[i].id;
                var nome = dados[i].nome;
                var descricao = dados[i].descricao;


                $("#listaLocalidades").append("<a href='#page34' id='" + id + "' onclick='preencherLocalidadeAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")' class=\"item item-icon-left\">\n" +
                    "                <i class=\"icon ion-location\"></i>" + nome + "</a>");
            }
        }
    } else {
        $("#buttonIcon").attr("onclick", 'addSearch()');
        for (var i = 0; i < dados.length; i++) {
            var id = dados[i].id;
            var nome = dados[i].nome;
            var descricao = dados[i].descricao;
            $("#listaLocalidades").append("<a href='#page34' onclick='preencherLocalidadeAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")' id='" + id + "' class=\"item item-icon-left\">\n" +
                "                <i class=\"icon ion-location\"></i>" + nome + "</a>");
        }
    }
}

function validarCadastroLocalidade() {
    var nome = $("#nomeLocalidadeCdt").val();
    var descricao = $("#descLocalidadeCdt").val();

    if (validarVazio(nome) && validarVazio(descricao)) {
        cadastroLocalidade(nome, descricao);
    } else {
        swal("Preencha todos os campos!")
    }
}

function cadastroLocalidade(nome, descricao) {
    var json = servidor + "/Secult/localidade/inserirLocalidade/" + nome + "&" + descricao;
    var onSuccess = function (result) {
        jsonAdministrador = result;
        var status = jsonAdministrador.status;
        if (status != "erro") {
            window.location.href = "#page32";
        } else {
            swal("Não foi possivel cadastrar a localidade!");
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}

function preencherLocalidadeAtualizar(idLocalidade, nome, descricao) {
    id = $("#" + idLocalidade).attr('id');
    setTimeout(function () {
        $("#nomeLocalidadeUp").val(nome);
        $("#descLocalidadeUp").val(descricao);
        $("#updateLocalidadeBtn").attr('onclick', "updateLocalidade(" + idLocalidade + ", " + nome + ", " + descricao + ")");
    }, 1000);
}

function updateLocalidade(id, nome, descricao) {
    if (validarVazio(nome) && validarVazio(descricao)) {

        var json = servidor + "/Secult/acontecimento/atualizarLocalidade/" + id + "&" + nome + "&" + descricao;
        var onSuccess = function (result) {

            jsonAdministrador = result;
            Administrador = jsonAdministrador.status;

            if (Administrador == "ok") {
                window.location.href = "#page32";
            };
        };
        $.getJSON(json, onSuccess).fail();
    } else {
        swal("Preencha todos os campos!");
    }
}

function excluirAcontecimento(id) {
    swal({
        title: "Deseja deletar essa localidade?",
        text: "Uma vez deletado não tem como recuperar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        carregando(1)
        if (willDelete) {
            var json = servidor + "/Secult/acontecimento/excluirLocalidade/" + id;
            var onSuccess = function (result) {
                if (result.status == "ok") {
                    $("#" + id).remove();
                    swal("Evento deletado com sucesso!", {
                        icon: "success",
                        buttons: false,
                    });
                    window.location.href = "#/page32";
                    $("#" + id).css("display", "none");
                    carregando(2)
                } else {
                    swal({
                        title: "Ocorreu um erro!",
                        icon: "erro",
                        button: false,
                    });
                }
            }
            $.getJSON(json, onSuccess).fail();
        } else {
            carregando(2)
        }
    });
}