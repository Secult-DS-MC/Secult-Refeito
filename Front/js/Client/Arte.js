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
                    var descricao = dados[i].descricao;
                    console.log(descricao)
                    $("#cdtArte").append("<option value='" + id + "'>" + nome + "</option>");
                    $("#descArte").text(descricao);
                }
            }
        }
    };
    $.getJSON(json, onSuccess).done(
    ).fail(

    );
}
function validarCadastroArte() {
    var nome = $("#nomeArteCdt").val();
    var descricao = $("#descArteCdt").val();

    if (validarVazio(nome) && validarVazio(descricao)) {
        cadastroArte(nome, descricao);
    } else {
        swal("Preencha todos os campos!")
    }
}
function cadastroArte(nome, descricao) {
    var json = servidor + "/Secult/arte/inserirArte/" + nome + "&" + descricao;
    var onSuccess = function (result) {
        var status = result.status;
        if (status == "ok") {
            window.location.href = "#page38";
            listarArtesAdm()
        } else {
            swal("Não foi possivel cadastrar a Arte!");
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}

function listarArtesAdm() {
    carregando(1);
    $("#listarArtesAdm").empty();
    var json = servidor + "/Secult/arte/listarArte";
    var onSuccess = function (result) {

        dados = result.artes;
        localStorage.setItem("artes", JSON.stringify(dados));
        if (dados[0]) {

            for (var i in dados) {
                if (nome = dados[i].nome != 'null') {


                    localStorage.setItem("Artes", JSON.stringify(dados));
                    var id = dados[i].id;
                    var nome = dados[i].nome;
                    var descricao = dados[i].descricao;

                    $("#listarArtesAdm").append("<div id='" + id + "' class='item item-icon-right'><a href='#page37' style='text-decoration: none; color: #444!important;' onclick='preencherArteAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")'" +
                        "                           class=\"item-icon-left\">\n" +
                        "                    <i class=\"icon ion-android-create dark\"></i>" + nome + "</a>\n" +
                        "                    <a class=\"assertive icon ion-ios-close-outline\" onclick='excluirArte(" + id + ")'></a>\n" +
                        "                    </div>");


                }
            }
        }
    }
    $.getJSON(json, onSuccess).done(carregando(2)).fail();
}

function buscarArtes(nome) {
    var dados = JSON.parse(localStorage.getItem('artes'));
    $("#listarArtesAdm").empty();
    if (nome != "") {
        for (var i = 0; i < dados.length; i++) {
            if (dados[i].nome.toLowerCase().indexOf(nome.toLowerCase()) > -1) {
                var id = dados[i].id;
                var nome = dados[i].nome;
                var descricao = dados[i].descricao;

                $("#listarArtesAdm").append("<div id='" + id + "' class='item item-icon-right'><a href='#page37' style='text-decoration: none; color: #444!important;' onclick='preencherArteAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")'" +
                    "                           class=\"item-icon-left\">\n" +
                    "                    <i class=\"icon ion-android-create dark\"></i>" + nome + "</a>\n" +
                    "                    <a class=\"assertive icon ion-ios-close-outline\" onclick='excluirArte(" + id + ")'></a>\n" +
                    "                    </div>");
            }
        }
    } else {
        $("#buttonIcon").attr("onclick", 'addSearch()');
        for (var i = 0; i < dados.length; i++) {
            var id = dados[i].id;
            var nome = dados[i].nome;
            var descricao = dados[i].descricao;

            $("#listarArtesAdm").append("<div id='" + id + "' class='item item-icon-right'><a href='#page37' style='text-decoration: none; color: #444!important;' onclick='preencherArteAtualizar(" + id + ",\"" + nome + "\",\"" + descricao + "\")'" +
                "                           class=\"item-icon-left\">\n" +
                "                    <i class=\"icon ion-android-create dark\"></i>" + nome + "</a>\n" +
                "                    <a class=\"assertive icon ion-ios-close-outline\" onclick='excluirArte(" + id + ")'></a>\n" +
                "                    </div>");
        }
    }
}

function preencherArteAtualizar(idArte, nome, descricao) {
    setTimeout(function () {
        $("#nomeArteUp").val(nome);
        $("#descArteUp").val(descricao);
        $("#updateArteBtn").attr('onclick', "updateArte(" + idArte + ")");
    }, 1000);
}

