
# DUMMY PRODUCTS REST API
![Made With](https://img.shields.io/badge/Made%20with-Node.JS-68A063?style=for-the-badge&logo=Node.JS)

This API aims to replicate the behaviour of various ecommerce website data and this is best for prototyping such kind of website. It provides dummy products with placeholder images with different sizes. I made this because I cannot find any api that can provide such dummy products, though there are some like ebay dev, however, its such as hassle to request an access and read through all the long documentation since all I need is a fake product as a placeholder. Faker js would do, however, I'm looking for something that matches at least the name of the product and its type/department. and here you go!

[Documentation](https://dummyproducts-api.herokuapp.com)

#### if you found this very useful, Please don't forget to star this repo! :tada: A rookie like me will highly appreaciate it

### FEATURES
- each dummy product has dummy images relative to product type (images used has CC license)
- each dummy product comes with description, prices, stock, ratings, and reviews
- with filters, filter by ```stocks, sales, price, ratings``` with operators ```lt, gt, lte, gte``` (where in lt is 'less than', and lte 'less than or equal to', same pattern goes with gt & gte)
- filters will only work on ```/products``` and ```/products/search``` routes
- with search route, matches all product names depending on the query (use query string keys ```term`` required)
- with pagination, (use query string keys ```page``` and ```limit```)
- pagination (```page``` & ```limit```) can be used with all routes except ```/departments```
- with checkout feature, it just emulates the post request when buying something. nothing is inserted on the database 

### TO DO LIST (OPEN FOR CONTRIBUTIONS)
- dummy users
- dummy cart
- dummy checkout (POST)
- add dimensions property on Product Model?
- add discount property on Product Model?

### CONTRIBUTING GUIDELINES

Please check this [contributing guidlines](https://github.com/rookiemonkey/dummy-products-api/blob/dev/CONTRIBUTING.md)

### CONTRIBUTORS ✨

Thank you for all who contributed to this project!

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/justinbalaguer">
			<img src="https://avatars0.githubusercontent.com/u/26339491?s=400&u=c1f802af9e6c33df21f4314d2065dc2be7d12e51&v=4" width="100px;" alt=""/><br /><sub><b>
Justin Balaguer</b></sub></a></a>
		</td>
	</tr>
</table>

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