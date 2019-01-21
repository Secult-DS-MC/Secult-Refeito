/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import br.com.secult.dao.ArtistaDao;
import br.com.secult.model.Artista;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
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
@Path("/artista")
public class ArtistaResource {
    @GET
    @Path("/updateVisibilidadeS/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateVisibilidadeS(@PathParam("id") int id) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        ArtistaDao artistaDao = new ArtistaDao();
        if (artistaDao.updateVisibilidadeS(id)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }
      @GET
    @Path("/updateVisibilidadeN/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateVisibilidadeN(@PathParam("id") int id) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        ArtistaDao artistaDao = new ArtistaDao();
        if (artistaDao.updateVisibilidadeN(id)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }
}
