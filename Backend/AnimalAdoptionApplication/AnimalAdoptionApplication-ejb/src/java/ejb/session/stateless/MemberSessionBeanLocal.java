/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Member;
import exception.DeleteMemberException;
import exception.InputDataValidationException;
import exception.MemberExistsException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateMemberException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Jun Bin
 */
@Local
public interface MemberSessionBeanLocal {

    public Long createMember(Member newMember) throws MemberExistsException, UnknownPersistenceException, InputDataValidationException;

    public List<Member> retrieveAllMembers();

    public Member retrieveMemberByMemberId(Long memberId) throws MemberNotFoundException;

    public Member retrieveMemberByEmail(String email) throws MemberNotFoundException;

    public void updateMember(Member oldMember) throws MemberNotFoundException, UpdateMemberException, InputDataValidationException;

    public void deleteMember(Long memberId) throws MemberNotFoundException, DeleteMemberException;
    
}
