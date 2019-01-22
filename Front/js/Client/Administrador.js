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
            //$("ion-content").prepend("<div class='carregando'></div>");
            $("ion-content").prepend("<ion-spinner class=\"carregando2\" icon=\"bubbles\"></ion-spinner>");
        }, 200)
    } else {
        setTimeout(function () {
            $(".carregando2").remove();
        }, 200);
    }

}



