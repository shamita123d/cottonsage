package com.cottoncare.cottoncare.controller;

import com.cottoncare.cottoncare.Service.SoilAnalysisService;
import com.cottoncare.cottoncare.dto.SoilAnalysisResponseDTO;
import com.cottoncare.cottoncare.dto.SoilParameterRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/soil")
@CrossOrigin(origins = "*") // Allow frontend access
public class SoilParameterController {

    @Autowired
    private SoilAnalysisService soilAnalysisService;

    @PostMapping("/parameters")
    public SoilAnalysisResponseDTO analyzeSoil(@RequestBody SoilParameterRequestDTO dto) {
        return soilAnalysisService.analyzeSoil(dto);
    }
}
