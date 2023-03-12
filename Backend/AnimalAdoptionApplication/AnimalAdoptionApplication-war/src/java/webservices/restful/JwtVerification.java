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
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import org.apache.commons.lang3.StringUtils;
import org.apache.xml.security.utils.Base64;

/**
 *
 * @author jiawe
 */
public class JwtVerification {
    // PUBLIC KEY FROM USERFRONT Library
    private static final String USER_FRONT_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\n"
            + "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAy+F+ZRu1hzRI9lk/+wS7\n"
            + "O4lK9LYfrTAACH05VQwmUrlCI/F4va+gzkrndfW2ky/2hZeBIB3Y0QwCvFKoueL/\n"
            + "WlIwfNd6EJAo1xmcWYA+7lFZfD+fa0WX7ZtC4as67vxJkoJ7BJpfGk1Ekz7Eyajq\n"
            + "jmRvrCFqJz3IZeROZsoS4aZENJik9xSJHEQ5RSvB7HFK+HXEbm5IpxQi3Onw1QKq\n"
            + "Ao++QyYhzDgsG3mLSiRI4Iq7eKaagmDvyKfItBCYOCHnmDtoSptRd7G5HS6cCaF/\n"
            + "6sIyLGAmLDm6xcX/TC6QURVHfX04n1n3lFTKJAd2n8uMoN+xYKsjlFby0sNOUwId\n"
            + "flPvOhwseWJH4zlX1S296wgKjULvfS41FdZtEJ/XihHaWmIaMRNLDAhfpk736yMe\n"
            + "Az6j3fYQXnSb8cZwkBVmbflPIELPYrk3mwYNdfga0ypg1df3h4aI/JNAvB0ZehJ2\n"
            + "78do2pIBQmHm0igAt8OTxHjDogPxFc+yj4FLGzXJQiP6Jk4kGjCPJXtcrIAifuHv\n"
            + "HMf4+Jz4DZd8A2LAEhFY1PWlK71SjNrSBgjAgE3SOfL1j19LWiDCGVq2EHFuI1LV\n"
            + "O+bNiYCN/qR9eBlnh+E+DcKWxHzKv6tzjFsJN2qExEQYAk7T+1bQXcYWkltZr4dX\n"
            + "NK7v3rL1JCTTPEUuLES5I6sCAwEAAQ==\n"
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
