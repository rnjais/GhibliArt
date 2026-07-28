package in.aryan.ghibliapi.service;

import in.aryan.ghibliapi.client.StabilityAIClient;
import in.aryan.ghibliapi.dto.TextToImageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class GhibliArtService {

    private final StabilityAIClient stabilityAIClient;
    private final RestTemplate restTemplate;
    private final String apiKey;

    public GhibliArtService(
        StabilityAIClient stabilityAIClient,
        @Value("${stability.api.key:}") String apiKey
    ) {
        this.stabilityAIClient = stabilityAIClient;
        this.restTemplate = new RestTemplate();
        this.apiKey = apiKey;
    }

    public byte[] createGhibliArt(MultipartFile image, String prompt) {
        String basePrompt = (prompt != null && !prompt.trim().isEmpty()) ? prompt : "Studio Ghibli style portrait";
        String finalPrompt = basePrompt + " in the beautiful detailed anime style of studio ghibli, hand painted, masterpiece";

        if (hasValidApiKey()) {
            try {
                String engineId = "stable-diffusion-v1-6";
                String stylePreset = "anime";
                String authHeader = apiKey.startsWith("Bearer ") ? apiKey : "Bearer " + apiKey;
                return stabilityAIClient.generateImageFromImage(authHeader, engineId, image, finalPrompt, stylePreset);
            } catch (Exception e) {
                System.err.println("Stability AI call failed, falling back to free Ghibli provider: " + e.getMessage());
            }
        }

        // Free Fallback Provider (No API key required)
        return fetchFromFreeGhibliProvider(finalPrompt);
    }

    public byte[] createGhibliArtFromText(String prompt, String style) {
        String styleName = (style != null && !style.equals("general")) ? style.replace("-", " ") : "anime";
        String finalPrompt = prompt + " in the beautiful detailed " + styleName + " style of studio ghibli, high quality, masterpiece";

        if (hasValidApiKey()) {
            try {
                String engineId = "stable-diffusion-v1-6";
                String stylePreset = (style != null && style.equals("general")) ? "anime" : (style != null ? style.replace("_", "-") : "anime");
                TextToImageRequest requestPayload = new TextToImageRequest(finalPrompt, stylePreset);
                String authHeader = apiKey.startsWith("Bearer ") ? apiKey : "Bearer " + apiKey;
                return stabilityAIClient.generateImageFromText(authHeader, engineId, requestPayload);
            } catch (Exception e) {
                System.err.println("Stability AI call failed, falling back to free Ghibli provider: " + e.getMessage());
            }
        }

        // Free Fallback Provider (No API key required)
        return fetchFromFreeGhibliProvider(finalPrompt);
    }

    private boolean hasValidApiKey() {
        return apiKey != null
                && !apiKey.trim().isEmpty()
                && !apiKey.contains("YOUR_REAL_STABILITY_API_KEY")
                && !apiKey.contains("your_stability_api_key_here");
    }

    private byte[] fetchFromFreeGhibliProvider(String prompt) {
        try {
            String encodedPrompt = URLEncoder.encode(prompt, StandardCharsets.UTF_8);
            String url = "https://image.pollinations.ai/prompt/" + encodedPrompt + "?width=768&height=512&nologo=true&seed=" + (int)(Math.random() * 100000);
            return restTemplate.getForObject(url, byte[].class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate image via free Ghibli provider: " + e.getMessage(), e);
        }
    }
}
