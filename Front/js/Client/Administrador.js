servidor = localStorage.getItem("servidor");

function verificarAdministrador() {
    if (localStorage.getItem('admOn') == 'true') {
        $(".funcoesAdministrativas").show()
    }
    else {
        $(".funcoesAdministrativas").hide()
    }
}

function deslogarAdministrador() {
    localStorage.removeItem('admOn');
    $(".funcoesAdministrativas").hide();
    window.location.href = "#/page1";

}

function validarCadastroEvento() {
    var titulo = $("#tituloAdm").val();
    var descricao = $("#descricaoAdm").val();
    var dataEvento = $("#dataEventoAdm").val();
    var horaEvento = $("#horarioAdm").val();
    var localidade = $("#localidadeAdm").val();
    var tipo = $("#tipoAdm").val();
    if (titulo != "" & dataEvento != "" & descricao != "" & horaEvento != "" & localidade != "" & tipo != "") {
        cadastroEvento();

    } else {
        alert("Preencha todos os campos!")
    }
}

function cadastroEvento() {
    var titulo = $("#tituloAdm").val();
    var descricao = $("#descricaoAdm").val();
    var dataEvento = $("#dataEventoAdm").val();
    var horaEvento = $("#horarioAdm").val();
    var localidade = $("#localidadeAdm").val();
    var tipo = $("#tipoAdm").val();
    var localCidade = $("#localAdm").val();

    var json = servidor + "/Secult/evento/insertEvento/" + titulo + "&" + descricao + "&" + dataEvento + "&n&" + tipo + "&" + horaEvento + "&" + localidade + "&" + localCidade;

    var onSuccess = function (result) {

        jsonAdministrador = result;

        var status = jsonAdministrador.status;
        var id = jsonAdministrador.id_usuario
        alert(id)

        if (status != "erro") {
            inserirFotoEvento(id)

        } else {
            swal("Não foi possivel Cadastrar o evento")
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}

function listarEvento() {
    carregando(1)
    var json = servidor + "/Secult/evento/listarEvento";

    var onSuccess = function (result) {

        dados = result.eventos;

        if (dados[0]) {

            for (var i in dados) {

                var id = dados[i].id;
                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento
                var imagem = servidor + "/Secult/evento/find/" + id;
                var dataCadastro = dados[i].data_cadastro;
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].id_localidade;
                var localCidade = dados[i].localCidade;


                $("#inicioListaEventoHoje").append("<ul class='list' id='" + id + "'>\n" +
                    "            <li class=\"item item-thumbnail-left item-icon-right balanced\">\n" +
                    "            <img src='" + imagem + "'> \n" +
                    "                    <h2 id='titulo" + id + "'  style=\"margin: 0px; font-size: 17px; font-weight: bolder; margin-top: 30px;\">" + titulo + "</h2>\n" +
                    "                    <i id='checked" + id + "' class=\"icon ion-eye inline\"></i>\n" +
                    "            </li>\n" +
                    "\n" +
                    "            <li class=\"item\" style=\"padding: 0px\">\n" +
                    "                <div  class=\"button-bar\">\n" +
                    "                    <a class='button button-light button-outline' href='#/page20' onclick='preencherEventoAtualizar(" + id + ",\"" + visibilidade + "\",\"" + titulo + "\",\"" + dataEvento + "\",\"" + descricao + "\",\"" + horaEvento + "\",\"" + tipo + "\",\"" + idLocalidade + "\",\"" + imagem + "\",\"" + localCidade + "\"), mostrarInput(\""+ tipo +"\")'><div  style=\"font-weight:600;color:#0092FF;font-size:17px;\"\n" +
                    "                              id='" + id + "'>Editar\n" +
                    "                    </div></a>\n" +
                    "                    <a class='button button-light button-outline' onclick=\"excluirEvento(" + id + ")\"><div  style=\"font-weight:600;color:#FF0020;font-size:17px;\" >Excluir\n" +
                    "                    </div></a>\n" +
                    "                </div>\n" +
                    "            </li>\n" +
                    "        </ul>");

                if (visibilidade == "s") {
                    $("#visivel" + id).css('color', 'green');

                } else {
                    $("#visivel" + id).css('color', '#e43a38');

                }
                var aaa = false;
                if (titulo != "" & dataEvento != "" & descricao != "" & horaEvento != "" & idLocalidade != "" & tipo != "" & visibilidade == "s") {
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
        $("#tableBannerEvento").attr('src', imagem);
        localStorage.setItem('imgTeste', imagem)
        $("#descricaoUp").val(descricao);
        $("#dataEventoUp").val(dataEvento);
        $("#horarioUp").val(horaEvento);
        $("#localidadeUp").val(idLocalidade);
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


    var json = servidor + "/Secult/evento/updateEvento/" + id + "&" + titulo + "&" + descricao + "&" + dataEvento + "&" + visibilidade + "&" + tipo + "&" + horaEvento + "&" + localidade + "&" + local;

    var onSuccess = function (result) {

        jsonAdministrador = result;

        Administrador = jsonAdministrador.status;

        if (Administrador == "ok") {
            inserirFotoEvento(id);
            setTimeout(function () {
                window.location.href = "#/page18";

            }, 1000);
            listarEvento();
        }
        ;
    };
    $.getJSON(json, onSuccess).fail();
}

function mostrarInput(tipo) {
        setTimeout(function () {
            if(tipo != 'p'){
                $("#labelLocal").hide();
            }else if(tipo == 'p') {
                $("#labelLocal").show();
            }
        },300);
}

function mostrarInputCadastroEvento() {
    if($("#tipoAdm").val() == ""){
        $("#localAdm").hide();
    }else if($("#tipoAdm").val() == "g"){
        $("#localAdm").hide();
    }else{
        $("#localAdm").show();
    }
}

function limparEListarEventoAdm() {

    $("#inicioListaEventoHoje").empty();
    listarEvento();


}

//////////////////FOTO EVENTO///////////////////
//////////////////FOTO EVENTO///////////////////

function inserirFotoEvento(id) {
    var json =  servidor + "/Secult/evento/salvarFoto/" + id;

    var ImageURL = localStorage.getItem("fotoCadastroEvento");

    var block = ImageURL.split(";");

    var contentType = block[0].split(":")[1];

    var realData = block[1].split(",")[1];

    var blob = b64toBlob(realData, contentType);

    var formDataToUpload = new FormData();

    formDataToUpload.append("id", id);
    formDataToUpload.append("imagem", blob);

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
            window.location = "#/page18";
            location.reload();
        },
    })

}

function saveFotoEventoLS() {

    //document.getElementById("tableBannerEvento").style.display = "none";
    var bannerImage = document.getElementById("inputImagemEvento");

    var img = document.getElementById("tableBannerEvento");

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

                localStorage.setItem("fotoCadastroEvento", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });

}

function saveFotoEventoLSCdt() {

    //document.getElementById("tableBannerEvento").style.display = "none";
    var bannerImage = document.getElementById("inputImagemEventoCdt");

    var img = document.getElementById("tableBannerEventoCdt");

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

                localStorage.setItem("fotoCadastroEvento", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });

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
                urlImagem = servidor + "/Secult/cadart/find/" + cpf;

                $("#listaCadartAdm").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + urlImagem + "\",\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'  class=\"item item-avatar item-icon-right\">\n" +
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
                var vindoDe = "adm"


                urlImagem = servidor + "/Secult/cadart/find/" + cpf;

                $("#listaCadartAutentiar").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + urlImagem + "\",\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'   class=\"item item-avatar item-icon-right\">\n" +
                    "                <img src='" + urlImagem + "'>\n" +
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


                urlImagem = servidor + "/Secult/cadart/find/" + cpf;

                $("#listaCadartAdm").append("<a href='#/page16' onclick='carregarInfoCadart(\"" + urlImagem + "\",\"" + nome + "\",\"" + idade + "\",\"" + email + "\",\"" + tel + "\",\"" + descricao + "\",\"" + projetoAtual + "\",\"" + sexo + "\",\"" + nomeArtistico + "\",\"" + nomeArte + "\",\"" + cpf + "\",\"" + vindoDe + "\")'   class=\"item item-avatar item-icon-right\">\n" +
                    "                <img src='" + urlImagem + "'>\n" +
                    "                <h2>" + nomeArtistico + "</h2>\n" +
                    "            </a>")
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

//exluir  evento
function excluirEvento(id) {
    swal({
        title: "Deseja deletar esse evento?",
        text: "Uma vez deletado não tem como recuperar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        carregando(1)
        if (willDelete) {
            var json = servidor + "/Secult/evento/deletarEvento/" + id;
            var onSuccess = function (result) {
                if (result.status == "ok") {
                    $("#"+id).remove();
                    swal("Puff! Evento deletado com sucesso!", {
                        icon: "success",
                        buttons: false,
                    });
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


        }
    });


}

function atualizarPaginas() {
    $("#listaEventoNoticas").empty();
    listarEventoNoticias();
    $("#listaEventoHoje").empty();
    listarEventoHoje();
    $("#listaCadart").empty();
    listarCadart()
}

function mudarCorbotaoEntrar() {

    $("#senha, #email").keyup(function () {
        var senha = $("#senha").val();
        var email = $("#email").val();

        if (senha.length > 5 && email.length > 10) {
            $("#btnCadastraCadart").removeClass("button-outline");
        }
    })
}

function carregando(el) {
    if (el == 1) {
        setTimeout(function () {
            $("ion-content").prepend("<div class='carregando'></div>");
        }, 200)
    } else {
        setTimeout(function () {
            $(".carregando").remove();
        }, 200)

    }

}







