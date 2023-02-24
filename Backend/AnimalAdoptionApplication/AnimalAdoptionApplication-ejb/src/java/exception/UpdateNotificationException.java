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
public class UpdateNotificationException extends Exception {

    /**
     * Creates a new instance of <code>UpdateNotificationException</code>
     * without detail message.
     */
    public UpdateNotificationException() {
    }

    /**
     * Constructs an instance of <code>UpdateNotificationException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public UpdateNotificationException(String msg) {
        super(msg);
    }
}
