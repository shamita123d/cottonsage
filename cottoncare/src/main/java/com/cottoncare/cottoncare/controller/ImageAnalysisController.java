package com.cottoncare.cottoncare.controller;

import com.cottoncare.cottoncare.Service.ImageAnalysisService;
import com.cottoncare.cottoncare.dto.ImageAnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ImageAnalysisController {

    @Autowired
    private ImageAnalysisService imageAnalysisService;

    @PostMapping("/analyze")
    public ResponseEntity<ImageAnalysisResponse> analyzeImage(@RequestParam("image") MultipartFile file) {
        try {
            ImageAnalysisResponse response = imageAnalysisService.analyzeImage(file);
            System.out.println(response);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ImageAnalysisResponse("Failed", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ImageAnalysisResponse("Error", "Unexpected error occurred.", null));
        }
    }
}
