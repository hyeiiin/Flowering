package com.sail.back.security.model.service;

import com.sail.back.security.exception.JwtErrorCode;
import com.sail.back.security.exception.JwtException;
import com.sail.back.security.model.dto.response.GeneratedToken;
import com.sail.back.security.model.entity.Token;
import com.sail.back.security.model.entity.UnsafeToken;
import com.sail.back.security.model.repository.RefreshTokenRepository;
import com.sail.back.security.model.repository.UnsafeTokenRepository;
import com.sail.back.security.utils.JwtUtils;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtUtils jwtUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UnsafeTokenRepository unsafeTokenRepository;

    public GeneratedToken generatedToken(Long id, String role){
        String accessToken = jwtUtils.generateAccessToken(id, role);
        String refreshToken = jwtUtils.generateRefreshToken(id, role);
        refreshTokenRepository.save(new Token(id,accessToken, refreshToken));
        return new GeneratedToken(accessToken, refreshToken);
    }

    public void RemoveToken(Long id){
        Token token = refreshTokenRepository.findById(id).orElseThrow(() -> new JwtException(JwtErrorCode.NOT_EXISTS_TOKEN));
        refreshTokenRepository.delete(token);
    }

    public GeneratedToken republishToken(String refreshToken){
       if(jwtUtils.validateRefreshToken(refreshToken)){
           Long id = jwtUtils.getUserIdByRefreshToken(refreshToken);
           String role = jwtUtils.getUserRoleByRefreshToken(refreshToken);
           Token token = refreshTokenRepository.findById(id).orElseThrow(() -> new JwtException(JwtErrorCode.NOT_EXISTS_TOKEN));
           if(refreshToken.equals(token.getRefreshToken())){
               RemoveToken(id);
               GeneratedToken generatedToken = generatedToken(id, role);
               return generatedToken;
           }else {
               RemoveToken(id);
               unsafeTokenRepository.save(new UnsafeToken(token.getAccessToken(), token.getRefreshToken()));
               throw new JwtException(JwtErrorCode.INVALID_TOKEN);
           }
       }
        throw new JwtException(JwtErrorCode.INVALID_TOKEN);
    }

}
