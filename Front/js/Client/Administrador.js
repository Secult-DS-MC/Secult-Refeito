servidor = localStorage.getItem("servidor");

function verificarAdministrador() {
    if (localStorage.getItem('admOn') == 'true') {
        $(".funcoesAdministrativas").show()
    }
    else {
        $(".funcoesAdministrativas").hide()
    }
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

function mudarCorbotaoEntrar() {

    $("#senha, #email").keyup(function () {
        var senha = $("#senha").val() > 6;
        var email = $("#email").val();

        if (senha.length > 5 && email.length > 10) {
            $("#btnCadastraCadart").removeClass("button-outline");
        }
    })
}

function carregando(el) {
    if (el == 1) {
        setTimeout(function () {
            $("ion-spinner.carregando2").css("display", "block");
            //$("ion-content").prepend("<div class='carregando'></div>");
            //$("ion-content").prepend("<ion-spinner class=\"carregando2\" icon=\"bubbles\"></ion-spinner>");
        }, 200);
    } else {
        setTimeout(function () {
            $("ion-spinner.carregando2").css("display", "none");
        }, 200);
    }

}



