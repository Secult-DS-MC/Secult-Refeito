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

function mostrarInput(tipo) {
        setTimeout(function () {
            if(tipo != 'p'){
                $("#labelLocal").hide();
            }else if(tipo == 'p') {
                $("#labelLocal").show();
            }
        },300);
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