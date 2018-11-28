/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import br.com.secult.model.Acontecimento;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Computador
 */
public class CalendarioDao {
    
    private Connection connection;

    
    public List<Acontecimento> listarCalendario() throws SQLException, Exception {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();

        ResultSet rs = null;

        String sql = "SELECT A.id, titulo, A.descricao, visibilidade, data_cadastro, data_evento, hora_evento, id_localidade, tipo_evento FROM acontecimento AS A where visibilidade = 's' and tipo_evento = 'C'";
        try {
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            List<Acontecimento> objs = new ArrayList<Acontecimento>();
            while (rs.next()) {
                Acontecimento even = new Acontecimento();
                even.setId(rs.getLong("id"));
                even.setTitulo(rs.getString("titulo"));
                even.setDescricao(rs.getString("descricao"));
                even.setData_evento(rs.getString("data_evento"));
                even.setData_cadastro(rs.getDate("data_cadastro"));
                even.setTipo_evento(rs.getString("tipo_evento"));
                even.setHora_evento(rs.getString("hora_evento"));
                even.setVisibilidade(rs.getString("visibilidade"));
                objs.add(even);
            }
            return objs;
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
