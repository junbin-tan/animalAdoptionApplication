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
public class EventRegistrationExistsException extends Exception{

    /**
     * Creates a new instance of <code>EventRegistrationExistsException</code>
     * without detail message.
     */
    public EventRegistrationExistsException() {
    }

    /**
     * Constructs an instance of <code>EventRegistrationExistsException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public EventRegistrationExistsException(String msg) {
        super(msg);
    }
}
