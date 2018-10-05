package br.com.secult.model;

/**
 *
 * @author David
 */
public class Imagem {
    private int id;
    private byte[] imagem;
    private int idCadart;
    private int idEvento;
    private int idTurismo;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }

    public int getIdCadart() {
        return idCadart;
    }

    public void setIdCadart(int idCadart) {
        this.idCadart = idCadart;
    }

    public int getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(int idEvento) {
        this.idEvento = idEvento;
    }

    public int getIdTurismo() {
        return idTurismo;
    }

    public void setIdTurismo(int idTurismo) {
        this.idTurismo = idTurismo;
    }

    public void setImagem(Byte imagens) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
