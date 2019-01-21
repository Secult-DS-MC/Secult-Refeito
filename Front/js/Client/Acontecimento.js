function validarVazio(valor) {
    if (valor != "") return true;
}

function mostrarTipoAcontecimento() {
    $("#cadastroAcon").toggle('slow');
    $("#origemToggle").toggle('slow');

    setTimeout(function () {
        var origem = localStorage.getItem("origemAcom");

        if (origem == 20) {
            $("#descricaoAdm").attr("readonly", false);
            $("#tipoValor").append("<input type='text' id='tipoAdm' value='N' style='display: none'>");
            $("#tipoToggle").css("display", "none");
        }
    }, 300);
}

function habilitarDescricaoAcontecimento(tipo, descricao) {
    if (tipo == "E") {
        $("#labelLocal").show();
    } else {
        $("#labelLocal").hide();
    }

    var quantidade = descricao.val().length;

    setTimeout(function () {
        if (tipo == "N") {
            $("#numCaractDescricao").text(quantidade + "/2000");
        } else if (tipo == "E") {
            $("#numCaractDescricao").text(quantidade + "/191");
        } else if (tipo == "C") {
            $("#numCaractDescricao").text(quantidade + "/2000");
        }
    }, 10);

    if (tipo == "E" && quantidade == "191") {
        toast(1, "A descrição do evento só aparecerá até esse ponto.");
        setTimeout(function () {
            toast(2, "")
        }, 3000);
    }

    if (tipo == "N" && quantidade == "2000") {
        toast(1, "A descrição da noticia só aparecerá até esse ponto.");
        setTimeout(function () {
            toast(2, "")
        }, 3000);
    }
}

function toast(el, mensagem) {
    if (el == 1) {
        setTimeout(function () {
            $("ion-content").prepend("<div class='toast'>" + mensagem + "</div>");
        }, 200)
    } else {
        setTimeout(function () {
            $(".toast").remove();
        }, 200)
    }
}

function validarCadastroAcontecimento() {
    var titulo = $("#tituloAdm").val();
    var descricao = $("#descricaoAdm").val();
    var dataEvento = $("#dataEventoAdm").val();
    var horaEvento = $("#horarioAdm").val();
    var localidade = $("#localidadeAdm").val();
    var tipo = $("input[name=\"select\"]:checked").val();
    var localCidade = $("#localAdm").val();

    if (validarVazio(titulo) && validarVazio(descricao) && validarVazio(dataEvento) && validarVazio(horaEvento) && validarVazio(localidade) && validarVazio(tipo)) {
        if (tipo == "E") {
            if (validarVazio(localCidade)) {
                cadastroAcontecimento();
            } else {
                swal("Todo evento precisa de um ponto específico na localidade!")
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
    var tipo = $("input[name=\"select\"]:checked").val();
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
    var tipo = $("input[name=\"select\"]:checked").val();
    var visibilidade = localStorage.getItem("visibilidadeAcon");
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
                var idLocalidade = dados[i].id_localidade;
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

            if (dados[i].id == id) {

                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento;
                mostrarInput(tipo);

                var nomeTipo = dados[i].nome_origem;
                setTimeout(function () {
                    var imagem = servidor + "/Secult/imagem/findETC/" + id + "&A";
                    $(".imgThumbnail1").attr('src', imagem);
                    localStorage.setItem('imgTeste', imagem);
                }, 100);
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].id_localidade;
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
    var tipo = $("input[name=\"select\"]:checked").val();
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
    var tipo = $("input[name=\"select\"]:checked").val();
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