
# DUMMY PRODUCTS REST API
![Made With](https://img.shields.io/badge/Made%20with-Node.JS-68A063?style=for-the-badge&logo=Node.JS)

This API aims to replicate the behaviour of various ecommerce website data and this is best for prototyping such kind of website. It provides dummy products with placeholder images with different sizes. I made this because I cannot find any api that can provide such dummy products, though there are some like ebay dev, however, its such as hassle to request an access and read through all the long documentation since all I need is a fake product as a placeholder. Faker js would do, however, I'm looking for something that matches at least the name of the product and its type/department. and here you go!

#### if you found this very useful, Please don't forget to star this repo! :tada: A rookie like me will highly appreaciate it

## ENDPOINT

METHOD | Base URL
------------ | -------------
GET | [`https://dummyproducts-api.herokuapp.com`](https://dummyproducts-api.herokuapp.com)

## CAVEATS

- 400 api calls per day

### DEPARTMENTS
Data | Endpoint
------------ | -------------
All Departments | ```/api/v1/departments```
All Products of a Department | ```/api/v1/departments/{{department_id}}```
Top Rated Products of a Department | ```/api/v1/departments/{{department_id}}/toprated```
Top Sales Products of a Department | ```/api/v1/departments/{{department_id}}/topsales```

### PRODUCTS
Data | Endpoint
------------ | -------------
All Products | ```/api/v1/products```
All Top Rated Products | ```/api/v1/products/toprated```
All Top Sales Products | ```/api/v1/products/topsales```
Get A Product | ```/api/v1/products/{{product_id}}```


### TO DO LIST (OPEN FOR CONTRIBUTIONS)
- proper documentation website
- pagination for some routes
- require api keys as query string once we have doc site
- dummy reviews for each dummy product (Review Model)
- replace placeholder.com images with real images relative to product type


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