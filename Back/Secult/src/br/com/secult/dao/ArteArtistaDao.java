/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Arte;
import br.com.secult.model.Artista;
import java.io.UnsupportedEncodingException;
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

    public boolean updateArteArtista(int id_artista, int id_arte) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        boolean semErro = true;
        try {
            String sql = "delete from  arte_artista WHERE id_artista =?";
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

    
    public List<Arte> listarArteArtista(int id) throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "SELECT a.nome, a.id FROM arte as a JOIN arte_artista as at on a.id = at.id_arte JOIN artista as usu on usu.id = at.id_artista where usu.id = " + id;
        List<Arte> artes = new ArrayList<Arte>();
        try {
            stmt = connection.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                Arte arte = new Arte();
                arte.setNome(rs.getString("nome"));
                arte.setId(rs.getInt("id"));

                artes.add(arte);
            }
            return artes;

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
}
