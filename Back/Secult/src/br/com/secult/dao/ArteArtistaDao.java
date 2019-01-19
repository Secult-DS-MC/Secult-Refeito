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
public class ArteArtistaDao {

    private Connection connection;

    public boolean insert(int id_artista, int id_arte) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
           boolean semErro = true;
        try {
            String sql = "INSERT INTO arte_artista (id_arte, id_artista) VALUES (?, ?)";
            stmt = connection.prepareStatement(sql);

            stmt.setInt(1, id_arte);
            stmt.setInt(2, id_artista);

            stmt.execute();
           
        } catch (SQLException e) {
            semErro = false;
            System.out.println(e.getMessage());
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
            }

        }

        return semErro;
    }
}
