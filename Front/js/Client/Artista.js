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
    if (descricaoArtista != "" && idadeArtista != "") {
        $("#proximo3").attr('disabled', false)
    } else {
        $("#proximo3").attr('disabled', true)
    }
}

function chamarEtapa4() {
    var interval = 1000;
    $('#telCadastro, #emailCadastro').keyup(function () {
        // começa a contar o tempo
        clearInterval(interval);
        // 500ms após o usuário parar de digitar a função é chamada
        interval = window.setTimeout(function () {
            validacaoEtapa4
        }, 500);
    });
}

function verificarEmailCdt(el) {

    if (verficarEmail(el)) {
        validacaoEtapa4()
    } else {
        $("#emailErro").show();
        setTimeout(function () {
            $("#emailErro").hide();
        }, 5000)
    }
}

function verificarEmailCdt(el) {

    if (el.length == 13) {
        validacaoEtapa4()
    } else {

    }
}

function validacaoEtapa4() {

    var emailCadastro = $("#emailCadastro").val();
    var telCadastro = $("#telCadastro").val();
    if (verficarEmail(emailCadastro) && telCadastro.length == 13 && emailCadastro != "" && telCadastro != "") {
        $("#proximo4").attr('disabled', false)
    } else {
        $("#proximo4").attr('disabled', true)
    }
}

//
// var intervalo = 0;
// $("#emailCadastro").keyup(function(){
//
//     clearInterval( intervalo );//ou clearTimeout()
//     intervalo = window.setTimeout( ajax, 1000 );
// });



function validacaoEtapa5() {
    var inputImagem = $("#inputImagem").val();
    var senhaCadastro = $("#senhaCadastro").val();
    if (inputImagem != "" && senhaCadastro != "") {
        $("#proximo5").attr('disabled', false)
    } else {
        $("#proximo5").attr('disabled', true)
    }
}


