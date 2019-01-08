function validarVazio(valor) {
    if (valor != "") return true;
}

function validarDescAcon() {
    $("#descricaoAdm").keyup(function () {
        if ($("#descricaoAdm").val() != '') {
            if ($("#descricaoAdm").val().length < 191 & $("#descricaoAdm").val().length > 0) {
                $("#descricaoAdm").show('pulsate');
            } else {
                return true
                $("#descricaoAdm").hide();
            }
        } else {
            return true
            $("#descricaoAdm").hide();
        }
    })
}

function validarDescAconUp() {
    $("#descricaoUp").keyup(function () {
        if ($("#descricaoUp").val() != '') {
            if ($("#descricaoUp").val().length < 191 & $("#descricaoUp").val().length > 0) {
                $("#descricaoUp").show('pulsate');
            } else {
                return true
                $("#descricaoUp").hide();
            }
        } else {
            return true
            $("#descricaoUp").hide();
        }
    })
}

function validarDescAcon() {
    $("#descricaoAdm").keyup(function () {
        if ($("#descricaoAdm").val() != '') {
            if ($("#descricaoAdm").val().length < 191 & $("#descricaoAdm").val().length > 0) {
                $("#descricaoAdm").show('pulsate');
            } else {
                return true
                $("#descricaoAdm").hide();
            }
        } else {
            return true
            $("#descricaoAdm").hide();
        }
    })
}

function validarCadastroAcontecimento() {
    var titulo = $("#tituloAdm").val();
    var descricao = $("#descricaoAdm").val();
    var dataEvento = $("#dataEventoAdm").val();
    var horaEvento = $("#horarioAdm").val();
    var localidade = $("#localidadeAdm").val();
    var tipo = $("#tipoAdm").val();
    var localCidade = $("#localAdm").val();

    if (validarVazio(titulo) && validarVazio(descricao) && validarVazio(dataEvento) && validarVazio(horaEvento) && validarVazio(localidade) && validarVazio(tipo)) {
        if (tipo == "E") {
            if(descricao.length < 191){
                if (validarVazio(localCidade)) {
                    cadastroAcontecimento();
                } else {
                    swal("Todo evento precisa de um ponto específico na localidade!")
                }
            }else{
                swal("Um evento só pode ter 191 caracter!")
            }
        } else {
            cadastroAcontecimento();
        }
    } else {
        swal("Preencha todos os campos!")
    }
}

