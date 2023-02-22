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
public class DeleteMemberException extends Exception{

    /**
     * Creates a new instance of <code>DeleteMemberException</code> without
     * detail message.
     */
    public DeleteMemberException() {
    }

    /**
     * Constructs an instance of <code>DeleteMemberException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public DeleteMemberException(String msg) {
        super(msg);
    }
}
