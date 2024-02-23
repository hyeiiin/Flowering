package com.sail.back.global.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Data
@Component
@Configuration
@ConfigurationProperties(prefix = "spring.security.oauth2.client.registration.naver")
public class NaverConfig {
    private String clientId;
    private String clientSecret;
}
