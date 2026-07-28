package in.aryan.ghibliapi.client;

import in.aryan.ghibliapi.config.FeignConfig;
import in.aryan.ghibliapi.dto.TextToImageRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(
    name = "stabilityAIClient",
    url = "${stability.api.baseurl}",
    configuration = FeignConfig.class
)
public interface StabilityAIClient {

    @PostMapping(
        value = "/v1/generation/{engineId}/text-to-image",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        headers = "Accept=image/png"
    )
    byte[] generateImageFromText(
        @RequestHeader("Authorization") String authorizationHeader,
        @PathVariable("engineId") String engineId,
        @RequestBody TextToImageRequest request
    );

    @PostMapping(
        value = "/v1/generation/{engineId}/image-to-image",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
        headers = "Accept=image/png"
    )
    byte[] generateImageFromImage(
        @RequestHeader("Authorization") String authorizationHeader,
        @PathVariable("engineId") String engineId,
        @RequestPart("init_image") MultipartFile initImage,
        @RequestPart("text_prompts[0][text]") String textPrompt,
        @RequestPart("style_preset") String stylePreset
    );
}
