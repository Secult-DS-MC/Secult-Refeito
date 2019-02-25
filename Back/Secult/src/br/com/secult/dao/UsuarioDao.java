/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Artista;
import br.com.secult.model.Usuario;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Vector;

/**
 *
 * @author Computador
 */
public class UsuarioDao {

    private Connection connection;

    public int insert(Usuario usuario) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        int id = 0;
        try {
            String sql = "INSERT INTO usuario (nome, sexo, senha, idade) VALUES (?, ?, ?, ?);";
            stmt = connection.prepareStatement(sql, (Statement.RETURN_GENERATED_KEYS));

            String senha = convertToHash(usuario);

            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getSexo());
            stmt.setString(3, senha);
            stmt.setInt(4, usuario.getIdade());
            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            rs.next();
            id = rs.getInt(1);
            sql = "INSERT INTO public.usu_tipo(id_usuario) VALUES ( ?);";
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, id);
            stmt.execute();
            rs.close();
            return id;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                connection.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
        return 0;
    }

    public boolean updateUsuario(Usuario usuario) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean semErro = true;
        try {
            String sql = "UPDATE public.usuario SET  nome=?, idade=?, sexo=? WHERE id=?";
            stmt = connection.prepareStatement(sql);

            stmt.setString(1, usuario.getNome());
            stmt.setInt(2, usuario.getIdade());
            stmt.setString(3, usuario.getSexo());
            stmt.setInt(4, usuario.getId());
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            semErro = false;
        } finally {
            try {
                connection.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
        return semErro;
    }

    private String convertToHash(Usuario usuario) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        MessageDigest algorithm = MessageDigest.getInstance("SHA-256");
        byte messageDigest[] = algorithm.digest(usuario.getSenha().getBytes("UTF-8"));
        StringBuilder hexString = new StringBuilder();
        for (byte b : messageDigest) {
            hexString.append(String.format("%02X", 0xFF & b));
        }
        String senha = hexString.toString();
        return senha;
    }

    public List<Artista> listarAristasAutenticados() throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;

        try {
            String sql = "SELECT u.id, u.nome, a.nome \"nomeArtistico\", u.sexo, a.descricao, u.idade FROM usuario as u JOIN artista as a on (u.id = a.id) JOIN usu_tipo as ut on (ut.id_usuario = u.id) where a.autenticado = 'S' and ut.id_tipo = 0;";
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            return resultSetToObjectTransfer(rs);
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
    }

    public List<Artista> listarAristasNaoAutenticados() throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;

        try {
            String sql = "SELECT u.id, u.nome, a.nome \"nomeArtistico\", u.sexo, a.descricao, u.idade FROM usuario as u JOIN artista as a on (u.id = a.id) JOIN usu_tipo as ut on (ut.id_usuario = u.id) where a.autenticado = 'N'  and ut.id_tipo = 0;";
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            return resultSetToObjectTransfer(rs);
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
    }

    private List<Artista> resultSetToObjectTransfer(ResultSet rs) throws Exception {
        List<Artista> objs = new Vector<>();
        while (rs.next()) {

            Artista artista = new Artista();
            artista.setId(rs.getInt("id"));
            artista.setSexo(rs.getString("sexo"));
            artista.setIdade(rs.getInt("idade"));
            artista.setNome(rs.getString("nome"));
            artista.setNomeArtistico(rs.getString("nomeArtistico"));
            artista.setDescricao(rs.getString("descricao"));

            objs.add(artista);
        }
        return objs;
    }

    public boolean verificarEmail(String email) throws Exception, Exception {
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
        PreparedStatement stmt = null;

        try {
            String sql = "SELECT email FROM contato where email = ?";
            stmt = connection.prepareStatement(sql);
            stmt.setString(1, email);

            rs = stmt.executeQuery();
            if (rs.next()) {
                if (rs.getString("email").equals(email)) {
                    return true;
                } else {
                    return false;
                }
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

        return false;
    }
}
