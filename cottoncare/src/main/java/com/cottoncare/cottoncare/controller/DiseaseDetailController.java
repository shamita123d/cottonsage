package com.cottoncare.cottoncare.controller;

import com.cottoncare.cottoncare.Service.DiseaseDetailService;
import com.cottoncare.cottoncare.dto.DiseaseDetailResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/disease")
@CrossOrigin("*")
public class DiseaseDetailController {

    @Autowired
    private DiseaseDetailService diseaseDetailService;

    @GetMapping("/info")
    public DiseaseDetailResponseDTO getDiseaseInfo(@RequestParam String diseaseName) {
        System.out.println(diseaseName);
        return diseaseDetailService.getDiseaseDetails(diseaseName);
    }
}
