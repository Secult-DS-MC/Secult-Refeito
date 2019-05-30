package br.com.secult.resource;

import br.com.secult.dao.CalendarioDao;
import br.com.secult.dao.NoticiaDao;
import br.com.secult.model.Acontecimento;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/calendario")
public class CalendarioResource {

    @GET
    @Path("/listarCalendario")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarCalendario() throws SQLException, Exception {
        CalendarioDao calendarioDao = new CalendarioDao();
        List<Acontecimento> calendario = calendarioDao.listarCalendario();

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsuarios = gson.toJsonTree(calendario).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("calendario", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }

    @GET
    @Path("/listarQtdEventosPorMes")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarQtdEventos() throws SQLException, Exception {
        CalendarioDao calendarioDao = new CalendarioDao();
        List<Acontecimento> eventos = new ArrayList<Acontecimento>();

        Gson gson = new Gson();
        eventos = calendarioDao.listarQtdEventos();
        if (!eventos.isEmpty()) {
            return Response.ok(gson.toJson(eventos)).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

        }
        return Response.ok("{\"status\":\"erro\"}").build();

    }
}
