/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import br.com.secult.dao.CalendarioDao;
import br.com.secult.dao.ContatoDao;
import br.com.secult.model.Acontecimento;
import br.com.secult.model.Contato;
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
@Path("/contato")
public class ContatoResource {

    @GET
    @Path("/inserirContato/{id}&{email}&{telefone}&{facebook}&{youtube}&{instagram}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response inserirRede(@PathParam("id") int id, @PathParam("email") String email, @PathParam("telefone") String telefone, @PathParam("facebook") String facebook, @PathParam("youtube") String youtube, @PathParam("instagram") String instagram) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        Contato contato = new Contato();
        contato.setId(id);
        contato.setEmail(email);
        contato.setTelefone(telefone);
        contato.setFacebook(facebook);
        contato.setYoutube(youtube);
        contato.setInstagram(instagram);

        ContatoDao contatoDao = new ContatoDao();

        if (contatoDao.inserirContato(contato)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

}
