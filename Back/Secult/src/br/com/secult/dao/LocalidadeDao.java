package br.com.secult.dao;

import br.com.secult.model.Evento;
import br.com.secult.model.Localidade;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Vector;
import javax.imageio.ImageIO;

public class LocalidadeDao {

    private Connection con;

    public List<Localidade> listarLocalidade() throws SQLException, Exception {
        List<Localidade> objs = new Vector<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;

        this.con = new ConnectionFactory().getConnection();
        String sql = "SELECT * FROM localidade";

        try {
            stmt = con.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {
                Localidade localidade = new Localidade();

                localidade.setId(rs.getInt("id"));
                localidade.setNome(rs.getString("nome"));
                localidade.setDescricao(rs.getString("descricao"));

                objs.add(localidade);
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
        return objs;
    }

    public List<Localidade> listarLocalidadeComEvento() throws SQLException, Exception {
        List<Localidade> objs = new Vector<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;

        this.con = new ConnectionFactory().getConnection();
        String sql = "SELECT l.id, e.titulo, l.nome, l.descricao FROM localidade as l JOIN evento as e ON(l.id = e.id_povoado)";

        try {
            stmt = con.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {
                Localidade localidade = new Localidade();

                localidade.setId(rs.getInt("id"));
                localidade.setNomeEvento(rs.getString("titulo"));
                localidade.setNome(rs.getString("nome"));
                localidade.setDescricao(rs.getString("descricao"));

                objs.add(localidade);
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
        return objs;
    }

    public List<Localidade> carregarLocalidade() throws SQLException, Exception {
        List<Localidade> objs = new Vector<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;

        this.con = new ConnectionFactory().getConnection();
        String sql = "SELECT id, nome FROM localidade";

        try {
            stmt = con.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                Localidade localidade = new Localidade();

                localidade.setId(rs.getInt("id"));
                localidade.setNome(rs.getString("nome"));

                objs.add(localidade);
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
        return objs;
    }
}