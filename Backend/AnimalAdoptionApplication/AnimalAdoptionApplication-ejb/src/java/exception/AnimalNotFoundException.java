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
public class AnimalNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>AnimalNotFoundException</code> without
     * detail message.
     */
    public AnimalNotFoundException() {
    }

    /**
     * Constructs an instance of <code>AnimalNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public AnimalNotFoundException(String msg) {
        super(msg);
    }
}
