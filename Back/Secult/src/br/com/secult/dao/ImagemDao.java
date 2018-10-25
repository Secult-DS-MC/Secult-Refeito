package br.com.secult.dao;

import br.com.secult.model.Cadart;
import br.com.secult.model.Imagem;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import javax.imageio.ImageIO;

/**
 *
 * @author David
 */
public class ImagemDao {

    Connection connection;

    public void inserirImagemEvento(Imagem imagem) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        String sql = "INSERT INTO imagem (imagem, id_evento) values(?, ?)";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setLong(2, imagem.getIdEvento());

            stmt.execute();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
            }
        }
    }

    public boolean inserirImagemCadart(Imagem imagem) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;
        String sql = "INSERT INTO imagem (imagem, id_cadart) VALUES(?,?)";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setLong(2, imagem.getIdCadart());

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                stmt.close();
                hasError = false;
            } catch (Exception e) {
            }
        }
        return hasError;
    }

    public boolean inserirImagem(Imagem imagem, long id_coluna, String sigla) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;
        String sql = null;
         switch (sigla) {
            case "E":
                sql = "INSERT INTO imagem (imagem, id_evento) VALUES(?,?)";
                break;
            case "C":
                sql = "INSERT INTO imagem (imagem, id_cadart) VALUES(?,?)";
                break;
            case "T":
                sql ="INSERT INTO imagem (imagem, id_turismo) VALUES(?,?)";
                break;
        }
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setLong(2, id_coluna);

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                stmt.close();
                hasError = false;
            } catch (Exception e) {
            }
        }
        return hasError;
    }

    public boolean alterarImagem(Imagem imagem) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        PreparedStatement stmt = null;
        String sql = "UPDATE imagem SET imagem=? WHERE id=?";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setInt(2, imagem.getId());

            stmt.executeUpdate();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                stmt.close();
                hasError = false;
            } catch (Exception e) {
            }
        }
        return hasError;
    }

    public boolean deletarEvento(Imagem imagem) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;

        String sql = "DELETE FROM imagem WHERE id=?";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setInt(1, imagem.getId());
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
            }

        }
        return hasError;
    }

    public byte[] tratarImagem(byte[] img) throws Exception {
        int nBase = 1024;
        int nProporcao = 0;

        BufferedImage imgScale = bytesToImage(img);
        int width = (int) imgScale.getWidth();
        int height = (int) imgScale.getHeight();

        if (width > 1024 || height > 768) {
            if (width > height) {
                nProporcao = (int) ((60 * nBase) / width);
                height = (int) ((height * nProporcao) / 60);
                width = nBase;
            } else {
                nProporcao = (int) ((60 * nBase) / height);
                width = (int) ((width * nProporcao) / 60);
                height = nBase;
            }
        }

        imgScale = createScaledImage(imgScale, width, height);
        img = imageToBytes(imgScale);
        return img;
    }

    public BufferedImage createScaledImage(BufferedImage image, int width, int heigth) {
        int cachedWidth = width;
        int cachedHeight = heigth;

        BufferedImage scaledImage;
        scaledImage = new BufferedImage(cachedWidth, cachedHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = scaledImage.createGraphics();
        g.drawImage(image, 0, 0, cachedWidth, cachedHeight, null);
        return scaledImage;
    }

    public BufferedImage bytesToImage(byte[] img) throws Exception {

        ByteArrayInputStream bais = new ByteArrayInputStream(img);
        BufferedImage bi = ImageIO.read(bais);

        return bi;
    }

    public byte[] imageToBytes(BufferedImage bi) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "JPG", baos);
        return baos.toByteArray();
    }

    public List<Imagem> listarImagem(int id_coluna, String sigla) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        List<Imagem> imagens = new ArrayList<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String sql = null;
        switch (sigla) {
            case "E":
                sql = "SELECT id, id_cadart, id_turismo, id_evento FROM imagem WHERE id_evento=?";
                break;
            case "C":
                sql = "SELECT id, id_cadart, id_turismo, id_evento FROM imagem WHERE id_cadart=?";
                break;
            case "T":
                sql = "SELECT id, id_cadart, id_turismo, id_evento FROM imagem WHERE id_turismo=?";
                break;
        }

        try {
            stmt = connection.prepareStatement(sql);

            stmt.setInt(1, id_coluna);

            rs = stmt.executeQuery();

            while (rs.next()) {
                Imagem imagem = new Imagem();
                imagem.setId(rs.getInt("id"));
                imagem.setIdTurismo(rs.getInt("id_turismo"));
                imagem.setIdEvento(rs.getInt("id_evento"));
                imagem.setIdCadart(rs.getInt("id_cadart"));
                imagens.add(imagem);
            }
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                connection.close();
                rs.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
        return imagens;
    }

    public List<Imagem> getById(int id) throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "select * from imagem where  id = ?";
        ResultSet rs = null;

        try {

            pstmt = connection.prepareStatement(sql);

            pstmt.setObject(1, id);
            rs = pstmt.executeQuery();

            return resultSetToObjectTransfer(rs);

        } catch (Exception e) {
            throw e;
        } finally {
            try {
                connection.close();
                rs.close();
                pstmt.close();
            } catch (Exception e) {
            }

        }

    }

    private List<Imagem> resultSetToObjectTransfer(ResultSet rs) throws Exception {
        List<Imagem> objs = new Vector<>();
        while (rs.next()) {
            Imagem imagem = new Imagem();
            imagem.setId(rs.getInt("id"));
            imagem.setIdEvento(rs.getInt("id_evento"));
            imagem.setIdCadart(rs.getInt("id_cadart"));
            imagem.setIdTurismo(rs.getInt("id_turismo"));
            imagem.setImagem(rs.getBytes("imagem"));

            objs.add(imagem);
        }
        return objs;
    }

}
