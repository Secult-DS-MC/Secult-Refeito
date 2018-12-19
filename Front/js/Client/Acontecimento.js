function validarVazio(valor) {
    if (valor != "") return true;
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
            if (validarVazio(localCidade)) {
                cadastroAcontecimento();
            } else {
                swal("Todo evento precisa de um ponto específico na localidade!")
            }
        }else {
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

    if (localCidade == "") {
        localCidade = "A";
    }

    var json = servidor + "/Secult/acontecimento/insertAcontecimento/" + titulo + "&" + descricao + "&" + dataEvento + "&n&" + tipo + "&" + horaEvento + "&" + localidade + "&" + localCidade;

    var onSuccess = function (result) {

        jsonAdministrador = result;

        var status = jsonAdministrador.status;
        var id = jsonAdministrador.id_usuario

        if (status != "erro") {
            inserirImagem(id, "A")
        } else {
            swal("Não foi possivel cadastrar o acontecimento!");
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}

function listarEventoAdm() {
    $("#inicioListaEventoHoje").empty()
    console.log('todos')
    carregando(1)
    var json = servidor + "/Secult/acontecimento/listarAcontecimento";

    var onSuccess = function (result) {

        var dados = result.acontecimentos;

        if (dados[0]) {

            for (var i in dados) {

                var id = dados[i].id;
                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento;
                var imagem = servidor + "/Secult/imagem/findETC/" + id + "&A";

                //if(imagem == null) imagem = "../../img/semImagem.png";
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].idLocalidade;
                var localCidade = dados[i].localCidade;

                $("#inicioListaEventoHoje").append("<li id='" + id + "' style='border-width: 1px 0;' class=\"item item-thumbnail-left balanced\">\n" +
                    "                <img  src='" + imagem + "' onError='this.onerror=null;this.src='" + imagem + "'>\n" +
                    "                <h2 id='titulo" + id + "'  style=\"margin: 0px; font-size: 17px; font-weight: bolder; margin-top: 30px;\">" + titulo + "</h2>\n" +
                    "                <div class=\"item-icon-right\">\n" +
                    "                    <i id='checked" + id + "' style=\"height: 23%; margin-right: 3%\" class=\"icon ion-eye inline\"></i>\n" +
                    "                </div>\n" +
                    "                <div style=\"float: right; margin-right: -15px; margin-top: -33px; text-align: center;\">\n" +
                    "                    <div style=\"height: 35px\">\n" +
                    "                        <a onclick='preencherEventoAtualizar(" + id + ",\"" + visibilidade + "\",\"" + titulo + "\",\"" + dataEvento + "\",\"" + descricao + "\",\"" + horaEvento + "\",\"" + tipo + "\",\"" + idLocalidade + "\",\"" + imagem + "\",\"" + localCidade + "\"), mostrarInput(\"" + tipo + "\")' class='button button-light' style=\"display: grid;\" ui-sref='updateEvento()'>\n" +
                    "                            <div id='" + id + "' style=\"font-weight:600;color:#0092FF;font-size:15px;\">Editar</div>\n" +
                    "                        </a>\n" +
                    "                    </div>\n" +
                    "                    <div style=\"height: 30px\">\n" +
                    "                        <a class='button button-light' onclick=\"excluirAcontecimento(" + id + ")\">\n" +
                    "                            <div style=\"font-weight:600;color:#FF0020;font-size:15px;\">Excluir\n" +
                    "                            </div>\n" +
                    "                        </a>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </li>\n");

                if (visibilidade == "s") {
                    $("#checked" + id).css('color', 'green');
                } else {
                    $("#checked" + id).css('color', '#e43a38');
                }
            }
        }
        carregando(2)
    };
    $.getJSON(json, onSuccess).fail(

    );
}


function preencherEventoAtualizar(id, visibilidade, titulo, dataEvento, descricao, horaEvento, tipo, idLocalidade, imagem, localCidade) {
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
                        setTimeout(function () {
                            window.location.reload()
                        }, 100);
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
                    $("#"+id).css("display", "none");
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