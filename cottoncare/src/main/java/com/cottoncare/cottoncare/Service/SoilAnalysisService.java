package com.cottoncare.cottoncare.Service;

import com.cottoncare.cottoncare.dto.SoilAnalysisResponseDTO;
import com.cottoncare.cottoncare.dto.SoilParameterRequestDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SoilAnalysisService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public SoilAnalysisResponseDTO analyzeSoil(SoilParameterRequestDTO dto) {
        String prompt = generatePrompt(dto);

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

        String fullUrl = geminiApiUrl + "?key=" + geminiApiKey;
        ResponseEntity<String> response = restTemplate.postForEntity(fullUrl, request, String.class);

        String rawText = extractTextFromGeminiResponse(response.getBody());

        return mapResponseToDTO(rawText);
    }

    private String generatePrompt(SoilParameterRequestDTO dto) {
        return String.format("""
            Based on the following soil parameters, provide a detailed, structured analysis in this format without extra textwith detail about 4-5 lines each:

            Soil Fertility: <fertility evaluation>
            Suggested Crops: <recommended crops>
            Fertilizer Recommendation: <fertilizer advice>
            General Tip: <general farming tip>

            Parameters:
            Nitrogen: %.2f
            Phosphorus: %.2f
            Potassium: %.2f
            pH: %.2f
            Water: %.2f
            Humidity: %.2f
            Temperature: %.2f
            """,
                dto.getNitrogen(), dto.getPhosphorus(), dto.getPotassium(),
                dto.getPh(), dto.getWater(), dto.getHumidity(), dto.getTemperature());
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

    private SoilAnalysisResponseDTO mapResponseToDTO(String responseText) {
        SoilAnalysisResponseDTO dto = new SoilAnalysisResponseDTO();

        dto.setSoilFertility(extractField(responseText, "Soil Fertility"));
        dto.setSuggestedCrops(extractField(responseText, "Suggested Crops"));
        dto.setFertilizerRecommendation(extractField(responseText, "Fertilizer Recommendation"));
        dto.setGeneralTip(extractField(responseText, "General Tip"));

        return dto;
    }

    private String extractField(String response, String field) {
        Pattern pattern = Pattern.compile(field + ":\\s*(.*?)(\\n|$)");
        Matcher matcher = pattern.matcher(response);
        return matcher.find() ? matcher.group(1).trim() : "N/A";
    }
}
