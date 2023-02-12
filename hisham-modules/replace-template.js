// The idea here is to replace template with data object
// when we want to replace many products that exist at the same
// page we can easily loop through each product and replace
// the template with each object then combine them together
const replaceTemplate = (template, product) => {
    let output = template.replace(/#productid#/g, product.id)
    output = output.replace(/#productname#/g, product.productName)
    output = output.replace(/#productimage#/g, product.image)
    output = output.replace(/#productfrom#/g, product.from)
    output = output.replace(/#productprice#/g, product.price)
    output = output.replace(/#productorganic#/g, product.organic)
    output = output.replace(/#productquantity#/g, product.quantity)
    output = output.replace(/#productdescription#/g, product.description)
    output = output.replace(/#productnutrients#/g, product.nutrients)

    if (!product.organic) {
        output = output.replace(/#notorganic#/g, 'not-organic')
    }

    return output
}

module.exports = replaceTemplate;