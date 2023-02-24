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
public class EventRegistrationNotFoundException extends Exception{

    /**
     * Creates a new instance of <code>EventRegistrationNotFoundException</code>
     * without detail message.
     */
    public EventRegistrationNotFoundException() {
    }

    /**
     * Constructs an instance of <code>EventRegistrationNotFoundException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public EventRegistrationNotFoundException(String msg) {
        super(msg);
    }
}
