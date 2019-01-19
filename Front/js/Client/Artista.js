function validacaoEtapa2() {
    setTimeout(function () {

        var nomeCompleto = $("#nomeCompleto").val();
        var nomeArtistico = $("#nomeArtistico").val();
        var numeroArte = $("#artesSelecLista li").length
        if (nomeCompleto != "" && nomeArtistico != "" && numeroArte > 0) {
            $("#proximo2").attr('disabled', false)
        } else {
            $("#proximo2").attr('disabled', true)

        }
    }, 10)

}

function validacaoEtapa3() {
    var descricaoArtista = $("#descricaoArtista").val();
    var idadeArtista = $("#idadeArtista").val();
    var generoArtista = $("#generoArtista").val();
    if (descricaoArtista != "" && idadeArtista != "" && generoArtista != "0") {
        $("#proximo3").attr('disabled', false)
    } else {
        $("#proximo3").attr('disabled', true)
    }
}

function validacaoEtapa4() {
    var emailCadastro = $("#emailCadastro").val();
    var telCadastro = $("#telCadastro").val();
    if (emailCadastro != "" && telCadastro != "") {
        $("#proximo4").attr('disabled', false)
    } else {
        $("#proximo4").attr('disabled', true)
    }
}

function validacaoEtapa5() {
    var inputImagem = $("#inputImagem").val();
    var senhaCadastro = $("#senhaCadastro").val();
    if (inputImagem != "" && senhaCadastro != "") {
        $("#proximo5").attr('disabled', false)
    } else {
        $("#proximo5").attr('disabled', true)
    }
}

function addArteLista() {
    var nome = $("#cdtArte option:selected").text()
    var id = $("#cdtArte option:selected").val()
    var listaSelecionados = $("#artesSelecLista li")
    var existe = false
    for (var i = 0; i < listaSelecionados.length; i++) {
        if (listaSelecionados[i].id == id || id == "0" || listaSelecionados.length == 3) {
            existe = true;
        }
    }
    if (existe == false) {
        $("#artesSelecLista").append("<li id='" + id + "'>" + nome + " <i style=\"float:right\" class=\"assertive icon ion-close\" onclick=\"$(this).parent().remove(), validacaoEtapa2(),contarArtes()\"></i></li>\n")
    }
    $("#cdtArte").val(0);
}

function cadastrarArtista() {
    var nomeCompleto = $("#nomeCompleto").val();
    var nomeArtistico = $("#nomeArtistico").val();
    var descricaoArtista = $("#descricaoArtista").val();
    var idadeArtista = $("#idadeArtista").val();
    var generoArtista = $("#generoArtista").val();
    var emailCadastro = $("#emailCadastro").val();
    var telCadastro = $("#telCadastro").val();
    var senhaCadastro = $("#senhaCadastro").val();
    var json = servidor + "/Secult/usuario/insertUsuarioArtista/" + nomeCompleto + "&" + generoArtista + "&" + senhaCadastro + "&" + idadeArtista + "&" + nomeArtistico + "&" + descricaoArtista;
    var onSuccess = function (result) {
        var id = result.id_usuario;
        if (id != 0) {
            inserirImagem(id, "U");
            cadastrarContato(id)

            for(var i =0; i<3; i++){
                var idArte = $("#artesSelecLista li")
                if(idArte[i]!=undefined){
                    inserirArteArtista(idArte[i].id, id)
                }else{
                    inserirArteArtista(0, id)
                }

            }
            cadastroClick()
        } else {
            alert('Erro no cadastro, tente novamente ou contate o suporte!')
        }
    }
    $.getJSON(json, onSuccess).fail();
}

function listarArtistas() {
    $("#listaCadart").empty();
    var json = servidor + "/Secult/usuario/listarArtistasAutenticados";
    $.getJSON(json, function (result) {
        $("#listaCadart").empty();
        dados = result.artistas;
        if (dados[0]) {

            for (var i in dados) {
                var idArtista = dados[i].idArtista;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var id = dados[i].id;
                var nome = dados[i].nome;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&U";

                $("#listaCadart").append("<a href='#/page16'   class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\">\n" +
                    "                <img  src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p> Arte </p>\n" +
                    "            </a>")
            }
        }
    })

}

function listarArtistasNaoAutenticados() {
    $("#listaCadart").empty();
    var json = servidor + "/Secult/usuario/listarArtistasNaoAutenticados";
    $.getJSON(json, function (result) {
        $("#listaCadart").empty();
        dados = result.artistas;
        if (dados[0]) {

            for (var i in dados) {
                var idArtista = dados[i].idArtista;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var id = dados[i].id;
                var nome = dados[i].nome;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&U";

                $("#listaCadart").append("<a href='#/page16'   class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\">\n" +
                    "                <img  src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p> Arte </p>\n" +
                    "            </a>")
            }
        }
    })

}
function limparCampos(){
    var camposInp = $("input")
    var camposSelect = $("select")
    for(var i = 0; i < camposInp.length; i++){
        $(camposInp[i]).val('');
    }
    for(var i = 0; i < camposSelect.length; i++){
        $(camposSelect[i]).val(0);
    }
}
function cadastroClick(){
    $("#artesSelecLista li").remove()
    posicaoCadastro('estagio4')
    $('#cdt-seguranca').hide()
    $('.cadastrar').css('height', tamanhoTela())
    limparCampos()
    $("#artesSelecLista li").remove()
}


function contarDescricao() {
    setTimeout(function () {
        var quantidade = $("#descricaoArtista").val().length;
        $("#numCaractDescricao").text(quantidade + "/500");
    }, 10)
}