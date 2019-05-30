function addSearch(id1, id2) {
    var nomeIcon = $("#buttonIcon").attr('class').split(' ')[3];
    if (nomeIcon == 'ion-search') {
        $('#buttonIcon').removeClass('ion-search');
        $('#buttonIcon').addClass('ion-arrow-return-left');
        id1.toggle(100);
        id2.toggle(100);
    } else if (nomeIcon == 'ion-arrow-return-left') {
        $('#buttonIcon').removeClass('ion-arrow-return-left');
        $('#buttonIcon').addClass('ion-search');
        id1.toggle(100);
        id2.toggle(100);
    }
}

function descricaoCompleta(descricao) {
    var descMin = descricao.slice(0, 129);
    var descMax = descricao;
    var retorno = new Array();
    retorno[0] = descMin;
    retorno[1] = descMax;
    return retorno;
}

function preencherDadosLocalidade(id) {

    var eventoTrue = servidor + "/Secult/localidade/listarLocalidadeComEvento/" + id + "";
    var eventoFalse = servidor + "/Secult/localidade/listarLocalidade/" + id + "";

    $.getJSON(eventoTrue, function (result) {
        var eventos = result.localidades;
        if (eventos == "") {
            $.getJSON(eventoFalse, function (result) {
                var dados = result.localidades;
                var idLocal = dados[0].id;
                var nome = dados[0].nome;
                var descricao = dados[0].descricao;

                $("#nomeEvento").empty();
                $("#nomeLocalidade").empty();
                $("#descLocalidade").empty();

                retorno = descricaoCompleta(descricao);

                $("#nomeLocalidade").append(nome);
                $("#descLocalidade").append("<p class='descLocal' style=\"text-align: center; display: block\">" + retorno[0] + "<span id='mostraDesc'>...<span id='descMin" + idLocal + "' onclick='lerMaisLocalidade()'> mais</span></span></p>\n" +
                    "<p class='descLocal' style=\"text-align: center; display: none\" >" + retorno[1] + "<span id='mostraDesc'>...<span id='descMax" + idLocal + "' onclick='lerMaisLocalidade()'> menos</span></span></p>\n");
                setTimeout(function () {
                    $("#nomeEvento").empty();
                    if ($("#nomeEvento ion-item").length == 0) {
                        $("#nomeEvento").append("<p style='font-size: 15px; color: red; text-align: center'>Não há nenhum evento previsto para esse mês!</p>");
                    }
                }, 10);
            });
        } else {
            var dados = result.localidades;
            var idLocal = dados[0].id;
            var nome = dados[0].nome;
            var descricao = dados[0].descricao;
            var nomeEvento = dados[0].nomeEvento;
            var retorno;
            $("#nomeEvento").empty();
            $("#nomeLocalidade").empty();
            $("#descLocalidade").empty();
            for (var i in dados) {
                if (id == idLocal) {
                    retorno = descricaoCompleta(descricao);

                    $("#nomeLocalidade").append(nome);
                    $("#descLocalidade").append("<p class='descLocal' style=\"text-align: center; display: block\">" + retorno[0] + "<span id='mostraDesc'>...<span id='descMin" + idLocal + "' onclick='lerMaisLocalidade()'> mais</span></span></p>\n" +
                        "                <p class='descLocal' style=\"text-align: center; display: none\" >" + retorno[1] + "<span id='mostraDesc'>...<span id='descMax" + idLocal + "' onclick='lerMaisLocalidade()'> menos</span></span></p>\n");

                    $("#nomeEvento").append("<ion-item style='border: none' class=\"item-icon-right item assertive\">" + nomeEvento + "\n" +
                        "        <i class=\"icon ion-android-alert\"></i>\n" +
                        "      </ion-item>");
                }
            }
        }
    });
}

