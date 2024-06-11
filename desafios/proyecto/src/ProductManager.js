//IMPORTAMOS EL MODULO FILE SYSTEM
import fs from 'fs';

//CREAMOS LA CLASE
class ProductManager {
  static utlId = 0;

  constructor(path) {
    this.path = path;
    this.products = [];
  }

  //METODO AGREGAR PRODUCTOS
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      await this.getProducts();
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Todos los campos son obligatorios');
        return;
      }
      if (this.products.some((item) => item.code === code)) {
        console.log('El codigo ya existe');
        return;
      }
      const product = {
        id: ++ProductManager.utlId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {}
  }
  //METODO OBTENER PRODUCTOS
  async getProducts() {
    try {
      if (fs.promises.writeFile(this.path)) {
        const productJSON = await fs.promises.readFile(this.path, 'utf-8');
        this.products.push(...JSON.parse(productJSON));
        return this.products;
      } else {
        return this.products;
      }
    } catch (err) {
      console.log(err);
    }
  }
  //METODO BUSCAR POR ID PRODUCTOS
  async getProductById(id) {
    try {
      await this.getProducts();
      const product = this.products.find((item) => item.id === id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }
  //METODO ACTUALIZAR PRODUCTOS
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      await this.getProducts();
      const product = this.products.find((item) => item.id === id);
      if (product) {
        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      }
    } catch (err) {
      console.log(err);
    }
  }
  //METODO ELIMINAR PRODUCTOS
  async deleteProduct(id) {
    try {
      await this.getProducts();
      const product = this.products.find((item) => item.id === id);
      if (product) {
        this.products = this.products.filter((item) => item.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      }
    } catch (err) {
      console.log(err);
    }
  }
}

//TESTING
const productManager = new ProductManager('./productsFile.json');

const test = async () => {
  await productManager.addProduct(
    'Product 1',
    'Description 1',
    100,
    './images/product1.jpg',
    '123456',
    10
  );
  await productManager.addProduct(
    'Product 2',
    'Description 2',
    200,
    './images/product2.jpg',
    '679012',
    20
  );
  await productManager.addProduct(
    'Product 3',
    'Description 3',
    300,
    './images/product3.jpg',
    '234567',
    30
  );

  await productManager.updateProduct(2, { title: 'modifica3', code: '321123' });
  await productManager.updateProduct(3, { title: 'modifica4', code: '321321' });

  await productManager.deleteProduct(1);
};

test();
