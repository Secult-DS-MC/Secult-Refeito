function cadastrarContato(id) {

    var emailCadastro = $("#emailCadastro").val();
    var telCadastro = $("#telCadastro").val();
    var fbCadastro = $("#fbCadastro").val();
    var ytCadastro = $("#ytCadastro").val();
    var inCadastro = $("#inCadastro").val();

    if (fbCadastro != "") {
        fbCadastro = fbCadastro.replace(/[/]/g, '*').replace(/[?]/g, '¨').replace(/[&]/g, '§').replace(/["]/g, '~')
    }else{
        fbCadastro = 'null'
    }
    
    
    if (ytCadastro != "") {
        ytCadastro = ytCadastro.replace(/[/]/g, '*').replace(/[?]/g, '¨').replace(/[&]/g, '§').replace(/["]/g, '~')
    }else{
        ytCadastro = null
    }
    
    if (inCadastro != "") {
        inCadastro = inCadastro.replace(/[/]/g, '*').replace(/[?]/g, '¨').replace(/[&]/g, '§').replace(/["]/g, '~')
    }else{
        inCadastro = 'null'
    }

    var json = servidor + "/Secult/contato/inserirContato/" + id + "&" + emailCadastro + "&" + telCadastro + "&" + fbCadastro + "&" + ytCadastro + "&" + inCadastro;

    var onSuccess = function (result) {
        jsonRestultado = result;
        resultado = jsonRestultado.status;

        if (resultado == "ok") {

        }

    };
    $.getJSON(json, onSuccess).fail(
    );
}

function updateContato(id) {
    var emailCadastro = $("#emailUp").val();
    var telCadastro = $("#telUp").val();
    var fbCadastro = $("#redeSocial1").val();
    var ytCadastro = $("#redeSocial2").val();
    var inCadastro = $("#redeSocial3").val();

    if (fbCadastro == "") {
        fbCadastro = "null"
    } else {
        fbCadastro = fbCadastro.replace(/[/]/g, '*').replace(/[?]/g, '¨').replace(/[&]/g, '§').replace(/["]/g, '~')
    }
    ;
    if (ytCadastro == "") {
        ytCadastro = "null"
    } else {
        ytCadastro = ytCadastro.replace(/[/]/g, '*').replace(/[?]/g, '¨').replace(/[&]/g, '§').replace(/["]/g, '~')
    }
    ;
    if (inCadastro == "") {
        inCadastro = "null"
    } else {
        inCadastro = inCadastro.replace(/[/]/g, '*').replace(/[?]/g, '¨').replace(/[&]/g, '§').replace(/["]/g, '~')
    }
    ;

    var json = servidor + "/Secult/contato/updateRede/" + id + "&" + emailCadastro + "&" + telCadastro + "&" + fbCadastro + "&" + ytCadastro + "&" + inCadastro;

    var onSuccess = function (result) {
        jsonRestultado = result;
        resultado = jsonRestultado.status;

        if (resultado == "ok") {

        }

    };
    $.getJSON(json, onSuccess).fail(
    );
}