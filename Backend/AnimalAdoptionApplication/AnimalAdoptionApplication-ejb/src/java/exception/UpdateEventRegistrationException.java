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
public class UpdateEventRegistrationException extends Exception{

    /**
     * Creates a new instance of <code>UpdateEventRegistrationException</code>
     * without detail message.
     */
    public UpdateEventRegistrationException() {
    }

    /**
     * Constructs an instance of <code>UpdateEventRegistrationException</code>
     * with the specified detail message.
     *
     * @param msg the detail message.
     */
    public UpdateEventRegistrationException(String msg) {
        super(msg);
    }
}
