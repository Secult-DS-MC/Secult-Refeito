//converte foto
function saveFotoLS() {

    document.getElementById("tableBanner").style.display = "none";
    var bannerImage = document.getElementById("bannerImg");

    var img = document.getElementById("tableBanner");

    bannerImage.addEventListener("change", function () {

        var file = this.files[0];
        if (file.type.indexOf("image") < 0) {
            alert("arquivo invalido");
            return;
        }
        var fReader = new FileReader();
        fReader.onload = function () {
            img.onload = function () {

                localStorage.setItem("fotoCadastro", toBase64String(img));

            };
            img.src = fReader.result;

        };

        fReader.readAsDataURL(file);

    });

}