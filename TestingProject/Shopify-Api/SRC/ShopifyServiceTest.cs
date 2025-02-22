using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json.Linq;
using Shopify_Api;
using Shopify_Api.Controllers;
using ShopifySharp;
using ShopifySharp.Credentials;
using ShopifySharp.Factories;
using ShopifySharp.Filters;
using ShopifySharp.Lists;

namespace TestingProject.Shopify_Api.SRC
{
    [TestFixture]
    public class ProductsControllerTests
    {
        private ProductsController _controller;
        private Mock<IProductServiceFactory> _mockProductServiceFactory;
        private Mock<IProductService> _mockProductService;
        private Mock<IMetaFieldServiceFactory> _mockMetaFieldServiceFactory;
        private Mock<IHttpClientFactory> _mockHttpClientFactory;
        private Mock<IMetaFieldService> _mockMetaFieldService;
        private ShopifyRestApiCredentials _falseCredentials;
        private ProductValidator _productValidator;

        [SetUp]
        public void Setup()
        {
            _mockProductServiceFactory = new Mock<IProductServiceFactory>();
            _mockProductService = new Mock<IProductService>();
            _mockMetaFieldServiceFactory = new Mock<IMetaFieldServiceFactory>();
            _mockMetaFieldService = new Mock<IMetaFieldService>();
            _mockHttpClientFactory = new Mock<IHttpClientFactory>();

            _falseCredentials = new ShopifyRestApiCredentials("NotARealURL", "NotARealToken");
            _productValidator = new ProductValidator();

            _mockProductServiceFactory
                .Setup(x => x.Create(It.IsAny<ShopifyApiCredentials>()))
                .Returns(_mockProductService.Object);

            _mockMetaFieldServiceFactory
                .Setup(x => x.Create(It.IsAny<ShopifyApiCredentials>()))
                .Returns(_mockMetaFieldService.Object);

            _controller = new ProductsController(
                _mockProductServiceFactory.Object,
                _falseCredentials,
                _productValidator,
                _mockMetaFieldServiceFactory.Object,
                _mockHttpClientFactory.Object
            );
        }
        
        [Test]
        public async Task GetAllProducts_ReturnsOkResult_WhenServiceSucceeds()
        {
            // Arrange
            var expectedProducts = new List<Product>
            {
                new Product { Id = 1, Title = "Product 1" },
                new Product { Id = 2, Title = "Product 2" }
            };

            // Create an empty LinkHeaderParseResult since you don't care about pagination
            var mockLinkHeader = new LinkHeaderParseResult<Product>(null, null);

            // Create a ListResult using the constructor
            var listResult = new ListResult<Product>(expectedProducts, mockLinkHeader);

            // Set up ListAsync to return the ListResult
            _mockProductService.Setup(service => service.ListAsync(null, false, default))
                .ReturnsAsync(listResult);

            // Act: Call the method
            var result = await _controller.GetAllProducts();

            // Assert: Check if the result is OK with the correct products
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));

            var listingResult = okResult.Value as ListResult<Product>;
            Assert.IsNotNull(listingResult);
            CollectionAssert.AreEqual(expectedProducts, listingResult.Items);
        }


        [Test]
        public async Task GetAllProducts_ReturnsStatusCode500_WhenServiceThrowsShopifyException()
        {
            // Arrange: Setup the mock to throw a ShopifyException
            var expectedErrorMessage = "Error fetching product";
            var expectedExceptionMessage = "Shopify API error occurred";

            _mockProductService
                .Setup(service => service.ListAsync(null, false, default))
                .ThrowsAsync(new ShopifyException(expectedExceptionMessage));

            // Act: Call the method
            var result = await _controller.GetAllProducts();

            // Assert: Check if the result is a status code 500 with the error message
            var objectResult = result as ObjectResult;
            Assert.IsNotNull(objectResult);
            Assert.That(objectResult.StatusCode, Is.EqualTo(404));

            // Use JObject to access the properties in the response
            var response = JObject.FromObject(objectResult.Value);
            Assert.That(response["message"]?.ToString(), Is.EqualTo(expectedErrorMessage));
            Assert.That(response["details"]?.ToString(), Is.EqualTo(expectedExceptionMessage));
        }

        
        /*
        [Test]
        public async Task GetAllProducts_ReturnsStatusCode500_WhenUnexpectedExceptionOccurs()
        {
            // Arrange: Setup the mock to throw an unexpected exception
            _mockProductService.Setup(service => service.ListAsync(null, false, default)).ThrowsAsync(new System.Exception("Unexpected error"));

            // Act: Call the method
            var result = await _controller.GetAllProducts();

            // Assert: Check if the result is a status code 500 with a generic error message
            var objectResult = result as ObjectResult;
            Assert.IsNotNull(objectResult);
            Assert.That(objectResult.StatusCode, Is.EqualTo(500));

            // Use JObject to access the properties in the response
            var response = JObject.FromObject(objectResult.Value);
            Assert.AreEqual("Error fetching products", response["message"].ToString());
            Assert.AreEqual("Unexpected error", response["details"].ToString());
        }*/
    }
}
