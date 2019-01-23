/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import br.com.secult.dao.ArteArtistaDao;
import br.com.secult.model.Arte;
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
@Path("/arteArtista")
public class ArteArtistaResource {

    @GET
    @Path("/inserirArteArtista/{idArte}&{idArtista}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response inserirArteArtista(@PathParam("idArte") int idArte, @PathParam("idArtista") int idArtista) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        ArteArtistaDao arteArtistaDao = new ArteArtistaDao();

        if (arteArtistaDao.insert(idArtista, idArte)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }
    
    @GET
    @Path("/deleteArteArtista/{idArtista}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteArteArtista(@PathParam("idArtista") int idArtista) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        ArteArtistaDao arteArtistaDao = new ArteArtistaDao();

        if (arteArtistaDao.deleteArteArtista(idArtista)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }
    
    @GET
    @Path("/listarArtesArtista/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarAristasNaoAutenticados(@PathParam("id") int id) throws SQLException, Exception {

        ArteArtistaDao arteArtistaDao = new ArteArtistaDao();
        List<Arte> artistas = arteArtistaDao.listarArteArtista(id);

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsarios = gson.toJsonTree(artistas).getAsJsonArray();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("artes", ArrayUsarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }


}