function updateArte(id) {
    var nome = $("#nomeArteUp").val();
    var desc = $("#descArteUp").val();
    if (validarVazio(nome) && validarVazio(desc)) {
        console.log(id, nome, desc)
        var json = servidor + "/Secult/arte/alterarArte/" + id + "&" + nome + "&" + desc;
        console.log(json)
        var onSuccess = function (result) {
            var status = result.status;

            if (status == "ok") {
                window.location.href = "#page38";
                listarArtesAdm()
            }
            ;
        };
        $.getJSON(json, onSuccess).fail();
    } else {
        swal("Preencha todos os campos!");
    }
}



function preencherArtes() {
    $("#idArtes").empty();
    var json = servidor + "/Secult/arte/listarArte";

    var onSuccess = function (result) {

        dados = result.artes;
        if (dados[0]) {
            
            for (var i in dados) {
                if (dados[i].nome != 'null') {

                    var id = dados[i].id;
                    var nome = dados[i].nome;
                    $("#idArtes").append("<option value='" + id + "'  >" + nome + "</option>");
                }
            }
            
        }
    };
    $.getJSON(json, onSuccess).done()
    listarArtistasPorArte(1)
}

function listarArtesArtista(id) {
    var arte1 = "";
    var arte2 = "";
    var arte3 = "";
    $.getJSON(servidor + "/Secult/arteArtista/listarArtesArtista/" + id, function (result) {
        var artes = result.artes;
       
        if (artes[0]) {
           console.log(artes[0].nome != "null")
           if (artes[0].nome != "null")  $("#arte1").text( artes[0].nome);
        }
        if (artes[1]) {
            if (artes[0].nome != "null") $("#arte2").text( artes[0].nome);
        }
        if (artes[2]) {
            if (artes[2].nome != "null") $("#arte3").text( artes[2].nome);
        }

    })
}

function preencherArtesArtistaUpdate(id) {
    $.getJSON(servidor + "/Secult/arteArtista/listarArtesArtista/" + id, function (result) {
        var artes = result.artes
        for (var i in artes) {
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
        if (el == "cdt") $("#artesSelecLista").append("<li id='" + id + "'>" + nome + " <i style=\"float:right\" class=\"assertive icon ion-close\" onclick=\"$(this).parent().remove(), validacaoEtapa2(),contarArtes()\"></i></li>\n")
        if (el == "up") $("#artesSelecLista").append("<li style='color: #262626!important' id='" + id + "'>" + nome + " <i style=\"float:right\" class=\"assertive icon ion-close\" onclick=\"$(this).parent().remove(), validacaoEtapa2(),contarArtes()\"></i></li>\n")

    }
    $("#cdtArte").val(0);
}

function contarArtes() {
    setTimeout(function () {
        contarArtes()
        var quantidade = $("#artesSelecLista li").length;
        $("#numArte").text(quantidade + "/3");
        if (quantidade == 3) {
            $("#cdtArte").css('visibility', 'hidden')
        } else {
            $("#cdtArte").css('visibility', 'initial')
        }
    }, 10)
}


function inserirArteArtista(idArte, idArtista) {
    var resultado = false;
    var json = servidor + "/Secult/arteArtista/inserirArteArtista/" + idArte + "&" + idArtista;
    var onSuccess = function (result) {
        if (result.status == "ok") {
            resultado = true;
        }
    };
    $.getJSON(json, onSuccess).done(
        carregando(2)
    ).fail(

    );
    return resultado;
}

function deleteArteArtista(idArtista) {
    var resultado = false;

    var json = servidor + "/Secult/arteArtista/deleteArteArtista/" + idArtista;
    var onSuccess = function (result) {
        if (result.status == "ok") {
            resultado = true;

        }
    };
    $.getJSON(json, onSuccess).done(
        carregando(2)
    ).fail(

    );
    return resultado;

}

function excluirArte(id) {
    swal({
        title: "Deseja excluir essa localidade?",
        text: "Uma vez excluida não tem como recuperar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        carregando(1)
        if (willDelete) {
            var json = servidor + "/Secult/arte/excluirArte/" + id;
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