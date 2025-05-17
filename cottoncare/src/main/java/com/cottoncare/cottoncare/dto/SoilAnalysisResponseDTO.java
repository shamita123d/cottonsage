package com.cottoncare.cottoncare.dto;

import lombok.Data;

@Data
public class SoilAnalysisResponseDTO {
    private String soilFertility;
    private String suggestedCrops;
    private String fertilizerRecommendation;
    private String generalTip;

    public String getSoilFertility() {
        return soilFertility;
    }

    public void setSoilFertility(String soilFertility) {
        this.soilFertility = soilFertility;
    }

    public String getSuggestedCrops() {
        return suggestedCrops;
    }

    public void setSuggestedCrops(String suggestedCrops) {
        this.suggestedCrops = suggestedCrops;
    }

    public String getFertilizerRecommendation() {
        return fertilizerRecommendation;
    }

    public void setFertilizerRecommendation(String fertilizerRecommendation) {
        this.fertilizerRecommendation = fertilizerRecommendation;
    }

    public String getGeneralTip() {
        return generalTip;
    }

    public void setGeneralTip(String generalTip) {
        this.generalTip = generalTip;
    }
}
