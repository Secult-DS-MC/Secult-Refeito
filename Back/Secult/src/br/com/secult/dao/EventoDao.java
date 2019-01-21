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
import java.util.Calendar;
import java.util.List;
import java.util.Vector;

/**
 *
 * @author Computador
 */
public class EventoDao {

    private Connection connection;

    public List<Acontecimento> listarEvento() throws SQLException, Exception {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs = null;
  
        String sql = "SELECT A.id, titulo, A.descricao, data_evento, local_cidade, hora_evento, id_localidade, l.nome as nome_localidade FROM acontecimento as A join localidade as l on (l.id = A.id_localidade) where visibilidade = 's' and tipo_evento = 'E'";
        try {
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            List<Acontecimento> objs = new Vector();
            while (rs.next()) {
                Acontecimento even = new Acontecimento();
                even.setId(rs.getLong("id"));
                even.setTitulo(rs.getString("titulo"));
                even.setDescricao(rs.getString("descricao"));
                even.setData_evento(rs.getString("data_evento"));
                even.setHora_evento(rs.getString("hora_evento"));
                even.setIdLocalidade(rs.getInt("id_localidade"));
                even.setLocalCidade(rs.getString("local_cidade"));
                even.setNomeLocalidade(rs.getString("nome_localidade"));

                objs.add(even);

            }
            return objs;

        } catch (Exception e) {
            throw e;
        } finally {
            try {
                connection.close();
                rs.close();
                stmt.close();
            } catch (Exception e) {
            }
        }

    }

}
