servidor = localStorage.getItem("servidor");

function saveFotoLS() {

    //document.getElementById("tableBanner").style.display = "none";
    var bannerImage = document.getElementById("bannerImg");

    var img = document.getElementById("tableBanner");

    bannerImage.addEventListener("change", function () {

        var file = this.files[0];
        if (file.type.indexOf("image") < 0) {
            alert("arquivo invalido");
            bannerImage.value = "";
            return;
        }
        var fReader = new FileReader();
        fReader.onload = function () {
            img.onload = function () {

                localStorage.setItem("imagemSalva", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });

}

function saveFotoLSUp() {

    $("#bannerImg").click();
    var bannerImage = document.getElementById("bannerImg");

    var img = document.getElementById("tableBanner");

    bannerImage.addEventListener("change", function () {

        var file = this.files[0];
        if (file.type.indexOf("image") < 0) {
            alert("arquivo invalido");
            bannerImage.value = "";
            return;
        }
        var fReader = new FileReader();
        fReader.onload = function () {
            img.onload = function () {

                localStorage.setItem("fotoCadastro", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });

}

function mascarasCadart() {
    $("#dataNascimentoCdt").mask("00");
    $("#telCdt").mask("00-00000-0000");
    $("#cpfCdt").mask("000.000.000-00");
}

function verificarCpf() {
    $("#cpfCdt").keyup(function () {
        if ($("#cpfCdt").val() != '') {
            var cpf = $("#cpfCdt").val();
            cpf = cpf.replace(/[^0-9]/g, '');
            if (isCpf(cpf) == false) {
                $("#cpfCdtInvalido").show('pulsate');
            } else {
                $("#cpfCdtInvalido").hide();
            }
        } else {
            $("#cpfCdtInvalido").hide();
        }
    })
}

function verificarTel() {
    $("#telCdt").keyup(function () {
        if ($("#telCdt").val() != '') {
            if ($("#telCdt").val().length < 13 & $("#telCdt").val().length > 0) {
                $("#telInvalido").show('pulsate');
            } else {
                $("#telInvalido").hide();
            }
        } else {
            $("#telInvalido").hide();
        }
    })
}

function verificarIdade() {
    var idade = $("#dataNascimentoCdt").val();

    if (idade.length > 2) {
        $("#idadeInvalido").show('pulsate');
        return false
    } else {
        return true
    }
}

function verificarSenha() {
    $("#senhaCdt").keyup(function () {

        var senha = $("#senhaCdt").val();
        if (senha.length > 0 & senha.length < 6) {
            $("#senhaCdtInvalido").show('pulsate');
        } else {
            $("#senhaCdtInvalido").hide();
        }
    });
    $("#senhaRedCdt").keyup(function () {
        var senhaRed = $("#senhaRedCdt").val();
        var senha = $("#senhaCdt").val();

        if (senhaRed == senha & senhaRed != "") {
            $("#senhaRedCdtInvalido").hide();
        } else {
            $("#senhaRedCdtInvalido").show('pulsate');

        }
    });
}


function validarCampos() {
    var descricao = $("#descricaoCdt").val();
    var projetos = $("#projetosCdt").val();
    var nome = $("#nomeCdt").val();
    var nomeArt = $("#nomeArtCdt").val();
    var cpf = $("#cpfCdt").val();
    cpf = cpf.replace(/[^0-9]/g, '');
    var tel = $("#telCdt").val();
    var dtNascimento = $("#dataNascimentoCdt").val();
    var sexo = $("#sexoCdt").val();
    var arte = $("#arteCdt").val();
    var senha = $("#senhaCdt").val();
    var senhaRed = $("#senhaRedCdt").val();
    if (isCpf(cpf) & nome != "" & descricao != "" & projetos != "" & validarEmail('emalCdt') & tel.length == 13 & nomeArt != "" & arte != "" & senha != "" & dtNascimento != "" & sexo != "") {
        if (senha === senhaRed) {
            cadastrarCdt();
        }
    } else {
        $("#cadastroRedCdtInvalido").show('pulsate');
    }

}


function cadastrarCdt() {
    var descricao = $("#descricaoCdt").val();
    descricao = descricao.replace(/\s{2,}/g, ' ').replace(/["\']/g, '');
    var projetos = $("#projetosCdt").val();
    projetos.replace(/\s{2,}/g, ' ').replace(/["\']/g, '');
    var nome = $("#nomeCdt").val();
    var nomeArt = $("#nomeArtCdt").val();
    var cpf = $("#cpfCdt").val();
    cpf = cpf.replace(/[^0-9]/g, '');
    var email = $("#emalCdt").val();
    var tel = $("#telCdt").val();
    var visibilidade = "n"
    // tel = tel.replace(/[^0-9]/g, '');

    var dtNascimento = $("#dataNascimentoCdt").val();
    var sexo = $("#sexoCdt").val();
    var arte = $("#arteCdt").val();
    var senha = $("#senhaCdt").val();
    //var senhaRed = $("#senhaRedCdt").val();

    var json = servidor + "/Secult/cadart/insertUsuario/" + cpf + "&" + nome + "&" + nomeArt + "&" + tel + "&" + email + "&" + sexo + "&" + descricao + "&" + projetos + "&" + dtNascimento + "&" + senha + "&" + arte + "&" + visibilidade;

    var onSuccess = function (result) {
        jsonRestultado = result;
        resultado = jsonRestultado.status;
        if (resultado == "ok") {
            inserirImagem(cpf, "C");
            cadastrarRedeSocial(cpf, "redeSocial1")
            cadastrarRedeSocial(cpf, "redeSocial2")
            cadastrarRedeSocial(cpf, "redeSocial3")
            swal({
                title: "Cadastrado!",
                text: "Aguarde nosso pessoal validar seus dados!",
                icon: "success",
                button: false,
            });
            setTimeout(function () {
                window.location.href = "#/page3";
            }, 2000)
        } else if (resultado == "erro") {
            swal({
                title: "Erro ao cadastrar!",
                text: "",
                icon: "error",
                button: false,
            });
        }
        ;
    };
    $.getJSON(json, onSuccess).fail(
    );
}


function isCpf(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}


function listarCadart() {
    carregando(1)
    $("#listaCadart").empty();
    var json = servidor + "/Secult/cadart/listarUsuarioByVisibilidade";
    $.getJSON(json, function (result) {
        $("#listaCadart").empty();
        dados = result.usuario;
        if (dados[0]) {
            for (var i in dados) {

                var nome = dados[i].nome;
                var arte = dados[i].nomeArte;
                var cpf = dados[i].cpf;
                var tel = dados[i].telefone;
                var idArte = dados[i].idArte;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var projetoAtual = dados[i].projetoAtual;
                var nomeArte = dados[i].nomeArte;
                var email = dados[i].email;
                var vindoDe = "";
                var urlImagem = servidor + "/Secult/imagem/findETC/" + cpf + "&C";
                console.log(urlImagem)

                $("#listaCadart").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'  class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\">\n" +
                    "                <img  src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p>" + arte + "</p>\n" +
                    "            </a>")
            }

        }
    }).fail(function () {
        console.log("error");
    })
        .always(function () {
            carregando(2)
            console.log("complete");
        });


}


function validarEmail(id) {
    var emailImp = $("#" + id).val();
    if (emailImp != "") {
        if (emailImp.indexOf("@") != -1) {
            if (emailImp.indexOf("@") == 0) {
                return false
                $("#" + id).focus()
            } else {
                return true
            }
        } else {
            return false
        }
    } else {
        return false
    }
}


function autenticar(txtEmail, txtSenha) {
    var json = servidor + "/Secult/cadart/autenticar/" + txtEmail + '&' + txtSenha;

    var onSucess = function (result) {
        dados = result.usuario;

        if (dados[0]) {
            var nome = dados[0].nome;
            var nomeArtistico = dados[0].nomeArtistico;
            var nomeArte = dados[0].nomeArte;
            var cpf = dados[0].cpf;
            var telefone = dados[0].telefone;
            var idArte = dados[0].idArte;
            var sexo = dados[0].sexo;
            var idade = dados[0].idade;
            var descricao = dados[0].descricao;
            var projetoAtual = dados[0].projetoAtual;
            var email = dados[0].email;
            var tipo = dados[0].tipo;


            localStorage.setItem("cpf", cpf);
            localStorage.setItem("nome", nome);
            localStorage.setItem("nomeArtistico", nomeArtistico);
            localStorage.setItem("email", email);
            localStorage.setItem("telefone", telefone);
            localStorage.setItem("nomeArte", nomeArte);
            localStorage.setItem("sexo", sexo);
            localStorage.setItem("idArte", idArte);
            localStorage.setItem("idade", idade);
            localStorage.setItem("descricao", descricao);
            localStorage.setItem("projetoAtual", projetoAtual);
            localStorage.setItem("usuarioAtivo", "true")
            localStorage.setItem("tipo", tipo);


            $("#email").val('');
            $("#senha").val('');

            if (tipo == 1) {
                setTimeout(function () {
                    $(".alt-estado").toggle()
                    localStorage.setItem("admOn", 'true');
                    $(".funcoesAdministrativas").show();
                    window.location.href = "#/page22";
                }, 100)
            } else {
                setTimeout(function () {
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
    };

    $.getJSON(json, onSucess).fail(
        function () {


        }
    );
}


function sairUsuario() {
    $(".fAdm").show()
    $(".alt-estado").toggle();
    localStorage.removeItem("cpf");
    localStorage.removeItem("nome");
    localStorage.removeItem("nomeArtistico");
    localStorage.removeItem("email");
    localStorage.removeItem("telefone");
    localStorage.removeItem("nomeArte");
    localStorage.removeItem("sexo");
    localStorage.removeItem("idArte");
    localStorage.removeItem("idade");
    localStorage.removeItem("descricao");
    localStorage.removeItem("projetoAtual");
    localStorage.setItem("usuarioAtivo", "false");
    localStorage.setItem("admOn", "false");
    localStorage.setItem("tipo", "");
    localStorage.setItem("fotoCadastroEvento", "");
    localStorage.setItem("fotoCadastro", "");
    window.location.href = "#/page1/page2";
    $(".funcoesAdministrativas").hide();
}


function usuarioAtivo() {
    if (localStorage.getItem("usuarioAtivo") == "true") {
        $(".alt-estado").toggle();
    }
}

function carregarDadosUpdateCadart() {
    setTimeout(function () {
        $("#nomeUp").val(nome);
        $("#dtNascimentoUp").val(idade);
        $("#emailUp").val(email);
        $("#telUp").val(tel);
        $("#telUp").val(tel);

        $("#descricaoUp").val(descricao);
        $("#projetosUp").val(projetoAtual);
        $("#nomeArtisticoUp").val(nomeArtistico);
        $("#sexoUp").val(sexo);
        $("#arteUp").val(idArte);
        $("#tableBanner").attr('src', servidor + "/Secult/cadart/find/" + localStorage.getItem("cpf"));
        $("#telUp").mask("00-00000-0000");

    }, 100)
}


function carregarInfoCadart(nome, idade, email, tel, descricao, projetoAtual, sexo, nomeArtistico, nomeArte, cpf, vindoDe) {

    setTimeout(function () {
        getPrimeiraImagem(cpf, "fotoInfo")
        $("#nomeInfo").text(nome);
        $("#idadeInfo").text(idade + " anos");
        $("#emailInfo").text(email);
        $("#telInfo").text(tel);
        $("#linkWpp").attr('href', 'https://wa.me/55' + tel.replace(/[^0-9]/g, ''));
        $("#descricaoInfo").text(descricao);
        $("#projetosInfo").text(projetoAtual);
        $("#nomeArtisticoInfo").text(nomeArtistico);
        if (sexo == 'm') {
            sexo = 'Masculino'
        } else {
            sexo = 'Feminino'
        }
        $("#sexoInfo").text(sexo);
        $("#nomeArteInfo").text(nomeArte);
        $("#btnInfo").css('display', 'none')

        if (vindoDe == "adm") {
            $("#btnInfo").css('display', 'block')
            $("#btnInfo").text('Tornar usuario visivel na lista')

            $("#btnInfo").attr('onclick', 'autenticarVisibilidadeS(' + cpf + ')');
        }
        if (vindoDe == "desAutenticar") {
            $("#btnInfo").css('display', 'block')
            $("#btnInfo").text('Tornar usuario invisivel na lista')
            $("#btnInfo").attr('onclick', 'autenticarVisibilidadeN(' + cpf + ')');
        }
        listarRedeSociais(cpf);
    }, 100)
}

function botaoFotoFakeCadart(el) {
    if (el == 1) {
        $(".btnFotoCadartCdt").click(function () {
            $("#bannerImg").click();
        })
    }
    if (el == 2) {
        $(".btnFotoCadartUp").click(function () {
            $("#bannerImg").click();
        })
    }

}

function updateCadart() {
    var cpf = localStorage.getItem('cpf')

    var nome = $("#nomeUp").val();
    var idade = $("#dtNascimentoUp").val();
    var email = $("#emailUp").val();
    var tel = $("#telUp").val();
    var desc = $("#descricaoUp").val();
    var projeto = $("#projetosUp").val();
    var nomeArtistico = $("#nomeArtisticoUp").val();
    var sexo = $("#sexoUp").val();
    var idArte = $("#arteUp").val();

    var json = servidor + "/Secult/cadart/updateUsuario/" + cpf + '&' + nome + '&' + idade + '&' + nomeArtistico + '&' + email + '&' + tel + '&' + sexo + '&' + desc + '&' + projeto + '&' + idArte;
    var onSucess = function (result) {
        var status = result.status;

        if (status == "ok") {
            atualizarImagem(cpf, 'C');


            localStorage.setItem("cpf", cpf);
            localStorage.setItem("nome", nome);
            localStorage.setItem("nomeArtistico", nomeArtistico);
            localStorage.setItem("email", email);
            localStorage.setItem("telefone", tel);
            localStorage.setItem("idArte", id);
            localStorage.setItem("sexo", sexo);
            localStorage.setItem("idArte", idArte);
            localStorage.setItem("idade", idade);
            localStorage.setItem("descricao", desc);
            localStorage.setItem("projetoAtual", projeto);

            swal({
                title: "Cadastrado!",
                text: "Seus dados foram alterados com sucesso!",
                icon: "success",
                button: false,
            });
            setTimeout(function () {
                window.location.href = "#/page3";

            }, 2000)
        } else if (resultado == "erro") {
            swal({
                title: "Erro!",
                text: "Não foi possivel alterar seus dados, tente novamente ou entre em contato com a gente!",
                icon: "error",
                button: false,
            });
        }
    }

    $.getJSON(json, onSucess).fail()

}

function mostrarUpdateSenha() {
    if ($("#cardSenhaUp").css('display') == "none") {
        $("#cardSenhaUp").removeClass('bounceOutRight faster')
        $("#cardSenhaUp").addClass('bounceInRight faster');
        $("#cardSenhaUp").toggle();
    } else {
        $("#cardSenhaUp").removeClass('bounceInRight faster')
        $("#cardSenhaUp").addClass('bounceOutRight faster');
        setTimeout(function () {
                $("#cardSenhaUp").toggle()
            },
            200)
    }
}

function mostrarUpdateFoto() {
    var divFotoUp = $("#cardFotoUp");
    if (divFotoUp.css('display') == "none") {
        divFotoUp.removeClass('bounceOutRight faster')
        divFotoUp.addClass('bounceInRight faster');
        divFotoUp.toggle();
    } else {
        divFotoUp.removeClass('bounceInRight faster')
        divFotoUp.addClass('bounceOutRight faster');
        setTimeout(function () {
                divFotoUp.toggle()
            },
            200)
    }
}

function validarSenhaCdt() {
    var email = $("#emailAtualUp").val();
    var senha = $("#senhaAtualUp").val();
    if (email && senha != "") {
        var json = servidor + "/Secult/cadart/autenticar/" + email + '&' + senha;
        var onSucess = function (result) {
            dados = result.usuario;
            if (dados[0]) {
                swal({
                    title: "Senha alterada!",
                    icon: "success",
                    button: false,
                });
                $("#cardSenhaUp").toggle();
            }
        };
        $.getJSON(json, onSucess).fail();
    }
}

function autenticarUpSenha() {
    var email = $('#emailAtualUp').val();
    var senha = $('#senhaAtualUp').val();
    var novaSenha = $('#senhaNovaUp').val();

    var json = servidor + "/Secult/usuario/verificarEmailSenha/" + email + '&' + senha;

    var onSucess = function (result) {
        if (result.status == "valido"){
            updateSenhaCadart(localStorage.id, novaSenha)
            $('#erroSenhaEmailUp').css('display', 'none')
        }
    else
        {
            $('#erroSenhaEmailUp').css('display', 'block')
        }
    };
    $.getJSON(json, onSucess).fail();
}

function updateSenhaCadart(id, senhaNova) {
    var json = servidor + "/Secult/usuario/updateSenha/" + id + '&' + senhaNova;

    var onSuccess = function (result) {
        if (result.status == "ok") {
            $('#emailAtualUp').val('');
            $('#senhaAtualUp').val('');
            $('#senhaNovaUp').val('');
            $("#cardSenhaUp").removeClass('bounceInRight faster')
            $("#cardSenhaUp").addClass('bounceOutRight faster');
            swal({
                title: "success!",
                icon: "success",
                button: false,
            });
            setTimeout(function () {
                    $("#cardSenhaUp").toggle()
                },
                200)

        } else {
            swal({
                title: "Erro!",
                text: "Não foi possivel alterar sua senha, tente novamente ou entre em contato com a gente!",
                icon: "error",
                button: false,
            });

        }
    };
    $.getJSON(json, onSuccess).fail();
}

function toggleTypeInput(el) {
    if ($("#" + el + "").attr('type') == "text") {
        $("#" + el + "").attr('type', "password")
    } else {
        $("#" + el + "").attr('type', "text")
    }
}

function listarCadartAdm() {
    var json = servidor + "/Secult/cadart/listarUsuarioByVisibilidade";
    var onSuccess = function (result) {
        $("#listaCadart").empty();
        dados = result.usuario;
        if (dados[0]) {
            for (var i in dados) {

                var nome = dados[i].nome;
                var arte = dados[i].nomeArte;
                var cpf = dados[i].cpf;
                var tel = dados[i].telefone;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var projetoAtual = dados[i].projetoAtual;
                var nomeArte = dados[i].nomeArte;
                var email = dados[i].email;
                var vindoDe = "desAutenticar";

                console.log(tel)
                var urlImagem = servidor + "/Secult/imagem/findETC/" + cpf + "&C";

                $("#listaCadartAdm").append("<a href='#/page1/page16' onclick='carregarInfoCadart(\"" + urlImagem + "\",\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'  class=\"item item-avatar item-icon-right\">\n" +
                    "                <img src='" + urlImagem + "' onError='this.onerror=null;this.src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p>" + arte + "</p>\n" +
                    "            </a>")
            }


            ;
        }

    }
    $.getJSON(json, onSuccess).fail();
}

//Lista usuarios Que n estão validados

function cadartAutenticarVisibilidadeS() {
    $("#listaCadartAutentiar").empty();
    var json = servidor + "/Secult/cadart/getByVisibilidadeDiferenteS";
    var onSuccess = function (result) {

        dados = result.usuario;
        if (dados[0]) {
            for (var i in dados) {
                var nome = dados[i].nome;
                var arte = dados[i].id;
                var cpf = dados[i].cpf;
                var tel = dados[i].telefone;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var projetoAtual = dados[i].projetoAtual;
                var nomeArte = dados[i].nomeArte;
                var email = dados[i].email;
                var vindoDe = "adm";
                var urlImagem = servidor + "/Secult/imagem/findETC/" + cpf + "&C";

                $("#listaCadartAutentiar").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'   class=\"item item-avatar item-icon-right\">\n" +
                    "                <img id='" + cpf + "' src='" + urlImagem + "' onError='this.onerror=null;this.src=\'./img/semfoto.png>\''\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "            </a>")
            }
            ;

        }
    }
    $.getJSON(json, onSuccess).fail();
}

//Lista usuarios Que estão validados

function cadartAutenticarVisibilidadeN() {
    $("#listaCadartAdm").empty();

    var json = servidor + "/Secult/cadart/listarUsuarioByVisibilidade";
    var onSuccess = function (result) {

        dados = result.usuario;
        if (dados[0]) {
            for (var i in dados) {
                var nome = dados[i].nome;
                var arte = dados[i].nomeArte;
                var cpf = dados[i].cpf;
                var tel = dados[i].telefone;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var projetoAtual = dados[i].projetoAtual;
                var nomeArte = dados[i].nomeArte;
                var email = dados[i].email;
                var foto = dados[i].fotoPerfil;
                var vindoDe = "desAutenticar"

                $("#listaCadartAdm").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'   class=\"item item-avatar item-icon-right\">\n" +
                    "                <img id='" + cpf + "' src='img/pixelBranco.png'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "            </a>")
                getPrimeiraImagem(cpf, cpf)
            }
            ;

        }
    }
    $.getJSON(json, onSuccess).fail();
}

function autenticarVisibilidadeS(cpf) {
    var json = servidor + "/Secult/cadart/updateVisibilidadeS/" + cpf;
    var onSuccess = function (result) {
        if (result.status == "ok") {
            swal({
                title: "Usuário autenticado com sucesso!",
                icon: "success",
                button: false,
            });
            setTimeout(function () {
                window.location.href = "#/page24";
                cadartAutenticarVisibilidadeN();
            }, 500)
        } else {
            swal({
                title: "Ocorreu um erro!",
                icon: "erro",
                button: false,
            });
        }
    }
    $.getJSON(json, onSuccess).fail();
}

function autenticarVisibilidadeN(cpf) {
    var json = servidor + "/Secult/cadart/updateVisibilidadeN/" + cpf;
    var onSuccess = function (result) {
        if (result.status == "ok") {
            swal({
                title: "Usuário agora não será mais listado!",
                icon: "success",
                button: false,
            });
            setTimeout(function () {
                window.location.href = "#/page23";
                cadartAutenticarVisibilidadeS();
            }, 500)
        } else {
            swal({
                title: "Ocorreu um erro!",
                icon: "erro",
                button: false,
            });
        }
    }
    $.getJSON(json, onSuccess).fail();
}

function aparecer() {
    $('.fab-buttons__link').css({'transform': 'scaleY(0.5) scaleX(0.5) translateY(0px) translateX(0px)'});

    setTimeout(function () {
        $('.fab-buttons__link').css({'transform': 'scaleY(1) scaleX(1) translateY(-16px) translateX(0px)'});
    }, 10);

    $(document).on("tap", function () {
        $('.fab-buttons').hide()
    });
    $(document).on("swipe", function () {
        $('.fab-buttons').hide()
    });
}