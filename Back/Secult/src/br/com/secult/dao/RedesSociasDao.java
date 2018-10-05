package br.com.secult.dao;

import br.com.secult.model.RedesSociais;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RedesSociasDao {

    Connection con;

    public boolean inserirRede(RedesSociais redes) throws SQLException {
        this.con = new ConnectionFactory().getConnection();
        boolean erro = true;
        PreparedStatement stmt = null;
        String sql = "INSERT INTO redes_sociais(nome_rede, nome_link, id_cadart) VALUES (?,?,?)";
        try {
            stmt = con.prepareStatement(sql);

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

    public List<RedesSociais> listarRedes(RedesSociais rede) {
        List<RedesSociais> listaRedes = new ArrayList<>();
        this.con = new ConnectionFactory().getConnection();
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String slq = "SELECT nome_rede, nome_link, id_cadart FROM redes_sociais WHERE id_cadart=?";
        try {
            stmt = con.prepareStatement(slq);
            
            stmt.setLong(1, rede.getIdCadart());
            
            rs = stmt.executeQuery();

            while (rs.next()) {
                RedesSociais redes = new RedesSociais();

                redes.setNomeRede(rs.getString("nome_rede"));
                redes.setNomeLink(rs.getString("nome_link"));
                redes.setIdCadart(rs.getLong("id_cadart"));

                listaRedes.add(redes);
            }
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                rs.close();
                stmt.close();
            } catch (Exception e) {

            }
            return listaRedes;
        }
    }
    
    public boolean alterarRedes(RedesSociais rede) throws SQLException{
        this.con = new ConnectionFactory().getConnection();
        boolean hasError = true;
        PreparedStatement stmt = null;
        String sql = "UPDATE redes_sociais SET nome_rede=?, nome_link=? WHERE id_cadart=?";
        try {
            stmt = con.prepareStatement(sql);
            
            stmt.setString(1, rede.getNomeRede());
            stmt.setString(2, rede.getNomeLink());
            stmt.setLong(3, rede.getIdCadart());
            
            stmt.execute();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            hasError = false;
        }finally{
            stmt.close();   
        }
        return hasError;
    }
}
