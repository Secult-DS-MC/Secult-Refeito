/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import br.com.secult.dao.ArteArtistaDao;
import br.com.secult.dao.ArtistaDao;
import br.com.secult.dao.UsuarioDao;
import br.com.secult.model.ArteArtista;
import br.com.secult.model.Artista;
import br.com.secult.model.Usuario;
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
@Path("/usuario")
public class UsuarioResource {

    @GET
    @Path("/insertUsuarioArtista/{nome}&{sexo}&{senha}&{idade}&{nomeArtistico}&{descricao}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertUsuario(@PathParam("nome") String nome, @PathParam("sexo") String sexo, @PathParam("senha") String senha, @PathParam("idade") int idade, @PathParam("nomeArtistico") String nomeArtistico, @PathParam("descricao") String descricao) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {
        System.out.println(nomeArtistico);
        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setSexo(sexo);
        usuario.setSenha(senha);
        usuario.setIdade(idade);

        UsuarioDao usuarioDao = new UsuarioDao();
        int id = usuarioDao.insert(usuario);

        if (id != 0) {
            Artista artista = new Artista();
            artista.setIdArtista(id);
            artista.setNomeArtistico(nomeArtistico);
            artista.setDescricao(descricao);
            ArtistaDao artistaDao = new ArtistaDao();
            if (artistaDao.insert(artista)) {

            }

        }
        return Response.ok("{\"status\":\"ok\", \"id_usuario\":\"" + id + "\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("/alterarUsuarioArtista/{nome}&{sexo}&{idade}&{nomeArtistico}&{descricao}&{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response alterarUsuario(@PathParam("nome") String nome, @PathParam("sexo") String sexo, @PathParam("idade") int idade, @PathParam("nomeArtistico") String nomeArtistico, @PathParam("descricao") String descricao, @PathParam("id") int id) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setNome(nome);
        usuario.setSexo(sexo);
        usuario.setIdade(idade);

        UsuarioDao usuarioDao = new UsuarioDao();

        if (usuarioDao.updateUsuario(usuario)) {
            Artista artista = new Artista();
            artista.setIdArtista(id);
            artista.setNomeArtistico(nomeArtistico);
            artista.setDescricao(descricao);
            ArtistaDao artistaDao = new ArtistaDao();
            if (artistaDao.updateArtista(artista)) {

            }

        }
        return Response.ok("{\"status\":\"ok\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }

    @GET
    @Path("/listarArtistasAutenticados")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarUsuarios() throws SQLException, Exception {

        UsuarioDao usuarioDao = new UsuarioDao();
        List<Artista> artistas = usuarioDao.listarAristasAutenticados();
        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsarios = gson.toJsonTree(artistas).getAsJsonArray();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("artistas", ArrayUsarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/listarAristasNaoAutenticados")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarAristasNaoAutenticados() throws SQLException, Exception {

        UsuarioDao usuarioDao = new UsuarioDao();
        List<Artista> artistas = usuarioDao.listarAristasNaoAutenticados();

        Gson gson = new GsonBuilder().create();

        JsonArray ArrayUsarios = gson.toJsonTree(artistas).getAsJsonArray();

        JsonObject jsonObject = new JsonObject();
        jsonObject.add("artistas", ArrayUsarios);

        return Response.ok(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }

    @GET
    @Path("/verificarEmail/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response verificarEmail(@PathParam("email") String email) throws SQLException, Exception {
        UsuarioDao usuarioDao = new UsuarioDao();
        System.out.println(usuarioDao.verificarEmail(email));
        if (usuarioDao.verificarEmail(email) == false) {
            return Response.ok("{\"status\":\"valido\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

        }
        return Response.ok("{\"status\":\"invalido\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();

    }
}
