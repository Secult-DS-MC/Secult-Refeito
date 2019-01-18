/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 *
 * @author Computador
 */
public class ContatoDao {
      Connection connection;
      
       public boolean inserirContato(ContatoDao contato) throws SQLException {
        this.connection = new ConnectionFactory().getConnection();
        boolean erro = true;
           PreparedStatement stmt = null;
        String sql = "INSERT INTO contato";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setString(1, redes.getNomeRede());
            stmt.setString(2, redes.getNomeLink());
            stmt.setLong(3, redes.getIdCadart());

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
