/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Cadart;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Vector;
import javax.imageio.ImageIO;

/**
 *
 * @author David
 */
public class CadartDao {

    private Connection connection;

    public boolean insert(Cadart cadart) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;

        try {
            String sql = "INSERT INTO cadart (cpf, nome, nome_artistico, telefone, email, sexo, descricao, projeto_atual, idade, senha, id_arte, visibilidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)";
            stmt = connection.prepareStatement(sql);

            String senha = convertToHash(cadart);

            stmt.setLong(1, cadart.getCpf());
            stmt.setString(2, cadart.getNome());
            stmt.setString(3, cadart.getNomeArtistico());
            stmt.setString(4, cadart.getTelefone());
            stmt.setString(5, cadart.getEmail());
            stmt.setString(6, cadart.getSexo());
            stmt.setString(7, cadart.getDescricao());
            stmt.setString(8, cadart.getProjetoAtual());
            stmt.setInt(9, cadart.getIdade());
            stmt.setString(10, senha);
            stmt.setInt(11, cadart.getIdArte());
            stmt.setString(12, cadart.getVisibilidade());

            stmt.execute();
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

    private List<Cadart> resultSetToObjectTransfer(ResultSet rs) throws Exception {
        List<Cadart> objs = new Vector<>();
        while (rs.next()) {

            Cadart cadart = new Cadart();
            cadart.setCpf(rs.getLong("cpf"));
            cadart.setNome(rs.getString("nome"));
            cadart.setNomeArtistico(rs.getString("nome_artistico"));
            cadart.setSexo(rs.getString("sexo"));
            cadart.setFotoPerfil(rs.getBytes("foto_perfil"));
            cadart.setDescricao(rs.getString("descricao"));
            cadart.setIdade(rs.getInt("idade"));
            cadart.setIdArte(rs.getInt("id_arte"));
            cadart.setProjetoAtual(rs.getString("projeto_atual"));
            cadart.setEmail(rs.getString("email"));
            cadart.setTelefone(rs.getString("telefone"));
            cadart.setSenha(rs.getString("senha"));
            cadart.setVisibilidade(rs.getString("visibilidade"));

            objs.add(cadart);
        }
        return objs;
    }

    public List<Cadart> autenticar(Cadart cadart) throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "select * from cadart where  email=? and senha=?";
        ResultSet rs = null;

        try {

            String senha = convertToHash(cadart);

            pstmt = connection.prepareStatement(sql);

            pstmt.setObject(1, cadart.getEmail());
            pstmt.setObject(2, senha);
            rs = pstmt.executeQuery();

            return resultSetToObjectTransfer(rs);

        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                pstmt.close();
            } catch (Exception e) {
            }

        }

    }

    public List<Cadart> listarUsuario() throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;

        try {
            String sql = "SELECT * FROM cadart";
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            return resultSetToObjectTransfer(rs);
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
    }

    public List<Cadart> listarUsuarioByVisibilidade() throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;

        try {
            String sql = "SELECT cpf, C.nome as \"nomeUsu\", nome_artistico, sexo, foto_perfil, descricao, idade, senha, projeto_atual, telefone, email, A.nome as \"nomeArte\", visibilidade, id_arte From cadart as C join arte as A ON(C.id_arte = A.id) Where visibilidade = 's'";
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            return resultSetToObjectTransferByVisi(rs);
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
    }

    private List<Cadart> resultSetToObjectTransferByVisi(ResultSet rs) throws Exception {
        List<Cadart> objs = new Vector<>();
        while (rs.next()) {
            Cadart cadart = new Cadart();
            cadart.setCpf(rs.getLong("cpf"));
            cadart.setNome(rs.getString("nomeUsu"));
            cadart.setNomeArtistico(rs.getString("nome_artistico"));
            cadart.setSexo(rs.getString("sexo"));
            cadart.setFotoPerfil(rs.getBytes("foto_perfil"));
            cadart.setDescricao(rs.getString("descricao"));
            cadart.setIdade(rs.getInt("idade"));
            cadart.setProjetoAtual(rs.getString("projeto_atual"));
            cadart.setEmail(rs.getString("email"));
            cadart.setTelefone(rs.getString("telefone"));
            cadart.setSenha(rs.getString("senha"));
            cadart.setVisibilidade(rs.getString("visibilidade"));
            cadart.setNomeArte(rs.getString("nomeArte"));
            cadart.setIdArte(rs.getInt("id_arte"));

            objs.add(cadart);
        }
        return objs;
    }

    public boolean updateUsuario(Cadart cadart) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;

        String sql = "UPDATE cadart SET nome_artistico=?, descricao=?, email=?, id_arte=?, telefone=?, projeto_atual=?, nome=?, idade=? WHERE cpf=?";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setString(1, cadart.getNomeArtistico());
            stmt.setString(2, cadart.getDescricao());
            stmt.setString(3, cadart.getEmail());
            stmt.setInt(4, cadart.getIdArte());
            stmt.setString(5, cadart.getTelefone());
            stmt.setString(6, cadart.getProjetoAtual());
            stmt.setString(7, cadart.getNome());
            stmt.setInt(8, cadart.getIdade());
            stmt.setLong(9, cadart.getCpf());

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

    public boolean updateSenha(Cadart cadart) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement pstmt = null;

        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE cadart SET senha = ? where cpf=?";
        try {
            pstmt = connection.prepareStatement(sql);

            String senha = convertToHash(cadart);
            pstmt.setString(1, senha);
            pstmt.setLong(2, cadart.getCpf());
            pstmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                pstmt.close();
            } catch (Exception e) {
            }

        }
        return hasError;
    }

    public boolean updateVisibilidadeS(Cadart cadart) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE cadart SET visibilidade='s' WHERE cpf=?";
        try {
            pstmt = connection.prepareStatement(sql);

            pstmt.setLong(1, cadart.getCpf());
            pstmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                pstmt.close();
            } catch (Exception e) {
            }

        }
        return hasError;
    }

    public boolean updateVisibilidadeN(Cadart cadart) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE cadart SET visibilidade='n' WHERE cpf=?";
        try {
            pstmt = connection.prepareStatement(sql);

            pstmt.setLong(1, cadart.getCpf());
            pstmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                pstmt.close();
            } catch (Exception e) {
            }

        }
        return hasError;
    }

    public boolean delete(Cadart cadart) {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;

        String sql = "DELETE FROM cadart WHERE cpf=?";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setLong(1, cadart.getCpf());

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

    public List<Cadart> getById(Cadart cadart) throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "select * from cadart where  cpf = ?";
        ResultSet rs = null;

        try {

            pstmt = connection.prepareStatement(sql);

            pstmt.setObject(1, cadart.getCpf());
            rs = pstmt.executeQuery();

            return resultSetToObjectTransfer(rs);

        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                pstmt.close();
            } catch (Exception e) {
            }

        }

    }

    public List<Cadart> getByVisibilidadeDiferenteS() throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "SELECT * FROM cadart WHERE visibilidade != 's'";
        ResultSet rs = null;

        try {

            pstmt = connection.prepareStatement(sql);
            rs = pstmt.executeQuery();

            return resultSetToObjectTransfer(rs);

        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                pstmt.close();
            } catch (Exception e) {
            }

        }

    }
    //criptografar senha

    private String convertToHash(Cadart cadart) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        MessageDigest algorithm = MessageDigest.getInstance("SHA-256");
        byte messageDigest[] = algorithm.digest(cadart.getSenha().getBytes("UTF-8"));
        StringBuilder hexString = new StringBuilder();
        for (byte b : messageDigest) {
            hexString.append(String.format("%02X", 0xFF & b));
        }
        String senha = hexString.toString();
        return senha;
    }
    //inserção de foto

    public void salvarFoto(Cadart cadart) throws Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "UPDATE cadart SET foto_perfil=? WHERE cpf = ?";
        try {

            pstmt = connection.prepareStatement(sql);
            pstmt.setObject(1, tratarImagem(cadart.getFotoPerfil()));
            pstmt.setLong(2, cadart.getCpf());

            pstmt.execute();

        } catch (Exception e) {

            throw e;
        } finally {
            try {
                pstmt.close();
            } catch (Exception e) {
            }

        }

    }
    //métodos pra diminuir arquivos de foto

    public byte[] tratarImagem(byte[] img) throws Exception {
        int nBase = 200;
        int nProporcao = 0;

        BufferedImage imgScale = bytesToImage(img);
        int width = (int) imgScale.getWidth();
        int height = (int) imgScale.getHeight();

        if (width > 120  || height > 200) {
            if (width > height) {
                nProporcao = (int) ((120 * nBase) / width);
                height = (int) ((height * nProporcao) / 120);
                width = nBase;
            } else {
                nProporcao = (int) ((120 * nBase) / height);
                width = (int) ((width * nProporcao) / 120);
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
