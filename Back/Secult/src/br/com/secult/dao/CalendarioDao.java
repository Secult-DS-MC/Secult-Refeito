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

        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_evento, a.tipo_evento, a.id_localidade, a.origem,"
                + "o.nome AS nome_origem, l.nome AS nome_localidade FROM acontecimento as a JOIN origem as o ON(a.origem = o.id_origem)"
                + "JOIN localidade AS l ON (a.id_localidade = l.id) where visibilidade = 's' and tipo_evento = 'C' ORDER BY a.data_evento asc";
        try {
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            List<Acontecimento> objs = new ArrayList<Acontecimento>();
            while (rs.next()) {
                Acontecimento even = new Acontecimento();
                even.setId(rs.getLong("id"));
                even.setTitulo(rs.getString("titulo"));
                even.setDescricao(rs.getString("descricao"));
                even.setVisibilidade(rs.getString("visibilidade"));
                even.setData_evento(rs.getString("data_evento"));
                even.setTipo_evento(rs.getString("tipo_evento"));
                even.setIdLocalidade(rs.getInt("id_localidade"));
                even.setNomeEvento(rs.getString("nome_localidade"));
                even.setNomeOrigem(rs.getString("nome_origem"));
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

    public List<Acontecimento> listarQtdEventos() throws SQLException, Exception {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        List<Acontecimento> objs = new ArrayList<Acontecimento>();
        ResultSet rs = null;

        String sql = "select count(data_evento) qtd, extract('month' from data_evento) mes\n"
                + "from acontecimento where tipo_evento = 'C' group by extract('month' from data_evento)";
        try {
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();
            while (rs.next()) {
                Acontecimento even = new Acontecimento();
                even.setMes(rs.getInt("mes"));
                even.setQtdEventos(rs.getInt("qtd"));
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
