package br.com.secult.resource;

import br.com.secult.dao.EventoDao;
import br.com.secult.model.Evento;
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
    @Path("/insertEvento/{titulo}&{descricao}&{data_evento}&{visibilidade}&{tipo_evento}&{hora_evento}&{id_povoado}&{local_cidade}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertEvento(@PathParam("titulo") String titulo, @PathParam("descricao") String descricao, @PathParam("data_evento") String data_evento, @PathParam("visibilidade") String visibilidade, @PathParam("tipo_evento") String tipo_evento, @PathParam("hora_evento") String hora_evento, @PathParam("id_povoado") int id_povoado, @PathParam("local_cidade") String localCidade) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        Evento evento = new Evento();
        evento.setTitulo(titulo);
        evento.setDescricao(descricao);
        evento.setData_evento(data_evento);
        evento.setVisibilidade(visibilidade);
        evento.setTipo_evento(tipo_evento);
        evento.setHora_evento(hora_evento);
        evento.setId_localidade(id_povoado);
        evento.setLocalCidade(localCidade);

        EventoDao eventoDao = new EventoDao();
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

        EventoDao eventoDao = new EventoDao();
        List<Evento> even = eventoDao.listaEventos();

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
        Evento evento = new Evento();
        evento.setId(id);

        EventoDao eventoDao = new EventoDao();
        List<Evento> even = eventoDao.getEventoById(evento);

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
        Evento evento = new Evento();
        evento.setId(id);

        EventoDao eventoDao = new EventoDao();

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

//    @POST
//    @Path("/salvarFoto/{id}")
//    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.MULTIPART_FORM_DATA)
//    public Response salvarFoto(@FormDataParam("imagem") InputStream uploadedInputStream,
//            @PathParam("id") Long id, @FormDataParam("imagem") FormDataContentDisposition fileDetail) throws Exception {
//
//        EventoDao usuarioDao = new EventoDao();
//        Evento usuario = new Evento();
//
//        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
//        int read = 0;
//        byte[] bytes = new byte[1024];
//
//        while ((read = uploadedInputStream.read(bytes)) != -1) {
//            buffer.write(bytes, 0, read);
//        }
//
//        byte[] byteArray = buffer.toByteArray();
//        buffer.flush();
//
//        usuario.setId(id);
//        usuario.setImagem(byteArray);
//        usuarioDao.salvarFoto(usuario);
//
//        return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
//    }

    @GET
    @Path("/updateEvento/{id}&{titulo}&{descricao}&{data_evento}&{visibilidade}&{tipo_evento}&{hora_evento}&{id_povoado}&{local_cidade}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response upadetEvento(@PathParam("id") long id, @PathParam("titulo") String titulo, @PathParam("descricao") String descricao, @PathParam("data_evento") String data_evento, @PathParam("visibilidade") String visibilidade, @PathParam("tipo_evento") String tipo_evento, @PathParam("hora_evento") String hora_evento, @PathParam("id_povoado") int id_povoado, @PathParam("local_cidade") String localCidade) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Evento evento = new Evento();

        evento.setId(id);
        evento.setTitulo(titulo);
        evento.setDescricao(descricao);
        evento.setData_evento(data_evento);
        evento.setVisibilidade(visibilidade);
        evento.setTipo_evento(tipo_evento);
        evento.setHora_evento(hora_evento);
        evento.setId_localidade(id_povoado);
        evento.setLocalCidade(localCidade);

        EventoDao eventoDao = new EventoDao();

        if (eventoDao.updateEvento(evento)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

    @GET
    @Path("/listarEventoGrande")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarEventoG() throws SQLException, Exception {
        Evento even = new Evento();
        EventoDao eventoDao = new EventoDao();
        List<Evento> evento = eventoDao.listarEventoGrande(even);

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsuarios = gson.toJsonTree(evento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("eventos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }

    @GET
    @Path("/listarEventoPequeno")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarEventoP() throws SQLException, Exception {
        Evento even = new Evento();
        EventoDao eventoDao = new EventoDao();
        List<Evento> evento = eventoDao.listarEventoPequeno(even);

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsuarios = gson.toJsonTree(evento).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("eventos", ArrayUsuarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }
}