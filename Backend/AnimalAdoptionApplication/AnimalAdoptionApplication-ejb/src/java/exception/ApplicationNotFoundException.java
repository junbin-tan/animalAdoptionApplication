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
public class ApplicationNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>ApplicationNotFoundException</code>
     * without detail message.
     */
    public ApplicationNotFoundException() {
    }

    /**
     * Constructs an instance of <code>ApplicationNotFoundException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public ApplicationNotFoundException(String msg) {
        super(msg);
    }
}
