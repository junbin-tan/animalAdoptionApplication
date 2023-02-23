/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exception;

/**
 *
 * @author shann
 */
public class UpdateEventListingException extends Exception{

    /**
     * Creates a new instance of <code>UpdateEventListingException</code>
     * without detail message.
     */
    public UpdateEventListingException() {
    }

    /**
     * Constructs an instance of <code>UpdateEventListingException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public UpdateEventListingException(String msg) {
        super(msg);
    }
}
