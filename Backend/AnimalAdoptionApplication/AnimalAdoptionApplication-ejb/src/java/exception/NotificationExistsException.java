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
public class NotificationExistsException extends Exception {

    /**
     * Creates a new instance of <code>NotificationExistException</code> without
     * detail message.
     */
    public NotificationExistsException() {
    }

    /**
     * Constructs an instance of <code>NotificationExistException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public NotificationExistsException(String msg) {
        super(msg);
    }
}
