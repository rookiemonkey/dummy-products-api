
# DUMMY PRODUCTS API
![Made With](https://img.shields.io/badge/Made%20with-Node.JS-68A063?style=for-the-badge&logo=Node.JS)

This API aims to replicate the behaviour of various ecommerce websites. It provides dummy products with placeholder image for the mean time. I made this because I cannot find any api that can provide such dummy products, though there are some like ebay dev, however, its such as hassle to reqeust an access and read through all the long documentation since all I need is a fake product as a placeholder. Faker js would do, however, I'm looking for some that matches at least the name of the product and its type/department.

## ENDPOINT (v1.3)

METHOD | Base URL
------------ | -------------
GET | [`https://XXXXXXXXX/`](https://XXXXXXXXX/)

### DEPARTMENTS
Data | Endpoint
------------ | -------------
All Departments | ```/api/dummyproducts/departments```
All Products of a Department | ```/api/dummyproducts/departments/{{department_id}}```

### PRODUCTS
Data | Endpoint
------------ | -------------
All Products | ```/api/dummyproducts/products```
A Product | ```/api/dummyproducts/products/{{product_id}}```

### TO DO LIST
- proper documentation website
- filters (query strings) for all products route (price, rating, sales)
- 

## Author: <i>Kevin Roi R. Basina</i>
<a href="https://github.com/rookiemonkey">
	<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
</a>
<a href="https://ph.linkedin.com/in/kevin-roi-rigor-basina-668136185">
	<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>
<a href="https://www.facebook.com/kevinroibasina">
	<img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" />
<a>
<a href="https://www.instagram.com/timemachineni_roi/">
	<img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white">
</a>
<a href="https://twitter.com/tymmchineni_roi">
	<img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white">
</a>
<a href="mailto: kevinroirigorbasina@protonmail.com">
	<img src="https://img.shields.io/badge/ProtonMail-8B89CC?style=for-the-badge&logo=protonmail&logoColor=white">
</a>
<a href="mailto: kevinroirigorbasina@gmail.com">
	<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white">
</a>
