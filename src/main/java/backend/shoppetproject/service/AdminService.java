package backend.shoppetproject.service;

import backend.shoppetproject.dto.ProductDto;
import backend.shoppetproject.entity.ProductEntity;
import backend.shoppetproject.entity.ProductTypeEntity;
import backend.shoppetproject.repository.ProductRepository;
import backend.shoppetproject.repository.ProductTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class AdminService {

    private final ProductRepository productRepository;
    private final ImageService imageService;
    private final ProductTypeRepository productTypeRepository;

    public AdminService(ProductRepository productRepository, ImageService imageService, ProductTypeRepository productTypeRepository) {
        this.productRepository = productRepository;
        this.imageService = imageService;
        this.productTypeRepository = productTypeRepository;
    }

    @Transactional
    public ProductDto createProduct(ProductDto productDto, MultipartFile imageFile) throws IOException {
        String imageUrl = imageService.saveImage(imageFile);

        ProductTypeEntity type = productTypeRepository.findByName(productDto.getType())
                .orElseThrow(() -> new EntityNotFoundException("Тип товара не найден"));

        ProductEntity productToCreate = new ProductEntity(
                productDto.getName(),
                productDto.getDescription(),
                type,
                productDto.getPrice(),
                productDto.getIsInStock()
        );

        productToCreate.setImageUrl(imageUrl);
        productRepository.save(productToCreate);

        return new ProductDto(productToCreate);
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto, MultipartFile imageFile) throws IOException {
        ProductEntity productToUpdate = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        ProductTypeEntity type = productTypeRepository.findByName(productDto.getType())
                .orElseThrow(() -> new EntityNotFoundException("Тип товара не найден"));

        productToUpdate.setName(productDto.getName());
        productToUpdate.setDescription(productDto.getDescription());
        productToUpdate.setProductType(type);
        productToUpdate.setPrice(productDto.getPrice());
        productToUpdate.setIsInStock(productDto.getIsInStock());

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = imageService.saveImage(imageFile);
            productToUpdate.setImageUrl(imageUrl);
        }

        productRepository.save(productToUpdate);
        return new ProductDto(productToUpdate);
    }

    @Transactional
    public ProductDto deleteProduct(Long id) {
        ProductEntity productToDelete = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Такой товар не найден"));

        imageService.deleteImage(productToDelete);

        productRepository.delete(productToDelete);
        return new ProductDto(productToDelete);
    }

    public List<String> getProductTypes() {
        List<ProductTypeEntity> productTypes = productTypeRepository.findAll();

        return productTypes.stream().map(ProductTypeEntity::getName).toList();
    }

    public String addProductType(String productType) {
        ProductTypeEntity productTypeToAdd = new ProductTypeEntity(productType);

        productTypeRepository.save(productTypeToAdd);
        return productTypeToAdd.getName();
    }

    public String deleteProductType(String productType) {
        ProductTypeEntity productTypeToDelete = productTypeRepository.findByName(productType)
                .orElseThrow(() -> new EntityNotFoundException("Тип товара не найден"));

        productTypeRepository.delete(productTypeToDelete);
        return productTypeToDelete.getName();
    }
}
