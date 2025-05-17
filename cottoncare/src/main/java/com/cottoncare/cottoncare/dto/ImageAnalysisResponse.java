package com.cottoncare.cottoncare.dto;

public class ImageAnalysisResponse {

    private String freshness;
    private String status;
    private String diseaseName;

    public ImageAnalysisResponse() {
    }

    public ImageAnalysisResponse(String freshness, String status, String diseaseName) {
        this.freshness = freshness;
        this.status = status;
        this.diseaseName = diseaseName;
    }

    // Getters and setters

    public String getFreshness() {
        return freshness;
    }

    public void setFreshness(String freshness) {
        this.freshness = freshness;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }
}
