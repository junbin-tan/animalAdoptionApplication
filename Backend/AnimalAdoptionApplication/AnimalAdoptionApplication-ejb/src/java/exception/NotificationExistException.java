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
public class NotificationExistException extends Exception {

    /**
     * Creates a new instance of <code>NotificationExistException</code> without
     * detail message.
     */
    public NotificationExistException() {
    }

    /**
     * Constructs an instance of <code>NotificationExistException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public NotificationExistException(String msg) {
        super(msg);
    }
}
