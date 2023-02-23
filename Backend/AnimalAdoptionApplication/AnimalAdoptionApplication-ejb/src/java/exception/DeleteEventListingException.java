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
public class DeleteEventListingException extends Exception{

    /**
     * Creates a new instance of <code>DeleteEventListingException</code>
     * without detail message.
     */
    public DeleteEventListingException() {
    }

    /**
     * Constructs an instance of <code>DeleteEventListingException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public DeleteEventListingException(String msg) {
        super(msg);
    }
}
