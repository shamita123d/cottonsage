package com.cottoncare.cottoncare.Service;

import com.cottoncare.cottoncare.dto.DiseaseDetailResponseDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DiseaseInfoService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public DiseaseDetailResponseDTO fetchStructuredInfoFromGemini(String diseaseName) {
        String prompt = """
            Provide detailed and structured ( and easy and deep ) with buttlet point Sturctured and theoritical information about the following cotton plant disease.

            Disease Name: %s

            Respond in the exact format below without adding any extra text:

            Disease: <disease name>
            Severity: <severity of the disease>
            Stage: <growth stage at which it appears>
            Season: <season(s) it usually occurs>
            Symptoms: <list of symptoms>
            Prevention: <methods to prevent the disease>
            Causes: <primary causes of the disease>
            Treatment: <recommended treatment methods>
        """.formatted(diseaseName.replace("\"", "\\\""));

        String requestJson = """
            {
              "contents": [{
                "parts": [{
                  "text": "%s"
                }]
              }]
            }
        """.formatted(prompt.replace("\"", "\\\""));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(requestJson, headers);

        String fullUrl = geminiApiUrl + "?key=" + apiKey;
        ResponseEntity<String> response = restTemplate.postForEntity(fullUrl, request, String.class);

        String rawText = extractTextFromGeminiResponse(response.getBody());

        DiseaseDetailResponseDTO dto = new DiseaseDetailResponseDTO();
        dto.setDiseaseName(diseaseName);
        dto.setSeverity(extractField(rawText, "Severity"));
        dto.setStage(extractField(rawText, "Stage"));
        dto.setSeason(extractField(rawText, "Season"));
        dto.setSymptoms(extractField(rawText, "Symptoms"));
        dto.setPrevention(extractField(rawText, "Prevention"));
        dto.setCauses(extractField(rawText, "Causes"));
        dto.setTreatment(extractField(rawText, "Treatment"));

        return dto;
    }

    private String extractTextFromGeminiResponse(String responseJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);
            return root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    private String extractField(String response, String field) {
        Pattern pattern = Pattern.compile(field + ":\\s*(.*?)(\\n|$)");
        Matcher matcher = pattern.matcher(response);
        return matcher.find() ? matcher.group(1).trim() : "";
    }
}
