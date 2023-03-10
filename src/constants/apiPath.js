const API = {
    MY_WAREHOUSE: {
        GET: {
            path: 'api/myWarehouse'
        },
        GET_ID: {
            path: 'api/myWarehouse/:id'
        }
    },
    PRODUCT_TYPE: {
        GET: {
            path: 'api/productType'
        },
        GET_ID: {
            path: 'api/productType/:id'
        }
    },
    PRODUCT: {
        GET: {
            path: 'api/product'
        },
        GET_ID: {
            path: 'api/product/:id'
        }
    },
    PRODUCT_SOLD: {
        GET: {
            path: 'api/productSold'
        },
        GET_ID: {
            path: 'api/productSold/:id'
        }
    },
    REVENUE: {
        GET: {
            path: 'api/revenue'
        },
    }
};

export {
    API
}