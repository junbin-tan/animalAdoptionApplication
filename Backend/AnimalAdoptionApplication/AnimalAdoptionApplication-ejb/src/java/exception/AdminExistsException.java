/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exception;

/**
 *
 * @author yijie
 */
public class AdminExistsException extends Exception {

    /**
     * Creates a new instance of <code>AdminExistsException</code> without
     * detail message.
     */
    public AdminExistsException() {
    }

    /**
     * Constructs an instance of <code>AdminExistsException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public AdminExistsException(String msg) {
        super(msg);
    }
}
