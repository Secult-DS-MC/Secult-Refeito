servidor = localStorage.getItem("servidor");

function listarEventoEvento() {
    var tres = 2;
    var res;

    $("#listaEventoEvento").empty();
    var json = servidor + "/Secult/evento/listarEvento";

    var onSuccess = function (result) {

        dados = result.eventos;

        if (dados[0]) {

            for (var i in dados) {
                var id = dados[i].id;
                var imagem = servidor + "/Secult/imagem/findETC/"+id+"&E"

                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var nomeLocalidade = dados[i].nomeLocalidade;
                var localCidade = dados[i].localCidade;


                $("#listaEventoEvento").append("<a ui-sref='informacoesNoticias' class='linkSemDecoracao' onclick='abrirPage(this),preencherEventoInfo(\""+descricao+'","'+ imagem +'","'+ titulo+"\")'><li class=\"item item-thumbnail-left item-icon-right balanced\">\n" +
                    "        <img src='" + imagem + "'>\n" +
                    "        <h2 class='positive' style='font-weight: bolder' >" + titulo + "\n" +
                    "          <p style=\"white-space:normal; margin-top: 5px; font-weight: normal\">" + descricao.substring(0, 47) + "...</p>\n" +
                    "          <i class=\"icon ion-android-share\"></i>\n" +
                    "        </h2>\n" +
                    "      </li>\n" +
                    "      <li class=\"item item-icon-left \">\n" +
                    "        <i class=\"icon ion-location assertive\"></i> "+nomeLocalidade +"\n" +
                    "        <span class=\"item-note\">Na " + localCidade + " as "+horaEvento+"</span>\n" +
                    "      </li><div class=\"spacer\" style=\"height: 5px;\"></div></a>");


                if (i == tres) {
                    tres = tres + 3;
                    $("#listaEventoHoje").append("    <span style='display: none'><div class=\"spacer\" style=\"height: 4px;\"></div>\n" +
                        "    <div>\n" +
                        "      <img src=\"img/sEbQCcVzT22AyiWd4w0I_WhatsAppImage2018-07-31at13.51.371.jpeg\" style=\"display:block;width:100%;height:50px;\">\n" +
                        "    </div>\n" +
                        "    <div class=\"spacer\" style=\"height: 5px;\"></div></span>\n");
                }
            }
        }
    };
    $.getJSON(json, onSuccess).fail(

    );
}

function abrirPage(el) {
    $(el).attr("ui-sref","informacoesNoticias")

}

function preencherEventoInfo(d,img,t) {

    $("#titloNoticia").empty();
    $("#descricaoNoticia").empty();
    setTimeout(function () {
        $("#imagemNoticiaInfo").attr("src", img);
        $("#titloNoticia").append(""+t);
        $("#descricaoNoticia").append(""+d);

    },100)
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

function listarEventoAdm() {
    carregando(1)
    var json = servidor + "/Secult/Acontecimento/listarEvento";

    var onSuccess = function (result) {

        var dados = result.acontecimentos;

        if (dados[0]) {

            for (var i in dados) {

                var id = dados[i].id;
                var titulo = dados[i].titulo;
                var descricao = dados[i].descricao;
                var visibilidade = dados[i].visibilidade;
                var tipo = dados[i].tipo_evento
                var imagem = servidor + "/Secult/imagem/findEvento/" + id;
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].id_localidade;
                var localCidade = dados[i].localCidade;


                $("#inicioListaEventoHoje").append("<ul class='list' id='" + id + "'>\n" +
                    "            <li class=\"item item-thumbnail-left item-icon-right balanced\">\n" +
                    "            <img  src='" + imagem + "' onError='this.onerror=null;this.src='"+imagem+"'> \n" +
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
    listarEventoEvento();


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

// EXCLUIR EVENTO
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
