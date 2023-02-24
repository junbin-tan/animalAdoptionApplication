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
public class UpdateApplicationFormException extends Exception {

    /**
     * Creates a new instance of <code>UpdateApplicationFormException</code>
     * without detail message.
     */
    public UpdateApplicationFormException() {
    }

    /**
     * Constructs an instance of <code>UpdateApplicationFormException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public UpdateApplicationFormException(String msg) {
        super(msg);
    }
}
