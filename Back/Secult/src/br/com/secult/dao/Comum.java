/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.secult.dao;

import java.util.Date;

/**
 *
 * @author Computador
 */
public class Comum {
    public static int mesAt(){
        Date data =new Date();
        return data.getMonth()+1;
    }
}
