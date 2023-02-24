/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exception;

/**
 *
 * @author jiawe
 */
public class DeleteApplicationFormException extends Exception {

    /**
     * Creates a new instance of <code>DeleteApplicationFormException</code>
     * without detail message.
     */
    public DeleteApplicationFormException() {
    }

    /**
     * Constructs an instance of <code>DeleteApplicationFormException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public DeleteApplicationFormException(String msg) {
        super(msg);
    }
}
