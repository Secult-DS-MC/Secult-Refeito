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
            } catch (Exception e) {
            }

        }
        return hasError;
    }
}
