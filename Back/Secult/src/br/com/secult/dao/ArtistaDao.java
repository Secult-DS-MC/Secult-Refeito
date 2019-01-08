/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Artista;
import java.io.UnsupportedEncodingException;
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
public class ArtistaDao {

    private Connection connection;

    public int insert(Artista artista) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();

        try {
            String sql = "INSERT INTO artista (id, nome, descricao) VALUES (?,?,?)";
            stmt = connection.prepareStatement(sql, (Statement.RETURN_GENERATED_KEYS));
            stmt.setInt(1, artista.getId());
            stmt.setString(2, artista.getNome());
            stmt.setString(3, artista.getDescricao());

            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            rs.next();
            int id = rs.getInt(1);
            return id;
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

}
