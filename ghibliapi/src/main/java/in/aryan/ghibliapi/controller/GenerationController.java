package in.aryan.ghibliapi.controller;

import feign.FeignException;
import in.aryan.ghibliapi.dto.TextGenerationRequestDTO;
import in.aryan.ghibliapi.service.GhibliArtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GenerationController {

    private final GhibliArtService ghibliArtService;

    public GenerationController(GhibliArtService ghibliArtService) {
        this.ghibliArtService = ghibliArtService;
    }

    @PostMapping(value = {"/generate", "/photo-to-art"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createGhibliArt(
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "prompt", required = false, defaultValue = "") String prompt) {
        try {
            byte[] imageBytes = ghibliArtService.createGhibliArt(image, prompt);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"ghibli_art.png\"")
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageBytes);
        } catch (FeignException e) {
            e.printStackTrace();
            String errorDetails = (e.contentUTF8() != null && !e.contentUTF8().isEmpty()) ? e.contentUTF8() : e.getMessage();
            return ResponseEntity.status(e.status() > 0 ? e.status() : 500)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("Stability API Error: " + errorDetails);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("Internal Server Error: " + e.getMessage());
        }
    }

    @PostMapping(value = {"/generate-from-text", "/text-to-art"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createGhibliArtFromText(@RequestBody TextGenerationRequestDTO requestDTO) {
        try {
            byte[] imageBytes = ghibliArtService.createGhibliArtFromText(requestDTO.getPrompt(), requestDTO.getStyle());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"ghibli_art.png\"")
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageBytes);
        } catch (FeignException e) {
            e.printStackTrace();
            String errorDetails = (e.contentUTF8() != null && !e.contentUTF8().isEmpty()) ? e.contentUTF8() : e.getMessage();
            return ResponseEntity.status(e.status() > 0 ? e.status() : 500)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("Stability API Error: " + errorDetails);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("Internal Server Error: " + e.getMessage());
        }
    }
}
