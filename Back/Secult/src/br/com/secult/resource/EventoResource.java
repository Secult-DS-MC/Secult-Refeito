package br.com.secult.resource;

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
 * @author Muquifo
 */
@Path("/evento")
public class EventoResource {

    
    @GET
    @Path("/listarEvento")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarEventoP() throws SQLException, Exception {
        Acontecimento acontecimento = new Acontecimento();
        EventoDao eventoDao = new EventoDao();
        List<Acontecimento> evento = eventoDao.listarEvento();

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsuarios = gson.toJsonTree(evento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("eventos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }
}