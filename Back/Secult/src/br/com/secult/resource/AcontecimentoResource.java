/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import br.com.secult.dao.AcontecimentoDao;
import javax.ws.rs.Path;
import br.com.secult.dao.EventoDao;
import br.com.secult.model.Acontecimento;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Computador
 */
@Path("/Acontecimento")
public class AcontecimentoResource {
    @GET
    @Path("/insertEvento/{titulo}&{descricao}&{data_evento}&{visibilidade}&{tipo_evento}&{hora_evento}&{id_localidade}&{local_cidade}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertEvento(@PathParam("titulo") String titulo, @PathParam("descricao") String descricao, @PathParam("data_evento") String data_evento, @PathParam("visibilidade") String visibilidade, @PathParam("tipo_evento") String tipo_evento, @PathParam("hora_evento") String hora_evento, @PathParam("id_localidade") int id_povoado, @PathParam("local_cidade") String localCidade) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        Acontecimento evento = new Acontecimento();
        evento.setTitulo(titulo);
        evento.setDescricao(descricao);
        evento.setData_evento(data_evento);
        evento.setVisibilidade(visibilidade);
        evento.setTipo_evento(tipo_evento);
        evento.setHora_evento(hora_evento);
        evento.setIdLocalidade(id_povoado);
        evento.setLocalCidade(localCidade);

        AcontecimentoDao eventoDao = new AcontecimentoDao();
        long id = eventoDao.insertEvento(evento);
        if (id > 0) {
            return Response.ok("{\"status\":\"ok\", \"id_usuario\":\"" + id + "\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }

    }

    @GET
    @Path("/listarEvento")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarEvento() throws SQLException, Exception {

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> even = acontecimentoDao.listaAcontecimento();

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(even).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("eventos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/getEventoById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventoById(@PathParam("id") long id) throws SQLException, Exception {
        Acontecimento evento = new Acontecimento();
        evento.setId(id);

        AcontecimentoDao eventoDao = new AcontecimentoDao();
        List<Acontecimento> even = eventoDao.getEventoById(evento);

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(even).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("eventos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/deletarEvento/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletarEvento(@PathParam("id") long id) throws SQLException, Exception {
        Acontecimento evento = new Acontecimento();
        evento.setId(id);

        AcontecimentoDao eventoDao = new AcontecimentoDao();

        if (eventoDao.deletarEvento(evento)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

//    public void tratarImagem(List<Evento> usuarios) {
//        for (int i = 0; i < usuarios.size(); i++) {
//
//            if (usuarios.get(i).getImagem() != null) {
//
//                String foto = usuarios.get(i).getImagem().toString();
//
//                usuarios.get(i).setImagem(foto.getBytes());
//
//            }
//        }
//    }

    @GET
    @Path("/updateEvento/{id}&{titulo}&{descricao}&{data_evento}&{visibilidade}&{tipo_evento}&{hora_evento}&{id_povoado}&{local_cidade}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response upadetEvento(@PathParam("id") long id, @PathParam("titulo") String titulo, @PathParam("descricao") String descricao, @PathParam("data_evento") String data_evento, @PathParam("visibilidade") String visibilidade, @PathParam("tipo_evento") String tipo_evento, @PathParam("hora_evento") String hora_evento, @PathParam("id_povoado") int id_povoado, @PathParam("local_cidade") String localCidade) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Acontecimento evento = new Acontecimento();

        evento.setId(id);
        evento.setTitulo(titulo);
        evento.setDescricao(descricao);
        evento.setData_evento(data_evento);
        evento.setVisibilidade(visibilidade);
        evento.setTipo_evento(tipo_evento);
        evento.setHora_evento(hora_evento);
        evento.setIdLocalidade(id_povoado);
        evento.setLocalCidade(localCidade);

        AcontecimentoDao eventoDao = new AcontecimentoDao();

        if (eventoDao.updateEvento(evento)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

    

    @GET
    @Path("/listarEventoPequeno")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarEventoP() throws SQLException, Exception {
        Acontecimento even = new Acontecimento();
        AcontecimentoDao eventoDao = new AcontecimentoDao();
        List<Acontecimento> evento = eventoDao.listarEventoPequeno(even);

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsuarios = gson.toJsonTree(evento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("eventos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }
}
