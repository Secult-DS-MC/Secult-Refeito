package br.com.secult.dao;

import br.com.secult.model.Acontecimento;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import br.com.secult.dao.Comum;
import br.com.secult.model.Imagem;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;
import java.util.List;
import java.util.Vector;

public class AcontecimentoDao {

    private Connection connection;

    public long insertAcontecimento(Acontecimento acontecimento) {
        PreparedStatement stmt = null;
        this.connection = new ConnectionFactory().getConnection();
        ResultSet rs;
        long id = 0;
        String sql = "INSERT INTO public.acontecimento (titulo, descricao, data_evento, visibilidade, tipo_evento, hora_evento, id_localidade, local_cidade, origem)  values (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            Date date = Date.valueOf(acontecimento.getData_evento());
            stmt = connection.prepareStatement(sql, (Statement.RETURN_GENERATED_KEYS));

            stmt.setString(1, acontecimento.getTitulo());
            stmt.setString(2, acontecimento.getDescricao());
            stmt.setDate(3, date);
            stmt.setString(4, acontecimento.getVisibilidade());
            stmt.setString(5, acontecimento.getTipo_evento());
            stmt.setString(6, acontecimento.getHora_evento());
            stmt.setInt(7, acontecimento.getIdLocalidade());
            stmt.setString(8, acontecimento.getLocalCidade());
            stmt.setInt(9, acontecimento.getOrigem());

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

    public List<Acontecimento> listarAcontecimentoTipo(String tipo) throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();

        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_cadastro, a.data_evento, \n"
                + "       a.tipo_evento, a.id_imagem, a.local_cidade, a.hora_evento, a.id_localidade, a.origem, o.nome AS nome_origem\n"
                + "  FROM acontecimento as a JOIN origem as o\n"
                + "  ON(a.origem = o.id_origem)\n"
                + "  WHERE origem = " + tipo + "";

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

    public List<Acontecimento> listaAcontecimento() throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();

        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_cadastro, a.data_evento, \n"
                + "       a.tipo_evento, a.local_cidade, a.hora_evento, a.id_localidade, a.origem, o.nome AS nome_origem\n"
                + "  FROM acontecimento as a JOIN origem as o\n"
                + "  ON(a.origem = o.id_origem) order by visibilidade = 'n';";
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

    public List<Acontecimento> listarAcontecimentoPorVisibilidadeS() throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();

        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_cadastro, a.data_evento, \n"
                + "       a.tipo_evento, a.id_imagem, a.local_cidade, a.hora_evento, a.id_localidade, a.origem, o.nome AS nome_origem\n"
                + "  FROM acontecimento as a JOIN origem as o\n"
                + "  ON(a.origem = o.id_origem) \n"
                + "  WHERE visibilidade = 's';";
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

    public List<Acontecimento> listarAcontecimentoPorVisibilidadeN() throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();

        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_cadastro, a.data_evento, \n"
                + "       a.tipo_evento, a.id_imagem, a.local_cidade, a.hora_evento, a.id_localidade, a.origem, o.nome AS nome_origem\n"
                + "  FROM acontecimento as a JOIN origem as o\n"
                + "  ON(a.origem = o.id_origem) \n"
                + "  WHERE visibilidade = 'n';";
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

    public List<Acontecimento> listarAcontecimentoPorEsseMes() throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();
        int mes = Comum.mesAt();
        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_cadastro, a.data_evento, \n"
                + "       a.tipo_evento, a.id_imagem, a.local_cidade, a.hora_evento, a.id_localidade, a.origem, o.nome AS nome_origem\n"
                + "  FROM acontecimento as a JOIN origem as o\n"
                + "  ON(a.origem = o.id_origem) \n"
                + "  WHERE EXTRACT(month from data_evento)=" + mes;
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

    public List<Acontecimento> listarAcontecimentoUltimos6Meses() throws SQLException, Exception {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        this.connection = new ConnectionFactory().getConnection();
        int mes = Comum.mesAt();
        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_cadastro, a.data_evento, \n"
                + "       a.tipo_evento, a.id_imagem, a.local_cidade, a.hora_evento, a.id_localidade, a.origem, o.nome AS nome_origem\n"
                + "  FROM acontecimento as a JOIN origem as o\n"
                + "  ON(a.origem = o.id_origem) \n"
                + "  where EXTRACT(month from data_evento)>=6 order by EXTRACT(month from data_evento)";
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

    public List<Acontecimento> getAcontecimentoById(Acontecimento evento) throws SQLException, Exception {
        PreparedStatement pstmt = null;
        this.connection = new ConnectionFactory().getConnection();
        String sql = "SELECT a.id, a.titulo, a.descricao, a.visibilidade, a.data_cadastro, a.data_evento, \n"
                + "       a.tipo_evento, a.id_imagem, a.local_cidade, a.hora_evento, a.id_localidade, a.origem, o.nome AS nome_origem\n"
                + "  FROM acontecimento as a JOIN origem as o\n"
                + "  ON(a.origem = o.id_origem) \n"
                + "  WHERE id = ?";
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

    private List<Acontecimento> resultSetToObjectTransfer(ResultSet rs) throws Exception {
        List<Acontecimento> objs = new Vector();
        while (rs.next()) {
            Acontecimento acontecimento = new Acontecimento();
            acontecimento.setId(rs.getLong("id"));
            acontecimento.setTitulo(rs.getString("titulo"));
            acontecimento.setDescricao(rs.getString("descricao"));
            acontecimento.setData_evento(rs.getString("data_evento"));
            acontecimento.setData_cadastro(rs.getDate("data_cadastro"));
            acontecimento.setTipo_evento(rs.getString("tipo_evento"));
            acontecimento.setHora_evento(rs.getString("hora_evento"));
            acontecimento.setVisibilidade(rs.getString("visibilidade"));
            acontecimento.setIdLocalidade(rs.getInt("id_localidade"));
            acontecimento.setLocalCidade(rs.getString("local_cidade"));
            acontecimento.setOrigem(rs.getInt("origem"));
            acontecimento.setNomeOrigem(rs.getString("nome_origem"));

            objs.add(acontecimento);

        }
        return objs;
    }

    public boolean updateAcontecimento(Acontecimento evento) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        PreparedStatement stmt = null;

        this.connection = new ConnectionFactory().getConnection();
        boolean hasError = true;
        String sql = "UPDATE acontecimento SET titulo=?, descricao=?, tipo_evento=?, visibilidade=?, data_evento=?, hora_evento=?, id_localidade=?, local_cidade=? WHERE id=?";
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
            stmt.setInt(7, evento.getIdLocalidade());
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

    public boolean deletarAcontecimento(Acontecimento evento) throws Exception {
        this.connection = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        boolean hasError = true;
        ImagemDao img = new ImagemDao();
        String sql = "DELETE FROM acontecimento WHERE id=?";
        long id = evento.getId();
        try {
            stmt = connection.prepareStatement(sql);

            stmt.setLong(1, evento.getId());
            if (img.deletarImagem(id)) {
                stmt.executeUpdate();
            }

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
