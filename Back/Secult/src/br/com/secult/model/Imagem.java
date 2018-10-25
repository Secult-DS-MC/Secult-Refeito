package br.com.secult.model;

/**
 *
 * @author David
 */
public class Imagem {
    private int id;
    private byte[] imagem;
    private long idCadart;
    private long idEvento;
    private long idTurismo;

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

    public long getIdCadart() {
        return idCadart;
    }

    public void setIdCadart(long idCadart) {
        this.idCadart = idCadart;
    }

    public long getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(long idEvento) {
        this.idEvento = idEvento;
    }

    public long getIdTurismo() {
        return idTurismo;
    }

    public void setIdTurismo(long idTurismo) {
        this.idTurismo = idTurismo;
    }

    public void setImagem(Byte imagens) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
