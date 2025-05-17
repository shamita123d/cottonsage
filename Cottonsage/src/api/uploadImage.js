import toast from "react-hot-toast";

export const uploadImage = async (
  imageDataUrl,
  filename = "../../public/alternaria-leaf-spot-of-cotton-cotton-1565949146.jpg"
) => {
  if (!imageDataUrl || !imageDataUrl.startsWith("data:image/")) {
    toast.error("Invalid image format.");
    throw new Error("Invalid image data URL");
  }

  const uploadToast = toast.loading("Uploading image...");

  try {
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, filename);

    const uploadResponse = await fetch("http://localhost:8080/api/image/analyze", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    const result = await uploadResponse.json();
    toast.success("Image uploaded successfully!", { id: uploadToast });
    return result;
  } catch (error) {
    toast.error("Upload failed. Please try again.", { id: uploadToast });
    throw error;
  }
};
