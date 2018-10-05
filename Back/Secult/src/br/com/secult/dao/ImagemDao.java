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
import javax.imageio.ImageIO;

/**
 *
 * @author David
 */
public class ImagemDao {

    Connection connection;

    public boolean inserirImagem(Imagem imagem) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;
        String sql = "INSERT INTO imagem (imagem, id_evento, id_turismo, id_cadart) VALUES(?,?,?,?)";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setObject(1, tratarImagem(imagem.getImagem()));
            stmt.setInt(2, imagem.getIdEvento());
            stmt.setInt(3, imagem.getIdTurismo());
            stmt.setInt(4, imagem.getIdCadart());

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

    public List<Imagem> listarImagem(Imagem imagem) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        List<Imagem> imagens = new ArrayList<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String sql = "SELECT * FROM imagem WHERE id=?";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setInt(1, imagem.getId());
            rs = stmt.executeQuery();

            while (rs.next()) {
                imagem.setId(rs.getInt("id"));
                imagem.setImagem(rs.getBytes("imagem"));
                imagem.setId(rs.getInt("id_cadart"));
                imagem.setId(rs.getInt("id_turismo"));
                imagem.setId(rs.getInt("id_evento"));

                imagens.add(imagem);
            }
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
        return imagens;
    }
    
    
    public boolean alterarImagem(Imagem imagem) throws Exception{
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

}
