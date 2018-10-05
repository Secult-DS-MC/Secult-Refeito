/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Arte;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Vector;

/**
 *
 * @author Muquifo
 */
public class ArteDao {

    private Connection connection;

    public List<Arte> listarArte() throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "select  * from arte";
        
        try {
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
    
    private List<Arte> resultSetToObjectTransfer(ResultSet rs) throws Exception {
        List<Arte> objs = new Vector<>();
        while (rs.next()) {
            Arte arte = new Arte();
            arte.setId(rs.getInt("id"));
            arte.setNome(rs.getString("nome"));
            
            objs.add(arte);
        }
        return objs;
    }
}
