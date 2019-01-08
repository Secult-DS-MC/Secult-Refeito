function preenchido(id) {
    var campo = $("#" + id).val();
    if (campo != "") return true
    else return false
}

function validacaoEtapa1() {

    $(".obrigatorio2").on('change, keypress',function () {
        alert()
        if( preenchido('nomeCompleto'),preenchido('nomeArtistico'),preenchido('cdtArte')){
            $("#proximo2").removeAttr('disabled')
        }else{
            $("#proximo2").attr('disabled', 'true')
        }
    })
}


if (campoVazio) {
    var nomeCompleto = $("#nomeCompleto").val();
    var nomeArtistico = $("#nomeArtistico").val();
    var cdtArte = $("#cdtArte").val();
}