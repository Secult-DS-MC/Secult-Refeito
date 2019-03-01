package br.com.secult.dao;

import br.com.secult.model.Acontecimento;
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

    public List<Localidade> listarLocalidade(int id) throws SQLException, Exception {
        List<Localidade> objs = new Vector<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;

        this.con = new ConnectionFactory().getConnection();
        String sql = "SELECT * FROM localidade WHERE id = " + id + "";

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
        } catch (SQLException e) {
            throw e;
        } finally {
            try {
                con.close();
                rs.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
        return objs;
    }

    public List<Localidade> listarLocalidadeComEvento(int id) throws SQLException, Exception {
        List<Localidade> objs = new Vector<>();
        PreparedStatement stmt = null;
        ResultSet rs = null;

        this.con = new ConnectionFactory().getConnection();
        String sql = "SELECT l.id, e.titulo, l.nome, l.descricao FROM localidade as l JOIN acontecimento as e ON(l.id = e.id_localidade) WHERE l.id = " + id + "";

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

        } catch (SQLException e) {
            throw e;
        } finally {
            try {
                con.close();
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
        String sql = "SELECT id, nome, descricao FROM localidade";

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
        } catch (SQLException e) {
            throw e;
        } finally {
            try {
                con.close();
                rs.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
        return objs;
    }
    public boolean cadastrarLocalidade(Localidade localidade) {
        PreparedStatement stmt = null;

        boolean erro = true;
        this.con = new ConnectionFactory().getConnection();
        try {
            String slq = "INSERT INTO public.localidade(nome, descricao) VALUES (?, ?)";
            stmt = con.prepareStatement(slq);

            stmt.setString(1, localidade.getNome());
            stmt.setString(2, localidade.getDescricao());

            stmt.execute();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            erro = false;
        } finally {
            try {
                con.close();
                stmt.close();
                erro = true;
            } catch (Exception e) {
            }
        }
        return erro;
    }

    public boolean alterarLocalidade(Localidade localidade) {
        boolean erro = true;
        PreparedStatement stmt = null;
        this.con = new ConnectionFactory().getConnection();

        try {
            String sql = "UPDATE public.localidade SET nome=?, descricao=? WHERE id = ?";
            stmt = this.con.prepareStatement(sql);

            stmt.setString(1, localidade.getNome());
            stmt.setString(2, localidade.getDescricao());
            stmt.setInt(3, localidade.getId());

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            erro = false;
        } finally {
            try {
                con.close();
                stmt.close();
                erro = true;
            } catch (Exception e) {
            }
        }
        return erro;
    }
    
    public boolean excluirLocalidade(int idLocalidade){
        boolean erro = true;
        PreparedStatement stmt = null;
        this.con = new ConnectionFactory().getConnection();

        try {
            String sql = "DELETE FROM public.localidade WHERE id = ?";
            stmt = this.con.prepareStatement(sql);

            stmt.setInt(1, idLocalidade);

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            erro = false;
        } finally {
            try {
                con.close();
                stmt.close();
            } catch (Exception e) {
            }
        }
        return erro;
    }
}
