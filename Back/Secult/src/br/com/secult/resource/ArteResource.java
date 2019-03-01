/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import br.com.secult.dao.ArteDao;
import br.com.secult.dao.ArtistaDao;
import br.com.secult.model.Arte;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/arte")
public class ArteResource {

    @GET
    @Path("/inserirArte/{nome}&{descricao}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response inserirRede(@PathParam("nome") String nome,@PathParam("descricao") String descricao) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        ArteDao arteDao = new ArteDao();
        
        if (arteDao.insertArtes(nome, descricao)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }
      @GET
    @Path("/alterarArte/{id}&{nome}&{descricao}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response inserirRede(@PathParam("id") int id,@PathParam("nome") String nome,@PathParam("descricao") String descricao) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        ArteDao arteDao = new ArteDao();

        if (arteDao.alterarArtes(id, nome, descricao)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }
    
    @GET
    @Path("/listarArte")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarArte() throws SQLException, Exception {

        ArteDao arteDao = new ArteDao();
        List<Arte> artes = arteDao.listarArte();

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsarios = gson.toJsonTree(artes).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("artes", ArrayUsarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/listarArtesArtista/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarArtesArtista(@PathParam("id") int id) throws SQLException, Exception {

        ArtistaDao artesArtistaDao = new ArtistaDao();
        List<Arte> artes = artesArtistaDao.listarArtesArtista(id);

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsarios = gson.toJsonTree(artes).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("artes", ArrayUsarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }
}
