function inserirFoto(cpf) {
    var json = servidor + "/Secult/cadart/salvarFoto/" + cpf;

    var ImageURL = localStorage.getItem("fotoCadastro");

    var block = ImageURL.split(";");

    var contentType = block[0].split(":")[1];

    var realData = block[1].split(",")[1];

    var blob = b64toBlob(realData, contentType);

    var formDataToUpload = new FormData();

    formDataToUpload.append("id", cpf);
    formDataToUpload.append("foto_perfil", blob);

    $.ajax({
        url: json,
        data: formDataToUpload,
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        dataType: "json",

        error: function (err) {
            console.log(err);

        },

        complete: function () {
            window.location = "#/page1/page2";
            location.reload();
        },
    })

}

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

                localStorage.setItem("fotoCadastro", toBase64String(img));

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


function textAreaCadastro() {
    $("#descricaoCdt").focusin(function () {
        $(this).attr('rows', '11')
    })
    $("#descricaoCdt").focusout(function () {
        $(this).removeAttr('rows')
    })
    $("#projetosCdt").focusin(function () {
        $(this).attr('rows', '11')
    })
    $("#projetosCdt").focusout(function () {
        $(this).removeAttr('rows')
    })
}

function textAreaUp() {
    $("#descricaoUp").focusin(function () {
        $(this).attr('rows', '11')
    })
    $("#descricaoUp").focusout(function () {
        $(this).removeAttr('rows')
    })
    $("#projetosUp").focusin(function () {
        $(this).attr('rows', '11')
    })
    $("#projetosUp").focusout(function () {
        $(this).removeAttr('rows')
    })

}

function textArea(id) {
    $("#" + id).focusin(function () {
        $(this).attr('rows', '11')
    })
    $("#" + id).focusout(function () {
        $(this).removeAttr('rows')
    })
}


function mascarasCadart() {
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
    var email = $("#emalCdt").val();
    var tel = $("#telCdt").val();
    var dtNascimento = $("#dataNascimentoCdt").val();
    var sexo = $("#sexoCdt").val();
    var arte = $("#arteCdt").val();
    var senha = $("#senhaCdt").val();
    var senhaRed = $("#senhaRedCdt").val();
    if (isCpf(cpf) & nome != "" & validarEmail('emalCdt') & tel.length == 13 & nomeArt != "" & arte != "" & senha != "" & dtNascimento != "" & sexo != "") {
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
            inserirFoto(cpf);
            cadastrarRedeSocial(cpf,"redeSocial1")
            cadastrarRedeSocial(cpf,"redeSocial2")
            cadastrarRedeSocial(cpf,"redeSocial3")
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
                var idArte = dados[i].idArte;
                var sexo = dados[i].sexo;
                var idade = dados[i].idade;
                var nomeArtistico = dados[i].nomeArtistico;
                var descricao = dados[i].descricao;
                var projetoAtual = dados[i].projetoAtual;
                var nomeArte = dados[i].nomeArte;
                var email = dados[i].email;
                var foto = dados[i].fotoPerfil;
                var vindoDe = "";

                urlImagem = servidor + "/Secult/cadart/find/" + cpf;


                $("#listaCadart").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + urlImagem + "\",\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'  class=\"item item-avatar item-icon-right animated fadeIn  listaCadartUsuarios\">\n" +
                    "                <img src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "                <p>" + arte + "</p>\n" +
                    "            </a>")
            }


            ;
        }

    }
    $.getJSON(json, onSuccess).fail();
}

function InputEmailValido() {
    var emailImp = $("#email").val();
    var senha = $("#senha").val();

    if (emailImp == "admseculttb" && senha == "admseculttb") {
        localStorage.setItem("admOn", 'true');
        $(".funcoesAdministrativas").show();
        $("#email").val('');
        $("#senha").val('');
        window.location.href = "#/page1";

    }
    if (emailImp != "") {

        if (emailImp.indexOf("@") != -1) {


            if (emailImp.indexOf("@") == 0) {
                $("#email").focus();
                $("#validoEmail").empty();
                $("#validoEmail").append("Email precisa ser valido");
                setTimeout(function () {
                    $("#validoEmail").empty();
                }, 4000)
            } else {
                autenticar(emailImp, senha);
            }
        } else {

            $("#email").focus();
            $("#validoEmail").empty();
            $("#validoEmail").append("Campo E-mail necessita de '@'");
            setTimeout(function () {
                $("#validoEmail").empty();
            }, 4000)
        }
    } else {

        $("#email").focus();
        $("#validoEmail").empty();
        $("#validoEmail").append("Campo E-mail vazio");
        setTimeout(function () {
            $("#validoEmail").empty();
        }, 4000)
    }
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


            setTimeout(function () {
                window.location.href = "#/page1/page3";
                setTimeout(function () {
                    $(".alt-estado").toggle()
                }, 100)

            }, 1000)


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


}

function usuarioAtivo() {
    if(localStorage.getItem("usuarioAtivo")=="true"){
        $(".alt-estado").toggle();
    }
}

function usuarioLogado(){
    setTimeout(function () {
        $("#nomeUp").val(localStorage.getItem("nome"));
        $("#dtNascimentoUp").val(localStorage.getItem("idade"));
        $("#emailUp").val(localStorage.getItem("email"));
        $("#telUp").val(localStorage.getItem("telefone"));
        $("#descricaoUp").val(localStorage.getItem("descricao"));
        $("#projetosUp").val(localStorage.getItem("projetoAtual"));
        $("#nomeArtisticoUp").val(localStorage.getItem("nomeArtistico"));
        $("#sexoUp").val(localStorage.getItem("sexo"));
        $("#arteUp").val(localStorage.getItem("idArte"));
        $("#tableBanner").attr('src', servidor+"/Secult/cadart/find/"+localStorage.getItem("cpf"));
        $("#telUp").mask("00-00000-0000");

    }, 100)
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
        $("#tableBanner").attr('src', servidor+"/Secult/cadart/find/"+localStorage.getItem("cpf"));
        $("#telUp").mask("00-00000-0000");

    }, 100)
}


function carregarInfoCadart(urlImagem, nome, idade, email, tel, descricao, projetoAtual, sexo, nomeArtistico, nomeArte, cpf, vindoDe) {

    setTimeout(function () {
        var urlImagem = servidor + "/Secult/cadart/find/" + cpf;
        $("#fotoInfo").attr('src', urlImagem);
        setTimeout(function () {
            var urlImagem = servidor + "/Secult/cadart/find/" + cpf;
            $("#fotoInfo").attr('src', urlImagem);
        })
        $("#nomeInfo").text(nome);
        $("#idadeInfo").text(idade);
        $("#emailInfo").text(email);
        $("#telInfo").text(tel);
        $("#linkWpp").attr('href','https://wa.me/55'+tel.replace(/[^0-9]/g, '') );
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
            inserirFoto(cpf);


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

    var json = servidor + "/Secult/cadart/autenticar/" + email + '&' + senha;

    var onSucess = function (result) {
        dados = result.usuario;

        if (dados[0]) {
            var cpf = dados[0].cpf;
            updateSenhaCadart(cpf, novaSenha)
            $('#erroSenhaEmailUp').css('display', 'none')
        } else {
            $('#erroSenhaEmailUp').css('display', 'block')
        }
    };
    $.getJSON(json, onSucess).fail();
}

function updateSenhaCadart(cpf, senhaNova) {
    var json = servidor + "/Secult/cadart/updateSenha/" + cpf + '&' + senhaNova;

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