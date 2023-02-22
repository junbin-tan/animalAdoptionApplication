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
public class ListingExistException extends Exception{

    /**
     * Creates a new instance of <code>ListingExistException</code> without
     * detail message.
     */
    public ListingExistException() {
    }

    /**
     * Constructs an instance of <code>ListingExistException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public ListingExistException(String msg) {
        super(msg);
    }
}
