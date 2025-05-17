package com.cottoncare.cottoncare.dto;

import lombok.Data;

@Data
public class DiseaseRequestDTO {

    private String diseaseName;

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }
}
