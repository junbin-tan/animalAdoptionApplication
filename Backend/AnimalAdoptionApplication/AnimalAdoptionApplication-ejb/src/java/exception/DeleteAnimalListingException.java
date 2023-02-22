/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exception;

/**
 *
 * @author Jun Bin
 */
public class DeleteAnimalListingException extends Exception{

    /**
     * Creates a new instance of <code>DeleteAnimalListingException</code>
     * without detail message.
     */
    public DeleteAnimalListingException() {
    }

    /**
     * Constructs an instance of <code>DeleteAnimalListingException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public DeleteAnimalListingException(String msg) {
        super(msg);
    }
}
