package com.cottoncare.cottoncare.Service;

import com.cottoncare.cottoncare.Entity.ImageAnalysis;
import com.cottoncare.cottoncare.Repository.ImageAnalysisRepository;
import com.cottoncare.cottoncare.dto.ImageAnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageAnalysisService {

    private final Logger log = LoggerFactory.getLogger(ImageAnalysisService.class);

    @Autowired
    private ImageAnalysisRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    private final String FRESHNESS_API = "http://192.168.2.168:5000/api/predict";
    private final String DISEASE_API = "https://mchmaha.com/cotton_plant_disease_prediction/plant_disease_api.php";

    public ImageAnalysisResponse analyzeImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required.");
        }

        // Convert the MultipartFile to ByteArrayResource for HTTP transmission
        ByteArrayResource imageResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        // Prepare common headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Prepare body for the freshness API
        MultiValueMap<String, Object> freshnessBody = new LinkedMultiValueMap<>();
        freshnessBody.add("file", imageResource);  // Flask freshness API expects "file"

        HttpEntity<MultiValueMap<String, Object>> freshnessRequest = new HttpEntity<>(freshnessBody, headers);

        String freshnessStatus;
        String diseaseName = null;
        String diseaseStatus = "Not Applicable";

        // 🔍 Call Freshness Detection API
        try {
            ResponseEntity<Map> freshnessResponse = restTemplate.postForEntity(FRESHNESS_API, freshnessRequest, Map.class);

            if (!freshnessResponse.getStatusCode().is2xxSuccessful() || freshnessResponse.getBody() == null) {
                throw new IllegalStateException("Failed to evaluate image freshness.");
            }

            // Read prediction from response (e.g., "The leaf is diseased cotton leaf")
            String prediction = (String) freshnessResponse.getBody().get("prediction");

            // Simplify freshnessStatus based on prediction
            if (prediction != null && prediction.toLowerCase().contains("fresh")) {
                freshnessStatus = "fresh";
            } else {
                freshnessStatus = "diseased";
            }

        } catch (Exception e) {
            log.error("Freshness API error: {}", e.getMessage());
            throw new IllegalStateException("Error checking image freshness.");
        }

        // ✅ If diseased, call second API for disease detection
        if ("diseased".equalsIgnoreCase(freshnessStatus)) {
            try {
                MultiValueMap<String, Object> diseaseBody = new LinkedMultiValueMap<>();
                diseaseBody.add("image", imageResource);  // PHP API expects "image" not "file"

                HttpEntity<MultiValueMap<String, Object>> diseaseRequest = new HttpEntity<>(diseaseBody, headers);

                ResponseEntity<Map> diseaseResponse = restTemplate.postForEntity(DISEASE_API, diseaseRequest, Map.class);

                if (diseaseResponse.getStatusCode().is2xxSuccessful() && diseaseResponse.getBody() != null) {
                    Map<String, Object> response = diseaseResponse.getBody();
                    log.info("Disease API response: {}", response);

                    // Adjust the keys based on actual response JSON
                    diseaseName = (String) response.get("data");
                    diseaseStatus = (String) response.get("status");
                } else {
                    diseaseStatus = "Detection Failed";
                }
            } catch (Exception e) {
                log.error("Disease API error: {}", e.getMessage());
                diseaseStatus = "Detection Failed";
            }
        }

//        // Save result in database
//        ImageAnalysis analysis = new ImageAnalysis();
//        analysis.setImageData(file.getBytes());
//        analysis.setOriginalFileName(file.getOriginalFilename());
//        analysis.setFreshness(freshnessStatus);
//        analysis.setDiseaseName(diseaseName);
//        analysis.setDetectionStatus(diseaseStatus);
//        analysis.setTimestamp(LocalDateTime.now());
//
//        repository.save(analysis);

        // Return response to frontend
        return new ImageAnalysisResponse(freshnessStatus, diseaseStatus, diseaseName);
    }
}
