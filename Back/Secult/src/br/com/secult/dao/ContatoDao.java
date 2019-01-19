/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import br.com.secult.model.Contato;

/**
 *
 * @author Computador
 */
public class ContatoDao {

    Connection connection;

    public boolean inserirContato(Contato contato) throws SQLException {
        this.connection = new ConnectionFactory().getConnection();
        boolean erro = true;
        PreparedStatement stmt = null;
        String sql = "INSERT INTO contato (id_usuario, email, telefone, facebook, youtube, instagram)values (?,?,?,?,?,?)";
        try {
            stmt = connection.prepareStatement(sql);
            stmt.setLong(1, contato.getId());
            stmt.setString(2, contato.getEmail());
            stmt.setString(3, contato.getTelefone());
            stmt.setString(4, contato.getFacebook());
            stmt.setString(5, contato.getYoutube());
            stmt.setString(6, contato.getInstagram());

            stmt.execute();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return erro = false;
        } finally {
            stmt.close();
        }
        return erro;
    }
}
