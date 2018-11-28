package br.com.secult.resource;

import br.com.secult.dao.ImagemDao;
import br.com.secult.model.Imagem;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
//import javax.servlet.ServletException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author David
 */
@Path("/imagem")
public class ImagemResource {

    @POST
    @Path("/inserirImagem/{id_coluna}&{sigla}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response inserirImagem(@FormDataParam("imagem") InputStream uploadedInputStream,
            @PathParam("id_coluna") long id_coluna,@PathParam("sigla") String sigla, @FormDataParam("imagem") FormDataContentDisposition fileDetail) throws Exception {

        ImagemDao imagemDao = new ImagemDao();
        Imagem imagem = new Imagem();

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int read = 0;
        byte[] bytes = new byte[1024];

        while ((read = uploadedInputStream.read(bytes)) != -1) {
            buffer.write(bytes, 0, read);
        }

        byte[] byteArray = buffer.toByteArray();
        buffer.flush();
        
        imagem.setImagem(byteArray);

         if (imagemDao.inserirImagem(imagem, id_coluna, sigla)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }

    }
    
    

    @GET
    @Path("/deletarImagem/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletarEvento(@PathParam("id") int id) throws SQLException, Exception {
        Imagem imagem = new Imagem();
        imagem.setId(id);

        ImagemDao imagemDao = new ImagemDao();

        if (imagemDao.deletarEvento(imagem)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }
    }

    public void tratarImagem(List<Imagem> imagems) {
        for (int i = 0; i < imagems.size(); i++) {

            if (imagems.get(i).getImagem() != null) {

                String foto = imagems.get(i).getImagem().toString();

                imagems.get(i).setImagem(foto.getBytes());

            }
        }
    }

    @GET
    @Path("/listarImagens/{id_coluna}&{sigla}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarImagem(@PathParam("id_coluna") long id_coluna, @PathParam("sigla") String sigla) throws ServletException, IOException, Exception {
        ImagemDao imagemDao = new ImagemDao();
        List<Imagem> imagens = new ArrayList<Imagem>();

        imagens = imagemDao.listarImagem(id_coluna, sigla);

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsarios = gson.toJsonTree(imagens).getAsJsonArray();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("imagens", ArrayUsarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/find/{id}")
    @Produces({"image/png", "image/jpg"})
    public Response findImagem(@PathParam("id") int id) throws ServletException, IOException {
        try {

            ImagemDao imagemDao = new ImagemDao();
            Imagem imagem = new Imagem();
            imagem.setId(id);
            imagem = imagemDao.getById(id).get(0);
            final byte[] foto = imagem.getImagem();

            if (foto == null) {
                return Response.ok("Imagem não encontrada").build();
            } else {

                return Response.ok(foto).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        return Response.status(Response.Status.BAD_REQUEST).entity("Não foi possível concluir consulta.").build();
    }
    
    @GET
    @Path("/findEvento/{id}")
    @Produces({"image/png", "image/jpg"})
    public Response findEventoImagem(@PathParam("id") int id) throws ServletException, IOException {
        try {

            ImagemDao imagemDao = new ImagemDao();
            Imagem imagem = new Imagem();
            imagem.setId(id);
            imagem = imagemDao.getByIdEvento(id).get(0);
            final byte[] foto = imagem.getImagem();

            if (foto == null) {
                return Response.ok("Imagem não encontrada").build();
            } else {

                return Response.ok(foto).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        return Response.status(Response.Status.BAD_REQUEST).entity("Não foi possível concluir consulta.").build();
    }
    @GET
    @Path("/findETC/{id}&{sigla}")
    @Produces({"image/png", "image/jpg"})
    public Response findAconteimentoImagem(@PathParam("id") long id,@PathParam("sigla") String sigla) throws ServletException, IOException {
        try {

            ImagemDao imagemDao = new ImagemDao();
            Imagem imagem = new Imagem();
            System.out.println(id+sigla);
            imagem = imagemDao.getByIdAcontecimento(id, sigla);
            final byte[] foto = imagem.getImagem();
            if (foto == null) {
                return Response.ok("Imagem não encontrada").build();
            } else {
                return Response.ok(foto).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        return Response.status(Response.Status.BAD_REQUEST).entity("Não foi possível concluir consulta.").build();
    }

}
