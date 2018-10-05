package br.com.secult.dao;

import java.sql.*;

public class ConnectionFactory {

    public Connection getConnection() {
        try {
            String DRIVER = "org.postgresql.Driver";
//            String url = "jdbc:postgresql://salesdomain.com.br/secult";
//            String usuario = "sdp";
//            String senha = "i9tinovostempos";
            String url = "jdbc:postgresql://localhost:5432/secultbi";
            String usuario = "postgres";
            String senha = "postgres";
            Class.forName(DRIVER);
            return DriverManager.getConnection(url, usuario, senha);
        } catch (Exception erro) {
            System.out.println(erro.getMessage());
        }
        return null;
    }

    public static void close(Connection con) {
        try {
            con.close();
        } catch (Exception ex) {
        }
    }

    public Connection getConnection(String server, String nome_banco, String usuario, String senha) {
        try {
            String url = "jdbc:postgresql://" + server + ":5432/" + nome_banco;
            return DriverManager.getConnection(url, usuario, senha);
        } catch (SQLException erro) {
            throw new RuntimeException(erro);
        }

    }
}
