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
public class AnimalListingHasApplicationFormException extends Exception {

    /**
     * Creates a new instance of
     * <code>AnimalListingHasApplicationFormException</code> without detail
     * message.
     */
    public AnimalListingHasApplicationFormException() {
    }

    /**
     * Constructs an instance of
     * <code>AnimalListingHasApplicationFormException</code> with the specified
     * detail message.
     *
     * @param msg the detail message.
     */
    public AnimalListingHasApplicationFormException(String msg) {
        super(msg);
    }
}
