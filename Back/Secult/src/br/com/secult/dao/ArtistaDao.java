/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Arte;
import br.com.secult.model.Artista;
import br.com.secult.model.Autenticar;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Computador
 */
public class ArtistaDao {

    private Connection connection;

    public boolean insert(Artista artista) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean semErro = true;
        try {
            String sql = "INSERT INTO artista (id, nome, descricao) VALUES (?,?,?)";
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, artista.getIdArtista());
            stmt.setString(2, artista.getNomeArtistico());
            stmt.setString(3, artista.getDescricao());

            stmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            semErro = false;
        } finally {
            try {
                stmt.close();
                connection.close();

            } catch (Exception e) {
            }

        }

        return semErro;
    }

    public boolean updateArtista(Artista artista) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean semErro = true;
        try {
            String sql = "UPDATE public.artista SET  nome=?, descricao=?, autenticado='N' WHERE id = ?";
            stmt = connection.prepareStatement(sql);
            stmt.setString(1, artista.getNomeArtistico());
            stmt.setString(2, artista.getDescricao());
            stmt.setInt(3, artista.getIdArtista());

            stmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            semErro = false;
        } finally {
            try {
                stmt.close();
                connection.close();

            } catch (Exception e) {
            }

        }

        return semErro;
    }

    public List<Arte> listarArtesArtista(int id) throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;
        List<Arte> artes = new ArrayList<Arte>();

        try {
            String sql = "SELECT a.nome FROM arte as a JOIN arte_artista as aa on aa.id_arte = a.id JOIN artista on artista.id = aa.id_artista WHERE artista.id = ?";
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, id);
            rs = stmt.executeQuery();
            while (rs.next()) {
                Arte arte = new Arte();
                arte.setNome(rs.getString("nome"));
                artes.add(arte);
            }

        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                stmt.close();
                connection.close();
            } catch (Exception e) {
            }
        }
        return artes;
    }

    public boolean updateVisibilidadeS(int id) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE artista SET autenticado='S' WHERE id=?";
        try {
            pstmt = connection.prepareStatement(sql);

            pstmt.setLong(1, id);
            pstmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                pstmt.close();
                connection.close();

            } catch (Exception e) {
            }

        }
        return hasError;
    }

    public boolean updateVisibilidadeN(int id) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE artista SET autenticado='N' WHERE id=?";
        try {
            pstmt = connection.prepareStatement(sql);

            pstmt.setLong(1, id);
            pstmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                pstmt.close();
                connection.close();

            } catch (Exception e) {
            }

        }
        return hasError;
    }
    public boolean updateVisibilidadeD(int id) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE artista SET autenticado='D' WHERE id=?";
        try {
            pstmt = connection.prepareStatement(sql);

            pstmt.setLong(1, id);
            pstmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                pstmt.close();
                connection.close();

            } catch (Exception e) {
            }

        }
        return hasError;
    }

    private String convertToHashSenha(String usuario) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        MessageDigest algorithm = MessageDigest.getInstance("SHA-256");
        byte messageDigest[] = algorithm.digest(usuario.getBytes("UTF-8"));
        StringBuilder hexString = new StringBuilder();
        for (byte b : messageDigest) {
            hexString.append(String.format("%02X", 0xFF & b));
        }
        String senha = hexString.toString();
        return senha;
    }

    public List<Autenticar> autenticarUsuario(String email, String senha) throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;
        List<Autenticar> dados = new ArrayList<Autenticar>();

        try {
            String sql = "SELECT u.id, u.nome as nomeCompleto, u.idade, u.sexo, a.nome as nomeArtistico, a.descricao, c.email, c.telefone, c.facebook, c.youtube, c.instagram, ut.id_tipo FROM usuario as u JOIN contato as c on u.id = c.id_usuario JOIN artista as a on u.id = a.id JOIN usu_tipo as ut on ut.id_usuario = u.id WHERE senha = ? and email = ?";
            stmt = connection.prepareStatement(sql);
            senha = convertToHashSenha(senha);
            stmt.setString(1, senha);
            stmt.setString(2, email);

            rs = stmt.executeQuery();

            while (rs.next()) {
                Autenticar dado = new Autenticar();
                dado.setId(rs.getInt("id"));
                dado.setNome(rs.getString("nomeCompleto"));
                dado.setIdade(rs.getInt("idade"));
                dado.setSexo(rs.getString("sexo"));
                dado.setNomeArtistico(rs.getString("nomeArtistico"));
                dado.setDescricao(rs.getString("descricao"));
                dado.setEmail(rs.getString("email"));
                dado.setTelefone(rs.getString("telefone"));
                dado.setFacebook(rs.getString("facebook"));
                dado.setYoutube(rs.getString("youtube"));
                dado.setInstagram(rs.getString("instagram"));
                dado.setTipo(rs.getInt("id_tipo"));
                dados.add(dado);
            }
            return dados;
        } catch (Exception e) {
            System.out.println("Erro ");

            throw e;
        } finally {
            try {
                rs.close();
                stmt.close();
                connection.close();
            } catch (Exception e) {
            }
        }
    }

    public List<Autenticar> autenticarUsuarioById(int id) throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;
        List<Autenticar> dados = new ArrayList<Autenticar>();

        try {
            String sql = "SELECT u.id, u.nome as nomeCompleto, u.idade, u.sexo, a.nome as nomeArtistico, a.descricao, c.email, c.telefone, c.facebook, c.youtube, c.instagram, ut.id_tipo, a.autenticado FROM usuario as u JOIN contato as c on u.id = c.id_usuario JOIN artista as a on u.id = a.id JOIN usu_tipo as ut on ut.id_usuario = u.id WHERE u.id = 1";
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, id);

            rs = stmt.executeQuery();

            while (rs.next()) {
                Autenticar dado = new Autenticar();
                dado.setId(rs.getInt("id"));
                dado.setNome(rs.getString("nomeCompleto"));
                dado.setIdade(rs.getInt("idade"));
                dado.setSexo(rs.getString("sexo"));
                dado.setNomeArtistico("nomeArtistico");
                dado.setDescricao(rs.getString("descricao"));
                dado.setAutenticado(rs.getString("autenticado"));
                dado.setEmail(rs.getString("email"));
                dado.setTelefone(rs.getString("telefone"));
                dado.setFacebook(rs.getString("facebook"));
                dado.setYoutube(rs.getString("youtube"));
                dado.setInstagram(rs.getString("instagram"));
                dado.setTipo(rs.getInt("id_tipo"));
                dados.add(dado);
            }
            return dados;
        } catch (Exception e) {
            System.out.println("Erro ");

            throw e;
        } finally {
            try {
                System.out.println("Final ");
                rs.close();
                stmt.close();
                connection.close();
            } catch (Exception e) {
            }
        }
    }
}
