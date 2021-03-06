function cadastrarRedeSocial(id_usuario,idImputRedeSocial) {
    var nome = $("#"+idImputRedeSocial).parent().text().trim()
    var link = $("#"+idImputRedeSocial).val();
    link = link.replace(/[/]/g, '*')
    link = link.replace(/[?]/g, '¨')
    link = link.replace(/[&]/g, '§')

    var json = servidor + "/Secult/redes/inserirRedes/" + nome + "&" + link + "&" + id_usuario;
    var onSuccess = function (result) {
        var status = result.status;
        if (status == "ok") {

        }
    };
    $.getJSON(json, onSuccess).fail(
    );
}

function listarRedeSociais(cpf) {
    var json = servidor + "/Secult/redes/listarRedesById/" +cpf;
    var onSuccess = function (result) {
        dados = result.redeSocial;
        if (dados[0]) {
            for (var i in dados) {
                var nome = dados[i].nomeRede;
                var link = dados[i].nomeLink;
               
                if(link != ""){
                    link = link.replace(/[*]/g, '/')
                    link = link.replace(/[¨]/g, '?')
                    link = link.replace(/[§]/g, '&')
                }else{
                    link = ""
                }
                console.log(link+"  "+nome)
                    switch (nome) {
                        case "Facebook:":
                            $("#facebook").attr("href", link);
                            break;
                        case "Instagram:":
                            $("#instagram").attr("href", "https://www.instagram.com/"+link);
                            break;
                        case "Youtube:":
                            $("#youtube").attr("href", link);
                            break;

                    }
            };
        }

    }
    $.getJSON(json, onSuccess).fail();
}