function cadastrarArtista() {
    var nomeCompleto = $("#nomeCompleto").val();
    var nomeArtistico = $("#nomeArtistico").val();
    var descricaoArtista = $("#descricaoArtista").val();
    var idadeArtista = $("#idadeArtista").val();
    var generoArtista = $("#generoArtista").val();
    var senhaCadastro = $("#senhaCadastro").val();
    var json = servidor + "/Secult/usuario/insertUsuarioArtista/" + nomeCompleto + "&" + generoArtista + "&" + senhaCadastro + "&" + idadeArtista + "&" + nomeArtistico + "&" + descricaoArtista;
    var onSuccess = function (result) {
        var id = result.id_usuario;
        if (id != 0) {
            inserirImagem(id, "U");
            cadastrarContato(id)

            for (var i = 0; i < 3; i++) {
                var idArte = $("#artesSelecLista li")
                if (idArte[i] != undefined) {
                    inserirArteArtista(idArte[i].id, id)
                } else {
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


function alterarArtista() {
    var id = localStorage.getItem('id')
    var nomeCompleto = $("#nomeUp").val();
    var nomeArtisticoUp = $("#nomeArtisticoUp").val();
    var descricaoUp = $("#descricaoUp").val();
    var idadeUp = $("#idadeUp").val();
    var sexoUp = $("#sexoUp").val();
    var senhaCadastro = $("#senhaCadastro").val();
    var json = servidor + "/Secult/usuario/alterarUsuarioArtista/" + nomeCompleto + "&" + sexoUp + "&" + idadeUp + "&" + nomeArtisticoUp + "&" + descricaoUp + "&" + id;
    var onSuccess = function (result) {
        var status = result.status;
        if (status == "ok") {
            autenticarUsuarioById(id)

            atualizarImagem(id, "U");
            updateContato(id)
            deleteArteArtista(id)
            for (var i = 0; i < 3; i++) {
                var idArte = $("#artesSelecLista li")
                if (idArte[i] != undefined) {
                    inserirArteArtista(idArte[i].id, id)
                } else {
                    inserirArteArtista(0, id)
                }
            }

        } else {
            alert('Erro no cadastro, tente novamente ou contate o suporte!')
        }
    }
    $.getJSON(json, onSuccess).fail();
}

function listarArtistasPorArte(idArte) {
    $("#artistasPorArte").empty();
    var json = servidor + "/Secult/usuario/listarAristasPorArte/" + idArte;
    $.getJSON(json, function (result) {
        var dados = result.artistas;
        if (dados[0]) {

            for (var i in dados) {
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var id = dados[i].id;
                var nome = dados[i].nome;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&U";
                var estado = "disponivel"

                $("#artistasPorArte").append("<a  class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\" onclick='carregarInformacoesArtistas(\"" + id + "\",\"" + nomeArtistico + "\",\"" + descricao + "\",\"" + sexo + "\",\"" + idade + "\",\"" + estado + "\",\"" + urlImagem + "\",\"" + nome + "\",\"indoArtistasPorArte\")''>\n" +
                    "                <img  src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p> <span id='arte1" + id + "'>&nbsp</span> <span id='arte2" + id + "'>&nbsp&nbsp&nbsp&nbsp</span> <span id='arte3" + id + "'></span></p>\n" +
                    "                <i  class='icon ion-information-circled item-note' style='font-size: 1.3rem'></i>\n" +
                    "            </a>");
                listarArtesArtista(id);
            }
            $("#idArtes option[value=1]").attr('selected', true)

        }
    })

}

function listarArtistas() {
    $("#listaCadart").empty();
    var json = servidor + "/Secult/usuario/listarArtistasAutenticados";
    $.getJSON(json, function (result) {

        $("#listaCadart").empty();
        var dados = result.artistas;
        if (dados[0]) {
            localStorage.setItem("usuariosCadart", JSON.stringify(dados))

            for (var i in dados) {
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var id = dados[i].id;
                var nome = dados[i].nome;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&U";
                var estado = "disponivel"

                $("#listaCadart").append("<a class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\" onclick='carregarInformacoesArtistas(\"" + id + "\",\"" + nomeArtistico + "\",\"" + descricao + "\",\"" + sexo + "\",\"" + idade + "\",\"" + estado + "\",\"" + urlImagem + "\",\"" + nome + "\")''>\n" +
                    "                <img  src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p> <span id='arte1" + id + "'>&nbsp</span> <span id='arte2" + id + "'>&nbsp&nbsp&nbsp&nbsp</span> <span id='arte3" + id + "'></span></p>\n" +
                    "                <i  class='icon ion-information-circled item-note' style='font-size: 1.3rem'></i>\n" +
                    "            </a>");
                listarArtesArtista(id);
            }
        }
    })

}

function listarArtistasNaoAutenticados() {
    $("#listaCadartAutentiar").empty();
    var json = servidor + "/Secult/usuario/listarAristasNaoAutenticados";
    $.getJSON(json, function (result) {
        $("#listaCadart").empty();
        dados = result.artistas;
        if (dados[0]) {

            for (var i in dados) {
                var idArtista = dados[i].id;
                var nomeArtistico = dados[i].nomeArtistico;
                var nomeCompleto = dados[i].nome;
                var descricao = dados[i].descricao;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + idArtista + "&U";
                var estado = "nAutenticado"

                $("#listaCadartAutentiar").append("<a  onclick='carregarInformacoesArtistasAutenticar(\"" + idArtista + "\",\"" + nomeArtistico + "\",\"" + descricao + "\",\"" + sexo + "\",\"" + idade + "\",\"" + estado + "\",\"" + urlImagem + "\",\"" + nomeCompleto + "\")'   class=\"item item-avatar item-icon-right\">\n" +
                    "<img id='" + idArtista + "' src='" + urlImagem + "' onError='this.onerror=null;this.src=\"./img/semfoto.png>\"' \n" +
                    "<h2>" + nomeArtistico + "</h2>\n" +
                    "</a>")
            }
        }
    })

}

function listarArtistasAutenticados() {
    $("#listaCadartAdm").empty();
    var json = servidor + "/Secult/usuario/listarArtistasAutenticados";
    $.getJSON(json, function (result) {
        $("#listaCadart").empty();
        dados = result.artistas;
        if (dados[0]) {
            for (var i in dados) {
                var idArtista = dados[i].id;
                var nomeArtistico = dados[i].nomeArtistico;
                var nomeCompleto = dados[i].nome;
                var descricao = dados[i].descricao;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + idArtista + "&U";
                var estado = "autenticado"


                $("#listaCadartAdm").append("<a onclick='carregarInformacoesArtistasAutenticar(\"" + idArtista + "\",\"" + nomeArtistico + "\",\"" + descricao + "\",\"" + sexo + "\",\"" + idade + "\",\"" + estado + "\",\"" + urlImagem + "\",\"" + nomeCompleto + "\")'   class=\"item item-avatar item-icon-right\">\n" +
                    "<img id='" + idArtista + "' src='" + urlImagem + "' onError='this.onerror=null;this.src=\"./img/semfoto.png>\"' \n" +
                    "<h2>" + nomeArtistico + "</h2>\n" +
                    "</a>")
            }
        }
    })

}


function AutenticarVisibilidade(id, acao) {
    var json;
    if (acao == "A") {
        json = servidor + "/Secult/artista/updateVisibilidadeS/" + id;
    } else {
        json = servidor + "/Secult/artista/updateVisibilidadeN/" + id;
    }

    $.getJSON(json, function (result) {
        if (result.status == 'ok') {
            window.history.back();
            listarArtistasAutenticados();
            listarArtistasNaoAutenticados();
        }
    })
}


function carregarInformacoesArtistas(idArtista, nomeArtistico, descricao, sexo, idade, estado, urlImagem, nome, origem) {
    if (origem == 'indoArtistasPorArte') {
        window.location.href = "#page34";
        $("#page34 .title").append(nomeArtistico);
    } else {
        window.location.href = "#/page1/page35";
    }
    var arte1 = "";
    var arte2 = "";
    var arte3 = "";
    $.getJSON(servidor + "/Secult/arteArtista/listarArtesArtista/" + idArtista, function (result) {
        var artes = result.artes;
        if (artes[0]) {
            if (artes[0].nome != 'undefined') arte1 = artes[0].nome;
        }
        if (artes[1]) {
            if (artes[1].nome != 'undefined') arte1 = artes[1].nome;
        }
        if (artes[2]) {
            if (artes[2].nome != 'undefined') arte1 = artes[2].nome;
        }


    })
    setTimeout(function () {

        $("#page35 .title").append(nomeArtistico);
        $("#imgInfo").attr('src', urlImagem);
        $("#imgInfo").attr('onError', 'this.onerror=null;this.src=' + urlImagem + '');
        $("#nomeCompletoInfo").text(nome);
        $("#idadeInfo").text(idade + " anos");
        $("#descricaoInfo").text(descricao);
        if (sexo == 'M') {
            sexo = 'Masculino'
            $("#iconSexoInfo").removeClass("ion-help-circled")
            $("#iconSexoInfo").removeClass("ion-woman")
            $("#iconSexoInfo").addClass("ion-man")
        } else if (sexo == "F") {
            sexo = 'Feminino'
            $("#iconSexoInfo").removeClass("ion-help-circled")
            $("#iconSexoInfo").removeClass("ion-man")
            $("#iconSexoInfo").addClass("ion-woman")
        } else {
            sexo = 'Não informado'
            $("#iconSexoInfo").removeClass("ion-woman")
            $("#iconSexoInfo").removeClass("ion-man")
            $("#iconSexoInfo").addClass("ion-help-circled")
        }
        $("#sexoInfo").text(sexo);
        if (arte1 != "null") $("#arte1").text(arte1);
        if (arte2 != "null") $("#arte2").text(arte2);
        if (arte3 != "null") $("#arte3").text(arte3);
    }, 100);

    var json = servidor + "/Secult/contato/listarContatos/" + idArtista;
    $.getJSON(json, function (result) {
        var dados = result.contatos;

        if (dados[0]) {
            for (var i in dados) {
                var email = dados[i].email;
                var telefone = dados[i].telefone;
                var facebook = dados[i].facebook;
                var youtube = dados[i].youtube;
                var instagram = dados[i].instagram;
                facebook = facebook.replace(/[*]/g, '/').replace(/[¨]/g, '?').replace(/[§]/g, '&')
                youtube = youtube.replace(/[*]/g, '/').replace(/[¨]/g, '?').replace(/[§]/g, '&')
                instagram = instagram.replace(/[*]/g, '/').replace(/[¨]/g, '?').replace(/[§]/g, '&')
                $("#fbInfo").attr('href', facebook);
                $("#ytInfo").attr('href', youtube);
                $("#inInfo").attr('href', "https://www.instagram.com/" + instagram);
                $("#emailInfo").text(email);
                $("#telInfo").text(telefone);
                $("#linkWpp").attr('href', 'https://wa.me/55' + telefone.replace(/[^0-9]/g, ''));


            }
        }
    })


}

function carregarInformacoesArtistasAutenticar(idArtista, nomeArtistico, descricao, sexo, idade, estado, urlImagem, nome) {
    console.log('nome ' + nome)
    window.location.href = "#/page31";
    if (estado == "nAutenticado") {
        $("#footerBarra").show()
        $("#footerBarra").attr('onclick', 'AutenticarVisibilidade(' + idArtista + ',"A")');
    }
    if (estado == "autenticado") {
        $("#footerBarra").show()
        $("#footerBarra").attr('onclick', 'AutenticarVisibilidade(' + idArtista + ',"D")').text('Desautenticar');
    }
    setTimeout(function () {
        $("#page35 .title").append(nomeArtistico);
        $("#imgInfo").attr('src', urlImagem);
        $("#imgInfo").attr('onError', 'this.onerror=null;this.src=' + urlImagem + '');
        $("#nomeCompletoInfo").text(nome);
        $("#idadeInfo").text(idade + " anos");
        $("#descricaoInfo").text(descricao);
        if (sexo == 'M') {
            sexo = 'Masculino'
            $("#iconSexoInfo").removeClass("ion-help-circled")
            $("#iconSexoInfo").removeClass("ion-woman")
            $("#iconSexoInfo").addClass("ion-man")
        } else if (sexo == "F") {
            sexo = 'Feminino'
            $("#iconSexoInfo").removeClass("ion-help-circled")
            $("#iconSexoInfo").removeClass("ion-man")
            $("#iconSexoInfo").addClass("ion-woman")
        } else {
            sexo = 'Não informado'
            $("#iconSexoInfo").removeClass("ion-woman")
            $("#iconSexoInfo").removeClass("ion-man")
            $("#iconSexoInfo").addClass("ion-help-circled")
        }
        $("#sexoInfo").text(sexo);

    }, 100);

    var json = servidor + "/Secult/contato/listarContatos/" + idArtista;
    $.getJSON(json, function (result) {
        var dados = result.contatos;

        if (dados[0]) {
            for (var i in dados) {
                var email = dados[i].email;
                var telefone = dados[i].telefone;
                var facebook = dados[i].facebook;
                var youtube = dados[i].youtube;
                var instagram = dados[i].instagram;
                facebook = facebook.replace(/[*]/g, '/').replace(/[¨]/g, '?').replace(/[§]/g, '&')
                youtube = youtube.replace(/[*]/g, '/').replace(/[¨]/g, '?').replace(/[§]/g, '&')
                instagram = instagram.replace(/[*]/g, '/').replace(/[¨]/g, '?').replace(/[§]/g, '&')
                $("#fbInfo").attr('href', facebook);
                $("#ytInfo").attr('href', youtube);
                $("#inInfo").attr('href', "https://www.instagram.com/" + instagram);
                $("#emailInfo").text(email);
                $("#telInfo").text(telefone);
                $("#linkWpp").attr('href', 'https://wa.me/55' + telefone.replace(/[^0-9]/g, ''));


            }
        }
    })


}


function limparCampos() {
    var camposInp = $("input")
    var camposSelect = $("select")
    for (var i = 0; i < camposInp.length; i++) {
        $(camposInp[i]).val('');
    }
    for (var i = 0; i < camposSelect.length; i++) {
        $(camposSelect[i]).val(0);
    }
}

function cadastroClick() {
    $("#descricaoArtista").val('')
    $("#imgThumbnail").attr('src', './img/user-foto.png')
    $("#artesSelecLista li").remove()
    posicaoCadastro('estagio4')
    $('#cdt-seguranca, #cdt-pessoal, #cdt-contato, #cdt-divulgacao, #cdt-descricao').hide()
    $('#cdt-inicio').show()
    posicaoCadastro("estagio1")
    $('.cadastrar').css('height', tamanhoTela())
    limparCampos()
    $("#artesSelecLista li").remove()
    swal({
        title: "Cadastrado!",
        text: "Aguarde nosso pessoal validar seus dados!",
        icon: "success",
        button: false,
    });
    setTimeout(function () {
        window.location.href = "#/page3";
    }, 2000)
}


function contarDescricao() {
    setTimeout(function () {
        var quantidade = $("#descricaoArtista").val().length;
        $("#numCaractDescricao").text(quantidade + "/500");
    }, 10)
}

function autenticarUsuario(email, senha) {
    var json = servidor + "/Secult/artista/autenticarUsuario/" + email + "&" + senha;
    $.getJSON(json, function (result) {
        var usuario = result.artista;
        if (usuario[0]) {
            if (usuario[0]) {

                var id = usuario[0].id;
                var nome = usuario[0].nome;
                var sexo = usuario[0].sexo;
                var idade = usuario[0].idade;
                var nomeArtistico = usuario[0].nomeArtistico;
                var descricao = usuario[0].descricao;
                var email = usuario[0].email;
                var telefone = usuario[0].telefone;
                var facebook = usuario[0].facebook;
                var youtube = usuario[0].youtube;
                var instagram = usuario[0].instagram;
                var tipo = usuario[0].tipo;
                var imagem = servidor + "/Secult/imagem/findETC/" + id + "&U";


                localStorage.setItem("id", id);
                localStorage.setItem("nome", nome);
                localStorage.setItem("sexo", sexo);
                localStorage.setItem("idade", idade);
                localStorage.setItem("nomeArtistico", nomeArtistico);
                localStorage.setItem("descricao", descricao);
                localStorage.setItem("email", email);
                localStorage.setItem("telefone", telefone);
                localStorage.setItem("facebook", facebook);
                localStorage.setItem("youtube", youtube);
                localStorage.setItem("instagram", instagram);
                localStorage.setItem("tipo", tipo);
                localStorage.setItem("fotoUsuario", imagem);
                localStorage.setItem("usuarioAtivo", "true")


                $("#email").val('');
                $("#senha").val('');

                if (tipo == 1) {
                    setTimeout(function () {
                        $(".alt-estado").toggle()
                        $(".fAdm").hide()
                        localStorage.setItem("admOn", 'true');
                        $(".funcoesAdministrativas").show();
                        window.location.href = "#/page22";
                    }, 100)
                } else {
                    setTimeout(function () {
                        $(".fAdm").show()
                        window.location.href = "#/page1/page3";
                        setTimeout(function () {
                            $(".alt-estado").toggle()
                        }, 100)

                    }, 1000)
                }


            } else {
                $("#validoEmail").text('')
                $("#validoEmail").text("Email e/ou senha inválidos");
            }
        }
    }).fail();
}

function autenticarUsuarioById(id) {
    var json = servidor + "/Secult/artista/autenticarUsuarioById/" + id;
    $.getJSON(json, function (result) {
        var usuario = result.artista;
        if (usuario[0]) {
            if (usuario[0]) {
                $.getJSON(servidor + "", function (result) {

                }).fail()
                var id = usuario[0].id;
                var nome = usuario[0].nome;
                var sexo = usuario[0].sexo;
                var idade = usuario[0].idade;
                var nomeArtistico = usuario[0].nomeArtistico;
                var descricao = usuario[0].descricao;
                var email = usuario[0].email;
                var telefone = usuario[0].telefone;
                var facebook = usuario[0].facebook;
                var youtube = usuario[0].youtube;
                var instagram = usuario[0].instagram;
                var tipo = usuario[0].tipo;
                var imagem = servidor + "/Secult/imagem/findETC/" + id + "&U";


                localStorage.setItem("id", id);
                localStorage.setItem("nome", nome);
                localStorage.setItem("sexo", sexo);
                localStorage.setItem("idade", idade);
                localStorage.setItem("nomeArtistico", nomeArtistico);
                localStorage.setItem("descricao", descricao);
                localStorage.setItem("email", email);
                localStorage.setItem("telefone", telefone);
                localStorage.setItem("facebook", facebook);
                localStorage.setItem("youtube", youtube);
                localStorage.setItem("instagram", instagram);
                localStorage.setItem("tipo", tipo);
                localStorage.setItem("fotoUsuario", imagem);
                localStorage.setItem("usuarioAtivo", "true")


                $("#email").val('');
                $("#senha").val('');


            } else {
                $("#validoEmail").text('')
                $("#validoEmail").text("Email e/ou senha inválidos");
            }
        }
    }).fail();
}


function usuarioLogado() {
    setTimeout(function () {
        $("#nomeUp").val(localStorage.getItem("nome"));
        $("#idadeUp").val(localStorage.getItem("idade"));
        $("#emailUp").val(localStorage.getItem("email"));
        $("#telUp").val(localStorage.getItem("telefone"));
        $("#descricaoUp").val(localStorage.getItem("descricao"));
        $("#nomeArtisticoUp").val(localStorage.getItem("nomeArtistico"));
        $("#sexoUp").val(localStorage.getItem("sexo"))


        $("#imgThumbnail").attr('src', servidor + "/Secult/imagem/findETC/" + localStorage.getItem("id") + "&U");
        $("#telUp").mask("00-00000-0000");
        $("#redeSocial1").val(localStorage.getItem("facebook"));
        $("#redeSocial2").val(localStorage.getItem("youtube"));
        $("#redeSocial3").val(localStorage.getItem("instagram"));


        preencherArtesArtistaUpdate(localStorage.getItem("id"))
    }, 1000)
}

function validarEmail(field) {
    var usuario = field.substring(0, field.indexOf("@"));
    var dominio = field.substring(field.indexOf("@") + 1, field.length);


    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {

        return true
    }
    else {
        $("#emailErro").show()
        setTimeout(function(){
            $("#emailErro").hide()
        },5000)
        return false
    }
}

function verficarEmail(email) {

    var res = null;
    if (validarEmail(email)) {
        $.ajax({
            url: servidor + '/Secult/usuario/verificarEmail/' + email,
            async: false,
            dataType: 'json',
            success: function (result) {
                if (result.status == "ok") {
                    res = false
                    $("#emailErro").show();
                    $("#proximo4").attr('disabled', true)

                } else {
                    $("#emailErro").hide()
                    res = true
                }
            }
        });

    }
    return res


}

function buscarCadart(nome) {
    var dados = JSON.parse(localStorage.getItem('usuariosCadart'))
    $("#listaCadart").empty()
    if (nome != "") {

        for (var i = 0; i < dados.length; i++) {
            if (dados[i].nomeArtistico.toLowerCase().indexOf(nome.toLowerCase()) > -1) {
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var id = dados[i].id;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&U";
                var estado = "disponivel"

                $("#listaCadart").append("<a class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\" onclick='carregarInformacoesArtistas(\"" + id + "\",\"" + nomeArtistico + "\",\"" + descricao + "\",\"" + sexo + "\",\"" + idade + "\",\"" + estado + "\",\"" + urlImagem + "\",\"" + dados[i].nome + "\")''>\n" +
                    "                <img  src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p> <span id='arte1" + id + "'>&nbsp</span> <span id='arte2" + id + "'>&nbsp&nbsp&nbsp&nbsp</span> <span id='arte3" + id + "'></span></p>\n" +
                    "                <i  class='icon ion-information-circled item-note' style='font-size: 1.3rem'></i>\n" +
                    "            </a>");
            }
        }
    } else {
        for (var i = 0; i < dados.length; i++) {
            var nomeArtistico = dados[i].nomeArtistico;
            var descricao = dados[i].descricao;
            var id = dados[i].id;
            var nome = dados[i].nome;
            var sexo = dados[i].sexo;
            var idade = dados[i].idade;
            var urlImagem = servidor + "/Secult/imagem/findETC/" + id + "&U";
            var estado = "disponivel"

            $("#listaCadart").append("<a class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\" onclick='carregarInformacoesArtistas(\"" + id + "\",\"" + nomeArtistico + "\",\"" + descricao + "\",\"" + sexo + "\",\"" + idade + "\",\"" + estado + "\",\"" + urlImagem + "\",\"" + nome + "\")''>\n" +
                "                <img  src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                "                <h2>" + nomeArtistico + "</h2>\n" +
                "                <p> <span id='arte1" + id + "'>&nbsp</span> <span id='arte2" + id + "'>&nbsp&nbsp&nbsp&nbsp</span> <span id='arte3" + id + "'></span></p>\n" +
                "                <i  class='icon ion-information-circled item-note' style='font-size: 1.3rem'></i>\n" +
                "            </a>");
            listarArtesArtista(id);
        }
    }
}


