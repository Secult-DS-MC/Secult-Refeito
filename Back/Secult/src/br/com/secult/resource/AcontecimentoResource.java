/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import br.com.secult.dao.AcontecimentoDao;
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
@Path("/acontecimento")
public class AcontecimentoResource {

    @GET
    @Path("/insertAcontecimento/{titulo}&{descricao}&{data_evento}&{visibilidade}&{tipo_evento}&{hora_evento}&{id_localidade}&{local_cidade}&{origem}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertEvento(@PathParam("titulo") String titulo, @PathParam("descricao") String descricao, @PathParam("data_evento") String data_evento,
            @PathParam("visibilidade") String visibilidade, @PathParam("tipo_evento") String tipo_evento, @PathParam("hora_evento") String hora_evento,
            @PathParam("id_localidade") int id_povoado, @PathParam("local_cidade") String localCidade, @PathParam("origem") int origem) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        Acontecimento acontecimento = new Acontecimento();

        acontecimento.setTitulo(titulo);
        acontecimento.setDescricao(descricao);
        acontecimento.setData_evento(data_evento);
        acontecimento.setVisibilidade(visibilidade);
        acontecimento.setTipo_evento(tipo_evento);
        acontecimento.setHora_evento(hora_evento);
        acontecimento.setIdLocalidade(id_povoado);
        acontecimento.setLocalCidade(localCidade);
        acontecimento.setOrigem(origem);

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        long id = acontecimentoDao.insertAcontecimento(acontecimento);
        if (id > 0) {
            return Response.ok("{\"status\":\"ok\", \"id_usuario\":\"" + id + "\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }

    }

    @GET
    @Path("/listarAcontecimentoTipo/{origem}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarAcontecimenoTipo(@PathParam("origem") String tipo) throws SQLException, Exception {

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> acontecimento = acontecimentoDao.listarAcontecimentoTipo(tipo);

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(acontecimento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("acontecimentos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/listarAcontecimento")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarEvento() throws SQLException, Exception {

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> acontecimento = acontecimentoDao.listaAcontecimento();

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(acontecimento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("acontecimentos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/listarAcontecimentoPorVisibilidadeS")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarAcontecimentoPorVisibilidadeS() throws SQLException, Exception {

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> acontecimento = acontecimentoDao.listarAcontecimentoPorVisibilidadeS();

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(acontecimento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("acontecimentos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/listarAcontecimentoPorVisibilidadeN")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarAcontecimentoPorVisibilidadeN() throws SQLException, Exception {

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> acontecimento = acontecimentoDao.listarAcontecimentoPorVisibilidadeN();

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(acontecimento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("acontecimentos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/listarAcontecimentoPorEsseMes")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarAcontecimentoPorEsseMes() throws SQLException, Exception {

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> acontecimento = acontecimentoDao.listarAcontecimentoPorEsseMes();

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(acontecimento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("acontecimentos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/listarAcontecimentoUltimos6Meses")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarAcontecimentoUltimos6Meses() throws SQLException, Exception {

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> acontecimento = acontecimentoDao.listarAcontecimentoUltimos6Meses();

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(acontecimento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("acontecimentos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/getAcontecimentoById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventoById(@PathParam("id") long id) throws SQLException, Exception {
        Acontecimento evento = new Acontecimento();
        evento.setId(id);

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();
        List<Acontecimento> acontecimento = acontecimentoDao.getAcontecimentoById(evento);

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsuarios = gson.toJsonTree(acontecimento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("acontecimentos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/deletarAcontecimento/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletarEvento(@PathParam("id") long id) throws SQLException, Exception {
        Acontecimento acontecimentos = new Acontecimento();
        acontecimentos.setId(id);

        AcontecimentoDao eventoDao = new AcontecimentoDao();

        if (eventoDao.deletarAcontecimento(acontecimentos)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

    @GET
    @Path("/updateAcontecimento/{id}&{titulo}&{descricao}&{data_evento}&{tipo_evento}&{hora_evento}&{id_povoado}&{local_cidade}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response upadetEvento(@PathParam("id") long id, @PathParam("titulo") String titulo, @PathParam("descricao") String descricao, @PathParam("data_evento") String data_evento, @PathParam("tipo_evento") String tipo_evento, @PathParam("hora_evento") String hora_evento, @PathParam("id_povoado") int id_povoado, @PathParam("local_cidade") String localCidade) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Acontecimento acontecimento = new Acontecimento();

        acontecimento.setId(id);
        acontecimento.setTitulo(titulo);
        acontecimento.setDescricao(descricao);
        acontecimento.setData_evento(data_evento);
        acontecimento.setTipo_evento(tipo_evento);
        acontecimento.setHora_evento(hora_evento);
        acontecimento.setIdLocalidade(id_povoado);
        acontecimento.setLocalCidade(localCidade);

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();

        if (acontecimentoDao.updateAcontecimento(acontecimento)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

    @GET
    @Path("/alterarVisibilidade/{id}&{visibilidade}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response alterarVisibilidade(@PathParam("id") long id, @PathParam("visibilidade") String visibilidade) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Acontecimento acontecimento = new Acontecimento();
        acontecimento.setId(id);
        acontecimento.setVisibilidade(visibilidade);

        AcontecimentoDao acontecimentoDao = new AcontecimentoDao();

        if (acontecimentoDao.alterarVisibilidade(acontecimento)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        }
    }
}
