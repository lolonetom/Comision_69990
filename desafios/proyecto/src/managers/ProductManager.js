//IMPORTAMOS EL MODULO FILE SYSTEM
import { promises as fs } from 'fs';

//CREAMOS LA CLASE
class ProductManager {
  static utlId = 0;

  constructor(path) {
    this.path = path;
    this.products = [];
  }

  //METODO AGREGAR PRODUCTOS
  async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      const arrayProducts = await this.getProducts();
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Todos los campos son obligatorios');
        return;
      }
      if (arrayProducts.some((item) => item.code === code)) {
        console.log('El codigo ya existe');
        return;
      }
      const newProduct = {
        id: ++ProductManager.utlId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      arrayProducts.push(newProduct);
    } catch (err) {
      console.log('Error al agregar producto', err);
    }
  }
  //METODO OBTENER PRODUCTOS
  async getProducts() {
    try {
      const productJSON = await fs.readFile(this.path, 'utf-8');
      const arrayProducts = JSON.parse(productJSON);
      return arrayProducts;
    } catch (err) {
      console.log(err);
      throw err;
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
        await fs.writeFile(this.path, JSON.stringify(this.products));
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
        await fs.writeFile(this.path, JSON.stringify(this.products));
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductManager;

//TESTING
/* const productManager = new ProductManager('./productsFile.json');

const test = async () => {
  await productManager.addProduct(
    'Product 1',
    'Description 1',
    100,
    'sin imagen',
    '123456',
    10
  );
  await productManager.addProduct(
    'Product 2',
    'Description 2',
    200,
    'sin imagen',
    '679012',
    20
  );
  await productManager.addProduct(
    'Product 3',
    'Description 3',
    300,
    'sin imagen',
    '234567',
    30
  );

  await productManager.updateProduct(2, { title: 'modifica3', code: '321123' });
  await productManager.updateProduct(3, { title: 'modifica4', code: '321321' });

  await productManager.deleteProduct(1);
};

test(); */
