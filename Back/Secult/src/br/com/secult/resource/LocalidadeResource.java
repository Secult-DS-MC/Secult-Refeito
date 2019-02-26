package br.com.secult.resource;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import br.com.secult.dao.LocalidadeDao;
import br.com.secult.model.Localidade;
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

@Path("/localidade")
public class LocalidadeResource {

    @GET
    @Path("/listarLocalidade/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String listarLocalidade(@PathParam("id") int id) throws SQLException, Exception {

        LocalidadeDao localidadeDao = new LocalidadeDao();
        List<Localidade> localidade = localidadeDao.listarLocalidade(id);

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsarios = gson.toJsonTree(localidade).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("localidades", ArrayUsarios);

        return jsonObject.toString();

    }

    @GET
    @Path("/carregarLocalidade")
    @Produces(MediaType.APPLICATION_JSON)
    public String carregarLocalidade() throws SQLException, Exception {

        LocalidadeDao localidadeDao = new LocalidadeDao();
        List<Localidade> localidade = localidadeDao.carregarLocalidade();

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsarios = gson.toJsonTree(localidade).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("localidades", ArrayUsarios);

        return jsonObject.toString();

    }

    @GET
    @Path("/listarLocalidadeComEvento/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String listarLocalidadeComEvento(@PathParam("id") int id) throws SQLException, Exception {

        LocalidadeDao localidadeDao = new LocalidadeDao();
        List<Localidade> localidade = localidadeDao.listarLocalidadeComEvento(id);

        Gson gson = new GsonBuilder().create();
        JsonArray ArrayUsarios = gson.toJsonTree(localidade).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("localidades", ArrayUsarios);

        return jsonObject.toString();

    }

    @GET
    @Path("/inserirLocalidade/{nome}&{descricao}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response inserirArteArtista(@PathParam("nome") String nome, @PathParam("descricao") String descricao) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        LocalidadeDao localDao = new LocalidadeDao();

        Localidade localidade = new Localidade();

        localidade.setNome(nome);
        localidade.setDescricao(descricao);

        if (localDao.cadastrarLocalidade(localidade)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

    @GET
    @Path("/alterarLocalidade/{id}&{nome}&{descricao}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response upadetEvento(@PathParam("id") int id, @PathParam("nome") String nome, @PathParam("descricao") String descricao) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Localidade localidade = new Localidade();

        localidade.setId(id);
        localidade.setNome(nome);
        localidade.setDescricao(descricao);

        LocalidadeDao localidadeDao = new LocalidadeDao();

        if (localidadeDao.alterarLocalidade(localidade)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

    @GET
    @Path("/excluirLocalidade/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteArteArtista(@PathParam("id") int idLocalidade) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        LocalidadeDao localidadeDao = new LocalidadeDao();

        if (localidadeDao.excluirLocalidade(idLocalidade)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }
}
