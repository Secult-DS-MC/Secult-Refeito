package br.com.secult.dao;

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

    public boolean inserirImagem(Imagem imagem, long id_coluna, String sigla) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = null;
        switch (sigla) {
            case "A":
                sql = "INSERT INTO imagem (imagem, id_acontecimento) VALUES(?,?)";
                break;
            case "U":
                sql = "INSERT INTO imagem (imagem, id_usuario, tipo) VALUES(?,?, 'perfil')";
                break;
            case "T":
                sql = "INSERT INTO imagem (imagem, id_turismo) VALUES(?,?)";
                break;
        }
        PreparedStatement stmt = connection.prepareStatement(sql);

        try {

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setLong(2, id_coluna);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                stmt.close();
                connection.close();
            } catch (Exception e) {
            }
        }
        return hasError;
    }

    public boolean atualizarImagem(Imagem imagem, long id_coluna, String sigla) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = null;
        switch (sigla) {
            case "A":
                sql = "UPDATE imagem SET imagem=? WHERE id_acontecimento = ?";
                break;
            case "U":
                sql = "UPDATE imagem SET imagem=? WHERE id_usuario = ?";
                break;
            case "T":
                sql = "UPDATE imagem SET imagem=? WHERE id_turismo = ?";
                break;
        }
        PreparedStatement stmt = connection.prepareStatement(sql);

        try {

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setLong(2, id_coluna);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                stmt.close();
                connection.close();
            } catch (Exception e) {
            }
        }
        return hasError;
    }

    public boolean alterarImagemPerfil(Imagem imagem, long id_coluna, String sigla) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = null;
        switch (sigla) {
            case "A":
                sql = "UPDATE imagem SET imagem=? WHERE id_acontecimento = ?";
                break;
            case "U":
                sql = "UPDATE imagem SET imagem=?, tipo='perfil' WHERE id_usuario = ? and tipo = 'perfil'";
                break;
            case "T":
                sql = "UPDATE imagem SET imagem=? WHERE id_turismo = ?";
                break;
        }
        PreparedStatement stmt = connection.prepareStatement(sql);

        try {

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setLong(2, id_coluna);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            System.out.println("alterou perfil");
            try {
                stmt.close();
                connection.close();
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
                connection.close();
            } catch (Exception e) {
            }
        }
        return hasError;
    }

    public boolean deletarImagem(long id) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;

        String sql = "DELETE FROM imagem WHERE id_acontecimento=?";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setLong(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;

        } finally {
            try {
                stmt.close();
                connection.close();
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

    public List<Imagem> listarImagem(long id_coluna, String sigla) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        List<Imagem> imagens = new ArrayList<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String sql = null;
        switch (sigla) {
            case "E":
                sql = "SELECT id, id_usuario, id_turismo, id_acontecimento FROM imagem WHERE id_acontecimento=?";
                break;
            case "U":
                sql = "SELECT id, id_usuario, id_turismo, id_acontecimento FROM imagem WHERE id_usuario=?";
                break;
            case "T":
                sql = "SELECT id, id_usuario, id_turismo, id_acontecimento FROM imagem WHERE id_turismo=?";
                break;
        }

        try {
            stmt = connection.prepareStatement(sql);

            stmt.setLong(1, id_coluna);

            rs = stmt.executeQuery();

            while (rs.next()) {
                Imagem imagem = new Imagem();
                imagem.setId(rs.getInt("id"));
                imagem.setIdTurismo(rs.getLong("id_turismo"));
                imagem.setIdEvento(rs.getLong("id_acontecimento"));
                imagem.setIdUsuario(rs.getLong("id_usuario"));
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

    public List<Imagem> getById(long id) throws SQLException, Exception {
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

    public List<Imagem> getByIdEvento(long id) throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "select * from imagem where  id_acontecimento = ?";
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

    public Imagem buscarImagem(long id, String sigla) throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "";
        ResultSet rs = null;
        List<Imagem> objs = new Vector<>();
        switch (sigla) {
            case "A":
                sql = "select * from imagem where  id_acontecimento = ?";
                break;
            case "U":
                sql = "select * from imagem where  id_usuario = ?";
                break;
            case "T":
                sql = "select * from imagem where  id_turismo = ?";
                break;
        }
        try {

            pstmt = connection.prepareStatement(sql);

            pstmt.setLong(1, id);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                Imagem imagem = new Imagem();
                imagem.setImagem(rs.getBytes("imagem"));
                return imagem;
            }

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
        return null;
    }

    private List<Imagem> resultSetToObjectTransfer(ResultSet rs) throws Exception {
        List<Imagem> objs = new Vector<>();
        while (rs.next()) {
            Imagem imagem = new Imagem();
            imagem.setId(rs.getInt("id"));
            imagem.setIdEvento(rs.getLong("id_acontecimento"));
            imagem.setIdUsuario(rs.getLong("id_usuario"));
            imagem.setIdTurismo(rs.getLong("id_turismo"));
            imagem.setImagem(rs.getBytes("imagem"));

            objs.add(imagem);
        }
        return objs;
    }

}
