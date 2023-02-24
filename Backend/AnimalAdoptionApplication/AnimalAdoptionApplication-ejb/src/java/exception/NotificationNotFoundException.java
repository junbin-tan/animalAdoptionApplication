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
public class NotificationNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>NotificationNotFoundException</code>
     * without detail message.
     */
    public NotificationNotFoundException() {
    }

    /**
     * Constructs an instance of <code>NotificationNotFoundException</code> with
     * the specified detail message.
     *
     * @param msg the detail message.
     */
    public NotificationNotFoundException(String msg) {
        super(msg);
    }
}
