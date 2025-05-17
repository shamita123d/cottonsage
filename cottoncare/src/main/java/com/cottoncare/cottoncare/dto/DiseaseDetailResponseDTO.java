package com.cottoncare.cottoncare.dto;

import lombok.Builder;
import lombok.Data;

@Builder
public class DiseaseDetailResponseDTO {
    private String diseaseName;
    private String severity;
    private String stage;
    private String season;
    private String symptoms;
    private String prevention;
    private String causes;
    private String treatment;

    public DiseaseDetailResponseDTO(){

    }

    public DiseaseDetailResponseDTO(String diseaseName, String severity, String stage, String season, String symptoms, String prevention, String causes, String treatment) {
        this.diseaseName = diseaseName;
        this.severity = severity;
        this.stage = stage;
        this.season = season;
        this.symptoms = symptoms;
        this.prevention = prevention;
        this.causes = causes;
        this.treatment = treatment;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getPrevention() {
        return prevention;
    }

    public void setPrevention(String prevention) {
        this.prevention = prevention;
    }

    public String getCauses() {
        return causes;
    }

    public void setCauses(String causes) {
        this.causes = causes;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }
}
