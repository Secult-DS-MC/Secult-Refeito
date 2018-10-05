package br.com.secult.resource;

import br.com.secult.dao.ImagemDao;
import br.com.secult.model.Imagem;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.ServletException;
import javax.ws.rs.GET;
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

    @GET
    @Path("/inserirImagemEvento/{imagem}&{id_evento}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertEvento(@PathParam("imagem") Byte imagens, @PathParam("id_evento") int id_evento) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Imagem imagem = new Imagem();
        imagem.setImagem(imagens);
        imagem.setIdEvento(id_evento);

        ImagemDao imagemDao = new ImagemDao();
        
        if (imagemDao.inserirImagemEvento(imagem)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }

    }
    
     @GET
    @Path("/inserirImagemCadart/{imagem}&{id_cadart}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response inserirImagemCadart(@PathParam("imagem") Byte imagens, @PathParam("id_cadart") int id_cadart) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Imagem imagem = new Imagem();
        imagem.setImagem(imagens);
        imagem.setIdCadart(id_cadart);

        ImagemDao imagemDao = new ImagemDao();
        
        if (imagemDao.inserirImagemCadart(imagem)) {
            return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
        } else {
            return Response.ok("{\"status\":\"erro\"}").build();
        }

    }
    
     @GET
    @Path("/inserirImagemTurismo/{imagem}&{id_turismo}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response inserirImagemTurismo(@PathParam("imagem") Byte imagens, @PathParam("id_turismo") int id_turismo) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException, Exception {
        Imagem imagem = new Imagem();
        imagem.setImagem(imagens);
        imagem.setIdTurismo(id_turismo);

        ImagemDao imagemDao = new ImagemDao();
        
        if (imagemDao.inserirImagemTurismo(imagem)) {
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

    public void tratarImagem(List<Imagem> usuarios) {
        for (int i = 0; i < usuarios.size(); i++) {

            if (usuarios.get(i).getImagem() != null) {

                String foto = usuarios.get(i).getImagem().toString();

                usuarios.get(i).setImagem(foto.getBytes());

            }
        }
    }
    
        @GET
    @Path("/find/{id}")
    @Produces({"image/png", "image/jpg"})
    public Response find(@PathParam("id") int id) throws ServletException, IOException {
        try {

            ImagemDao imagemDao = new ImagemDao();

            Imagem imagem = new Imagem();
            imagem.setId(id);
            imagem = imagemDao.listarImagem(imagem).get(0);
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