function lerMaisLocalidade() {
    $(".descLocal").slideToggle();
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
            var campo = document.getElementById("idLocalidade");
            campo.selectedIndex = 0;

            if (input == "idLocalidade") {
                preencherDadosLocalidade(campo.options[0].value);
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

                $("#listaLocalidades").append("<div id='" + id + "' class='item item-icon-right'><a href='#page35' style='text-decoration: none; color: #444!important;' onclick='preencherLocalidadeAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")'" +
                    "                           class=\"item-icon-left\">\n" +
                    "                    <i class=\"icon ion-ios-location dark\"></i>" + nome + "</a>\n" +
                    "                    <a class=\"assertive icon ion-ios-close-outline\" onclick='excluirLocalidade(" + id + ")'></a>\n" +
                    "                    </div>");
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


                $("#listaLocalidades").append("<div id='" + id + "' class='item item-icon-right'><a href='#page35' style='text-decoration: none; color: #444!important;' onclick='preencherLocalidadeAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")'" +
                    "                           class=\"item-icon-left\">\n" +
                    "                    <i class=\"icon ion-ios-location dark\"></i>" + nome + "</a>\n" +
                    "                    <a class=\"assertive icon ion-ios-close-outline\" onclick='excluirLocalidade(" + id + ")'></a>\n" +
                    "                    </div>");
            }
        }
    } else {
        $("#buttonIcon").attr("onclick", 'addSearch($(\'#nomeLocal\'), $(\'#pesquisaLocal\'))');
        for (var i = 0; i < dados.length; i++) {
            var id = dados[i].id;
            var nome = dados[i].nome;
            var descricao = dados[i].descricao;

            $("#listaLocalidades").append("<div id='" + id + "' class='item item-icon-right'><a href='#page35' style='text-decoration: none; color: #444!important;' onclick='preencherLocalidadeAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")'" +
                "                           class=\"item-icon-left\">\n" +
                "                    <i class=\"icon ion-ios-location dark\"></i>" + nome + "</a>\n" +
                "                    <a class=\"assertive icon ion-ios-close-outline\" onclick='excluirLocalidade(" + id + ")'></a>\n" +
                "                    </div>");
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
    var json = servidor + "/Secult/localidade/inserirLocalidade/" + nome.toString() + "&" + descricao.toString();
    var onSuccess = function (result) {
        jsonAdministrador = result;
        var status = jsonAdministrador.status;
        if (status != "erro") {
            window.location.href = "#page32";
            listarLocalidades()
        } else {
            swal("Não foi possivel cadastrar a localidade!");
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}

function preencherLocalidadeAtualizar(idLocalidade, nome, descricao) {
    setTimeout(function () {
        $("#nomeLocalidadeUp").val(nome);
        $("#descLocalidadeUp").val(descricao);
        $("#updateLocalidadeBtn").attr('onclick', "updateLocalidade(" + idLocalidade + ")");
    }, 1000);
}

function updateLocalidade(id) {
    var nome = $("#nomeLocalidadeUp").val();
    var descricao = $("#descLocalidadeUp").val();
    if (validarVazio(nome) && validarVazio(descricao)) {

        var json = servidor + "/Secult/localidade/alterarLocalidade/" + id + "&" + nome + "&" + descricao;
        var onSuccess = function (result) {

            jsonAdministrador = result;
            Administrador = jsonAdministrador.status;

            if (Administrador == "ok") {
                window.location.href = "#page32";
                listarLocalidades()
            }
            ;
        };
        $.getJSON(json, onSuccess).fail();
    } else {
        swal("Preencha todos os campos!");
    }
}

function excluirLocalidade(id) {
    swal({
        title: "Deseja excluir essa localidade?",
        text: "Uma vez excluida não tem como recuperar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        carregando(1)
        if (willDelete) {
            var json = servidor + "/Secult/localidade/excluirLocalidade/" + id;
            var onSuccess = function (result) {
                if (result.status == "ok") {
                    $("#" + id).remove();
                    swal("Localidade excluida com sucesso!", {
                        icon: "success",
                        buttons: false,
                    });
                    $("#" + id).css("display", "none");
                    carregando(2)
                } else {
                    swal({
                        title: "Não foi possível excluir!",
                        text: "Pode ser que algum acontecimento esteja ligado a essa localidade!",
                        icon: "error",
                        button: false,
                    });
                    carregando(2);
                }
            }
            $.getJSON(json, onSuccess).fail();
        } else {
            carregando(2)
        }
    });
}