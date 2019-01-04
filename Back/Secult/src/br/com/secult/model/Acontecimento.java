/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.model;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

/**
 *
 * @author Muquifo
 */
public class Acontecimento {

    private long id;
    private String titulo;
    private String descricao;
    private String visibilidade;
    private String tipo_evento;
    private Date data_cadastro;
    private String data_evento;
    private String hora_evento;
    private String nomeEvento;
    private String nomeLocalidade;
    private String localCidade;
    private int id_imagem;
    private int origem;
    private String nome_origem;
    private byte[] imagem;
    
     public String getNomeOrigem() {
        return nome_origem;
    }

    public void setNomeOrigem(String nome_origem) {
        this.nome_origem = nome_origem;
    }
    
    public int getOrigem(){
        return origem;
    }
    
    public void setOrigem(int origem){
        this.origem = origem;
    }

    public int getIdLocalidade() {
        return idLocalidade;
    }

    public void setIdLocalidade(int idLocalidade) {
        this.idLocalidade = idLocalidade;
    }
    private int idLocalidade;
    public int getId_Imagem() {
        return id_imagem;
    }

    public void setId_Imagem(int id_imagem) {
        this.id_imagem = id_imagem;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }

    public String getLocalCidade() {
        return localCidade;
    }

    public void setLocalCidade(String localCidade) {
        this.localCidade = localCidade;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }
    
     public String getNomeLocalidade() {
        return nomeLocalidade;
    }

    public void setNomeLocalidade(String nomeLocalidade) {
        this.nomeLocalidade = nomeLocalidade;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getVisibilidade() {
        return visibilidade;
    }

    public void setVisibilidade(String visibilidade) {
        this.visibilidade = visibilidade;
    }

    public String getTipo_evento() {
        return tipo_evento;
    }

    public void setTipo_evento(String tipo_evento) {
        this.tipo_evento = tipo_evento;
    }

    public Date getData_cadastro() {
        return data_cadastro;
    }

    public void setData_cadastro(Date data_cadastro) {
        this.data_cadastro = data_cadastro;
    }

    public String getData_evento() {
        return data_evento;
    }

    public void setData_evento(String data_evento) {
        this.data_evento = data_evento;
    }
    public String getHora_evento() {
        return hora_evento;
    }

    public void setHora_evento(String hora_evento) {
        this.hora_evento = hora_evento;
    }

   
    
}
