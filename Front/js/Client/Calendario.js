function expandir(classe, mes) {
    var icone = $("#"+ mes).children();
    $('.' + classe).toggle(300);
    if (icone.hasClass("ion-plus")){
        icone.removeClass('ion-plus').addClass('ion-minus')
    }else{
        icone.removeClass('ion-minus').addClass('ion-plus')
    }
}