import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Pranay Trading Company API',
      version: '1.0.0',
      description: 'API documentation for backend services',
    },
    servers: [
      { url: 'http://localhost:5001', description: 'Local dev server' },
    ],
    components: {
      schemas: {
        User: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              username: { type: 'string', example: 'john_doe' },
              email: { type: 'string', example: 'john@example.com' },
              password: { type: 'string', example: '$2b$10$hash...', description: 'hashed password' }
            }
          },
          CreateUserInput: {
            type: 'object',
            required: ['username', 'email', 'password'],
            properties: {
              username: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', minLength: 8 }
            },
            example: {
              username: 'john_doe',
              email: 'john@example.com',
              password: 'Passw0rd!'
            }
          },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Sample Product' },
            description: { type: 'string', example: 'Description text', nullable: true },
            price: { type: 'number', example: 199.99 },
            stock: { type: 'integer', example: 10 },
            category: { type: 'string', example: 'Electronics', nullable: true },
          },
        },
        CreateProductInput: {
          type: 'object',
          required: ['name', 'price', 'stock'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            stock: { type: 'integer' },
            category: { type: 'string' },
          },
          example: {
            name: 'Test Product',
            description: 'Nice one',
            price: 199.99,
            stock: 20,
            category: 'General'
          }
        },
      },
    },
    paths: {
      '/api/add_user': {
        post: {
          tags: ['Users'],
          summary: 'Create a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateUserInput' }
              }
            }
          },
          responses: {
            '201': {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'User created successfully' },
                      userValue: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Validation error'
            }
          }
        }
      },
      '/api/products': {
        post: {
          tags: ['Products'],
          summary: 'Create a new product',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateProductInput' }
              }
            }
          },
          responses: {
            '201': {
              description: 'Product created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string', example: 'Product created successfully' },
                      product: { $ref: '#/components/schemas/Product' }
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Validation error'
            }
          }
        }
      }
    }
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
