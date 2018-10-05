package br.com.secult.dao;

import br.com.secult.model.Evento;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;
import java.util.List;
import java.util.Vector;
import javax.imageio.ImageIO;

/**
 *
 * @author Muquifo
 */
public class EventoDao {

    private Connection connection;

    public long insertEvento(Evento evento) {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs;
        long id = 0;
        String sql = "INSERT INTO public.evento (titulo, descricao, data_evento, visibilidade, tipo_evento, hora_evento, id_povoado, local_cidade)  values (?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            Date date = Date.valueOf(evento.getData_evento());
            stmt = connection.prepareStatement(sql, (Statement.RETURN_GENERATED_KEYS));

            stmt.setString(1, evento.getTitulo());
            stmt.setString(2, evento.getDescricao());
            stmt.setDate(3, date);
            stmt.setString(4, evento.getVisibilidade());
            stmt.setString(5, evento.getTipo_evento());
            stmt.setString(6, evento.getHora_evento());
            stmt.setInt(7, evento.getId_localidade());
            stmt.setString(8, evento.getLocalCidade());

            stmt.executeUpdate();

            rs = stmt.getGeneratedKeys();
            rs.next();
            id = rs.getLong(1);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
            }
        }
        return id;
    }

    public List<Evento> listaEventos() throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();

        String sql = "SELECT * FROM evento order by data_evento desc ";
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

    private List<Evento> resultSetToObjectTransfer(ResultSet rs) throws Exception {
        List<Evento> objs = new Vector();
        while (rs.next()) {
            Evento even = new Evento();
            even.setId(rs.getLong("id"));
            even.setTitulo(rs.getString("titulo"));
            even.setDescricao(rs.getString("descricao"));
            even.setData_evento(rs.getString("data_evento"));
            even.setData_cadastro(rs.getDate("data_cadastro"));
            even.setTipo_evento(rs.getString("tipo_evento"));
            even.setHora_evento(rs.getString("hora_evento"));
            even.setVisibilidade(rs.getString("visibilidade"));
            even.setId_localidade(rs.getInt("id_povoado"));
            even.setLocalCidade(rs.getString("local_cidade"));

            objs.add(even);

        }
        return objs;
    }

    public List<Evento> getEventoById(Evento evento) throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "select * from evento where  id = ?";
        ResultSet rs = null;
        try {
            pstmt = connection.prepareStatement(sql);
            pstmt.setObject(1, evento.getId());
            rs = pstmt.executeQuery();

            return resultSetToObjectTransfer(rs);

        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                pstmt.close();
            } catch (Exception e) {
            }
        }

    }

    public boolean updateEvento(Evento evento) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        PreparedStatement stmt = null;

        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE evento SET titulo=?, descricao=?, tipo_evento=?, visibilidade=?, data_evento=?, hora_evento=?, id_povoado=?, local_cidade=? WHERE id=?";
        try {

            //converte String para o tipo Date
            Date date = Date.valueOf(evento.getData_evento());
            stmt = connection.prepareStatement(sql);
            stmt.setString(1, evento.getTitulo());
            stmt.setString(2, evento.getDescricao());
            stmt.setString(3, evento.getTipo_evento());
            stmt.setString(4, evento.getVisibilidade());
            stmt.setDate(5, date);
            stmt.setString(6, evento.getHora_evento());
            stmt.setInt(7, evento.getId_localidade());
            stmt.setString(8, evento.getLocalCidade());
            stmt.setLong(9, evento.getId());

            stmt.execute();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
            }

        }
        return hasError;

    }

    public List<Evento> listarEventoGrande(Evento even) throws SQLException, Exception {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();

        ResultSet rs = null;

        String sql = "SELECT e.id, titulo, e.descricao, visibilidade, data_cadastro, data_evento, hora_evento, id_povoado, tipo_evento, l.nome as \"nomeLocalidade\" FROM evento AS e JOIN localidade AS l ON(l.id = e.id_povoado) where visibilidade = 's' and tipo_evento = 'g'";
        try {
            stmt = connection.prepareStatement(sql);

            rs = stmt.executeQuery();

            return listarEventoComLocalidade(rs);
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

    private List<Evento> listarEventoComLocalidade(ResultSet rs) throws Exception {
        List<Evento> objs = new Vector();
        while (rs.next()) {
            Evento even = new Evento();
            even.setId(rs.getLong("id"));
            even.setTitulo(rs.getString("titulo"));
            even.setDescricao(rs.getString("descricao"));
            even.setData_evento(rs.getString("data_evento"));
            even.setData_cadastro(rs.getDate("data_cadastro"));
            even.setTipo_evento(rs.getString("tipo_evento"));
            even.setHora_evento(rs.getString("hora_evento"));
            even.setVisibilidade(rs.getString("visibilidade"));
            even.setId_localidade(rs.getInt("id_povoado"));
            even.setNomeEvento(rs.getString("nomeLocalidade"));

            objs.add(even);

        }
        return objs;
    }

    public List<Evento> listarEventoPequeno(Evento even) throws SQLException, Exception {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();

        ResultSet rs = null;

        Calendar c = Calendar.getInstance();
        int dia = c.get(Calendar.DAY_OF_MONTH);
        int mes = c.get(Calendar.MONTH);
        int ano = c.get(Calendar.YEAR);

        String sql = "SELECT * FROM evento where visibilidade = 's' and tipo_evento = 'p'";
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

    public boolean deletarEvento(Evento evento) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;

        String sql = "DELETE FROM evento WHERE id=?";
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setLong(1, evento.getId());
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            hasError = false;
        } finally {
            try {
                stmt.close();
            } catch (Exception e) {
            }

        }
        return hasError;
    }
}
