package backend.shoppetproject.service;

import backend.shoppetproject.entity.ProductEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageService {

    public String saveImage(MultipartFile imageFile) throws IOException {
        if (imageFile == null || imageFile.isEmpty()) {
            return null;
        }

        Path uploadDir = Paths.get("uploads/");

        String fileName = System.currentTimeMillis() % 1000000000 + ".png";
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + fileName;
    }

    public void deleteImage(ProductEntity productToDelete) {
        if (productToDelete.getImageUrl() != null) {
            Path imagePath = Paths.get("." + productToDelete.getImageUrl());
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                System.err.println("Не удалось удалить файл: " + imagePath);
            }
        }
    }
}
