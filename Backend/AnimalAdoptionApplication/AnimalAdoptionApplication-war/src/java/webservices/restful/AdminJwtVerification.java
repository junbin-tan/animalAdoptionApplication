/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import org.apache.commons.lang3.StringUtils;
import org.apache.xml.security.utils.Base64;

/**
 *
 * @author jiawe
 */
public class AdminJwtVerification {

    // ADMIN PUBLIC KEY FROM USERFRONT Library
    private static final String USER_FRONT_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\n"
            + "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzKpxoOMfJ15lbwZ5rZ4c\n"
            + "PyN4Murh0nwZqhlxE3AGF++vccmPhBKVRg5tWw70vBdM2mFDxtiRBVCdjaLYTEQF\n"
            + "8ZK2drCcyTuDs6AFHZG7JYvqDjeMOxEdWOtgSmcp+RRsMG5aOgF+1TgNL9gfBhOD\n"
            + "iRAY138xW8HmlenknpQ/86rShNUviamqhhcMozV6bGa5JX3RZwYEmfDoGM1p5Mz9\n"
            + "V3L0YnPxuxOmtxYvtgquqp+98qQ//J2G22ie71EIwJ1lP9H9/2/foZIzQI+KPlm/\n"
            + "GbO1N6l0OKnBAGZGsOgcaCrhpVF7AD0MBM6vHlNon7+Ok7PUF94bhtx53OgO2iPQ\n"
            + "9yzMNNEPAcZWE4Edrb8SKqty76FcAkCkP5m33/u6ywj14S29pR+fUl8FkTf+mct1\n"
            + "s+eB83txlmhek14kJvjfrB/uoBpIuJLk5X6TJE1zQhSbDl4HllEb4Lb8tEXmBtcs\n"
            + "BLAXxatTISzhjrOo42WlPG9s3CHcIdAXnOT5Co0KXXBH27/YWVSes8mPY+PfI/3/\n"
            + "h0+19YLCwUG8fKx4to6Qb+XDrsyNCNaplzItMvM7EdZo8ZtfKQs9n5As6mjxjYK4\n"
            + "O8soDCv543RC9R3GgLJTrAtaEtR2loeJRIW62LmCpYlg2UrRdeMMikrIcHFfUPLd\n"
            + "FMSVxDSoQwdaPPmF7I9Z8CkCAwEAAQ==\n"
            + "-----END PUBLIC KEY-----";

    public static boolean verifyJwtToken(String token) {

        if (StringUtils.isEmpty(token)) {
            return false;
        }
        String pubKeyPEM = USER_FRONT_PUBLIC_KEY.replace("-----BEGIN PUBLIC KEY-----\n", "").replace("-----END PUBLIC KEY-----", "");

        PublicKey publicKey = getKey(pubKeyPEM);

        try {
            Jwts.parser().setSigningKey(publicKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty: " + e.getMessage());
        }

        return false;

    }

    public static PublicKey getKey(String key) {
        try {
            byte[] byteKey = Base64.decode(key);
            X509EncodedKeySpec X509publicKey = new X509EncodedKeySpec(byteKey);
            KeyFactory kf = KeyFactory.getInstance("RSA");

            return kf.generatePublic(X509publicKey);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
