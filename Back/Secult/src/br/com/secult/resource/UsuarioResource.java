/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.resource;

import br.com.secult.dao.Arte_artistaDao;
import br.com.secult.dao.ArtistaDao;
import br.com.secult.dao.UsuarioDao;
import br.com.secult.model.Arte_artista;
import br.com.secult.model.Artista;
import br.com.secult.model.Usuario;
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
@Path("/usuario")
public class UsuarioResource {

    @GET
    @Path("/insertUsuarioArtista/{nome}&{sexo}&{senha}&{idade}&{nomeArtistico}&{descricao}&{idArte}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertUsuario(@PathParam("nome") String nome, @PathParam("sexo") String sexo, @PathParam("senha") String senha, @PathParam("idade") int idade, @PathParam("nomeArtistico") String nomeArtistico, @PathParam("descricao") String descricao, @PathParam("idArte") int idArte) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException {

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setSexo(sexo);
        usuario.setSenha(senha);
        usuario.setIdade(idade);

        UsuarioDao usuarioDao = new UsuarioDao();
        int id = usuarioDao.insert(usuario);

        if (id != 0) {
            Artista artista = new Artista();
            artista.setId(id);
            artista.setNome(nomeArtistico);
            artista.setDescricao(descricao);
            ArtistaDao artistaDao = new ArtistaDao();
            int id_artista = artistaDao.insert(artista);
            
            if (id_artista != 0) {

                Arte_artistaDao arte_atistaDao = new Arte_artistaDao();
                int idArteArtista = arte_atistaDao.insert(id_artista, idArte);
               
            }
        }
        return Response.ok("{\"status\":\"ok\", \"id_usuario\":\"" + id + "\"}").header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS").header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }

}
