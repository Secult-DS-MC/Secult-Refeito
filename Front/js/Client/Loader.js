var servidor = localStorage.getItem("servidor");





function toBase64String(img) {

    var c = document.createElement('canvas');

    var ctx = c.getContext("2d");

    var nBase = 500;
    var nProporcao = 0;
    var width = img.naturalWidth;
    var height = img.naturalHeight;


    if (width > 500 || height > 500) {

        if (width > height) {
            nProporcao = ((100 * nBase) / width);
            height = ((height * nProporcao) / 100);
            width = nBase;
        } else {
            nProporcao = ((100 * nBase) / height);
            width = ((width * nProporcao) / 100);
            height = nBase;
        }

        c.width = width;
        c.height = height;
    } else {

        c.height = img.naturalHeight;
        c.width = img.naturalWidth;
    }


    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL();


}


function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}