function cadastroAcontecimento() {
    var titulo = $("#tituloAdm").val();
    var descricao = $("#descricaoAdm").val();
    var dataEvento = $("#dataEventoAdm").val();
    var horaEvento = $("#horarioAdm").val();
    var localidade = $("#localidadeAdm").val();
    var tipo = $("#tipoAdm").val();
    var localCidade = $("#localAdm").val();
    var origem = localStorage.getItem("origemAcom");

    if (localCidade == "") {
        localCidade = "A";
    }

    var json = servidor + "/Secult/acontecimento/insertAcontecimento/" + titulo + "&" + descricao + "&" + dataEvento + "&n&" + tipo + "&" + horaEvento + "&" + localidade + "&" + localCidade + "&" + origem;

    var onSuccess = function (result) {

        jsonAdministrador = result;

        var status = jsonAdministrador.status;
        var id = jsonAdministrador.id_usuario

        if (status != "erro") {
            inserirImagem(id, "A");
            $("#page19").click(function () {
                location.reload();
            });
        } else {
            swal("Não foi possivel cadastrar o acontecimento!");
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}

function preencherEventoAtualizar(id, visibilidade, titulo, dataEvento, descricao, horaEvento, tipo, idLocalidade, imagem, localCidade) {
    localStorage.setItem("idAcontecimento", id);
    id = $("#" + id).attr('id');
    setTimeout(function () {
        $("#tituloUp").val(titulo);
        $("#imgThumbnail").attr('src', imagem);
        localStorage.setItem('imgTeste', imagem);
        $("#descricaoUp").val(descricao);
        $("#dataEventoUp").val(dataEvento);
        $("#horarioUp").val(horaEvento);
        setTimeout(function () {
            $("#localidadeUp").val(idLocalidade);
        }, 2000);
        $("#tipoUp").val(tipo);
        $("#visibilidadeUp").val(visibilidade);
        $("#localUp").val(localCidade);
        $("#updateEventoBtn").attr('onclick', "updateEvento(" + id + ")");
    }, 1000);
}

function updateEvento(id) {
    var titulo = $("#tituloUp").val();
    var descricao = $("#descricaoUp").val();
    var dataEvento = $("#dataEventoUp").val();
    var horaEvento = $("#horarioUp").val();
    var localidade = $("#localidadeUp").val();
    var tipo = $("#tipoUp").val();
    var visibilidade = $("#visibilidadeUp").val();
    var local = $("#localUp").val();


    if (validarVazio(titulo) && validarVazio(descricao) && validarVazio(dataEvento) && validarVazio(horaEvento) && validarVazio(localidade) && validarVazio(tipo)) {
        if (tipo == "E") {
            if (validarVazio(local)) {

                var json = servidor + "/Secult/acontecimento/updateAcontecimento/" + id + "&" + titulo + "&" + descricao + "&" + dataEvento + "&" + visibilidade + "&" + tipo + "&" + horaEvento + "&" + localidade + "&" + local;

                var onSuccess = function (result) {

                    jsonAdministrador = result;

                    Administrador = jsonAdministrador.status;

                    if (Administrador == "ok") {
                        atualizarImagem(id, "A");
                        // setTimeout(function () {
                        //     window.location.reload()
                        // }, 100);
                    }
                    ;
                };
                $.getJSON(json, onSuccess).fail();
            } else {
                swal("Todo evento precisa de um ponto específico na localidade!");
            }
        } else {
            local = "nulo";
            var json = servidor + "/Secult/acontecimento/updateAcontecimento/" + id + "&" + titulo + "&" + descricao + "&" + dataEvento + "&" + visibilidade + "&" + tipo + "&" + horaEvento + "&" + localidade + "&" + local;

            var onSuccess = function (result) {

                jsonAdministrador = result;

                Administrador = jsonAdministrador.status;

                if (Administrador == "ok") atualizarImagem(id, "A");
            };
            $.getJSON(json, onSuccess).fail();
        }
    } else {
        swal("Preencha todos os campos!");
    }
}

function mostrarInputCadastroEvento(tipo) {
    if (tipo == "E") {
        $("#labelLocal").show().scrollBottom(0, 500);
    } else {
        $("#labelLocal").hide();
    }
}

function excluirAcontecimento(id) {
    swal({
        title: "Deseja deletar esse evento?",
        text: "Uma vez deletado não tem como recuperar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        carregando(1)
        if (willDelete) {
            var json = servidor + "/Secult/acontecimento/deletarAcontecimento/" + id;
            var onSuccess = function (result) {
                if (result.status == "ok") {
                    $("#" + id).remove();
                    swal("Evento deletado com sucesso!", {
                        icon: "success",
                        buttons: false,
                    });
                    window.location.href = "#/page18";
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

function listarEventoFiltro(filtro) {
    $("#inicioListaEventoHoje").empty()
    carregando(1)
    var json;
    console.log(filtro)
    switch (filtro) {
        case "Todos":
            json = servidor + "/Secult/acontecimento/listarAcontecimento";
            break;
        case "Visivel":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoPorVisibilidadeS";
            break;
        case "Invisivel":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoPorVisibilidadeN";
            break;
        case "1Mes":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoPorEsseMes";
            break;
        case "6Mes":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoUltimos6Meses";
            break;
        case "10":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoTipo/" + filtro;
            break;
        case "20":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoTipo/" + filtro;
            break;
        case "30":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoTipo/" + filtro;
            break;
        case "40":
            json = servidor + "/Secult/acontecimento/listarAcontecimentoTipo/" + filtro;
            break;
    }


    var onSuccess = function (result) {

        var dados = result.acontecimentos;

        if (dados[0]) {

            for (var i in dados) {

                var id = dados[i].id;
                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento;
                var nomeTipo = dados[i].nome_origem;
                var imagem = servidor + "/Secult/imagem/findETC/" + id + "&A";

                //if(imagem == null) imagem = "../../img/semImagem.png";
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].idLocalidade;
                var localCidade = dados[i].localCidade;

                localStorage.setItem('dadosClone', JSON.stringify(dados));

                $("#inicioListaEventoHoje").append("<a href='#page20' onclick='preencherEventoAtualizar(" + id + ",\"" + visibilidade + "\",\"" + titulo + "\",\"" + dataEvento + "\",\"" + descricao + "\",\"" + horaEvento + "\",\"" + tipo + "\",\"" + idLocalidade + "\",\"" + imagem + "\",\"" + localCidade + "\"), mostrarInput(\"" + tipo + "\")' id='" + id + "' style=\"border-width: 1px 0;\" class=\"item item-thumbnail-left balanced\">\n" +
                    "                <img  src='" + imagem + "' onError='this.onerror=null;this.src='" + imagem + "'>\n" +
                    "                <h2 id='titulo" + id + "'  style=\"font-weight: bolder; font-size: larger\">" + titulo + "</h2>\n" +
                    "                   <p style=\"white-space:normal; margin-top: 5px; font-weight: normal; display: block;\">" + nomeTipo + "</p>\n" +
                    "                <div class=\"item-icon-right\">\n" +
                    "                    <i id='checked" + id + "' class=\"icon ion-eye inline\"></i>\n" +
                    "                </div>\n" +
                    "            </a>\n");

                if (visibilidade == "s") {
                    $("#checked" + id).css('color', 'green');
                } else {
                    $("#checked" + id).removeClass("ion-eye").addClass("ion-eye-disabled").css('color', 'gray');
                }
            }
        }
        carregando(2)
    };
    $.getJSON(json, onSuccess).fail(

    );
}

function preencherClonar(id) {

    var dados = JSON.parse(localStorage.getItem('dadosClone'));

    if (dados[0]) {

        for (var i in dados) {
            console.log(id)
            console.log(dados[i].id)

            if (dados[i].id == id) {

                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento;

                mostrarInput(tipo);

                var nomeTipo = dados[i].nome_origem;
                setTimeout(function () {
                    var imagem = servidor + "/Secult/imagem/findETC/" + id + "&A";

                    $("#imgThumbnail").attr('src', imagem);
                    localStorage.setItem('imgTeste', imagem);
                }, 4000);
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].idLocalidade;
                var localCidade = dados[i].localCidade;
                var origem = dados[i].origem;

                localStorage.setItem("origemAcom", origem);

                setTimeout(function () {
                    $("#tituloCl").val(titulo);
                    $("#descricaoCl").val(descricao);
                    $("#dataEventoCl").val(dataEvento);
                    $("#horarioCl").val(horaEvento);
                    setTimeout(function () {
                        $("#localidadeCl").val(idLocalidade);
                    }, 2000);
                    $("#tipoCl").val(tipo);
                    $("#visibilidadeCl").val(visibilidade);
                    $("#localCl").val(localCidade);
                }, 1000);
            }
        }
    }
}

function validarCloneAcontecimento() {
    var titulo = $("#tituloCl").val();
    var descricao = $("#descricaoCl").val();
    var dataEvento = $("#dataEventoCl").val();
    var horaEvento = $("#horarioCl").val();
    var localidade = $("#localidadeCl").val();
    var tipo = $("#tipoCl").val();
    var localCidade = $("#localCl").val();

    if (validarVazio(titulo) && validarVazio(descricao) && validarVazio(dataEvento) && validarVazio(horaEvento) && validarVazio(localidade) && validarVazio(tipo)) {
        if (tipo == "E") {
            if (validarVazio(localCidade)) {
                cloneAcontecimento();
            } else {
                swal("Todo evento precisa de um ponto específico na localidade!")
            }
        } else {
            cloneAcontecimento();
        }
    } else {
        swal("Preencha todos os campos!")
    }
}

function cloneAcontecimento() {
    var titulo = $("#tituloCl").val();
    var descricao = $("#descricaoCl").val();
    var dataEvento = $("#dataEventoCl").val();
    var horaEvento = $("#horarioCl").val();
    var localidade = $("#localidadeCl").val();
    var tipo = $("#tipoCl").val();
    var localCidade = $("#localCl").val();
    var origem = localStorage.getItem("origemAcom");

    if (localCidade == "") {
        localCidade = "A";
    }

    var json = servidor + "/Secult/acontecimento/insertAcontecimento/" + titulo + "&" + descricao + "&" + dataEvento + "&n&" + tipo + "&" + horaEvento + "&" + localidade + "&" + localCidade + "&" + origem;

    var onSuccess = function (result) {

        jsonAdministrador = result;

        var status = jsonAdministrador.status;
        var id = jsonAdministrador.id_usuario

        if (status != "erro") {
            inserirImagem(id, "A");
            $("#page19, #page30").click(function () {
                location.reload();
            });
        } else {
            swal("Não foi possivel clonar o acontecimento!");
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}