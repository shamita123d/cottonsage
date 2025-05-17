package com.cottoncare.cottoncare.Service;

import com.cottoncare.cottoncare.Entity.diseaseDetail;
import com.cottoncare.cottoncare.Repository.DiseaseDetailRepository;
import com.cottoncare.cottoncare.dto.DiseaseDetailResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiseaseDetailService {

    @Autowired
    private DiseaseDetailRepository diseaseDetailRepository;

    @Autowired
    private DiseaseInfoService diseaseInfoService;

    public DiseaseDetailResponseDTO getDiseaseDetails(String diseaseName) {
        DiseaseDetailResponseDTO dto = diseaseInfoService.fetchStructuredInfoFromGemini(diseaseName);

//        diseaseDetail entity = new diseaseDetail();
//        entity.setDiseaseName(dto.getDiseaseName());
//        entity.setSeverity(dto.getSeverity());
//        entity.setStage(dto.getStage());
//        entity.setSeason(dto.getSeason());
//        entity.setSymptoms(dto.getSymptoms());
//        entity.setPrevention(dto.getPrevention());
//        entity.setCauses(dto.getCauses());
//        entity.setTreatment(dto.getTreatment());
//
//        diseaseDetailRepository.save(entity);

        return dto;
    }
}
