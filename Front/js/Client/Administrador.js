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


}

function mostrarInput(tipo) {
    setTimeout(function () {
        if (tipo != 'E') {
            $("#labelLocal").hide();
        } else {
            $("#labelLocal").show();
        }
    }, 300);
}

function atualizarPaginas() {
    $("#listaEventoNoticas").empty();
    listarEventoNoticias();
    $("#listaEventoHoje").empty();
    listarEventoEvento();
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
                var imagem = servidor + "/Secult/imagem/findETC/" + id +"&A";

                //if(imagem == null) imagem = "../../img/semImagem.png";
                var horaEvento = dados[i].hora_evento;
                var dataEvento = dados[i].data_evento;
                var idLocalidade = dados[i].idLocalidade;
                var localCidade = dados[i].localCidade;

                $("#inicioListaEventoHoje").append("<li id='" + id + "' style='border: none;' class=\"item item-thumbnail-left balanced\">\n" +
                    "                <img  src='" + imagem + "' onError='this.onerror=null;this.src='"+imagem+"'>\n" +
                    "                <h2 id='titulo" + id + "'  style=\"margin: 0px; font-size: 17px; font-weight: bolder; margin-top: 30px;\">" + titulo + "</h2>\n" +
                    "                <div class=\"item-icon-right\">\n" +
                    "                    <i id='checked" + id + "' style=\"height: 23%; margin-right: 3%\" class=\"icon ion-eye inline\"></i>\n" +
                    "                </div>\n" +
                    "                <div style=\"float: right; margin-right: -15px; margin-top: -33px; text-align: center;\">\n" +
                    "                    <div style=\"height: 35px\">\n" +
                    "                        <a onclick='preencherEventoAtualizar(" + id + ",\"" + visibilidade + "\",\"" + titulo + "\",\"" + dataEvento + "\",\"" + descricao + "\",\"" + horaEvento + "\",\"" + tipo + "\",\"" + idLocalidade + "\",\"" + imagem + "\",\"" + localCidade + "\"), mostrarInput(\""+ tipo +"\")' class='button button-light' style=\"display: grid;\" href='#/page20'>\n" +
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
                    "            </li><hr>\n");

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


