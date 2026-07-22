package in.aryan.ghibliapi.config;

import feign.form.spring.SpringFormEncoder;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverters;
import org.springframework.web.client.RestTemplate;

import java.beans.Encoder;

@Configuration
public class FeignConfig {

    @Bean
    public Encoder feignformEncoder(){
        return new SpringFormEncoder(
                new SpringEncoder(()-> new HttpMessageConverters(new RestTemplate().getMessageConverters())
                );
    }
}
