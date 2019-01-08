/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Cadart;
import br.com.secult.model.Usuario;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Computador
 */
public class UsuarioDao {

    private Connection connection;

    public int insert(Usuario usuario) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();

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
           return rs.getInt(1);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
            }

        }
        return 0;

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
}
